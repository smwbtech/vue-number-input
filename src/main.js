import Vue from 'vue';
import App from './App.vue';
import VueAxe from 'vue-axe';

Vue.config.productionTip = false;

Vue.use(VueAxe, {
	config: {
		rules: [
			{ id: 'heading-order', enabled: true },
			{ id: 'label-title-only', enabled: true }
		]
	}
});

new Vue({
	render: h => h(App)
}).$mount('#app');
