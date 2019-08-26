import { shallowMount } from '@vue/test-utils';
import VueNumberInputButtton from '@/components/VueNumberInputButton.vue';

describe('Tests for VueNumberInput.vue component', () => {
	let wrapper = shallowMount(VueNumberInputButtton, {
		propsData: {
			type: 'inc'
		}
	});

	it('Component should exists and should be instance of Vue class', () => {
		expect(wrapper.exists()).toBeTruthy();
		expect(wrapper.isVueInstance()).toBeTruthy();
	});

	describe('Testing "data" and "computed" properties of component', () => {
		expect(wrapper.vm.content).toBe('+');
		wrapper.setProps({ type: 'dec' });
		expect(wrapper.vm.content).toBe('–');
	});
});
