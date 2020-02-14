<template>
  <SectionSlice :class="$options.className">
    <PrismicRichtext
      v-if="slice.primary.content"
      :class="`${$options.className}__content`"
      :html="slice.primary.content" />
  </SectionSlice>
</template>

<script>
import PrismicRichtext from '@/components/PrismicRichtext/PrismicRichtext'
import SectionSlice from '@/components/SectionSlice/SectionSlice'

export default {
  name: 'SliceContact',
  className: 'SliceContact',
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
.SliceContact {
  padding: calc(var(--spacing-unit) * 2) var(--spacing-unit);
  background-color: color("light");

  @include media("sm") {
    padding: var(--spacing-unit);
  }

  &__content {
    width: 100%;
    max-width: 550px;
  }
}
</style>
