<template>
  <VLazyImage
    :class="$options.class"
    :src="src"
    :alt="alt"
    src-placeholder="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
  />
</template>

<script>
import VLazyImage from 'v-lazy-image'

export default {
  name: 'ImageLazy',
  class: 'ImageLazy',
  components: {
    VLazyImage
  },
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.ImageLazy {
  opacity: 0;
  transition: opacity $trans-speed $trans-ease;

  &.v-lazy-image-loaded {
    opacity: 1;
  }
}
</style>
