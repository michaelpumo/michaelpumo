<template>
  <nav
    :class="[
      $options.className,
      { 'is-active': navigationActive }
    ]">
    <div :class="`${$options.className}__container`">
      <ButtonIcon
        :label="title"
        heading="3"
        :class="`${$options.className}__toggle`"
        @click.native="toggleNavigation">
        <g-image
          src="/icons/icon-hamburger.png"
          width="60"
          height="60"
          :alt="navigationActive ? 'Close navigation' : 'Open navigation'" />
      </ButtonIcon>

      <ul :class="`${$options.className}__list`">
        <li
          v-for="(item, index) in items"
          :key="index"
          v-jump-to="{
            id: slugify(item.id),
            callback
          }"
          :class="`${$options.className}__item`">
          <h4 :class="`${$options.className}__title`">
            {{ item.title }}
          </h4>
          <p :class="`${$options.className}__description`">
            {{ item.description }}
          </p>
        </li>
      </ul>

      <ThemeSwitcher />
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { slugify } from '@/utils/helpers'
import { jumpTo } from '@/utils/directives'
import ButtonIcon from '@/components/ButtonIcon/ButtonIcon'
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher'

export default {
  name: 'AppNavigation',
  className: 'AppNavigation',
  components: {
    ButtonIcon,
    ThemeSwitcher
  },
  directives: {
    jumpTo
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    ...mapGetters({
      navigationActive: 'navigation/active'
    })
  },
  methods: {
    ...mapActions({
      setNavigationActive: 'navigation/setActive'
    }),
    slugify,
    toggleNavigation() {
      this.setNavigationActive(!this.navigationActive)
    },
    callback() {
      this.setNavigationActive(false)
    }
  }
}
</script>

<style lang="scss" scoped>
.AppNavigation {
  $root: &;

  position: fixed;
  top: calc(var(--spacing-unit) / 2);
  left: calc(var(--spacing-unit) / 2);
  z-index: depth("navigation");
  background-color: transparent;
  pointer-events: none;

  &.is-active {
    pointer-events: auto;
  }

  &__toggle {
    margin-bottom: var(--spacing-unit);
    margin-left: calc(-1 * (var(--spacing-unit) / 2));
    pointer-events: auto;

    @include media("sm") {
      margin-bottom: calc(var(--spacing-unit) / 2);
      margin-left: 0;
    }
  }

  &__container {
    @include shadow-box();

    max-width: calc(100vw - var(--spacing-unit));
    max-height: calc((var(--vh, 1vh) * 100) - var(--spacing-unit));
    overflow-y: auto;
    padding: calc(var(--spacing-unit) / 2) var(--spacing-unit);
    margin: 0;
    opacity: 0;
    background-color: rgba(color("light"), 0);
    transition: opacity $trans-speed $trans-ease;

    @include media("sm") {
      padding: calc(var(--spacing-unit) / 2);
    }

    @supports (clip-path: circle(0% at center)) {
      // WTF SCSS? Interpreting calc math with SCSS and butchering it.
      // Need to pass as a whole string.
      $clip-rule: "(var(--button-size) / 2) + (var(--spacing-unit) / 2)";

      opacity: 1;
      clip-path: circle(calc(var(--button-size) / 2) at calc(#{$clip-rule}) calc(#{$clip-rule}));
      transition:
        background-color $trans-speed ($trans-speed * 2) $trans-ease,
        clip-path ($trans-speed * 2) $trans-ease;
    }

    #{$root}.is-active & {
      opacity: 1;
      background-color: color("light");
      transition-delay: 0s;

      @supports (clip-path: circle(0% at center)) {
        clip-path: circle(100% at center);
      }
    }
  }

  &__list {
    width: 100%;
    margin: 0;
    opacity: 0;
    transform: translate3d(0, 10px, 0);
    transition:
      opacity $trans-speed $trans-ease,
      transform $trans-speed $trans-ease;

    #{$root}.is-active & {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      transition-delay: $trans-speed;
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
    color: color("dark");
  }

  &__description {
    @include type-style("6");

    margin-bottom: 20px;
    color: color("slate");

    @include media("sm") {
      @include type-style("5");

      margin-bottom: spacing("sm");
    }
  }
}
</style>
