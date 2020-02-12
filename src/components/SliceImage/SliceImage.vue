<template>
  <div :class="$options.className">
    <g-image
      :class="`${$options.className}__image`"
      :src="slice.primary.image.url"
      :width="slice.primary.image.dimensions.width.toString()"
      :height="slice.primary.image.dimensions.height.toString()" />
  </div>
</template>

<script>
export default {
  name: 'SliceImage',
  className: 'SliceImage',
  props: {
    slice: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
.SliceImage {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: var(--color-theme);
  transition: background-color $trans-speed $trans-ease;

  &__image {
    position: absolute;
    width: 100%;
    height: 100%;
    filter: saturate(0) brightness(1.5) contrast(0.9);
    mix-blend-mode: multiply;
    object-fit: cover;
  }
}
</style>
