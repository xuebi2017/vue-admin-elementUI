import Vue from "vue";
import Vuex from "vuex";
import { constantRoutes, asyncRoutes} from "./router";
import { resolve } from "any-promise";
import { async } from "q";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    routes: []
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo
    }
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
    generateRoutes(state, payload) {
      state.routes = [...constantRoutes, ...payload]
    }
  },
  actions: {
    generateRoutes({commit}, roles) {
      return new Promise(resolve => {
        commit('generateRoutes', asyncRoutes)
        resolve(asyncRoutes)
      })
    }
  }
});
