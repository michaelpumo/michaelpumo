<template>
  <SectionSlice :class="$options.className">
    <PrismicRichtext
      v-if="slice.primary.content"
      :class="`${$options.className}__content`"
      :html="slice.primary.content" />

    <p>
      <ButtonIcon
        label="I’d like to book you in"
        color="red"
        @click.native="modalOpen('booking')">
        <ImageLazy
          src="/icons/icon-working.png"
          width="60"
          height="60"
          alt="I’d like to book you in" />
      </ButtonIcon>
    </p>

    <p>
      <ButtonIcon
        label="I’d like a quote for a project"
        color="amber"
        @click.native="modalOpen('quote')">
        <ImageLazy
          src="/icons/icon-money.png"
          width="60"
          height="60"
          alt="I’d like a quote for a project" />
      </ButtonIcon>
    </p>

    <p>
      <ButtonIcon
        label="I’d like to ask a question"
        color="green"
        @click.native="modalOpen('question')">
        <ImageLazy
          src="/icons/icon-wave.png"
          width="60"
          height="60"
          alt="I’d like to ask a question" />
      </ButtonIcon>
    </p>

    <portal to="modal">
      <ModalDialog
        :open="modalActive"
        @close="modalClose">
        <template #header>
          <ButtonIcon
            v-if="type === 'booking'"
            key="booking"
            label="I’d like to book you in"
            color="red"
            tag="div">
            <ImageLazy
              src="/icons/icon-working.png"
              width="60"
              height="60"
              alt="I’d like to book you in" />
          </ButtonIcon>

          <ButtonIcon
            v-if="type === 'quote'"
            key="quote"
            label="I’d like a quote for a project"
            color="amber"
            tag="div">
            <ImageLazy
              src="/icons/icon-money.png"
              width="60"
              height="60"
              alt="I’d like a quote for a project" />
          </ButtonIcon>

          <ButtonIcon
            v-if="type === 'question'"
            key="question"
            label="I’d like to ask a question"
            color="green"
            tag="div">
            <ImageLazy
              src="/icons/icon-wave.png"
              width="60"
              height="60"
              alt="I’d like to ask a question" />
          </ButtonIcon>
        </template>
        <template #main>
          <FormContact
            :key="renderKey"
            :to="type" />
        </template>
      </ModalDialog>
    </portal>
  </SectionSlice>
</template>

<script>
import { mapActions } from 'vuex'
import { randId } from '@/utils/helpers'
import ButtonIcon from '@/components/ButtonIcon/ButtonIcon'
import FormContact from '@/components/FormContact/FormContact'
import ImageLazy from '@/components/ImageLazy/ImageLazy'
import ModalDialog from '@/components/ModalDialog/ModalDialog'
import PrismicRichtext from '@/components/PrismicRichtext/PrismicRichtext'
import SectionSlice from '@/components/SectionSlice/SectionSlice'

export default {
  name: 'SliceContact',
  className: 'SliceContact',
  components: {
    ButtonIcon,
    FormContact,
    ImageLazy,
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
      renderKey: randId(),
      type: 'booking',
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
      this.modalToggle()
    },
    modalOpen(type) {
      this.renderKey = randId()
      this.type = type
      this.modalToggle()
    }
  }
}
</script>

<style lang="scss" scoped>
.SliceContact {
  padding: calc((var(--spacing-unit) * 2) + var(--button-size)) var(--spacing-unit) calc(var(--spacing-unit) * 2);
  background-color: color("grey");

  @include media("lg") {
    padding: var(--spacing-unit);
  }

  &__content {
    width: 100%;
    max-width: 550px;
  }
}
</style>
