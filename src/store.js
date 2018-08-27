import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
    getUser: (state) => { return state.currentUser; }
  },
  state: {
    currentUser : null,
    loading: false
  },
  mutations: {
    setCurrentUser: state => { state.currentUser = Firebase.auth().currentUser; },
    setLoading: (state, data) => { state.loading = data; }
  },
  actions: {
    setUser: context => { context.commit('setCurrentUser'); }
  }
})
