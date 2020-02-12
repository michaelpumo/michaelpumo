<template>
  <Layout
    :title="page.title"
    :description="page.description"
    :colophon="page.colophon">
    <template v-for="(slice, index) in page.body">
      <SliceClients
        v-if="slice.type === 'clients'"
        :key="index"
        :slice="slice"
      />
      <SliceImage
        v-if="slice.type === 'image'"
        :key="index"
        :slice="slice"
      />
      <SliceText
        v-if="slice.type === 'text'"
        :key="index"
        :slice="slice"
      />
    </template>
  </Layout>
</template>

<page-query>
  query Page {
    prismic {
      page(uid: "home", lang: "en-gb") {
        meta_title
        meta_description
        meta_keywords
        meta_image
        title
        description
        colophon
        body {
          ... on prismic_PageBodyClients {
            type
            fields {
              name
              role
              logo
            }
          }
          ... on prismic_PageBodyImage {
            type
            primary {
              id
              image
            }
          }
          ... on prismic_PageBodyText {
            type
            primary {
              id
              content
            }
          }
        }
      }
    }
  }
</page-query>

<script>
import SliceClients from '@/components/SliceClients/SliceClients.vue'
import SliceImage from '@/components/SliceImage/SliceImage.vue'
import SliceText from '@/components/SliceText/SliceText.vue'

export default {
  components: {
    SliceClients,
    SliceImage,
    SliceText
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
        }
      ]
    })
  },
  computed: {
    page() {
      return this.$page.prismic.page
    }
  }
}
</script>
