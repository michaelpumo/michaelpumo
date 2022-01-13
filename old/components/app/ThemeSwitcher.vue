<template>
  <ul :class="$options.className">
    <li :class="`${$options.className}__item`">
      <button
        type="button"
        :class="[`${$options.className}__swatch`, 'is-red']"
        @click="setAppTheme('red')"
      >
        Red
      </button>
    </li>
    <li :class="`${$options.className}__item`">
      <button
        type="button"
        :class="[`${$options.className}__swatch`, 'is-amber']"
        @click="setAppTheme('amber')"
      >
        Amber
      </button>
    </li>
    <li :class="`${$options.className}__item`">
      <button
        type="button"
        :class="[`${$options.className}__swatch`, 'is-green']"
        @click="setAppTheme('green')"
      >
        Green
      </button>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ThemeSwitcher',
  className: 'ThemeSwitcher',
  methods: {
    ...mapActions({
      setAppTheme: 'app/setTheme',
    }),
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.ThemeSwitcher {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 0 auto;

  &__item {
    padding: 0 10px 0 0;
    margin: 0;

    &:last-child {
      padding: 0;
    }
  }

  &__swatch {
    width: 20px;
    height: 20px;
    text-indent: -9999em;
    margin: 0;
    border: none;
    appearance: none;
    background-color: transparent;
    background-image: none;
    border-radius: 50%;
    color: inherit;
    cursor: none;
    outline: none;
    text-decoration: none;
    user-select: none;
    white-space: nowrap;

    $colors: ('red', 'green', 'amber');

    @each $color in $colors {
      &.is-#{$color} {
        background-color: color('#{$color}');
      }
    }
  }
}
</style>
