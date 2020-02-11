<template>
  <div :class="$options.className">
    <PrismicRichtext :html="slice.primary.content" />
  </div>
</template>

<script>
import PrismicRichtext from '@/components/PrismicRichtext/PrismicRichtext'

export default {
  name: 'SliceText',
  className: 'SliceText',
  components: {
    PrismicRichtext
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
  width: 100%;
  min-height: 100vh;
  background-color: color("grey");
  padding: var(--spacing-unit);
}
</style>
