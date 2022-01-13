export const actions = {
  async nuxtServerInit({ dispatch }, { $prismic }) {
    try {
      const globals = (await $prismic.api.getSingle('global')).data
      await dispatch('global/setData', globals, { root: true })
    } catch (error) {
      console.log(error) /* eslint-disable-line */
    }
  },
}
