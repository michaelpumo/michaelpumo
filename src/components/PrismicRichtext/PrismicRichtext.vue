<template>
  <component
    :is="type"
    v-html="PrismicDOM.RichText.asHtml(html, linkResolver)"
  />
</template>

<script>
import PrismicDOM from 'prismic-dom'
import { linkResolver } from '@/utils/helpers'

export default {
  name: 'PrismicRichtext',
  props: {
    type: {
      type: String,
      default: 'div'
    },
    html: {
      type: Array,
      required: true
    }
  },
  data() {
    return ({
      PrismicDOM
    })
  },
  methods: {
    linkResolver
  }
}
</script>
