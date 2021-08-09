<template>
	<table class="table table-sm table-nonfluid table-borderless table-tiled text-center">
		<!--
			솔브 현황 테이블에서 상단 문제 Table Head 부분. (문제 번호)
		-->
		<thead>
			<tr>
				<th scope="col" style="width: 8rem">아이디</th>
				<th
					scope="col"
					style="width: 2rem; background-color: black"
					v-for="(problemId, index) in competition.problems"
					:key="problemId"
					:style="{ backgroundColor: problemId in problems ? getTierColor(problems[problemId].tier) : '' }"
				>
					<a :href="`https://www.acmicpc.net/problem/${problemId}`" target="_blank" :title="problemId">
						{{ index + 1 }}
					</a>
				</th>
				<th scope="col" style="width: 2rem">∑</th>
			</tr>
		</thead>
		<!--
			솔브 현황 테이블에서 실제 솔브 현황 (초록색, 빨간색 타일 및 솔브 횟수 표시되는 부분)
		-->
		<tbody>
			<tr v-for="{ username, solvedCount, ...userdata } in solvedStates" :key="username">
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
			</tr>
		</tbody>
	</table>
</template>

<script setup>
import store from '../store/store';
import { getTierColor } from '../helper/solvedac';

const { competition, submissions } = defineProps({
	competition: Object,
	submissions: Array,
});

const problems = store.state.problems;

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
const solvedStates = Object.entries(
	submissions.reverse().reduce((users, submission) => {
		// skip if problem id is not in problems (filtering)
		if (!competition.problems.includes(submission.problemId)) return users;

		const user =
			users[submission.username] ?? (users[submission.username] = { username: submission.username, solvedCount: 0 });

		const problem = user[submission.problemId] ?? (user[submission.problemId] = { solved: false, trial: 0 });

		// trial will increase only when problem was not solved
		if (problem.solved === false) {
			if (submission.resultCode === 'AC') {
				problem.solved = true;
				problem.trial += 1;
				user.solvedCount += 1;
			} else {
				problem.trial += 1;
			}
		}

		return users;
	}, {}),
)
	.map(([, userdata]) => userdata)
	.sort((a, b) => b.solvedCount - a.solvedCount);
</script>
