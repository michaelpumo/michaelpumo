<template>
  <div :class="$options.className">
    <component
      :is="type === 'textarea' ? 'textarea' : 'input'"
      :id="fieldId"
      :type="type"
      :name="fieldId"
      :class="`${$options.className}__input`"
      v-bind="$attrs"
      v-on="listeners"
    />

    <FormValidation v-if="validation" :validation="validation" />
  </div>
</template>

<script>
import FormValidation from '@/components/app/Form/FormValidation.vue'

export default {
  name: 'FormInput',
  className: 'FormInput',
  components: {
    FormValidation,
  },
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
      validator(value) {
        return [
          'text',
          'number',
          'tel',
          'email',
          'password',
          'search',
          'textarea',
          'date',
        ].includes(value)
      },
    },
    validation: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    fieldId() {
      return `field-${this.id}`
    },
    listeners() {
      return {
        ...this.$listeners,
        input: (event) => this.$emit('input', event.target.value),
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.FormInput {
  width: 100%;

  &__input {
    @include input;

    &[type='textarea'] {
      min-height: 180px;
    }
  }
}
</style>
