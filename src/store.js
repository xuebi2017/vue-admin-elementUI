import Vue from "vue";
import Vuex from "vuex";
import { constantRoutes } from "./router";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    routes: []
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
    generateRoutes(state, payload) {
      state.routes = payload
    }
  },
  actions: {
    generateRoutes({commit}, roles) {
      console.log('constantRoutes',constantRoutes)
      commit('generateRoutes', constantRoutes)
    }
  }
});
