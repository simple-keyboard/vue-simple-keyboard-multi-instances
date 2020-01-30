import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// activate bootstrap js features
import $ from 'jquery';
try {
	window.$ = window.jQuery = require('jquery');
} catch (e) {
	console.log('jQuery error');
}
const bootstrap = require('bootstrap');

// touch. hammer
var VueTouch = require('vue-touch');
VueTouch.config.tap = {
	// time: Vue.prototype.$main_data.touch.time,
	// threshold: Vue.prototype.$main_data.touch.threshold
};
Vue.use(VueTouch, { name: 'v-touch' });

// animate.css
import 'animate.css/animate.min.css';

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app');
