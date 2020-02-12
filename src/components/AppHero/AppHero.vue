<template>
  <header :class="$options.className">
    <h1
      v-if="title"
      :class="`${$options.className}__title`">
      {{ title }}
    </h1>
    <slot />
    <p>
      <ButtonInput
        label="Let's work together!" />
    </p>
  </header>
</template>

<script>
import ButtonInput from '@/components/ButtonInput/ButtonInput.vue'

export default {
  name: 'AppHero',
  className: 'AppHero',
  components: {
    ButtonInput
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.AppHero {
  & > p {
    @include type-style("3");

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__title {
    color: var(--color-theme);
  }
}
</style>
