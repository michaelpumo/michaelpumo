<template>
  <div :class="[$options.className, `${$options.className}--${columns}`]">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FormGroup',
  className: 'FormGroup',
  props: {
    columns: {
      type: Number,
      default: 1,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.FormGroup {
  display: grid;
  grid-column-gap: spacing('sm');
  width: 100%;
  padding: 0;
  margin: 0;

  @for $i from 1 through 3 {
    &--#{$i} {
      @include media('xs') {
        grid-template-columns: repeat(#{$i}, 1fr);
      }
    }
  }
}
</style>
