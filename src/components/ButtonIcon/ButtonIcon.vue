<template>
  <button
    type="button"
    :class="$options.className"
  >
    <div :class="`${$options.className}__icon`">
      <slot />
    </div>
    <template v-if="label">
      {{ label }}
    </template>
  </button>
</template>

<script>
export default {
  name: 'ButtonIcon',
  className: 'ButtonIcon',
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.ButtonIcon {
  padding: 0;
  margin: 0;
  border: none;
  cursor: pointer;
  outline: none;
  user-select: none;
  white-space: nowrap;

  &__icon {
    width: 50px;
    height: 50px;
    padding: 10px;
    background-color: var(--color-theme);
    border-radius: 50%;

    @include media("sm") {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
