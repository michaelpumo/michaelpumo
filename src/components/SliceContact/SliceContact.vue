<template>
  <SectionSlice :class="$options.className">
    <PrismicRichtext
      v-if="slice.primary.content"
      :class="`${$options.className}__content`"
      :html="slice.primary.content" />

    <p>
      <ButtonIcon
        label="I’d like to book you in for work"
        :class="`${$options.className}__toggle`"
        @click.native="openBooking">
        <g-image
          src="/icons/icon-working.png"
          width="60"
          height="60"
          alt="I’d like to book you in for work" />
      </ButtonIcon>
    </p>

    <p>
      <ButtonIcon
        label="I’d like a quote for a project"
        color="yellow"
        :class="`${$options.className}__toggle`"
        @click.native="openBooking">
        <g-image
          src="/icons/icon-money.png"
          width="60"
          height="60"
          alt="I’d like a quote for a project" />
      </ButtonIcon>
    </p>

    <p>
      <ButtonIcon
        label="I’d like to ask a general question"
        color="green"
        :class="`${$options.className}__toggle`"
        @click.native="openBooking">
        <g-image
          src="/icons/icon-wave.png"
          width="60"
          height="60"
          alt="I’d like to ask a general question" />
      </ButtonIcon>
    </p>

    <ModalDialog
      :open="false"
      @close="closeModal">
      <p>I am a modal</p>
    </ModalDialog>
  </SectionSlice>
</template>

<script>
import ButtonIcon from '@/components/ButtonIcon/ButtonIcon'
import ModalDialog from '@/components/ModalDialog/ModalDialog'
import PrismicRichtext from '@/components/PrismicRichtext/PrismicRichtext'
import SectionSlice from '@/components/SectionSlice/SectionSlice'

export default {
  name: 'SliceContact',
  className: 'SliceContact',
  components: {
    ButtonIcon,
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
    },
    openBooking() {
      console.log('booking it!')
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
