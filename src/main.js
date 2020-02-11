import '@/assets/scss/app.scss'
import DefaultLayout from '~/layouts/Default.vue'

export default function(Vue, { router, head, isClient }) {
  Vue.component('Layout', DefaultLayout)
}
