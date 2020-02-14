import VueSVGIcon from 'vue-svgicon'
import VuexStore from '@/store'
import DefaultLayout from '@/layouts/Default.vue'
import '@/assets/scss/app.scss'

export default function(Vue, { router, head, isClient, appOptions }) {
  Vue.component('Layout', DefaultLayout)

  Vue.use(VueSVGIcon, {
    tagName: 'SvgIcon'
  })

  appOptions.store = VuexStore
}
