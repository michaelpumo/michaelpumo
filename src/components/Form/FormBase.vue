<template>
  <form
    novalidate
    autocomplete="off"
    :class="[
      $options.class,
      { 'is-loading': loading }
    ]">
    <slot />
  </form>
</template>

<script>
export default {
  name: 'FormBase',
  class: 'FormBase',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
$root: &;

.FormBase {
  width: 100%;
  transition: opacity $trans-speed $trans-ease;

  &.is-loading {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
