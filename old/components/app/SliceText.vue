<template>
  <SectionSlice :class="$options.className">
    <PrismicRichtext
      v-if="slice.primary.content"
      :class="`${$options.className}__content`"
      :html="slice.primary.content"
    />
  </SectionSlice>
</template>

<script>
import PrismicRichtext from '@/components/prismic/RichText.vue'
import SectionSlice from '@/components/app/SectionSlice.vue'

export default {
  name: 'SliceText',
  className: 'SliceText',
  components: {
    PrismicRichtext,
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

.SliceText {
  padding: calc((var(--spacing-unit) * 2) + var(--button-size))
    var(--spacing-unit) calc(var(--spacing-unit) * 2);
  background-color: color('light');

  @include media('lg') {
    padding: var(--spacing-unit);
  }

  &__content {
    width: 100%;
    max-width: 550px;
  }
}
</style>
