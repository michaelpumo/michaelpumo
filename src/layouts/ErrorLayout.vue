<template>
  <main :class="$options.className">
    <slot />
  </main>
</template>

<static-query>
query Page {
  Prismic {
    allGlobals {
      edges {
        node {
          meta_google_verification
          meta_language
          meta_twitter_handle
          meta_type
          navigation {
            id
            title
            description
          }
        }
      }
    }
  }
}
</static-query>

<script>
export default {
  name: 'ErrorLayout',
  className: 'ErrorLayout',
  metaInfo() {
    return ({
      htmlAttrs: {
        lang: this.global.meta_language
      },
      meta: [
        {
          property: 'google-site-verification',
          content: this.global.meta_google_verification
        },
        {
          property: 'og:type',
          content: this.global.meta_type
        },
        {
          property: 'twitter:card',
          content: 'summary'
        },
        {
          property: 'twitter:creator',
          content: `@${this.global.meta_twitter_handle}`
        },
        {
          property: 'twitter:site',
          content: `@${this.global.meta_twitter_handle}`
        }
      ]
    })
  },
  computed: {
    global() {
      return this.$static.Prismic.allGlobals.edges[0].node
    }
  }
}
</script>

<style lang="scss" scoped>
.ErrorLayout {
  $root: &;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background-color: color("light");
}
</style>
