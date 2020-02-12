import Vue from 'vue'
import DefaultLayout from '@/layouts/Default.vue'
import VueSVGIcon from 'vue-svgicon'
import '@/assets/scss/app.scss'

Vue.use(VueSVGIcon, {
  tagName: 'SvgIcon'
})

export default function(Vue, { router, head, isClient }) {
  Vue.component('Layout', DefaultLayout)
}
