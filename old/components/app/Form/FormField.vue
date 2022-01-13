<template>
  <div :class="[$options.className, { a11y: a11y }]">
    <component
      :is="id ? 'label' : 'div'"
      v-if="label"
      :for="id ? fieldId : false"
      :class="`${$options.className}__label`"
    >
      {{ label }}
    </component>
    <div :class="`${$options.className}__field`">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormField',
  className: 'FormField',
  props: {
    label: {
      type: String,
      required: false,
      default: '',
    },
    a11y: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: '',
    },
  },
  computed: {
    fieldId() {
      return `field-${this.id}`
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.FormField {
  $root: &;

  width: 100%;
  margin: 0 0 spacing('sm') 0;

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
