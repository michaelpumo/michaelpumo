<template>
  <div :class="$options.className">
    <div :class="`${$options.className}__introduction`">
      <ButtonIcon>
        <g-image
          src="/icons/icon-hamburger.png"
          width="60"
          height="60"
          alt="Menu" />
      </ButtonIcon>

      <AppHero :title="title">
        <PrismicRichtext :html="description" />
      </AppHero>

      <!-- {{ navigation }} -->

      <AppFooter>
        <PrismicRichtext :html="colophon" />
      </AppFooter>
    </div>

    <main :class="`${$options.className}__main`">
      <slot />
    </main>
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
import AppHero from '@/components/AppHero/AppHero.vue'
import AppFooter from '@/components/AppFooter/AppFooter.vue'
import PrismicRichtext from '@/components/PrismicRichtext/PrismicRichtext'
import ButtonIcon from '@/components/ButtonIcon/ButtonIcon'

export default {
  name: 'Layout',
  className: 'Layout',
  components: {
    AppHero,
    AppFooter,
    PrismicRichtext,
    ButtonIcon
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
    navigation() {
      return this.$static.prismic.allGlobals.edges[0].node.navigation
    }
  }
}
</script>

<style lang="scss" scoped>
.Layout {
  // position: absolute;
  // top: 0;
  // right: 0;
  // bottom: 0;
  // left: 0;
  width: 100%;
  height: 100%;
  background-color: darkblue;

  @include media("lg") {
    // width: 50%;
    // height: ;
  }

  &__introduction {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    padding: var(--spacing-unit);
    background-color: color("dark");
    color: var(--color-theme);

    @include media("lg") {
      position: fixed;
      top: 0;
      left: 0;
      width: 50%;
      height: 100vh;
    }

    &::v-deep {
      a {
        color: color("light");
      }
    }
  }

  &__main {
    background-color: color("light");

    @include media("lg") {
      width: 50%;
      min-height: 100vh;
      margin-left: 50%;
    }
  }
}
</style>
