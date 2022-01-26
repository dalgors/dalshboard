<template>
	<Section title="요약" description="그룹원들의 솔브 현황 요약입니다.">
		<!--
			competition 선택할 수 있는 버튼들
		-->
		<CompetitionSelect :competition="competition" @update:competition="$emit('update:competition', $event)" />

		<div style="margin-top: 1.5rem"></div>

		<!--
			competition 솔브 현황 요약
		-->
		<div class="w-100 overflow-auto">
			<table class="table table-sm table-nonfluid table-borderless table-tiled text-center mx-auto my-0">
				<caption class="w-100 text-end">
					∑ = 푼 문제 수, R = 레이팅 합
				</caption>

				<!--
					솔브 현황 테이블에서 상단 문제 Table Head 부분. (문제 번호)
				-->
				<thead>
					<tr>
						<th scope="col">문제</th>
						<th
							scope="col"
							style="min-width: 1.8rem; width: 1.8rem; background-color: black"
							v-for="(problemId, index) in competition.problems"
							:key="problemId"
							:style="{ backgroundColor: problemId in problems ? getTierColor(problems[problemId].tier) : '' }"
						>
							<a :href="`https://www.acmicpc.net/problem/${problemId}`" target="_blank" :title="problemId">
								{{ index + 1 }}
							</a>
						</th>
						<th scope="col" style="min-width: 2rem; width: 2rem">∑</th>
						<th scope="col" style="min-width: 3rem; width: 3rem">R</th>
					</tr>

					<!--
						점수 정보들
					-->
					<tr>
						<th>레이팅</th>
						<th v-for="problemId in competition.problems" :key="problemId">
							{{ getTierRaiting(problems[problemId].tier).toFixed(0) }}
						</th>
						<th>{{ competition.problems.length }}</th>
						<th>
							{{
								competition.problems
									.map(problemId => getTierRaiting(problems[problemId].tier))
									.reduce((acc, cur) => acc + cur, 0)
									.toFixed(0)
							}}
						</th>
					</tr>
				</thead>
				<!--
					솔브 현황 테이블에서 실제 솔브 현황 (초록색, 빨간색 타일 및 솔브 횟수 표시되는 부분)
				-->
				<tbody>
					<tr v-for="{ username, solvedCount, rating, ...userdata } in solvedStates" :key="username">
						<td>
							<a :href="`https://www.acmicpc.net/user/${username}`" target="_blank">{{ username }}</a>
						</td>
						<td
							v-for="[problemId, problem] in competition.problems.map(problemId => [problemId, userdata[problemId]])"
							:key="problemId"
							:class="{ 'table-success': problem?.solved === true, 'table-danger': problem?.solved === false }"
						>
							<template v-if="problem"
								><a
									:href="`https://www.acmicpc.net/status?problem_id=${problemId}&user_id=${username}&language_id=-1&result_id=-1&from_problem=1`"
									target="_blank"
									>{{ problem.trial }}</a
								></template
							>
						</td>
						<td>{{ solvedCount }}</td>
						<td>{{ rating.toFixed(0) }}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div style="margin-top: 0.5rem"></div>

		<!--
			competition 이 진행되는 기간
		-->
		<h6>
			{{ moment(competition.duration.begin).format('YYYY-MM-DD HH:mm') }} ~
			{{ moment(competition.duration.end).format('YYYY-MM-DD HH:mm') }}
		</h6>
	</Section>
</template>

<script setup>
import Section from './Section.vue';
import CompetitionSelect from '../components/CompetitionSelect.vue';
import store from '../store/store';
import { computed, toRef, watch } from '@vue/runtime-core';
import moment from 'moment/min/moment-with-locales';
import { getTierColor, getTierRaiting } from '../helper/solvedac';

const props = defineProps({
	competition: Object,
});

const competition = toRef(props, 'competition');

const { submissions, problems } = store.state;

// [
//   {
//     username: $username,
//     solvedCount: 0,
//     $problemId: {
//       solved: false,
//       trial: 0
//     }
//   },
//   ...
// ]
const solvedStates = computed({
	get: () => {
		const { begin, end } = competition.value.duration;

		return Object.entries(
			[...submissions].reverse().reduce((users, submission) => {
				// skip if problem id is not in problems (filtering)
				if (!competition.value.problems.includes(submission.problemId)) return users;

				// skip if the submission out of competition duration
				if (submission.when < begin || end < submission.when) return users;

				const user =
					users[submission.username] ??
					(users[submission.username] = { username: submission.username, solvedCount: 0, rating: 0 });

				const problem = user[submission.problemId] ?? (user[submission.problemId] = { solved: false, trial: 0 });

				// trial will increase only when problem was not solved
				if (problem.solved === false) {
					if (submission.resultCode === 'AC') {
						// 정답을 맞췄다면 정답 처리, trial 1 증가
						// solved가 true면 향후 iteration에서 trial이 늘어나지 않음
						problem.solved = true;
						problem.trial += 1;
						user.solvedCount += 1;
						user.rating += getTierRaiting(submission.tier);
					} else {
						// 정답을 맞추지 못한 상태에서 trial 카운트 증가
						problem.trial += 1;
					}
				}

				return users;
			}, {}),
		)
			.map(([, userdata]) => userdata)
			.sort((a, b) => b.rating - a.rating);
	},
});
</script>
