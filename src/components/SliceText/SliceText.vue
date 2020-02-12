<template>
  <div :class="$options.className">
    <PrismicRichtext
      :class="`${$options.className}__content`"
      :html="slice.primary.content" />
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
  padding: var(--spacing-unit);
  background-color: color("light");

  &__content {
    width: 100%;
    max-width: 550px;
  }
}
</style>
