<template lang="html">
	<div :class="[containerClasses.regular, containerClasses.type]">
		<div
			tabindex="0"
			role="button"
			aria-label="decrease"
			:aria-disabled="`${value === min || disabled}`"
			:class="[
				buttonDecClasses.regular,
				buttonDecClasses.isActive,
				buttonDecClasses.userClass
			]"
			@mousedown.left="buttonDownHandler('dec')"
			@mouseup="buttonUpHandler"
			@keydown.enter="buttonDownHandler('dec')"
			@keyup.enter="buttonUpHandler"
		>
			<slot name="button-decrease">
				<VueNumberInputButton :type="'dec'" />
			</slot>
		</div>
		<input
			type="text"
			role="spinbutton"
			ref="number-input"
			name="number-input"
			autocomplete="off"
			aria-label="number input"
			:autofocus="autofocus ? 'autofocus' : false"
			:aria-valuenow="value"
			:aria-valuemin="min"
			:aria-valuemax="max"
			:aria-disabled="`${disabled}`"
			:disabled="disabled"
			:readonly="readonly"
			:value="value"
			:class="[
				inputClasses.regular,
				inputClasses.isActive,
				inputClasses.userClass
			]"
			@focus="addEventListeners"
			@blur="removeEventListeners"
			@input.prevent="inputHandler"
		/>
		<div
			tabindex="0"
			role="button"
			aria-label="increase"
			:aria-disabled="`${value === max || disabled}`"
			:class="[
				buttonIncClasses.regular,
				buttonIncClasses.isActive,
				buttonIncClasses.userClass
			]"
			@mousedown.left="buttonDownHandler('inc')"
			@mouseup="buttonUpHandler"
			@keydown.enter="buttonDownHandler('inc')"
			@keyup.enter="buttonUpHandler"
		>
			<slot name="button-increase">
				<VueNumberInputButton :type="'inc'" />
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
		disabled: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		autofocus: {
			type: Boolean,
			default: false
		},
		showColntrols: {
			type: Boolean,
			default: true
		},
		controlsPosition: {
			type: String,
			default: 'on edges',
			validator: str => ['on edges', 'left', 'right'].indexOf(str) !== -1
		},
		inputClass: {
			type: String
		},
		buttonIncClass: {
			type: String
		},
		buttonDecClass: {
			type: String
		}
	},

	data() {
		return {
			firstDeltaY: undefined,
			currentDeltaY: undefined,
			timeoutId: undefined,
			intervalId: undefined
		};
	},

	computed: {
		/**
		 * Returns classes for container
		 * @return {Object} - classes object
		 */
		containerClasses() {
			let type;
			switch (this.controlsPosition) {
				case 'on edges':
					type = 'vue-number-input_on-edge';
					break;
				case 'left':
					type = 'vue-number-input_on-left';
					break;
				case 'right':
					type = 'vue-number-input_on-right';
					break;
			}
			return {
				regular: 'vue-number-input',
				type
			};
		},
		/**
		 * Returns classes for down button
		 * @return {Object} - classes object
		 */
		buttonDecClasses() {
			return {
				regular: 'vue-number-input__btn-dec',
				isActive:
					this.value === this.min || this.disabled
						? 'vue-number-input__btn-dec_inactive'
						: '',
				userClass: this.buttonDecClass
			};
		},

		/**
		 * Returns classes for up button
		 * @return {Object} - classes object
		 */
		buttonIncClasses() {
			return {
				regular: 'vue-number-input__btn-inc',
				isActive:
					this.value === this.max || this.disabled
						? 'vue-number-input__btn-inc_inactive'
						: '',
				userClass: this.buttonIncClass
			};
		},

		/**
		 * Returns classes for input field
		 * @return {Object} - classes object
		 */
		inputClasses() {
			return {
				regular: 'vue-number-input__input',
				isActive: this.disabled
					? 'vue-number-input__input_inactive'
					: '',
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
			// clear all previpus timeouts and intervals
			this.buttonUpHandler();
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
			if (val >= this.min && val <= this.max && !this.disabled) {
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
		 * Will remove wheel and keydown event listeners
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
			if (!this.firstDeltaY) this.firstDeltaY = Math.abs(e.deltaY);
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

		&.vue-number-input__input_inactive {
			background-color: #f7f7f7;
			cursor: not-allowed;
		}
	}

	& .vue-number-input__btn-dec,
	& .vue-number-input__btn-inc {
		background-color: #f7f7f7;
		cursor: pointer;

		&.vue-number-input__btn-dec_inactive,
		&.vue-number-input__btn-inc_inactive {
			cursor: not-allowed;
			background-color: #eee;
		}
	}

	&.vue-number-input_on-edge {
		& .vue-number-input__btn-dec,
		& .vue-number-input__btn-inc {
			width: 15%;
		}
	}

	&.vue-number-input_on-left,
	&.vue-number-input_on-right {
		& .vue-number-input__input {
			width: 80%;
			padding: 20px 10px;
		}
		& .vue-number-input__btn-dec,
		& .vue-number-input__btn-inc {
			position: absolute;
			height: 50%;
			width: 20%;
		}

		& .vue-number-input__btn-dec {
			bottom: 0;
		}

		& .vue-number-input__btn-inc {
			top: 0;
			border-bottom: 1px solid #eee;
		}
	}

	&.vue-number-input_on-left {

		& .vue-number-input__input {
			margin-left: 20%;

		}

		& .vue-number-input__btn-dec,
		& .vue-number-input__btn-inc {
			left: 0;
		}
	}

	&.vue-number-input_on-right {

		& .vue-number-input__input {
			margin-right: 20%;

		}

		& .vue-number-input__btn-dec,
		& .vue-number-input__btn-inc {
			right: 0;
		}
	}


} /* end vue-num-inp*/
</style>
