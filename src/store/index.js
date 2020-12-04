import Vue from 'vue'
import Vuex from 'vuex'
import editor from "./editor";
import modal from "./modal"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    editor,
    modal
  }
})
