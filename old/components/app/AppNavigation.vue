<template>
  <AppReveal
    tag="nav"
    :active="ready"
    :class="[$options.className, { 'is-active': navigationActive }]"
  >
    <div :class="`${$options.className}__container`">
      <header :class="`${$options.className}__header`">
        <ButtonIcon :label="title" heading="3" @click.native="toggleNavigation">
          <ImageLazy
            src="/icons/icon-hamburger.png"
            width="60"
            height="60"
            :alt="navigationActive ? 'Close navigation' : 'Open navigation'"
          />
        </ButtonIcon>
      </header>

      <div :class="`${$options.className}__content`">
        <div :class="`${$options.className}__inner`">
          <ul :class="`${$options.className}__list`">
            <li
              v-for="(item, index) in items"
              :key="index"
              v-jump-to="{
                id: slugify(item.id),
                callback,
              }"
              :class="`${$options.className}__item`"
            >
              <h4 :class="`${$options.className}__title`">
                {{ item.title }}
              </h4>
              <p :class="`${$options.className}__description`">
                {{ item.description }}
              </p>
            </li>
          </ul>

          <ThemeSwitcher :class="`${$options.className}__switcher`" />
        </div>
      </div>
    </div>
  </AppReveal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { slugify } from '@/utils/helpers.js'
import AppReveal from '@/components/app/AppReveal.vue'
import ButtonIcon from '@/components/app/ButtonIcon.vue'
import ImageLazy from '@/components/app/ImageLazy.vue'
import ThemeSwitcher from '@/components/app/ThemeSwitcher.vue'

export default {
  name: 'AppNavigation',
  className: 'AppNavigation',
  components: {
    AppReveal,
    ButtonIcon,
    ImageLazy,
    ThemeSwitcher,
  },
  props: {
    ready: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters({
      navigationActive: 'navigation/active',
    }),
  },
  methods: {
    ...mapActions({
      setNavigationActive: 'navigation/setActive',
    }),
    slugify,
    toggleNavigation() {
      this.setNavigationActive(!this.navigationActive)
    },
    callback() {
      this.setNavigationActive(false)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.AppNavigation {
  $root: &;

  position: fixed;
  top: calc(var(--spacing-unit) / 2);
  left: calc(var(--spacing-unit) / 2);
  z-index: depth('navigation');
  background-color: transparent;
  pointer-events: none;

  &.is-active {
    pointer-events: auto;
  }

  &__container {
    @include shadow-box();

    display: flex;
    flex-direction: column;
    max-width: calc(100vw - var(--spacing-unit));
    max-height: calc((var(--vh, 1vh) * 100) - var(--spacing-unit));
    padding: 0;
    margin: 0;
    opacity: 0;
    background-color: rgba(color('light'), 0);
    transition: opacity $trans-speed $trans-ease;

    @supports (clip-path: circle(0% at center)) {
      // WTF SCSS? Interpreting calc math with SCSS and butchering it.
      // Need to pass as a whole string.
      $clip-rule: '(var(--button-size) / 2) + (var(--spacing-unit) / 2) * 1';

      opacity: 1;
      clip-path: circle(
        calc(var(--button-size) / 2) at calc(#{unquote($clip-rule)})
          calc(#{unquote($clip-rule)})
      );
      transition: background-color $trans-speed ($trans-speed * 2) $trans-ease,
        clip-path ($trans-speed * 2) $trans-ease;
    }

    #{$root}.is-active & {
      opacity: 1;
      background-color: color('light');
      transition-delay: 0s;

      @supports (clip-path: circle(0% at center)) {
        clip-path: circle(100% at center);
      }
    }
  }

  &__header {
    padding: calc(var(--spacing-unit) / 2);
    pointer-events: auto;

    @include media('sm') {
      padding: calc(var(--spacing-unit) / 2);
    }
  }

  &__content {
    flex: 1;
    width: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    padding: calc(var(--spacing-unit) / 2) var(--spacing-unit)
      var(--spacing-unit);

    @include media('sm') {
      padding: 0 calc(var(--spacing-unit) / 2) calc(var(--spacing-unit) / 2);
    }
  }

  &__list,
  &__switcher {
    width: 100%;
    margin: 0;
    opacity: 0;
    transform: translate3d(0, 5px, 0);
    transition: opacity $trans-speed $trans-ease,
      transform $trans-speed $trans-ease;

    #{$root}.is-active & {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  &__list {
    #{$root}.is-active & {
      transition-delay: $trans-speed;
    }
  }

  &__switcher {
    #{$root}.is-active & {
      transition-delay: ($trans-speed * 2);
    }
  }

  &__item {
    width: 100%;
  }

  &__title,
  &__description {
    pointer-events: none;
    user-select: none;
  }

  &__title {
    color: color('dark');
  }

  &__description {
    @include type-style('6');

    margin-bottom: 20px;
    color: color('slate');

    @include media('sm') {
      @include type-style('5');

      margin-bottom: spacing('sm');
    }
  }
}
</style>
