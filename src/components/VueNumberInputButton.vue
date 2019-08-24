<template lang="html">
	<p class="vue-number-input-btn__default">
		<a class="vue-number-input-btn__symbol">{{ content }}</a>
	</p>
</template>

<script>
export default {
	props: {
		type: String,
		required: true
	},

	computed: {
		content() {
			return this.type === 'up' ? '+' : '–';
		}
	}
};
</script>

<style lang="css">

.vue-number-input-btn__default {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	margin: 0;
	background-color: rgba(0,0,0,0);
	border: none;
	font-weight: bold;
	overflow: hidden;

	& .vue-number-input-btn__symbol {
		display: block;
		margin: 0 auto;
		padding: 15px 0px;
		width: 100%;
		height: 100%;
		transform: scale(1.2);
		transform-origin: center center;
		transition: transform .2s ease-in;
		color: #393e46;

		&:active {
			transform: scale(1);
		}
	}
}

.vue-number-input__btn-dec_inactive,
.vue-number-input__btn-inc_inactive {
	& .vue-number-input-btn__symbol {
		color: #929aab;

		&:active {
			transform: scale(1.2);
		}
	}
}
</style>
