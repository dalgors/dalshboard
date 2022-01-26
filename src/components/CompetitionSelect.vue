<template>
	<div class="d-flex justify-content-center flex-wrap">
		<button v-if="!expanded" class="btn btn-primary" @click="expand()">더보기</button>

		<button
			class="btn btn-primary text-nowrap"
			v-for="_competition in competitions.slice(competitions.length - threshold, competitions.length)"
			:key="_competition.name"
			:class="{ active: _competition.name === competition.name }"
			@click="$emit('update:competition', _competition)"
		>
			{{ _competition.name }}
		</button>
	</div>
</template>

<style scoped>
button {
	margin-top: 0.8rem;
}

button + button {
	margin-left: 0.8rem;
}
</style>

<script setup>
import { ref, watch } from '@vue/runtime-core';
import store from '../store/store';

const props = defineProps({
	competition: Object,
});

const { competitions } = store.state;

const expanded = ref(false);
const threshold = ref(2);

function expand() {
	expanded.value = true;
	threshold.value = 10;
}
</script>
