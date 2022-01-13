<template>
  <div
    role="dialog"
    :class="[$options.className, { 'is-open': open }]"
    @mousedown.self="close"
  >
    <div :class="`${$options.className}__window`">
      <header :class="`${$options.className}__header`">
        <slot name="header" />
        <button
          type="button"
          :class="`${$options.className}__close`"
          @click="close"
        >
          <SvgIcon icon="close" :class="`${$options.className}__cross`" />
          <span :class="`${$options.className}__a11y`"> Close </span>
        </button>
      </header>

      <div :class="`${$options.className}__content`">
        <div :class="`${$options.className}__inner`">
          <slot name="main" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/icons/js/close.js'

export default {
  name: 'ModalDialog',
  className: 'ModalDialog',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    document.addEventListener('keydown', this.closeKey)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.closeKey)
  },
  methods: {
    close() {
      this.$emit('close')
    },
    closeKey(e) {
      if (this.open && e.keyCode === 27) {
        this.close()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.ModalDialog {
  $root: &;

  position: fixed;
  top: 0;
  left: 0;
  z-index: depth('modal');
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(color('dark'), 0.5);
  pointer-events: none;
  transition: opacity $trans-speed $trans-ease ($trans-speed * 2);

  &.is-open {
    opacity: 1;
    pointer-events: auto;
    transition-delay: 0s;
  }

  &__window {
    @include shadow-box();

    display: flex;
    flex-direction: column;
    width: calc(100vw - var(--spacing-unit));
    max-width: 600px;
    height: calc((var(--vh, 1vh) * 100) - var(--spacing-unit));
    overflow: hidden;
    opacity: 0;
    background-color: color('light');
    transform: scale(0.95);
    transition: opacity $trans-speed $trans-ease $trans-speed,
      transform $trans-speed $trans-ease $trans-speed;

    #{$root}.is-open & {
      opacity: 1;
      transform: scale(1);
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--spacing-unit);
    background-color: color('light');

    @include media('sm') {
      padding: calc(var(--spacing-unit) / 2);
    }
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15px;
    height: 15px;
    background-color: transparent;
    color: color('dark');
  }

  &__cross {
    width: 100%;
    height: 100%;
  }

  &__a11y {
    @extend %a11y-hidden;
  }

  &__content {
    flex: 1;
    width: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    padding: 0 var(--spacing-unit) var(--spacing-unit);

    @include media('sm') {
      padding: 0 calc(var(--spacing-unit) / 2) calc(var(--spacing-unit) / 2);
    }
  }
}
</style>
