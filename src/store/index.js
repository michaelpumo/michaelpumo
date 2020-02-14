import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import navigation from './navigation'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    navigation
  }
})

export default store
