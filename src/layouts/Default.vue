<template>
  <div :class="$options.className">
    <AppCursor />
    <AppNavigation
      title="Burger menu"
      :items="navigation" />

    <div :class="`${$options.className}__introduction`">
      <AppHero
        :title="title"
        :description="description"
        :colophon="colophon" />
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
    }
  },
  computed: {
    ...mapGetters({
      appLocked: 'app/locked'
    }),
    navigation() {
      return this.$static.prismic.allGlobals.edges[0].node.navigation
    }
  },
  watch: {
    appLocked(lock) {
      if (lock) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.removeProperty('overflow')
      }
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
  width: 100%;
  height: 100%;

  &__introduction {
    width: 100%;
    height: calc(var(--vh, 1vh) * 100);
    padding: var(--spacing-unit);
    background-color: color("dark");

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
