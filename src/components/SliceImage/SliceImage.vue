<template>
  <SectionSlice :class="$options.className">
    <g-image
      :class="`${$options.className}__image`"
      :src="slice.primary.image.url"
      :width="slice.primary.image.dimensions.width.toString()"
      :height="slice.primary.image.dimensions.height.toString()"
      :alt="slice.primary.image.alt || 'Michael Pumo'" />
  </SectionSlice>
</template>

<script>
import SectionSlice from '@/components/SectionSlice/SectionSlice'

export default {
  name: 'SliceImage',
  className: 'SliceImage',
  components: {
    SectionSlice
  },
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
