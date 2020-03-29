import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    session:''
  },
  mutations: {
    saveSession(state,newSession){
      state.session=newSession
  }
  },
  actions: {
    saveSession(context,newSession){
      context.commit("saveSession", newSession);
    }
  },
  modules: {
  }
})
