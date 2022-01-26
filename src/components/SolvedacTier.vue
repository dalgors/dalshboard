<template>
	<img
		:src="`https://static.solved.ac/tier_${variant ?? 'small'}/${tier ?? 0}.svg`"
		:style="`width: ${width || height || '1.2rem'}; height: ${height || width || '1.2rem'}`"
	/>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
	variant: String,
	tier: Number,
	width: String,
	height: String,
});
</script>
