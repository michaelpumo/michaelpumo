<template>
  <nav
    :class="[
      $options.className,
      { 'is-active': active }
    ]">
    <div :class="`${$options.className}__container`">
      <ButtonIcon
        :label="title"
        :class="`${$options.className}__toggle`"
        @click.native="toggleMenu">
        <g-image
          src="/icons/icon-hamburger.png"
          width="60"
          height="60"
          :alt="active ? 'Close navigation' : 'Open navigation'" />
      </ButtonIcon>

      <ul :class="`${$options.className}__list`">
        <li
          v-for="(item, index) in items"
          :key="index"
          :class="`${$options.className}__item`">
          <h4 :class="`${$options.className}__title`">
            {{ item.title }}
          </h4>
          <p :class="`${$options.className}__description`">
            {{ item.description }}
          </p>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import ButtonIcon from '@/components/ButtonIcon/ButtonIcon'

export default {
  name: 'AppNavigation',
  className: 'AppNavigation',
  components: {
    ButtonIcon
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
  data() {
    return ({
      active: false
    })
  },
  methods: {
    toggleMenu() {
      this.active = !this.active
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
  // max-width: calc(100vw - var(--spacing-unit));
  // max-height: calc(100vh - var(--spacing-unit));
  // overflow-y: auto;
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
    max-width: calc(100vw - var(--spacing-unit));
    max-height: calc(100vh - var(--spacing-unit));
    overflow-y: auto;
    padding: calc(var(--spacing-unit) / 2) var(--spacing-unit);
    margin: 0;
    opacity: 0;
    background-color: color("light");
    border-radius: 10px;
    box-shadow: 5px 5px 10px rgba(color("dark"), 0.1);
    transition: opacity $trans-speed $trans-ease;

    @include media("sm") {
      padding: calc(var(--spacing-unit) / 2);
    }

    @supports (clip-path: circle(0% at center)) {
      opacity: 1;
      clip-path: circle(calc(var(--button-size) / 2) at calc((var(--button-size) / 2) + (var(--spacing-unit) / 2)) calc((var(--button-size) / 2) + (var(--spacing-unit) / 2)));
      transition: clip-path ($trans-speed * 2) $trans-ease;

      @include media("sm") {
        clip-path: circle(calc(var(--button-size) / 2) at calc((var(--button-size) / 2) + (var(--spacing-unit) / 2)) calc((var(--button-size) / 2) + (var(--spacing-unit) / 2)));
      }
    }

    #{$root}.is-active & {
      opacity: 1;

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

  &__title {
    color: color("dark");
  }

  &__description {
    @include type-style("6");

    color: color("slate");

    @include media("sm") {
      @include type-style("5");
    }
  }
}
</style>
