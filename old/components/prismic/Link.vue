<template>
  <component
    :is="element"
    :to="local ? path : null"
    :href="path"
    :target="target"
    :rel="rel"
  >
    <slot />
  </component>
</template>

<script>
import PrismicDOM from 'prismic-dom'
import { linkResolver } from '@/utils/helpers.js'

export default {
  name: 'Link',
  class: 'Link',
  props: {
    link: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    valid() {
      return Boolean(this.link.link_type)
    },
    local() {
      return this.link.link_type === 'Document'
    },
    element() {
      if (!this.valid) {
        return 'span'
      }

      return this.local ? 'NuxtLink' : 'a'
    },
    path() {
      return this.local
        ? PrismicDOM.Link.url(this.link, this.linkResolver)
        : this.link.url
    },
    target() {
      return this.local ? null : '_blank'
    },
    rel() {
      return this.local ? null : 'noopener'
    },
  },
  methods: {
    linkResolver,
  },
}
</script>
