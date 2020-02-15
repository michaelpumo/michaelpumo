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
        @click.native="modalOpen('booking')">
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
        @click.native="modalOpen('quote')">
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
        @click.native="modalOpen('question')">
        <g-image
          src="/icons/icon-wave.png"
          width="60"
          height="60"
          alt="I’d like to ask a general question" />
      </ButtonIcon>
    </p>

    <ModalDialog
      :open="modalActive"
      @close="modalClose">
      <p>I am a modal</p>
    </ModalDialog>
  </SectionSlice>
</template>

<script>
import { mapActions } from 'vuex'
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
  data() {
    return ({
      modalActive: false
    })
  },
  methods: {
    ...mapActions({
      setAppLocked: 'app/setLocked'
    }),
    modalToggle() {
      this.modalActive = !this.modalActive
      this.setAppLocked(this.modalActive)
    },
    modalClose() {
      console.log('modalClose')
      this.modalToggle()
    },
    modalOpen(form) {
      console.log('modalOpen', form)
      this.modalToggle()
    }
  }
}
</script>

<style lang="scss" scoped>
.SliceContact {
  padding: calc((var(--spacing-unit) * 2) + var(--button-size)) var(--spacing-unit) calc(var(--spacing-unit) * 2);
  background-color: color("light");

  @include media("lg") {
    padding: var(--spacing-unit);
  }

  &__content {
    width: 100%;
    max-width: 550px;
  }
}
</style>
