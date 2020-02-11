<template>
  <Layout>
    <pre>
      {{ fields }}
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
      }
    }
  }
</page-query>

<script>
export default {
  metaInfo() {
    return ({
      title: this.fields.meta_title,
      meta: [
        {
          name: 'description',
          content: this.fields.meta_description
        },
        {
          name: 'keywords',
          content: this.fields.meta_keywords
        },
        // {
        //   property: 'twitter:card',
        //   content: 'summary'
        // },
        // {
        //   property: 'twitter:site',
        //   content: this.settings.company_twitter_handle ? `@${this.settings.company_twitter_handle}` : ''
        // },
        // {
        //   property: 'twitter:creator',
        //   content: this.settings.company_twitter_handle ? `@${this.settings.company_twitter_handle}` : ''
        // },
        {
          property: 'og:title',
          content: this.fields.meta_title
        },
        {
          property: 'og:description',
          content: this.fields.meta_description
        },
        {
          property: 'og:image',
          content: (this.fields.meta_image && Object.prototype.hasOwnProperty.call(this.fields.meta_image, 'url')) ? this.fields.meta_image.url : null
        }
      ]
    })
  },
  computed: {
    fields() {
      return this.$page.prismic.page
    }
  }
}
</script>

<style>
</style>
