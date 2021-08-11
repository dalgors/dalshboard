<!--
	competition 문제 목록
-->
<template>
	<table class="table table-sm table-nonfluid table-borderless text-center">
		<thead>
			<tr>
				<th>#</th>
				<th scope="col">문제 번호</th>
				<th scope="col">티어</th>
				<th scope="col">문제 이름</th>
				<th scope="col">태그</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(problemId, index) in problems" :key="problemId">
				<td>{{ index + 1 }}</td>
				<td>
					<a :href="`https://www.acmicpc.net/problem/${problemId}`" target="_blank">{{ problemId }}</a>
				</td>
				<td>
					<SolvedacTier :tier="problemDescriptions[problemId]?.tier ?? 0" />
				</td>
				<td style="text-align: left">
					<a :href="`https://www.acmicpc.net/problem/${problemId}`" target="_blank"
						>{{ problemDescriptions[problemId]?.name }}
					</a>
				</td>
				<td style="text-align: left">{{ (problemDescriptions[problemId]?.tags ?? []).join(' · ') }}</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup>
import SolvedacTier from './SolvedacTier.vue';
import store from '../store/store';

defineProps({
	problems: Array,
});

const problemDescriptions = store.state.problems;
</script>
