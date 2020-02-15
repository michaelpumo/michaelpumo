<template>
  <div
    :class="[
      $options.class,
      `is-${type}`
    ]">
    <input
      :id="fieldId"
      v-model="checked"
      :type="type"
      :class="`${$options.class}__input`"
      :value="toggleValue"
      v-bind="$attrs"
      v-on="listeners"
    >

    <div :class="`${$options.class}__marker`" />

    <div :class="`${$options.class}__text`">
      {{ text }}
    </div>

    <FormValidation
      v-if="validation"
      :validation="validation"
    />
  </div>
</template>

<script>
import FormValidation from '@/components/Form/FormValidation.vue'

export default {
  name: 'FormToggle',
  class: 'FormToggle',
  components: {
    FormValidation
  },
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'checkbox',
      validator(value) {
        return [
          'checkbox',
          'radio'
        ].includes(value)
      }
    },
    text: {
      type: String,
      required: true
    },
    value: {}, // eslint-disable-line
    toggleValue: {
      type: String,
      required: true
    },
    validation: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      checkedProxy: false
    }
  },
  computed: {
    checked: {
      get() {
        return this.value
      },
      set(val) {
        this.checkedProxy = val
      }
    },
    fieldId() {
      return `field-${this.id}`
    },
    listeners() {
      return {
        change: () => this.$emit('input', this.checkedProxy)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.FormToggle {
  $root: &;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin: 0 0 spacing("sm") 0;

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

  &__marker,
  &__text {
    position: relative;
    z-index: 0;
    pointer-events: none;
  }

  &__marker {
    position: relative;
    width: 24px;
    height: 24px;
    margin: 0 spacing("sm") 0 0;
    background-color: color("light");

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 3px solid color("light");
      opacity: 0;
      background-color: color("dark");
      transform: scale(0);
      transition:
        opacity $trans-speed $trans-ease,
        transform $trans-speed $trans-ease;
    }

    #{$root}.is-checkbox & {
      border-radius: 5px;

      &::before {
        border-radius: 6px;
      }
    }

    #{$root}.is-radio & {
      &,
      &::before {
        border-radius: 50%;
      }
    }

    #{$root}__input:checked + & {
      &::before {
        opacity: 1;
        background-color: color("dark");
        transform: scale(1);
      }
    }
  }
}
</style>
