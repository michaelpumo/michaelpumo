<template>
  <SectionSlice :class="$options.className">
    <PrismicRichtext
      :class="`${$options.className}__content`"
      :html="slice.primary.content" />
  </SectionSlice>
</template>

<script>
import PrismicRichtext from '@/components/PrismicRichtext/PrismicRichtext'
import SectionSlice from '@/components/SectionSlice/SectionSlice'

export default {
  name: 'SliceText',
  className: 'SliceText',
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
.SliceText {
  padding: var(--spacing-unit);
  background-color: color("light");

  &__content {
    width: 100%;
    max-width: 550px;
  }
}
</style>
