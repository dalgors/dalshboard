<template>
	<div class="container" v-if="loaded">
		<div style="margin-top: 8rem"></div>

		<Section title="Dalgors :: Dashboard" description="Dalgors :: 동의대 알고리즘 동아리 연습 현황 대시보드입니다.">
			<!--
				competition 선택할 수 있는 버튼들
			-->
			<div class="d-flex justify-content-center">
				<button
					class="btn btn-primary mx-1"
					v-for="competition in competitions.slice(competitions.length - 2, competitions.length)"
					:key="competition.name"
					:class="{ active: competition.name === competitionActive.name }"
					@click="competitionActive.value = competition"
				>
					{{ competition.name }}
				</button>
			</div>
			<div style="margin-top: 1.5rem"></div>

			<SolvedStateTable :submissions="submissions" :competition="competitionActive" />

			<!-- competition 이 진행되는 기간 -->
			<h6>{{ competitionActive.duration.begin }} ~ {{ competitionActive.duration.end }}</h6>
		</Section>

		<div style="margin-top: 5rem"></div>

		<Section title="문제 목록" :description="`${competitionActive.name} 연습 문제 목록입니다.`">
			<ProblemList :problems="competitionActive.problems" />
		</Section>

		<div style="margin-top: 5rem"></div>

		<Section title="제출 현황" description="약 20분 간격으로 갱신됩니다.">
			<SubmissionList :submissions="submissions" />
		</Section>

		<div style="margin-top: 5rem"></div>
	</div>
</template>

<script setup>
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
import Section from './components/Section.vue';
import SolvedStateTable from './components/SolvedStateTable.vue';
import ProblemList from './components/ProblemList.vue';
import SubmissionList from './components/SubmissionList.vue';
import { reactive, ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import store from './store/store';

const [loaded, competitions, submissions, competitionActive] = [ref(false), ref([]), ref([]), ref({})];

// Load json files from https://github.com/dalgors/baekjoon
(async () => {
	const [_competitions, _submissions, _problems] = await Promise.all(
		['competitions.json', 'submissions.json', 'problems.json'].map(
			async filename =>
				await (await fetch(`https://raw.githubusercontent.com/dalgors/baekjoon/main/${filename}`)).json(),
		),
	);

	// manipulate incomplete fields in json data
	_submissions.forEach(submission => {
		submission.when = new Date(submission.when);
	});
	_competitions.forEach(competition => {
		competition.duration.begin = new Date(competition.duration.begin);
		competition.duration.end = new Date(competition.duration.end);
	});

	[competitions.value, submissions.value, store.state.problems] = [_competitions, _submissions, _problems];

	competitionActive.value = competitions.value[competitions.value.length - 1];

	loaded.value = true;
})();
</script>

<style>
:root {
	--main-bg-color: hsl(200, 75%, 10%);
	--main-card-color: hsl(200, 95%, 7%);
	--main-success-color: hsl(120, 60%, 30%);
	--main-danger-color: hsl(0, 60%, 30%);
	--main-body-text-color: hsl(215, 5%, 65%);
	--main-button-color: hsl(200, 75%, 10%);
}

body {
	font-family: 'Roboto', sans-serif;
	background-color: var(--main-bg-color);
	color: var(--main-body-text-color);
}

a {
	color: white;
	text-decoration: none;
}

a:hover {
	color: white;
	text-decoration: underline;
}

.card {
	background-color: var(--main-card-color);
	border-radius: 0;
}

.card-body {
	padding: 1.5rem;
}

.table {
	color: var(--main-body-text-color);
	font-weight: 300;
}

.table > thead {
	color: white;
}

.table-nonfluid {
	width: auto !important;
}

.table-tiled {
	border-collapse: separate;
	border-spacing: 0.2rem;
}
.table-tiled > thead > tr > th {
	background-color: var(--main-bg-color);
}
.table-tiled > tbody > tr > td {
	background-color: var(--main-bg-color);
	color: white;
}

.table-success {
	background-color: var(--main-success-color) !important;
}

.table-danger {
	background-color: var(--main-danger-color) !important;
}

.btn {
	border-radius: 1rem;
}

.btn-primary {
	background-color: var(--main-button-color);
	border: none;
}
</style>
