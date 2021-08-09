<template>
	<div class="card">
		<div class="card-body d-flex flex-column align-items-center justify-content-center">
			<h1 class="card-title display-6">{{ title }}</h1>
			<p>{{ description }}</p>
			<div style="margin-top: 2rem"></div>

			<slot></slot>
		</div>
	</div>
</template>

<script setup>
defineProps({
	title: String,
	description: String,
});
</script>
