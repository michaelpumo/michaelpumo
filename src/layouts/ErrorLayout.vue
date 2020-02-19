<template>
  <main
    :class="[
      $options.className,
      { 'is-ready': appReady },
      `is-theme-${appTheme}`,
    ]">
    <slot />

    <AppCursor />
  </main>
</template>

<static-query>
  query Page {
    prismic {
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
import { mapGetters, mapActions } from 'vuex'
import { vh } from '@/utils/helpers'
import AppCursor from '@/components/AppCursor/AppCursor.vue'

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
  components: {
    AppCursor
  },
  computed: {
    ...mapGetters({
      appReady: 'app/ready',
      appTheme: 'app/theme'
    }),
    global() {
      return this.$static.prismic.allGlobals.edges[0].node
    }
  },
  mounted() {
    vh()

    this.setAppReady(true)

    window.addEventListener('resize', vh)
  },
  beforeDestroy() {
    window.removeEventListener('resize', vh)
  },
  methods: {
    ...mapActions({
      setAppReady: 'app/setReady'
    })
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
