<template>
  <AppLayout
    :title="article.title"
    :description="article.description"
    :colophon="article.colophon">
    <article :class="$options.className">
      <PrismicRichtext
        v-if="article.description"
        :html="article.description"
        :class="`${$options.className}__description`" />
    </article>
  </AppLayout>
</template>

<page-query>
query Article($uid: String!) {
  Prismic {
    article(uid: $uid, lang: "en-gb") {
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
import AppLayout from '@/layouts/AppLayout.vue'
import PrismicRichtext from '@/components/PrismicRichtext/PrismicRichtext.vue'

export default {
  name: 'Article',
  className: 'Article',
  metaInfo() {
    return ({
      ...meta(this.article)
    })
  },
  components: {
    AppLayout,
    PrismicRichtext
  },
  computed: {
    article() {
      console.log(this)
      return this.$page.Prismic.article
    }
  }
}
</script>

<style lang="scss" scoped>
.Article {
}
</style>
