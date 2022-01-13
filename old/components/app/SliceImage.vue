<template>
  <SectionSlice :class="$options.className">
    <ImageLazy
      :class="`${$options.className}__image`"
      :src="slice.primary.image.url"
      :width="slice.primary.image.dimensions.width.toString()"
      :height="slice.primary.image.dimensions.height.toString()"
      :alt="slice.primary.image.alt || 'Michael Pumo'"
    />
  </SectionSlice>
</template>

<script>
import ImageLazy from '@/components/app/ImageLazy.vue'
import SectionSlice from '@/components/app/SectionSlice.vue'

export default {
  name: 'SliceImage',
  className: 'SliceImage',
  components: {
    ImageLazy,
    SectionSlice,
  },
  props: {
    slice: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.SliceImage {
  background-color: var(--color-theme);
  transition: background-color $trans-speed $trans-ease;

  &__image {
    position: absolute;
    width: 100%;
    height: 100%;
    filter: saturate(0) brightness(1.1);
    mix-blend-mode: multiply;
    object-fit: cover;
  }
}
</style>
