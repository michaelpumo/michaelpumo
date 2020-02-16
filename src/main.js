import Vuelidate from 'vuelidate'
import VueSVGIcon from 'vue-svgicon'
import PortalVue from 'portal-vue'
import VuexStore from '@/store'
import DefaultLayout from '@/layouts/Default.vue'
import '@/assets/scss/app.scss'

export default function(Vue, { router, head, isClient, appOptions }) {
  Vue.component('Layout', DefaultLayout)

  Vue.use(PortalVue)
  Vue.use(Vuelidate)
  Vue.use(VueSVGIcon, {
    tagName: 'SvgIcon'
  })

  appOptions.store = VuexStore

  // Polyfill.io service, should we need it.
  // head.script.push({
  //   src: 'https://polyfill.io/v3/polyfill.min.js?features=default'
  // })
}
