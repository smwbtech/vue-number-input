import { shallowMount } from '@vue/test-utils';
import VueNumberInput from '@/components/VueNumberInput.vue';

jest.useFakeTimers();

const defaultButtonStub = {
	template: '<div class="btn-stub"></div>'
};

describe('Tests for VueNumberInput.vue component', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallowMount(VueNumberInput, {
			stubs: {
				VueNumberInputButton: defaultButtonStub
			},
			propsData: {
				min: 0,
				max: 10,
				value: 2
			}
		});
	});

	it('Component should exists and should be instance of Vue class', () => {
		expect(wrapper.exists()).toBeTruthy();
		expect(wrapper.isVueInstance()).toBeTruthy();
	});

	describe('Testing "data" and "computed" properties of component', () => {
		it('Component should have data.firstDeltaY prop, <undefined> by default', () => {
			expect(wrapper.vm).toHaveProperty('firstDeltaY', undefined);
		});

		it('Component should have data.currentDeltaY prop, <undefined> by default', () => {
			expect(wrapper.vm).toHaveProperty('currentDeltaY', undefined);
		});

		it('Component should have data.timeoutId prop, <undefined> by default', () => {
			expect(wrapper.vm).toHaveProperty('timeoutId', undefined);
		});

		it('Component should have data.intervalId prop, <undefined> by default', () => {
			expect(wrapper.vm).toHaveProperty('intervalId', undefined);
		});

		it('Component should have computed.containerClasses prop, and it should return class object for container block', () => {
			expect(typeof wrapper.vm.containerClasses).toBe('object');
			expect(wrapper.vm.containerClasses).not.toBeNull();
			expect(Array.isArray(wrapper.vm.containerClasses)).toBeFalsy();
			expect(wrapper.vm.containerClasses.regular).toEqual(
				'vue-number-input'
			);
			expect(wrapper.vm.containerClasses.type).toEqual(
				'vue-number-input_on-edge'
			);
			wrapper.setProps({ controlsPosition: 'left' });
			expect(wrapper.vm.containerClasses.type).toEqual(
				'vue-number-input_on-left'
			);
			wrapper.setProps({ controlsPosition: 'right' });
			expect(wrapper.vm.containerClasses.type).toEqual(
				'vue-number-input_on-right'
			);
		});

		it('Component should have computed.buttonDecClasses prop, and it should return class object for decrease button block', () => {
			expect(typeof wrapper.vm.buttonDecClasses).toBe('object');
			expect(wrapper.vm.buttonDecClasses).not.toBeNull();
			expect(Array.isArray(wrapper.vm.buttonDecClasses)).toBeFalsy();
			expect(wrapper.vm.buttonDecClasses.regular).toEqual(
				'vue-number-input__btn-dec'
			);
			expect(wrapper.vm.buttonDecClasses.isActive).toEqual('');
			wrapper.setProps({ value: 0 });
			expect(wrapper.vm.buttonDecClasses.isActive).toEqual(
				'vue-number-input__btn-dec_inactive'
			);
			wrapper.setProps({ value: 2 });
			wrapper.setProps({ disabled: true });
			expect(wrapper.vm.buttonDecClasses.isActive).toEqual(
				'vue-number-input__btn-dec_inactive'
			);
			wrapper.setProps({ disabled: false });
			wrapper.setProps({ buttonDecClass: 'test-user-class' });
			expect(wrapper.vm.buttonDecClasses.userClass).toEqual(
				'test-user-class'
			);
		});

		it('Component should have computed.buttonIncClasses prop, and it should return class object for increase button block', () => {
			expect(typeof wrapper.vm.buttonIncClasses).toBe('object');
			expect(wrapper.vm.buttonIncClasses).not.toBeNull();
			expect(Array.isArray(wrapper.vm.buttonIncClasses)).toBeFalsy();
			expect(wrapper.vm.buttonIncClasses.regular).toEqual(
				'vue-number-input__btn-inc'
			);
			expect(wrapper.vm.buttonIncClasses.isActive).toEqual('');
			wrapper.setProps({ value: 10 });
			expect(wrapper.vm.buttonIncClasses.isActive).toEqual(
				'vue-number-input__btn-inc_inactive'
			);
			wrapper.setProps({ value: 2 });
			wrapper.setProps({ disabled: true });
			expect(wrapper.vm.buttonIncClasses.isActive).toEqual(
				'vue-number-input__btn-inc_inactive'
			);
			wrapper.setProps({ disabled: false });
			wrapper.setProps({ buttonIncClass: 'test-user-class' });
			expect(wrapper.vm.buttonIncClasses.userClass).toEqual(
				'test-user-class'
			);
		});

		it('Component should have computed.inputClasses prop, and it should return class object for input element', () => {
			expect(typeof wrapper.vm.inputClasses).toBe('object');
			expect(wrapper.vm.inputClasses).not.toBeNull();
			expect(Array.isArray(wrapper.vm.inputClasses)).toBeFalsy();
			expect(wrapper.vm.inputClasses.regular).toEqual(
				'vue-number-input__input'
			);
			expect(wrapper.vm.inputClasses.isActive).toEqual('');
			wrapper.setProps({ disabled: true });
			expect(wrapper.vm.inputClasses.isActive).toEqual(
				'vue-number-input__input_inactive'
			);
			wrapper.setProps({ disabled: false });
			wrapper.setProps({ inputClass: 'test-user-class' });
			expect(wrapper.vm.inputClasses.userClass).toEqual(
				'test-user-class'
			);
		});

		it('Component should have computed.nextStep, it should check the deltaY and decide what kind of controller (mouse wheel or touchpad) used and return value ± step', () => {
			wrapper.setProps({ value: 2 });
			// For wheel
			wrapper.setData({ firstDeltaY: 100 });
			wrapper.setData({ currentDeltaY: 100 });
			expect(wrapper.vm.nextStep).toEqual(1);
			wrapper.setData({ currentDeltaY: -100 });
			expect(wrapper.vm.nextStep).toEqual(3);
			// For touchpad
			wrapper.setData({ firstDeltaY: 2 });
			wrapper.setData({ currentDeltaY: -2 });
			expect(wrapper.vm.nextStep).toEqual(1);
			wrapper.setData({ currentDeltaY: 2 });
			expect(wrapper.vm.nextStep).toEqual(3);
		});
	});

	describe('Testing components methods', () => {
		it('Component should have inputHandler method and it should check input value, and if it is number, invoke methods.makeStep', () => {
			const correct = {
				target: {
					value: '8'
				}
			};
			const wrong = {
				target: {
					value: 'adsad'
				}
			};
			wrapper.setMethods({ makeStep: jest.fn() });
			expect(typeof wrapper.vm.inputHandler).toBe('function');
			wrapper.vm.inputHandler(wrong);
			expect(wrapper.vm.makeStep).not.toHaveBeenCalled();
			wrapper.vm.inputHandler(correct);
			expect(wrapper.vm.makeStep).lastCalledWith('8');
		});

		it('Component should have buttonDownHandler method and it should invoke methods.buttonUpHandler, methods.makeStep, setTimeoutout and setInterval methods', () => {
			wrapper.setMethods({
				makeStep: jest.fn(),
				buttonUpHandler: jest.fn()
			});
			expect(wrapper.vm.timeoutId).toBeUndefined();
			expect(wrapper.vm.intervalId).toBeUndefined();
			expect(typeof wrapper.vm.buttonDownHandler).toBe('function');
			wrapper.vm.buttonDownHandler('inc');
			expect(wrapper.vm.makeStep).lastCalledWith(3);
			expect(wrapper.vm.buttonUpHandler).toHaveBeenCalledTimes(1);
			expect(setTimeout).toHaveBeenCalledTimes(1);
			expect(setInterval).toHaveBeenCalledTimes(1);
			expect(typeof wrapper.vm.timeoutId).toBe('number');
			expect(typeof wrapper.vm.intervalId).toBe('number');
			wrapper.vm.buttonDownHandler('dec');
			expect(wrapper.vm.makeStep).lastCalledWith(1);
			expect(wrapper.vm.buttonUpHandler).toHaveBeenCalledTimes(2);
			expect(setTimeout).toHaveBeenCalledTimes(2);
			expect(setInterval).toHaveBeenCalledTimes(2);
			setInterval.mockClear();
			setTimeout.mockClear();
		});

		it('buttonDownHandler method should invoke setTimeout function', () => {
			wrapper.setMethods({
				makeStep: jest.fn()
			});
			wrapper.vm.buttonDownHandler('inc');
			expect(setTimeout).toHaveBeenCalledWith(
				expect.any(Number),
				expect.any(Number)
			);
			setInterval.mockClear();
			setTimeout.mockClear();
		});

		it('buttonDownHandler method should invoke setInterval function', () => {
			wrapper.setMethods({
				makeStep: jest.fn()
			});
			wrapper.vm.buttonDownHandler('inc');
			expect(setInterval).toHaveBeenCalledWith(
				expect.any(Function),
				expect.any(Number)
			);
			expect(wrapper.vm.makeStep).toHaveBeenCalledWith(3);
			setInterval.mockClear();
			setTimeout.mockClear();
		});

		it('Component should have buttonUpHandler method and it should invoke clearTimeout and clearInterval', () => {
			wrapper.setData({ intervalId: 1, timeoutId: 2 });
			expect(typeof wrapper.vm.buttonUpHandler).toBe('function');
			wrapper.vm.buttonUpHandler();
			expect(clearInterval).lastCalledWith(1);
			expect(clearTimeout).lastCalledWith(2);
		});

		it('Component should have makeStep method and it should emmit "input event" if props.min <= value <= props.max && props.disabled === false', () => {
			expect(typeof wrapper.vm.makeStep).toBe('function');
			wrapper.vm.makeStep('-1');
			expect(wrapper.emitted('input')).toBeFalsy();
			wrapper.vm.makeStep('11');
			expect(wrapper.emitted('input')).toBeFalsy();
			wrapper.setProps({ disabled: true });
			wrapper.vm.makeStep('8');
			expect(wrapper.emitted('input')).toBeFalsy();
			wrapper.setProps({ disabled: false });
			wrapper.vm.makeStep('8');
			expect(wrapper.emitted('input')[0][0]).toBe(8);
		});

		it('makeStep method shoul round float numbers to 2 decimals', () => {
			wrapper.vm.makeStep('4.4300234');
			expect(wrapper.emitted('input')[0][0]).toBe(4.43);
		});

		it('Component should have addEventListeners method and it shoud emmit "focus" event and addEventListener for "wheel" and "keydown" events', () => {
			const event = {
				target: {
					addEventListener: jest.fn()
				}
			};
			expect(typeof wrapper.vm.addEventListeners).toBe('function');
			wrapper.vm.addEventListeners(event);
			expect(wrapper.emitted('focus')).toBeTruthy();
			expect(event.target.addEventListener).toHaveBeenCalledWith(
				'wheel',
				wrapper.vm.wheelHandler
			);
			expect(event.target.addEventListener).toHaveBeenCalledWith(
				'keydown',
				wrapper.vm.keyDownHandler
			);
		});

		it('Component should have removeEventListeners method and it shoud emmit "blur" event, reset data.deltaY and data.firstDeltaY properties, removeEventListener from "wheel" and "keydown" events', () => {
			const event = {
				target: {
					removeEventListener: jest.fn()
				}
			};
			wrapper.setData({ firstDeltaY: 1, deltaY: 3 });
			expect(typeof wrapper.vm.removeEventListeners).toBe('function');
			wrapper.vm.removeEventListeners(event);
			expect(wrapper.vm.firstDeltaY).toBeUndefined();
			expect(wrapper.vm.deltaY).toBeUndefined();
			expect(wrapper.emitted('blur')).toBeTruthy();
			expect(event.target.removeEventListener).toHaveBeenCalledWith(
				'wheel',
				wrapper.vm.wheelHandler
			);
			expect(event.target.removeEventListener).toHaveBeenCalledWith(
				'keydown',
				wrapper.vm.keyDownHandler
			);
		});

		it('Component should have wheelHandler method and it should set data.deltaY, data.firstDeltaY and invoke methods.makeStep', () => {
			const firstEvent = {
				deltaY: 1,
				preventDefault: jest.fn()
			};
			const secondEvent = {
				deltaY: 3,
				preventDefault: jest.fn()
			};
			wrapper.setMethods({
				makeStep: jest.fn()
			});
			expect(typeof wrapper.vm.wheelHandler).toBe('function');
			wrapper.vm.wheelHandler(firstEvent);
			expect(wrapper.vm.firstDeltaY).toEqual(1);
			expect(wrapper.vm.currentDeltaY).toEqual(1);
			expect(wrapper.vm.makeStep).toHaveBeenCalledTimes(1);
			expect(firstEvent.preventDefault).toHaveBeenCalled();
			wrapper.vm.wheelHandler(secondEvent);
			expect(wrapper.vm.firstDeltaY).toEqual(1);
			expect(wrapper.vm.currentDeltaY).toEqual(3);
			expect(wrapper.vm.makeStep).toHaveBeenCalledTimes(2);
			expect(secondEvent.preventDefault).toHaveBeenCalled();
		});

		it("wheelHandler method shouldn't invoke methods.makeStep if props.readonly === true", () => {
			const firstEvent = {
				deltaY: 1,
				preventDefault: jest.fn()
			};
			wrapper.setProps({ readonly: true });
			wrapper.setMethods({
				makeStep: jest.fn()
			});
			wrapper.vm.wheelHandler(firstEvent);
			expect(wrapper.vm.makeStep).not.toHaveBeenCalled();
		});

		it('Component should have keyDownHandler method and it should invoke makeStep and decrease value, if user press arrow down key and decrease if arrow up', () => {
			const arrowUp = { keyCode: 38 };
			const arrowDown = { keyCode: 40 };
			const enter = { keyCode: 13 };
			wrapper.setMethods({ makeStep: jest.fn() });
			expect(typeof wrapper.vm.keyDownHandler).toBe('function');
			wrapper.vm.keyDownHandler(arrowUp);
			expect(wrapper.vm.makeStep).lastCalledWith(3);
			wrapper.vm.keyDownHandler(arrowDown);
			expect(wrapper.vm.makeStep).lastCalledWith(1);
			expect(wrapper.vm.keyDownHandler(enter)).toBeFalsy();
		});

		it("keyDownHandler method shouldn't invoke methods.makeStep if props.readonly === true", () => {
			const arrowUp = { keyCode: 38 };
			const arrowDown = { keyCode: 40 };
			wrapper.setMethods({ makeStep: jest.fn() });
			wrapper.setProps({ readonly: true });
			wrapper.vm.keyDownHandler(arrowUp);
			expect(wrapper.vm.makeStep).not.toHaveBeenCalled();
			wrapper.vm.keyDownHandler(arrowDown);
			expect(wrapper.vm.makeStep).not.toHaveBeenCalled();
		});
	});

	describe('Testing correct html rendering of the component', () => {
		describe('Testing html render of div.vue-number-input', () => {
			it('Should render div.vue-number-input', () => {
				expect(wrapper.contains('div.vue-number-input')).toBeTruthy();
			});

			it('div.vue-number-input should add the modificator depending on props.controlsPosition', () => {
				expect(
					wrapper.contains('div.vue-number-input_on-edge')
				).toBeTruthy();
				wrapper.setProps({ controlsPosition: 'left' });
				expect(
					wrapper.contains('div.vue-number-input_on-left')
				).toBeTruthy();
				wrapper.setProps({ controlsPosition: 'right' });
				expect(
					wrapper.contains('div.vue-number-input_on-right')
				).toBeTruthy();
			});
		});

		describe('Testing html render of div.vue-number-input__btn-dec', () => {
			it('Should render div.vue-number-input__btn-dec', () => {
				expect(
					wrapper.contains('div.vue-number-input__btn-dec')
				).toBeTruthy();
			});

			it('"aria-disabled" attribute should be setting up depending on props.disabled and props.min', () => {
				expect(
					wrapper
						.find('div.vue-number-input__btn-dec')
						.attributes('aria-disabled')
				).toBe('false');
				wrapper.setProps({ value: 0 });
				expect(
					wrapper
						.find('div.vue-number-input__btn-dec')
						.attributes('aria-disabled')
				).toBe('true');
				wrapper.setProps({ value: 2 });
				wrapper.setProps({ disabled: true });
				expect(
					wrapper
						.find('div.vue-number-input__btn-dec')
						.attributes('aria-disabled')
				).toBe('true');
			});

			it('"vue-number-input__btn-dec_inactive" class should be added if props.disabled === true || props.value === props.min', () => {
				wrapper.setProps({ value: 0 });
				expect(
					wrapper.contains('div.vue-number-input__btn-dec_inactive')
				).toBeTruthy();
				wrapper.setProps({ value: 2 });
				wrapper.setProps({ disabled: true });
				expect(
					wrapper.contains('div.vue-number-input__btn-dec_inactive')
				).toBeTruthy();
			});

			it('Element should have a custom class if user set props.buttonDecClass', () => {
				wrapper.setProps({ buttonDecClass: 'test-custom-class' });
				expect(
					wrapper.contains(
						'div.vue-number-input__btn-dec.test-custom-class'
					)
				).toBeTruthy();
			});

			it('Should have default elements in slots', () => {
				expect(
					wrapper.contains('div.vue-number-input__btn-dec .btn-stub')
				).toBeTruthy();
			});

			it('Should render custom element in slot if user provide it', () => {
				const customWrapper = shallowMount(VueNumberInput, {
					slots: {
						'button-decrease':
							'<div class="custom-decrease-button"></div>'
					}
				});
				expect(
					customWrapper.contains('.custom-decrease-button')
				).toBeTruthy();
			});
		});

		describe('Testing html render of div.vue-number-input__btn-inc', () => {
			it('Should render div.vue-number-input__btn-inc', () => {
				expect(
					wrapper.contains('div.vue-number-input__btn-inc')
				).toBeTruthy();
			});

			it('"aria-disabled" attribute should be setting up depending on props.disabled and props.max', () => {
				expect(
					wrapper
						.find('div.vue-number-input__btn-inc')
						.attributes('aria-disabled')
				).toBe('false');
				wrapper.setProps({ value: 10 });
				expect(
					wrapper
						.find('div.vue-number-input__btn-inc')
						.attributes('aria-disabled')
				).toBe('true');
				wrapper.setProps({ value: 2 });
				wrapper.setProps({ disabled: true });
				expect(
					wrapper
						.find('div.vue-number-input__btn-inc')
						.attributes('aria-disabled')
				).toBe('true');
			});

			it('"vue-number-input__btn-inc_inactive" class should be added if props.disabled === true || props.value === props.max', () => {
				wrapper.setProps({ value: 10 });
				expect(
					wrapper.contains('div.vue-number-input__btn-inc_inactive')
				).toBeTruthy();
				wrapper.setProps({ value: 2 });
				wrapper.setProps({ disabled: true });
				expect(
					wrapper.contains('div.vue-number-input__btn-inc_inactive')
				).toBeTruthy();
			});

			it('Element should have a custom class if user set props.buttonIncClass', () => {
				wrapper.setProps({ buttonIncClass: 'test-custom-class' });
				expect(
					wrapper.contains(
						'div.vue-number-input__btn-inc.test-custom-class'
					)
				).toBeTruthy();
			});

			it('Should have default elements in slots', () => {
				expect(
					wrapper.contains('div.vue-number-input__btn-inc .btn-stub')
				).toBeTruthy();
			});

			it('Should render custom element in slot if user provide it', () => {
				const customWrapper = shallowMount(VueNumberInput, {
					slots: {
						'button-increase':
							'<div class="custom-increase-button"></div>'
					}
				});
				expect(
					customWrapper.contains('.custom-increase-button')
				).toBeTruthy();
			});
		});

		describe('Testing html render of div.vue-number-input__input', () => {
			it('Should render input.vue-number-input__input', () => {
				expect(
					wrapper.contains('input.vue-number-input__input')
				).toBeTruthy();
			});

			it('"disabled" attribute should be setting up depending on props.disabled', () => {
				expect(wrapper.contains('input:disabled')).toBeFalsy();
				wrapper.setProps({ disabled: true });
				expect(wrapper.contains('input:disabled')).toBeTruthy();
			});

			it('"readonly" attribute should be setting up depending on props.readonly', () => {
				expect(
					wrapper.contains('input[readonly="readonly"]')
				).toBeFalsy();
				wrapper.setProps({ readonly: true });
				expect(
					wrapper.contains('input[readonly="readonly"]')
				).toBeTruthy();
			});

			it('"autofocus" attribute should be setting up depending on props.autofocus', () => {
				expect(
					wrapper
						.find('input.vue-number-input__input')
						.attributes('autofocus')
				).toBeFalsy();
				wrapper.setProps({ autofocus: true });
				expect(
					wrapper
						.find('input.vue-number-input__input')
						.attributes('autofocus')
				).toBeTruthy();
			});

			it('"aria-valuenow" attribute should be setting up depending on props.value', () => {
				expect(
					wrapper
						.find('input.vue-number-input__input')
						.attributes('aria-valuenow')
				).toEqual('2');
				wrapper.setProps({ value: 3 });
				expect(
					wrapper
						.find('input.vue-number-input__input')
						.attributes('aria-valuenow')
				).toEqual('3');
			});

			it('"aria-valuemin" attribute should be setting up depending on props.min', () => {
				expect(
					wrapper
						.find('input.vue-number-input__input')
						.attributes('aria-valuemin')
				).toEqual('0');
				wrapper.setProps({ min: 1 });
				expect(
					wrapper
						.find('input.vue-number-input__input')
						.attributes('aria-valuemin')
				).toEqual('1');
			});

			it('"aria-valuemax" attribute should be setting up depending on props.max', () => {
				expect(
					wrapper
						.find('input.vue-number-input__input')
						.attributes('aria-valuemax')
				).toEqual('10');
				wrapper.setProps({ max: 11 });
				expect(
					wrapper
						.find('input.vue-number-input__input')
						.attributes('aria-valuemax')
				).toEqual('11');
			});

			it('"vue-number-input__input_inactive" class should be added if props.disabled === true', () => {
				expect(
					wrapper.contains('input.vue-number-input__input_inactive')
				).toBeFalsy();
				wrapper.setProps({ disabled: true });
				expect(
					wrapper.contains('input.vue-number-input__input_inactive')
				).toBeTruthy();
			});

			it('Element should have a custom class if user set props.inputClass', () => {
				wrapper.setProps({ inputClass: 'custom-input-class' });
				expect(
					wrapper.contains('input.custom-input-class')
				).toBeTruthy();
			});
		});
	});

	describe('Testing events', () => {
		describe('Buttons click and keypress events', () => {
			it('Click on .vue-number-input__btn-inc should invoke methods.buttonDownHandler with "inc" argument', () => {
				wrapper.setMethods({ buttonDownHandler: jest.fn() });
				wrapper
					.find('.vue-number-input__btn-inc')
					.trigger('mousedown', { buttons: 1, button: 0 });
				expect(wrapper.vm.buttonDownHandler).lastCalledWith('inc');
			});

			it('Click on .vue-number-input__btn-inc should invoke methods.buttonUpHandler', () => {
				wrapper.setMethods({ buttonUpHandler: jest.fn() });
				wrapper
					.find('.vue-number-input__btn-inc')
					.trigger('mouseup', { buttons: 1, button: 0 });
				expect(wrapper.vm.buttonUpHandler).toHaveBeenCalled();
			});

			it('Press enter on .vue-number-input__btn-inc should invoke methods.buttonDownHandler', () => {
				wrapper.setMethods({ buttonDownHandler: jest.fn() });
				wrapper
					.find('.vue-number-input__btn-inc')
					.trigger('keydown', { key: 'Enter', keyCode: 13 });
				expect(wrapper.vm.buttonDownHandler).lastCalledWith('inc');
			});

			it('Touchstart event on .vue-number-input__btn-inc should invoke methods.buttonDownHandler', () => {
				wrapper.setMethods({ buttonDownHandler: jest.fn() });
				wrapper
					.find('.vue-number-input__btn-inc')
					.trigger('touchstart');
				expect(wrapper.vm.buttonDownHandler).toHaveBeenCalledWith(
					'inc'
				);
			});

			it('Touchend event on .vue-number-input__btn-inc should invoke methods.buttonUpHandler', () => {
				wrapper.setMethods({ buttonUpHandler: jest.fn() });
				wrapper.find('.vue-number-input__btn-inc').trigger('touchend');
				expect(wrapper.vm.buttonUpHandler).toHaveBeenCalled();
			});

			it('mouseleave event on .vue-number-input__btn-inc should invoke methods.buttonUpHandler', () => {
				wrapper.setMethods({ buttonUpHandler: jest.fn() });
				wrapper
					.find('.vue-number-input__btn-inc')
					.trigger('mouseleave');
				expect(wrapper.vm.buttonUpHandler).toHaveBeenCalled();
			});

			it('Click on .vue-number-input__btn-dec should invoke methods.buttonDownHandler "dec" argument', () => {
				wrapper.setMethods({ buttonDownHandler: jest.fn() });
				wrapper
					.find('.vue-number-input__btn-dec')
					.trigger('mousedown', { buttons: 1, button: 0 });
				expect(wrapper.vm.buttonDownHandler).lastCalledWith('dec');
			});

			it('Click on .vue-number-input__btn-dec should invoke methods.buttonUpHandler', () => {
				wrapper.setMethods({ buttonUpHandler: jest.fn() });
				wrapper
					.find('.vue-number-input__btn-dec')
					.trigger('mouseup', { buttons: 1, button: 0 });
				expect(wrapper.vm.buttonUpHandler).toHaveBeenCalled();
			});

			it('Press enter on .vue-number-input__btn-dec should invoke methods.buttonDownHandler', () => {
				wrapper.setMethods({ buttonDownHandler: jest.fn() });
				wrapper
					.find('.vue-number-input__btn-dec')
					.trigger('keydown', { key: 'Enter', keyCode: 13 });
				expect(wrapper.vm.buttonDownHandler).toHaveBeenCalledWith(
					'dec'
				);
			});

			it('Touchstart event on .vue-number-input__btn-dec should invoke methods.buttonDownHandler', () => {
				wrapper.setMethods({ buttonDownHandler: jest.fn() });
				wrapper
					.find('.vue-number-input__btn-dec')
					.trigger('touchstart');
				expect(wrapper.vm.buttonDownHandler).toHaveBeenCalledWith(
					'dec'
				);
			});

			it('Touchend event on .vue-number-input__btn-dec should invoke methods.buttonUpHandler', () => {
				wrapper.setMethods({ buttonUpHandler: jest.fn() });
				wrapper.find('.vue-number-input__btn-dec').trigger('touchend');
				expect(wrapper.vm.buttonUpHandler).toHaveBeenCalled();
			});

			it('mouseleave event on .vue-number-input__btn-dec should invoke methods.buttonUpHandler', () => {
				wrapper.setMethods({ buttonUpHandler: jest.fn() });
				wrapper
					.find('.vue-number-input__btn-dec')
					.trigger('mouseleave');
				expect(wrapper.vm.buttonUpHandler).toHaveBeenCalled();
			});
		});
	});
});
