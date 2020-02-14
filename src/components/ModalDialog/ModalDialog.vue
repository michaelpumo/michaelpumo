<template>
  <div
    role="dialog"
    aria-labelledby="Modal Dialog"
    :aria-describedby="open ? 'Modal dialog is open' : 'Modal dialog is not open'"
    :class="[
      $options.class,
      { 'is-open': open }
    ]"
    @click.self="close">
    <div :class="`${$options.class}__window`">
      <div :class="`${$options.class}__content`">
        <slot />
      </div>
      <button
        type="button"
        :class="`${$options.class}__close`"
        @click="close">
        <SvgIcon
          icon="close"
          :class="`${$options.class}__cross`" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import '@/assets/icons/close'

export default {
  name: 'ModalDialog',
  class: 'ModalDialog',
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    open(newVal) {
      this.setAppLock(newVal)
    }
  },
  mounted() {
    document.addEventListener('keydown', this.closeKey)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.closeKey)
  },
  methods: {
    ...mapActions({
      setAppLock: 'app/setLock'
    }),
    close() {
      this.$emit('close')
    },
    closeKey(e) {
      if (this.open && e.keyCode === 27) {
        this.close()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ModalDialog {
  $root: &;

  position: fixed;
  top: 0;
  left: 0;
  z-index: depth("modal");
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(color("dark"), 0.7);
  pointer-events: none;
  transition: opacity $trans-speed $trans-ease ($trans-speed * 2);

  &.is-open {
    opacity: 1;
    pointer-events: auto;
    transition-delay: 0s;
  }

  &__window {
    @include shadow-box();

    position: relative;
    width: calc(100vw - var(--spacing-unit));
    max-width: 600px;
    height: calc(100vh - var(--spacing-unit));
    opacity: 0;
    background-color: color("light");
    transform: scale(0.95);
    transition:
      opacity $trans-speed $trans-ease $trans-speed,
      transform $trans-speed $trans-ease $trans-speed;

    #{$root}.is-open & {
      opacity: 1;
      transform: scale(1);
    }
  }

  &__content {
    width: 100%;
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    padding: var(--spacing-unit);
  }

  &__close {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    // width: $bsu-lg;
    // height: $bsu-lg;
    background-color: transparent;
  }

  &__cross {
    width: 12px;
    height: 12px;
  }
}
</style>
