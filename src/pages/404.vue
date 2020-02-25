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
    prismic {
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
      title: this.page.meta_title,
      meta: [
        {
          name: 'description',
          content: this.page.meta_description
        },
        {
          name: 'keywords',
          content: this.page.meta_keywords
        },
        {
          name: 'author',
          content: this.page.meta_author
        },
        {
          property: 'og:title',
          content: this.page.meta_title
        },
        {
          property: 'og:description',
          content: this.page.meta_description
        },
        {
          property: 'og:image',
          content: (this.page.meta_image && Object.prototype.hasOwnProperty.call(this.page.meta_image, 'url')) ? this.page.meta_image.url : null
        },
        {
          property: 'twitter:title',
          content: this.page.meta_title
        },
        {
          property: 'twitter:description',
          content: this.page.meta_description
        },
        {
          property: 'twitter:image:src',
          content: (this.page.meta_image && Object.prototype.hasOwnProperty.call(this.page.meta_image, 'url')) ? this.page.meta_image.url : null
        }
      ]
    })
  },
  computed: {
    page() {
      return { ...this.$page.prismic.page }
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
