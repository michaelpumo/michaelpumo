<template>
  <component
    :is="element"
    v-if="valid"
    :to="local ? path : null"
    :href="path"
    :target="target"
    :rel="rel"
  >
    <slot />
  </component>
  <div v-else>
    <slot />
  </div>
</template>

<script>
import PrismicDOM from 'prismic-dom'
import { linkResolver } from '@/utils/helpers'

export default {
  name: 'LinkObject',
  class: 'LinkObject',
  props: {
    link: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    valid() {
      return Object.prototype.hasOwnProperty.call(this.link, '_linkType')
    },
    local() {
      return this.link._linkType === 'Link.document'
    },
    element() {
      return this.local ? 'router-link' : 'a'
    },
    path() {
      // this.link needs link.linkType to use PrismicDOM.Link.url
      if (this.local && !Object.prototype.hasOwnProperty.call(this.link, 'linkType')) {
        return '/'
      }

      return this.local ? PrismicDOM.Link.url(this.link, this.linkResolver) : this.link.url
    },
    target() {
      return this.local ? null : '_blank'
    },
    rel() {
      return this.local ? null : 'noopener'
    }
  },
  methods: {
    linkResolver
  }
}
</script>
