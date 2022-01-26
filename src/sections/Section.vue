<template>
	<div class="card overflow-hidden" style="margin-top: 5rem; margin-bottom: 5rem">
		<div
			class="card-body d-flex flex-column align-items-center justify-content-center"
			style="padding-left: 0; padding-right: 0"
		>
			<h1 class="card-title display-6">{{ title }}</h1>
			<p>{{ description }}</p>
			<div style="margin-bottom: 0.5rem"></div>

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
