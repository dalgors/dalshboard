<!--
	그룹원 제출 현황
-->
<template>
	<Section title="제출 목록" :description="`그룹원들의 제출 목록입니다. 최근 ${threshold}개만 표시하고 있습니다.`">
		<div class="w-100 overflow-auto">
			<table class="table table-sm table-nonfluid table-borderless mx-auto">
				<!--
					Table의 Head
				-->
				<thead>
					<tr>
						<!-- <th scope="col">제출 번호</th> -->
						<th scope="col">제출한 시간</th>
						<th scope="col">아이디</th>
						<th scope="col">문제</th>
						<th scope="col">결과</th>
						<th scope="col">메모리</th>
						<th scope="col">시간</th>
						<th scope="col">언어</th>
						<th scope="col">코드 길이</th>
					</tr>
				</thead>

				<!--
					Table의 Body
				-->
				<tbody>
					<tr v-for="submission in submissions.slice(0, threshold)" :key="submission.id">
						<!-- <td>{{ submission.id }}</td> -->
						<td>
							{{
								new Date().getDate() === submission.when.getDate()
									? moment(submission.when).fromNow()
									: moment(submission.when).format('M/D HH:mm')
							}}
						</td>
						<td>
							<a
								:href="`https://www.acmicpc.net/status?problem_id=${submission.problemId}&user_id=${submission.username}&language_id=-1&result_id=-1&from_problem=1`"
								target="_blank"
								>{{ submission.username }}</a
							>
						</td>
						<td>
							<SolvedacTier :tier="submission.tier" />
							<span style="margin-left: 0.25rem" />
							<a
								:href="`https://www.acmicpc.net/problem/${submission.problemId}`"
								target="_blank"
								:title="submission.problemName"
								>{{ submission.problemId }}
							</a>
						</td>
						<td :class="`result-${submission.resultCode.toLowerCase()}`">{{ submission.resultMessage }}</td>
						<td>{{ submission.memory }} <span v-if="submission.memory !== null">KB</span></td>
						<td>{{ submission.time }} <span v-if="submission.time !== null">ms</span></td>
						<td>{{ submission.language }}</td>
						<td>{{ submission.length }} B</td>
					</tr>
				</tbody>
			</table>
		</div>
	</Section>
</template>

<script setup>
import store from '../store/store';
import SolvedacTier from '../components/SolvedacTier.vue';
import Section from './Section.vue';
import moment from 'moment/min/moment-with-locales';
import { ref } from '@vue/reactivity';

const { submissions } = store.state;

// 최대로 표시할 submissions 갯수
const threshold = ref(100);
</script>

<style scoped>
table th,
table td {
	white-space: nowrap;
	text-align: center;
}

.result-wait,
.result-rejudge-wait,
.result-no-judge {
	color: #a49e9e !important;
}

.result-compile,
.result-judging {
	color: #e67e22 !important;
}

.result-ac {
	color: #009874 !important;
	font-weight: bold;
}

.result-pac {
	color: #efc050 !important;
	font-weight: bold;
}

.result-pe,
.result-tle,
.result-mle,
.result-ole {
	color: #fa7268 !important;
}

.result-wa {
	color: #dd4124 !important;
}

.result-awa {
	color: #dd4124 !important;
	font-weight: bold;
}

.result-rte {
	color: #5f4b8b !important;
}

.result-ce {
	color: #0f4c81 !important;
}

.result-co,
.result-del {
	color: black !important;
	text-decoration: line-through;
}
</style>
