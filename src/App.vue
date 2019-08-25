<template>
	<div id="app">
		<VueNumberInput
			v-model="value"
			:sign="'°'"
			:signPosition="'right'"
			:min="0"
			:max="360"
			class="input-block"
		/>
	</div>
</template>

<script>
import VueNumberInput from '@/components/VueNumberInput.vue';

export default {
	name: 'app',
	components: {
		VueNumberInput
	},
	data() {
		return {
			value: 1
		};
	}
};
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;

	& .input-block {
		width: 30%;
	}
}
</style>
