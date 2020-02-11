<template>
  <header :class="$options.className">
    <h1 v-if="title">
      {{ title }}
    </h1>
    <slot />
  </header>
</template>

<script>
export default {
  name: 'AppHero',
  className: 'AppHero',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.AppHero {
  & > p {
    @include type-style("3");

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
