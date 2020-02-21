const navigation = {
  namespaced: true,
  state: {
    active: false
  },
  getters: {
    active: (state) => state.active
  },
  mutations: {
    SET_ACTIVE(state, payload) {
      state.active = payload
    }
  },
  actions: {
    setActive(context, payload) {
      context.commit('SET_ACTIVE', payload)
    }
  }
}

export default navigation
