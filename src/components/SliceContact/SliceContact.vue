<template>
  <SectionSlice :class="$options.className">
    <PrismicRichtext
      v-if="slice.primary.content"
      :class="`${$options.className}__content`"
      :html="slice.primary.content" />

    <ModalDialog
      :open="true"
      @close="closeModal">
      <p>I am a modal</p>
    </ModalDialog>
  </SectionSlice>
</template>

<script>
import ModalDialog from '@/components/ModalDialog/ModalDialog'
import PrismicRichtext from '@/components/PrismicRichtext/PrismicRichtext'
import SectionSlice from '@/components/SectionSlice/SectionSlice'

export default {
  name: 'SliceContact',
  className: 'SliceContact',
  components: {
    ModalDialog,
    PrismicRichtext,
    SectionSlice
  },
  props: {
    slice: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    closeModal() {
      console.log('close it!')
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
