<template>
  <component
    :is="type"
    v-html="$prismic.dom.RichText.asHtml(html, linkResolver)"
  />
</template>

<script>
import { linkResolver } from '@/utils/prismic.js'

export default {
  name: 'RichText',
  className: 'RichText',
  props: {
    type: {
      type: String,
      default: 'div',
    },
    html: {
      type: Array,
      required: true,
    },
  },
  methods: {
    linkResolver,
  },
}
</script>
