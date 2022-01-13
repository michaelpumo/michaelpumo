<template>
  <div :class="[$options.className]">
    <div :class="`${$options.className}__wrapper`">
      <select
        :id="fieldId"
        :name="fieldId"
        :class="[
          `${$options.className}__input`,
          { 'is-placeholder': selected === '' },
        ]"
        v-bind="$attrs"
        v-on="listeners"
      >
        <option value="" disabled selected>
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :selected="selected === option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <SvgIcon :class="`${$options.className}__icon`" icon="select-arrow" />
    </div>

    <FormValidation v-if="validation" :validation="validation" />
  </div>
</template>

<script>
import '@/assets/icons/js/select-arrow.js'
import FormValidation from '@/components/app/Form/FormValidation.vue'

export default {
  name: 'FormSelect',
  className: 'FormSelect',
  components: {
    FormValidation,
  },
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true,
    },
    selected: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Please select',
    },
    options: {
      type: Array,
      required: true,
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
        input: (event) => {
          const { value } = event.target.options[event.target.selectedIndex]
          return this.$emit('input', value)
        },
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.FormSelect {
  width: 100%;

  &__wrapper {
    position: relative;
    width: 100%;
  }

  &__input {
    @include input;

    &.is-placeholder {
      color: rgba(color('dark'), 0.5);
    }
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: (spacing('sm') / 2);
    z-index: 1;
    width: 12px;
    height: 8px;
    pointer-events: none;
    transform: translate3d(0, -50%, 0);
  }
}
</style>
