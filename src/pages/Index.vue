<template>
  <Layout
    :title="page.title"
    :description="page.description"
    :colophon="page.colophon">
    <pre>
      {{ page }}
    </pre>
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
export default {
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

<style>
</style>
