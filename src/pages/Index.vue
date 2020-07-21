<template>
  <AppLayout
    :title="page.title"
    :description="page.description"
    :colophon="page.colophon"
    :button-id="page.button_id"
    :button-title="page.button_title">
    <SliceZone
      :content="page.body" />
  </AppLayout>
</template>

<page-query>
query Page {
  Prismic {
    page(uid: "home", lang: "en-gb") {
      meta_title
      meta_description
      meta_keywords
      meta_author
      meta_image
      title
      description
      colophon
      button_id
      button_title
      body {
        ... on Prismic_PageBodyClients {
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
        ... on Prismic_PageBodyContact {
          type
          primary {
            id
            content
          }
        }
        ... on Prismic_PageBodyImage {
          type
          primary {
            id
            image
          }
        }
        ... on Prismic_PageBodyProjects {
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
        ... on Prismic_PageBodyQuotes {
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
        ... on Prismic_PageBodyText {
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
import { slugify, meta } from '@/utils/helpers'
import AppLayout from '@/layouts/AppLayout.vue'
import SliceZone from '@/components/SliceZone/SliceZone.vue'

export default {
  name: 'PageIndex',
  className: 'PageIndex',
  components: {
    AppLayout,
    SliceZone
  },
  metaInfo() {
    return ({
      ...meta(this.page)
    })
  },
  computed: {
    page() {
      const payload = { ...this.$page.Prismic.page }

      payload.body = payload.body.map(item => {
        if (item.primary && item.primary.id) {
          item.primary.id = slugify(item.primary.id)
        }
        return item
      })

      return payload
    }
  }
}
</script>
