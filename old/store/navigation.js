export const state = () => ({
  active: false,
})

export const getters = {
  active: (state) => state.active,
}

export const mutations = {
  SET_ACTIVE(state, payload) {
    state.active = payload
  },
}

export const actions = {
  setActive(context, payload) {
    context.commit('SET_ACTIVE', payload)
  },
}
