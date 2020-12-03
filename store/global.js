export const state = () => ({
  data: {},
})

export const getters = {
  data(state) {
    return state.data
  },
}

export const mutations = {
  setData(state, payload) {
    state.data = payload
  },
}

export const actions = {
  setData(context, payload) {
    context.commit('setData', payload)
  },
}
