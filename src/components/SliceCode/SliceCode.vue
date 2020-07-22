<template>
  <SectionSlice :class="$options.className">
    <PrismicRichtext
      v-if="slice.primary.code"
      :class="`${$options.className}__code`"
      :html="slice.primary.code" />
  </SectionSlice>
</template>

<script>
import Prism from 'prismjs'
import PrismicRichtext from '@/components/PrismicRichtext/PrismicRichtext.vue'
import SectionSlice from '@/components/SectionSlice/SectionSlice.vue'

Prism.highlightAll()

export default {
  name: 'SliceCode',
  className: 'SliceCode',
  components: {
    PrismicRichtext,
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
.SliceCode {
  padding: calc((var(--spacing-unit) * 2) + var(--button-size)) var(--spacing-unit) calc(var(--spacing-unit) * 2);
  background-color: color("light");

  @include media("lg") {
    padding: var(--spacing-unit);
  }

  &__code {
    width: 100%;
    max-width: 550px;
  }
}
</style>
