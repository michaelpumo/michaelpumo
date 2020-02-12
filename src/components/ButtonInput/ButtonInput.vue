<template>
  <component
    :is="tag"
    :type="isObjectEmpty(route) ? type : null"
    :to="!isObjectEmpty(route) ? route : null"
    :class="[
      $options.className,
      `is-variant-${variant}`,
      { 'is-loading': loading }
    ]"
  >
    <template v-if="loading">
      Please wait... <LoadingRequest :class="`${$options.className}__loader`" />
    </template>
    <template v-else>
      {{ label }}
    </template>
  </component>
</template>

<script>
import { isObjectEmpty } from '@/utils/helpers'
import LoadingRequest from '@/components/LoadingRequest/LoadingRequest.vue'

export default {
  name: 'ButtonInput',
  components: {
    LoadingRequest
  },
  className: 'ButtonInput',
  props: {
    label: {
      type: String,
      required: true
    },
    route: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
      default: 'button',
      validator(value) {
        return [
          'button',
          'submit'
        ].includes(value)
      }
    },
    variant: {
      type: String,
      default: 'ghost',
      validator(value) {
        return [
          'ghost',
          'solid'
        ].includes(value)
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    tag() {
      return this.isObjectEmpty(this.route) ? 'button' : 'router-link'
    }
  },
  methods: {
    isObjectEmpty
  }
}
</script>

<style lang="scss" scoped>
.ButtonInput {
  @include type-style("4");

  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  font-weight: 500;
  padding: 0 30px;
  margin: 0;
  border: none;
  background-color: transparent;
  background-image: none;
  border-radius: 30px;
  border-style: solid;
  border-width: 2px;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  transition:
    opacity $trans-speed ease,
    color $trans-speed ease,
    border-color $trans-speed ease,
    background-color $trans-speed ease;
  user-select: none;
  white-space: nowrap;

  &.is-variant-solid {
    background-color: var(--color-theme);
    border-color: transparent;
    color: #fff;

    &:hover,
    &:active,
    &:focus {
      background-color: var(--color-theme);
    }
  }

  &.is-variant-ghost {
    background-color: transparent;
    border-color: var(--color-theme);
    color: var(--color-theme);

    &:hover,
    &:active,
    &:focus {
      background-color: var(--color-theme);
      color: color("dark");
    }
  }

  &.is-loading {
    background-color: var(--color-theme);
    border-color: transparent;
    color: #fff;
    pointer-events: none;

    &:hover,
    &:active,
    &:focus {
      background-color: var(--color-theme);
    }
  }

  &[disabled] {
    opacity: 0.2;
    pointer-events: none;
  }

  &__loader {
    margin: 0 0 0 10px;
  }
}
</style>
