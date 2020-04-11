import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    session:''
  },
  mutations: {
    saveSession(state,newSession){
      console.log("mutations");
      state.session=newSession
  }
  },
  actions: {
    saveSession(context,newSession){
      console.log("action");
      context.commit("saveSession", newSession);
    }
  },
  modules: {
  }
})
