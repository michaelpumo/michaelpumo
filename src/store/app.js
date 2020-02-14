const app = {
  namespaced: true,
  state: {
    lock: false,
    theme: 'red',
    mode: 'dark',
    cursor: 'default'
  },
  getters: {
    lock: (state) => state.lock,
    theme: (state) => state.theme,
    mode: (state) => state.mode,
    cursor: (state) => state.cursor
  },
  mutations: {
    SET_LOCK(state, payload) {
      state.lock = payload
    },
    SET_THEME(state, payload) {
      state.theme = payload
    },
    SET_MODE(state, payload) {
      state.mode = payload
    },
    SET_CURSOR(state, payload) {
      state.cursor = payload
    }
  },
  actions: {
    setLock(context, payload) {
      context.commit('SET_LOCK', payload)
    },
    setTheme(context, payload) {
      context.commit('SET_THEME', payload)
    },
    setMode(context, payload) {
      context.commit('SET_MODE', payload)
    },
    setCursor(context, payload) {
      context.commit('SET_CURSOR', payload)
    }
  }
}

export default app
