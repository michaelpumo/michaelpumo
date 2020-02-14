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

  head.script.push({
    src: 'https://polyfill.io/v3/polyfill.min.js?features=default%2CIntersectionObserver%2CPromise%2Cfetch%2CObject.assign%2CObject.entries%2CObject.keys%2CObject.values'
  })
}
