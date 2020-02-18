const app = {
  namespaced: true,
  state: {
    ready: false,
    locked: false,
    theme: 'red',
    mode: 'dark',
    cursor: 'default'
  },
  getters: {
    ready: (state) => state.ready,
    locked: (state) => state.locked,
    theme: (state) => state.theme,
    mode: (state) => state.mode,
    cursor: (state) => state.cursor
  },
  mutations: {
    SET_READY(state, payload) {
      state.ready = payload
    },
    SET_LOCKED(state, payload) {
      state.locked = payload
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
    setReady(context, payload) {
      context.commit('SET_READY', payload)
    },
    setLocked(context, payload) {
      context.commit('SET_LOCKED', payload)
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
