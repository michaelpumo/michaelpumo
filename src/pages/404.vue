<template>
  <ErrorLayout>
    <div :class="`${$options.className}__message`">
      <h3 v-if="page.title">
        {{ page.title }}
      </h3>

      <PrismicRichtext
        v-if="page.description && page.description.length"
        :html="page.description" />

      <p>
        <ImageLazy
          :class="`${$options.className}__image`"
          src="/icons/icon-facepalm.png"
          width="60"
          height="60"
          alt="Page not found" />
      </p>

      <ButtonInput
        label="Get me out of here!"
        :route="{ path: '/' }" />
    </div>
  </ErrorLayout>
</template>

<page-query>
query Page {
  Prismic {
    page(uid: "404", lang: "en-gb") {
      meta_title
      meta_description
      meta_keywords
      meta_author
      meta_image
      title
      description
    }
  }
}
</page-query>

<script>
import { meta } from '@/utils/helpers'
import ErrorLayout from '@/layouts/ErrorLayout.vue'
import ButtonInput from '@/components/ButtonInput/ButtonInput.vue'
import ImageLazy from '@/components/ImageLazy/ImageLazy'
import PrismicRichtext from '@/components/PrismicRichtext/PrismicRichtext'

export default {
  name: 'Page404',
  className: 'Page404',
  components: {
    ErrorLayout,
    ButtonInput,
    ImageLazy,
    PrismicRichtext
  },
  metaInfo() {
    return ({
      ...meta(this.page)
    })
  },
  computed: {
    page() {
      return { ...this.$page.Prismic.page }
    }
  }
}
</script>

<style lang="scss" scoped>
.Page404 {
  $root: &;

  &__message {
    width: 100%;
    max-width: 300px;
    text-align: center;
  }
}
</style>
