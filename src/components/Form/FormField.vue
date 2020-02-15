<template>
  <div
    :class="[
      $options.class,
      { 'a11y': a11y }
    ]"
  >
    <component
      :is="(id) ? 'label' : 'div'"
      v-if="label"
      :for="(id) ? fieldId : false"
      :class="`${$options.class}__label`"
    >
      {{ label }}
    </component>
    <div :class="`${$options.class}__field`">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormField',
  class: 'FormField',
  props: {
    label: {
      type: String,
      required: false,
      default: ''
    },
    a11y: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  },
  computed: {
    fieldId() {
      return `field-${this.id}`
    }
  }
}
</script>

<style lang="scss" scoped>
.FormField {
  $root: &;

  width: 100%;
  margin: 0 0 spacing("sm") 0;

  &__label {
    @include label;

    #{$root}.a11y & {
      @extend %a11y-hidden;
    }
  }

  &__field {
    width: 100%;
  }
}
</style>
