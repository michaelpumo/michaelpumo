export const state = () => ({
  locked: false,
  theme: 'red',
  mode: 'dark',
  cursor: 'default',
})

export const getters = {
  locked: (state) => state.locked,
  theme: (state) => state.theme,
  mode: (state) => state.mode,
  cursor: (state) => state.cursor,
}

export const mutations = {
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
  },
}

export const actions = {
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
  },
}
