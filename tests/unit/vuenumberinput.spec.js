import { shallowMount } from '@vue/test-utils';
import VueNumberInput from '@/components/VueNumberInput.vue';

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
				'vue-number-input__input_disabled'
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
			expect(wrapper.vm.nextStep).toEqual(3);
			// For touchpad
			wrapper.setData({ firstDeltaY: 2 });
			expect(wrapper.vm.nextStep).toEqual(1);
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

		// it('Should render div.vue-number-input__btn-inc and should add the modificator depending on props.disabled, props.readonly and props.buttonDecClass', () => {
		// 	expect(
		// 		wrapper.contains('div.vue-number-input__input')
		// 	).toBeTruthy();
		// 	expect(
		// 		wrapper
		// 			.find('div.div.vue-number-input__input')
		// 			.attributes('autofocus')
		// 	).toBe(undefined);
		// 	wrapper.setProps({ autofocus: true });
		// 	expect(
		// 		wrapper
		// 			.find('div.div.vue-number-input__input')
		// 			.attributes('autofocus')
		// 	).toBe('autofocus');
		// });
	});
});
