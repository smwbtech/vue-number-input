<template lang="html">
	<div :class="[controlsType ? controlsType : '', 'vue-num-inp']">
		<div class="button-down" @click="buttonHandler('down')">
			<slot name="button-down">
				<VueNumberInputButton type="'down'" />
			</slot>
		</div>
		<input
			type="text"
			:placeholder="placeholder ? placeholder : ''"
			:value="value"
			@focus="addEventListeners"
			@blur="removeEventListeners"
		/>
		<div class="button-up" @click="buttonHandler('up')">
			<slot name="button-up">
				<VueNumberInputButton type="'up'" />
			</slot>
		</div>
	</div>
</template>

<script>
import VueNumberInputButton from './VueNumberInputButton.vue';

export default {
	components: {
		VueNumberInputButton
	},

	props: {
		placeholder: {
			type: String,
			default: ''
		},
		value: {
			type: Number,
			default: 0
		},
		min: {
			type: Number
		},
		max: {
			type: Number
		},
		step: {
			type: Number,
			default: 1
		},
		showColntrols: {
			type: Boolean,
			default: true
		},
		controlsType: {
			type: String,
			default: 'on edges',
			validator: str => ['on edges', 'left', 'right'].indexOf(str) !== -1
		}
	},

	methods: {
		buttonHandler(direction) {
			this.$emit(
				'input',
				direction == 'up'
					? this.value + this.step
					: this.value - this.step
			);
		},

		addEventListeners(e) {
			console.log(e);
			e.target.addEventListener('wheel', this.wheelHandler);
			e.target.addEventListener('keydown', this.keyDownHandler);
		},

		removeEventListeners(e) {
			e.target.removeEventListener('wheel', this.wheelHandler);
			e.target.removeEventListener('keydown', this.keyDownHandler);
		},

		wheelHandler(e) {
			e.preventDefault();
			console.log(e);
			const { deltaY } = e;
			this.$emit(
				'input',
				deltaY > 0 ? this.value - this.step : this.value + this.step
			);
		},

		keyDownHandler(e) {
			switch (e.keyCode) {
				case 38:
					this.$emit('input', this.value + this.step);
					break;
				case 40:
					this.$emit('input', this.value - this.step);
					break;
				default:
					return false;
			}
		}
	}
};
</script>

<style lang="css">

.vue-num-inp {
    display: flex;

} /* end vue-num-inp*/
</style>
