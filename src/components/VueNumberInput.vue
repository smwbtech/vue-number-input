<template lang="html">
	<div :class="[controlsType ? controlsType : '', 'vue-number-input']">
		<div
			tabindex="0"
			role="button"
			aria-label="decrease"
			:class="[
				buttonDownClasses.regular,
				buttonDownClasses.isActive,
				buttonDownClasses.userClass
			]"
			@mousedown.left="buttonDownHandler('dec')"
			@mouseup="buttonUpHandler"
		>
			<slot name="button-down">
				<VueNumberInputButton :type="'down'" />
			</slot>
		</div>
		<input
			type="text"
			role="spinbutton"
			ref="number-input"
			:placeholder="placeholder ? placeholder : ''"
			:value="value"
			:class="[inputClasses.regular, inputClasses.userClass]"
			@focus="addEventListeners"
			@blur="removeEventListeners"
			@input.prevent="inputHandler"
		/>
		<div
			tabindex="0"
			role="button"
			aria-label="increase"
			:class="[
				buttonUpClasses.regular,
				buttonUpClasses.isActive,
				buttonUpClasses.userClass
			]"
			@mousedown.left="buttonDownHandler('inc')"
			@mouseup="buttonUpHandler"
		>
			<slot name="button-up">
				<VueNumberInputButton :type="'up'" />
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
		},
		inputClass: {
			type: String
		},
		buttonUpClass: {
			type: String
		},
		buttonDownClass: {
			type: String
		}
	},

	data() {
		return {
			firstDeltaY: undefined,
			currentDeltaY: undefined,
			timeoutId: true,
			indervalId: undefined,
			decreasePressed: false,
			increasePressed: false
		};
	},

	computed: {
		/**
		 * Returns classes for down button
		 * @return {Object} - classes object
		 */
		buttonDownClasses() {
			return {
				regular: 'vue-number-input__btn-dec',
				isActive:
					this.value === this.min
						? 'vue-number-input__btn-dec_inactive'
						: '',
				userClass: this.buttonDownClass
			};
		},

		/**
		 * Returns classes for up button
		 * @return {Object} - classes object
		 */
		buttonUpClasses() {
			return {
				regular: 'vue-number-input__btn-inc',
				isActive:
					this.value === this.max
						? 'vue-number-input__btn-inc_inactive'
						: '',
				userClass: this.buttonUpClass
			};
		},

		/**
		 * Returns classes for input field
		 * @return {Object} - classes object
		 */
		inputClasses() {
			return {
				regular: 'vue-number-input__input',
				userClass: this.inputClass
			};
		},

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
		 * @return {undefined}
		 */
		inputHandler(e) {
			const newValue = e.target.value;
			const numericPattern = /^-{0,1}\d*(\.\d*)*$/i;
			if (!numericPattern.test(newValue)) e.target.value = this.value;
			else this.makeStep(parseFloat(newValue));
		},

		/**
		 * If button click once it will increase value
		 * by the props.step. Else, if user hold the button
		 * active more then 500ms, it will increase value every 200 ms
		 * @param  {String} direction - 'up' or 'down'
		 * @return {undefined}
		 */
		buttonDownHandler(direction) {
			this.mousePressed = true;
			this.makeStep(
				direction === 'inc'
					? this.value + this.step
					: this.value - this.step
			);
			// After 500 ms will start value increasing process
			this.timeoutId = setTimeout(
				(this.intervalId = setInterval(
					() =>
						this.makeStep(
							direction === 'inc'
								? this.value + this.step
								: this.value - this.step
						),
					200
				)),
				500
			);
		},

		/**
		 * When button become inactive clear
		 * timeout and interval
		 * @return {undefined} [description]
		 */
		buttonUpHandler() {
			clearInterval(this.intervalId);
			clearTimeout(this.timeoutId);
		},

		/**
		 * Emit input event if val in range
		 * min > val > max
		 * @param  {Number} val - input value
		 * @return {undefined}
		 */
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

.vue-number-input {
	position: relative;
    display: flex;
	justify-content: space-between;
	align-items: center;
	border: 1px solid #eee;
	padding: 0px;
	border-radius: 5px;

	& .vue-number-input__input {
		border: none;
		width: 70%;
		padding: 10px;
	}

	& .vue-number-input__btn-dec,
	& .vue-number-input__btn-inc {
		width: 15%;
		background-color: #f7f7f7;
		cursor: pointer;

		&.vue-number-input__btn-dec_inactive,
		&.vue-number-input__btn-inc_inactive {
			cursor: not-allowed;
			background-color: #eee;
		}
	}

} /* end vue-num-inp*/
</style>
