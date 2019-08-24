<template lang="html">
	<div :class="[controlsType ? controlsType : '', 'vue-num-inp']">
		<div
			class="button-down"
			@mousedown.left="buttonDownHandler('down')"
			@mouseup="buttonUpHandler"
		>
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
			@input.prevent="inputHandler"
		/>
		<div
			class="button-up"
			@mousedown.left="buttonDownHandler('up')"
			@mouseup="buttonUpHandler"
		>
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
			type: Number,
			default: Number.MIN_SAFE_INTEGER
		},
		max: {
			type: Number,
			default: Number.MAX_SAFE_INTEGER
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

	data() {
		return {
			firstDeltaY: undefined,
			currentDeltaY: undefined,
			timeoutId: true,
			indervalId: undefined
		};
	},

	computed: {
		/**
		 * Return the value for nextStep
		 * for wheel event. The result depends on
		 * firstDeltaY - the value of deltaY of
		 * first wheel event
		 * @return {Number} - next spet value
		 */
		nextStep() {
			// This is for touchpad
			if (this.firstDeltaY < 10)
				return this.currentDeltaY > 0
					? this.value + this.step
					: this.value - this.step;
			// For mouse wheel
			else
				return this.currentDeltaY > 0
					? this.value - this.step
					: this.value + this.step;
		}
	},

	methods: {
		/**
		 * Input Handler filter all valuex
		 * except numbers and symbols '-' and '.'
		 * @param  {Object} e - input event object
		 * @return {undefinde}
		 */
		inputHandler(e) {
			const numericPattern = /^-{0,1}\d*(\.\d*)*$/i;
			const newValue = e.target.value;
			if (!numericPattern.test(newValue)) e.target.value = this.value;
			else this.makeStep(parseFloat(newValue));
		},
		/**
		 *
		 * @param  {[type]} direction [description]
		 * @return {[type]}           [description]
		 */
		buttonDownHandler(direction) {
			this.mousePressed = true;
			this.makeStep(
				direction === 'up'
					? this.value + this.step
					: this.value - this.step
			);
			this.timeoutId = setTimeout(
				(this.intervalId = setInterval(
					() =>
						this.makeStep(
							direction === 'up'
								? this.value + this.step
								: this.value - this.step
						),
					200
				)),
				500
			);
		},

		buttonUpHandler() {
			clearInterval(this.intervalId);
			clearTimeout(this.timeoutId);
		},

		makeStep(val) {
			if (val >= this.min && val <= this.max) {
				this.$emit('input', val);
			}
		},

		/**
		 * Will add wheel and keydown event listeners
		 * when user focus on the form
		 * and emit focus event
		 * @param {Object} e - focus event obect
		 */
		addEventListeners(e) {
			this.$emit('focus', e);
			e.target.addEventListener('wheel', this.wheelHandler);
			e.target.addEventListener('keydown', this.keyDownHandler);
		},

		/**
		 * Will add wheel and keydown event listeners
		 * when user focus goes out of the form
		 * and emit blur event
		 * @param {Object} e - blur event obect
		 */
		removeEventListeners(e) {
			this.$emit('blur', e);
			this.firstDeltaY = undefined;
			this.currentDeltaY = undefined;
			e.target.removeEventListener('wheel', this.wheelHandler);
			e.target.removeEventListener('keydown', this.keyDownHandler);
		},

		/**
		 * Event handler for wheel event,
		 * when input is in fouce,Will increase
		 * or decrease number
		 * @param  {Object} e - Wheel event object
		 * @return {undefined}
		 */
		wheelHandler(e) {
			e.preventDefault();
			this.currentDeltaY = e.deltaY;
			// It is necessary to detect mouse / touchpad wheel event
			// The first one will give deltaY >= 100, touchpad always start with small values,
			// and then deltaY depends of touchpad scroll speed.
			if (!this.firstDeltaY) this.firstDeltaY = e.deltaY;
			this.makeStep(this.nextStep);
		},

		/**
		 * Event handler for arrowUp and arrowDown
		 * keys, when form is in focus. Will increase
		 * or decrease number
		 * @param  {Object} e - Key Down object
		 * @return {undefinde}
		 */
		keyDownHandler(e) {
			switch (e.keyCode) {
				case 38:
					this.makeStep(this.value + this.step);
					break;
				case 40:
					this.makeStep(this.value - this.step);
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
