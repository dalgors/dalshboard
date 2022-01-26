<!--
	competition 문제 목록
-->
<template>
	<Section title="문제 목록" :description="`${name} 연습 문제 목록입니다.`">
		<div class="w-100 overflow-hidden">
			<table class="table table-sm table-nonfluid table-borderless text-center mx-auto">
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
						<td style="text-align: left">
							{{ (problemDescriptions[problemId]?.tags ?? []).join(' · ') }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</Section>
</template>

<style scoped>
table td,
table th {
	white-space: nowrap;
}

table td:last-child {
	white-space: unset;
	word-break: keep-all;
}
</style>

<script setup>
import Section from './Section.vue';
import SolvedacTier from '../components/SolvedacTier.vue';
import store from '../store/store';

defineProps({
	name: String,
	problems: Array,
});

const problemDescriptions = store.state.problems;
</script>
