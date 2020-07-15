<template>
  <div
    :id="$options.className"
    :class="[
      $options.className,
      { 'is-locked': appLocked }
    ]">
    <AppNavigation
      title="Burger menu"
      :ready="ready"
      :items="navigation" />

    <header :class="`${$options.className}__introduction`">
      <AppHero
        :ready="ready"
        :title="title"
        :description="description"
        :colophon="colophon"
        :button-id="buttonId"
        :button-title="buttonTitle" />
    </header>

    <main :class="`${$options.className}__main`">
      <slot />
    </main>
  </div>
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
import { mapGetters } from 'vuex'
import AppHero from '@/components/AppHero/AppHero.vue'
import AppNavigation from '@/components/AppNavigation/AppNavigation.vue'

export default {
  name: 'AppLayout',
  className: 'AppLayout',
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
  data: () => ({
    ready: false
  }),
  computed: {
    ...mapGetters({
      appLocked: 'app/locked'
    }),
    global() {
      return this.$static.Prismic.allGlobals.edges[0].node
    },
    navigation() {
      return this.$static.Prismic.allGlobals.edges[0].node.navigation
    }
  },
  mounted() {
    this.ready = true
  }
}
</script>

<style lang="scss" scoped>
.AppLayout {
  $root: &;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  &.is-locked {
    overflow: hidden;
  }

  $colors: (red, green, amber);

  @each $color in $colors {
    .is-theme-#{$color} & {
      --color-theme: #{color($color)};
    }
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
      z-index: 1;
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
