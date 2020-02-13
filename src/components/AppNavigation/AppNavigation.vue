<template>
  <nav
    :class="[
      $options.className,
      { 'is-active': active }
    ]">
    <ButtonIcon
      :class="`${$options.className}__toggle`"
      @click.native="toggleMenu">
      <g-image
        src="/icons/icon-hamburger.png"
        width="60"
        height="60"
        alt="Menu" />
    </ButtonIcon>

    <div :class="`${$options.className}__container`">
      <h2 :class="`${$options.className}__header`">
        {{ title }}
      </h2>

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

  --button-size: 50px;

  @include media("sm") {
    --button-size: 60px;
  }

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
    position: absolute;
    top: calc(var(--spacing-unit) / 2);
    left: calc(var(--spacing-unit) / 2);
    z-index: depth("navigation") + 1;
    width: var(--button-size);
    height: var(--button-size);
    pointer-events: auto;
  }

  &__header {
    position: absolute;
    top: calc(var(--spacing-unit) - 6px);
    left: calc(var(--spacing-unit) + var(--button-size));
    margin: 0;

    @include media("sm") {
      top: calc(var(--spacing-unit) - 15px);
    }

    @include media("xl") {
      top: calc(var(--spacing-unit) - 25px);
    }
  }

  &__container {
    padding: calc(var(--spacing-unit) / 2);
    padding-top: calc(var(--spacing-unit) + var(--button-size));
    margin: 0;
    opacity: 0;
    background-color: color("light");
    border-radius: 10px;
    box-shadow: 5px 5px 10px rgba(color("dark"), 0.1);
    transition: opacity $trans-speed $trans-ease;

    @supports (clip-path: circle(0% at center)) {
      opacity: 1;
      clip-path: circle(calc(var(--button-size) / 2) at calc((var(--button-size) / 2) + (var(--spacing-unit) / 2)) calc((var(--button-size) / 2) + (var(--spacing-unit) / 2)));
      transition: clip-path ($trans-speed * 2) $trans-ease;
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
