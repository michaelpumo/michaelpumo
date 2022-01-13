<template>
  <SectionSlice :class="$options.className">
    <PrismicRichtext
      v-if="slice.primary.code"
      :class="`${$options.className}__code`"
      :html="slice.primary.code"
    />
  </SectionSlice>
</template>

<script>
import Prism from 'prismjs'
import PrismicRichtext from '@/components/prismic/RichText.vue'
import SectionSlice from '@/components/app/SectionSlice.vue'

export default {
  name: 'SliceCode',
  className: 'SliceCode',
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
  mounted() {
    Prism.highlightAll()
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.SliceCode {
  padding: calc((var(--spacing-unit) * 2) + var(--button-size))
    var(--spacing-unit) calc(var(--spacing-unit) * 2);
  background-color: color('light');

  @include media('lg') {
    padding: var(--spacing-unit);
  }

  &__code {
    width: 100%;
    max-width: 550px;
  }
}
</style>
