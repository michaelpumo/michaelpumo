<template>
  <SectionSlice :class="$options.className">
    <PrismicRichtext
      v-if="slice.primary.content"
      :class="`${$options.className}__content`"
      :html="slice.primary.content"
    />

    <br />

    <p>
      <ButtonIcon
        label="I’d like to book you in"
        color="red"
        @click.native="modalOpen('booking')"
      >
        <ImageLazy
          src="/icons/icon-working.png"
          width="60"
          height="60"
          alt="I’d like to book you in"
        />
      </ButtonIcon>
    </p>

    <p>
      <ButtonIcon
        label="I’d like a quote for a project"
        color="amber"
        @click.native="modalOpen('quote')"
      >
        <ImageLazy
          src="/icons/icon-money.png"
          width="60"
          height="60"
          alt="I’d like a quote for a project"
        />
      </ButtonIcon>
    </p>

    <p>
      <ButtonIcon
        label="I’d just like to say hello"
        color="green"
        @click.native="modalOpen('question')"
      >
        <ImageLazy
          src="/icons/icon-wave.png"
          width="60"
          height="60"
          alt="I’d just like to say hello"
        />
      </ButtonIcon>
    </p>

    <Portal to="modal">
      <ModalDialog :open="modalActive" @close="modalClose">
        <template #header>
          <ButtonIcon
            v-if="type === 'booking'"
            key="booking"
            label="I’d like to book you in"
            color="red"
            tag="div"
          >
            <ImageLazy
              src="/icons/icon-working.png"
              width="60"
              height="60"
              alt="I’d like to book you in"
            />
          </ButtonIcon>

          <ButtonIcon
            v-if="type === 'quote'"
            key="quote"
            label="I’d like a quote for a project"
            color="amber"
            tag="div"
          >
            <ImageLazy
              src="/icons/icon-money.png"
              width="60"
              height="60"
              alt="I’d like a quote for a project"
            />
          </ButtonIcon>

          <ButtonIcon
            v-if="type === 'question'"
            key="question"
            label="I’d just like to say hello"
            color="green"
            tag="div"
          >
            <ImageLazy
              src="/icons/icon-wave.png"
              width="60"
              height="60"
              alt="I’d just like to say hello"
            />
          </ButtonIcon>
        </template>
        <template #main>
          <FormContact :key="renderKey" :type="type" />
        </template>
      </ModalDialog>
    </Portal>
  </SectionSlice>
</template>

<script>
import { mapActions } from 'vuex'
import { randId } from '@/utils/helpers.js'
import ButtonIcon from '@/components/app/ButtonIcon.vue'
import FormContact from '@/components/app/FormContact.vue'
import ImageLazy from '@/components/app/ImageLazy.vue'
import ModalDialog from '@/components/app/ModalDialog.vue'
import PrismicRichtext from '@/components/prismic/RichText.vue'
import SectionSlice from '@/components/app/SectionSlice.vue'

export default {
  name: 'SliceContact',
  className: 'SliceContact',
  components: {
    ButtonIcon,
    FormContact,
    ImageLazy,
    ModalDialog,
    PrismicRichtext,
    SectionSlice,
  },
  props: {
    slice: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    renderKey: randId(),
    type: 'booking',
    modalActive: false,
  }),
  methods: {
    ...mapActions({
      setAppLocked: 'app/setLocked',
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
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.SliceContact {
  padding: calc((var(--spacing-unit) * 2) + var(--button-size))
    var(--spacing-unit) calc(var(--spacing-unit) * 2);
  background-color: color('grey');

  @include media('lg') {
    padding: var(--spacing-unit);
  }

  &__content {
    width: 100%;
    max-width: 550px;
  }
}
</style>
