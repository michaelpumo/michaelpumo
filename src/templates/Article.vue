<template>
  <AppLayout
    :title="article.title"
    :description="article.description"
    :colophon="article.colophon">
    <SliceZone
      :content="article.body" />
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
      colophon
      body {
        ... on Prismic_ArticleBodyClients {
          type
          primary {
            id
          }
          fields {
            name
            role
            logo
          }
        }
        ... on Prismic_ArticleBodyContact {
          type
          primary {
            id
            content
          }
        }
        ... on Prismic_ArticleBodyImage {
          type
          primary {
            id
            image
          }
        }
        ... on Prismic_ArticleBodyProjects {
          type
          primary {
            id
            content
          }
          fields {
            image
            name
            role
            link {
              _linkType
              ... on Prismic__ExternalLink {
                _linkType
                url
              }
              ... on Prismic__Document {
                _meta {
                  uid
                  type
                }
              }
              ... on Prismic__ImageLink {
                _linkType
                url
              }
              ... on Prismic__FileLink {
                _linkType
                url
              }
            }
          }
        }
        ... on Prismic_ArticleBodyQuotes {
          type
          primary {
            id
          }
          fields {
            quote
            name
            author
          }
        }
        ... on Prismic_ArticleBodyText {
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
import { meta } from '@/utils/helpers.js'
import AppLayout from '@/layouts/AppLayout.vue'
import SliceZone from '@/components/SliceZone/SliceZone.vue'

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
    SliceZone
  },
  computed: {
    article() {
      return this.$page.Prismic.article
    }
  }
}
</script>

<style lang="scss" scoped>
.Article {
}
</style>
