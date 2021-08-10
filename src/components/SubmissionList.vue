<!--
	그룹원 제출 현황
-->
<template>
	<table class="table table-sm table-nonfluid table-borderless text-center">
		<thead>
			<tr>
				<th scope="col">제출 번호</th>
				<th scope="col">아이디</th>
				<th scope="col">문제</th>
				<th scope="col">결과</th>
				<th scope="col">메모리</th>
				<th scope="col">시간</th>
				<th scope="col">언어</th>
				<th scope="col">코드 길이</th>
				<th scope="col">제출한 시간</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="submission in submissions" :key="submission.id">
				<td>{{ submission.id }}</td>
				<td>
					<a
						:href="`https://www.acmicpc.net/status?problem_id=${submission.problemId}&user_id=${submission.username}&language_id=-1&result_id=-1&from_problem=1`"
						target="_blank"
						>{{ submission.username }}</a
					>
				</td>
				<td>
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
				<td>{{ submission.when }}</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
	submissions: Array,
});
</script>

<style scoped>
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
