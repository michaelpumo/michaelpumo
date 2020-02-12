<template>
  <footer :class="$options.className">
    <slot />
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  className: 'AppFooter',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.AppFooter {
  &::v-deep * {
    @include type-style("6");

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
