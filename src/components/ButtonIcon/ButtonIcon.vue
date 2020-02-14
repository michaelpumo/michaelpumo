<template>
  <button
    type="button"
    :class="$options.className"
  >
    <div :class="`${$options.className}__icon`">
      <slot />
    </div>
    <div
      v-if="label"
      :class="`${$options.className}__label`">
      {{ label }}
    </div>
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
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  border: none;
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

  &__label {
    @include type-style("3");

    font-weight: 500;
    margin: 0 0 -2px spacing("sm");
    color: color("dark");
  }
}
</style>
