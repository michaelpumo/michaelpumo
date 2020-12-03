<template>
  <component
    :is="tag"
    :type="isObjectEmpty(route) ? type : null"
    :to="!isObjectEmpty(route) ? route : null"
    :class="[$options.className, { 'is-loading': loading }]"
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
import { isObjectEmpty } from '@/utils/helpers.js'
import LoadingRequest from '@/components/app/LoadingRequest.vue'

export default {
  name: 'ButtonInput',
  components: {
    LoadingRequest,
  },
  className: 'ButtonInput',
  props: {
    label: {
      type: String,
      required: true,
    },
    route: {
      type: Object,
      default: () => ({}),
    },
    type: {
      type: String,
      default: 'button',
      validator(value) {
        return ['button', 'submit'].includes(value)
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    tag() {
      return this.isObjectEmpty(this.route) ? 'button' : 'NuxtLink'
    },
  },
  methods: {
    isObjectEmpty,
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.ButtonInput {
  @include type-style('5');

  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  font-weight: 500;
  padding: 0 30px;
  margin: 0;
  border: none;
  background-color: transparent;
  background-image: none;
  border-color: var(--color-theme);
  border-radius: 30px;
  border-style: solid;
  border-width: 2px;
  color: var(--color-theme);
  outline: none;
  text-decoration: none;
  transition: opacity $trans-speed $trans-ease, color $trans-speed $trans-ease,
    border-color $trans-speed $trans-ease,
    background-color $trans-speed $trans-ease;
  user-select: none;
  white-space: nowrap;

  @include media('sm') {
    @include type-style('4');

    height: 60px;
  }

  &:hover,
  &:active,
  &:focus {
    background-color: var(--color-theme);
    color: color('dark');
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
