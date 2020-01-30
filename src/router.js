import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

function load(component) {
	return require(`./views/${component}.vue`).default;
}

export default new Router({
	routes: [
		{ path: '/', redirect: { name: 'home' } },
		{ path: '/home', name: 'home', component: load('HomeScreen') },
		{ path: '/signup', name: 'signup', component: load('SignUp') }
	]
});
