<template>
  <div
    :class="[
      $options.className,
      { 'is-locked': appLocked }
    ]">
    <AppCursor />
    <AppNavigation
      title="Burger menu"
      :items="navigation" />

    <div :class="`${$options.className}__introduction`">
      <AppHero
        :title="title"
        :description="description"
        :colophon="colophon"
        :button-id="buttonId"
        :button-title="buttonTitle" />
    </div>

    <main :class="`${$options.className}__main`">
      <slot />
    </main>

    <portal-target name="modal" />
  </div>
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
import { mapGetters } from 'vuex'
import { vh } from '@/utils/helpers'
import AppCursor from '@/components/AppCursor/AppCursor.vue'
import AppHero from '@/components/AppHero/AppHero.vue'
import AppNavigation from '@/components/AppNavigation/AppNavigation.vue'

export default {
  name: 'Layout',
  className: 'Layout',
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
    AppCursor,
    AppHero,
    AppNavigation
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: Array,
      default: () => ([])
    },
    colophon: {
      type: Array,
      default: () => ([])
    },
    buttonTitle: {
      type: String,
      default: ''
    },
    buttonId: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      appLocked: 'app/locked'
    }),
    global() {
      return this.$static.prismic.allGlobals.edges[0].node
    },
    navigation() {
      return this.$static.prismic.allGlobals.edges[0].node.navigation
    }
  },
  mounted() {
    vh()

    window.addEventListener('resize', vh)
  },
  beforeDestroy() {
    window.removeEventListener('resize', vh)
  }
}
</script>

<style lang="scss" scoped>
.Layout {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  &.is-locked {
    overflow: hidden;
  }

  &__introduction {
    position: sticky;
    top: 0;
    width: 100%;
    height: 100%;
    padding: var(--spacing-unit);
    background-color: color("dark");
    pointer-events: none;

    @include media("lg") {
      position: fixed;
      left: 0;
      width: 50%;
    }
  }

  &__main {
    background-color: color("light");

    @include media("lg") {
      width: 50%;
      min-height: calc(var(--vh, 1vh) * 100);
      margin-left: 50%;
    }
  }
}
</style>
