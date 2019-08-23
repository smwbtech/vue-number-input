<template lang="html">
	<button>{{ content }}</button>
</template>

<script>
export default {
	props: {
		type: String,
		required: true
	},

	computed: {
		content() {
			return this.type === 'up' ? '+' : '-';
		}
	}
};
</script>

<style lang="css" scoped></style>
