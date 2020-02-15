<template>
  <form
    novalidate
    autocomplete="off"
    :class="$options.class">
    <slot />
  </form>
</template>

<script>
export default {
  name: 'FormBase',
  class: 'FormBase'
}
</script>

<style lang="scss" scoped>
$root: &;

.FormBase {
  width: 100%;
  max-width: 700px;
}
</style>
