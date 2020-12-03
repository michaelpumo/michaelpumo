<template>
  <component
    :is="tag"
    :type="tag === 'button' ? 'button' : null"
    :class="[$options.className, `h-${heading}`, `color-${color}`]"
  >
    <span :class="`${$options.className}__icon`">
      <slot />
    </span>
    <span v-if="label" :class="`${$options.className}__label`">
      {{ label }}
    </span>
  </component>
</template>

<script>
export default {
  name: 'ButtonIcon',
  className: 'ButtonIcon',
  props: {
    tag: {
      type: String,
      default: 'button',
    },
    label: {
      type: String,
      default: '',
    },
    heading: {
      type: String,
      default: '4',
      validator(value) {
        return ['1', '2', '3', '4', '5', '6'].includes(value)
      },
    },
    color: {
      type: String,
      default: 'theme',
      validator(value) {
        return ['theme', 'red', 'green', 'amber'].includes(value)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.ButtonIcon {
  $root: &;

  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  user-select: none;

  &__icon {
    width: 50px;
    height: 50px;
    padding: 10px;
    border-radius: 50%;
    transition: background-color $trans-speed $trans-ease;

    #{$root}.color-theme & {
      background-color: var(--color-theme);
    }

    $colors: ('red', 'green', 'amber');

    @each $color in $colors {
      #{$root}.color-#{$color} & {
        background-color: color('#{$color}');
      }
    }

    @include media('sm') {
      width: 60px;
      height: 60px;
    }
  }

  &__label {
    font-weight: 500;
    text-align: left;
    margin: 0 0 -4px #{spacing('sm') / 2};
    color: color('dark');

    @include media('sm') {
      margin-left: spacing('sm');
    }

    @for $i from 1 through 6 {
      #{$root}.h-#{$i} & {
        @include type-style('#{$i}');
      }
    }
  }
}
</style>
