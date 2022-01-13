<template>
  <div :class="$options.className">
    <div :class="`${$options.className}__wrapper`">
      <input
        :id="fieldId"
        type="checkbox"
        :class="`${$options.className}__input`"
        :checked="shouldBeChecked"
        v-bind="$attrs"
        @change="updateInput"
      />

      <div :class="`${$options.className}__box`">
        <SvgIcon :class="`${$options.className}__check`" name="check" />
      </div>

      <div :class="`${$options.className}__text`">
        {{ text }}
      </div>
    </div>

    <FormValidation v-if="validation" :validation="validation" />
  </div>
</template>

<script>
import '@/assets/icons/js/check.js'
import FormValidation from '@/components/app/Form/FormValidation.vue'

export default {
  name: 'FormCheckbox',
  className: 'FormCheckbox',
  components: {
    FormValidation,
  },
  inheritAttrs: false,
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [Array, Boolean],
      default: false,
    },
    trueValue: {
      type: Boolean,
      default: true,
    },
    falseValue: {
      type: Boolean,
      default: false,
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
    shouldBeChecked() {
      if (Array.isArray(this.modelValue)) {
        return this.modelValue.includes(this.value)
      }

      return this.modelValue === this.trueValue
    },
  },
  methods: {
    updateInput(event) {
      const isChecked = event.target.checked

      if (Array.isArray(this.modelValue)) {
        const newValue = [...this.modelValue]

        if (isChecked) {
          newValue.push(this.value)
        } else {
          newValue.splice(newValue.indexOf(this.value), 1)
        }

        this.$emit('change', newValue)
      } else {
        this.$emit('change', isChecked ? this.trueValue : this.falseValue)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.FormCheckbox {
  $root: &;

  width: 100%;
  margin: 0 0 spacing('sm') 0;
  user-select: none;

  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  }

  &__input {
    position: absolute;
    z-index: 1;
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0;
    appearance: none;
    background: none;
    background-color: transparent;
  }

  &__box,
  &__text {
    position: relative;
    z-index: 0;
    pointer-events: none;
  }

  &__box {
    position: relative;
    width: 24px;
    height: 24px;
    margin: 0;
    border: 2px solid rgba(color('light'), 0);
    background-color: lighten(color('grey'), 2.5%);
    border-radius: 5px;
    color: inherit;
    transition: color $trans-speed $trans-ease,
      border-color $trans-speed $trans-ease,
      background-color $trans-speed $trans-ease;

    #{$root}__input:checked + & {
      background-color: color('light');
      border-color: color('blue');
      color: color('dark');

      #{$root}__check {
        opacity: 1;
        transform: scale(1);
      }
    }
  }

  &__check {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transform: scale(0);
    transition: opacity $trans-speed $trans-ease,
      transform $trans-speed $trans-ease;
  }

  &__text {
    flex: 1;
    margin: 0 0 -2px 15px;
  }
}
</style>
