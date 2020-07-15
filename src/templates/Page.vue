<template>
  <article :class="$options.className">
    <PrismicRichtext
      v-if="page.description"
      :html="page.description"
      :class="`${$options.className}__description`" />
  </article>
</template>

<page-query>
query Page($uid: String!) {
  Prismic {
    page(uid: $uid, lang: "en-gb") {
      meta_title
      meta_description
      meta_keywords
      meta_author
      meta_image
      title
      description
      _meta {
        uid
      }
    }
  }
}
</page-query>

<script>
import { meta } from '@/utils/helpers.js'
import PrismicRichtext from '@/components/PrismicRichtext/PrismicRichtext.vue'

export default {
  name: 'Page',
  className: 'Page',
  metaInfo() {
    return ({
      ...meta(this.page)
    })
  },
  components: {
    PrismicRichtext
  },
  computed: {
    page() {
      return this.$page.Prismic.page
    }
  }
}
</script>

<style lang="scss" scoped>
.Page {
}
</style>
