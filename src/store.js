import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		is_electron: !!process.env.IS_ELECTRON,
		is_development: process.env.NODE_ENV !== 'production'
	},
	mutations: {},
	actions: {}
});
