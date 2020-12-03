<template>
  <img
    :class="[$options.class, 'lazyload']"
    src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
    :data-src="src"
    :alt="alt"
  />
</template>

<script>
import 'lazysizes'

export default {
  name: 'ImageLazy',
  class: 'ImageLazy',
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.ImageLazy {
  opacity: 0;
  transition: opacity ($trans-speed * 2) $trans-ease;

  &.lazyloaded {
    opacity: 1;
  }
}
</style>
