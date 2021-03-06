<template>
	<div class="container-xxl" v-if="loaded">
		<div style="margin-top: 8rem"></div>

		<CompetitionSummary v-model:competition="activeCompetition" />

		<ProblemList :problems="activeCompetition.problems" :name="activeCompetition.name" />

		<SubmissionList />
	</div>
</template>

<script setup>
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
import CompetitionSummary from './sections/CompetitionSummary.vue';
import ProblemList from './sections/ProblemList.vue';
import SubmissionList from './sections/SubmissionList.vue';
import moment from 'moment/min/moment-with-locales';
import { ref } from '@vue/reactivity';
import store from './store/store';

const [loaded, activeCompetition] = [ref(false), ref({})];

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

	[store.state.competitions, store.state.submissions, store.state.problems] = [_competitions, _submissions, _problems];

	activeCompetition.value = store.state.competitions[store.state.competitions.length - 1];

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
