<template>
  <header :class="$options.className">
    <h1
      v-if="title"
      :class="`${$options.className}__title`">
      {{ title }}
    </h1>
    <div
      v-if="$slots.default"
      :class="`${$options.className}__description`">
      <slot />
    </div>
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
  &__title {
    color: var(--color-theme);
  }

  &__description {
    &::v-deep {
      p {
        @include type-style("3");
      }
    }
  }
}
</style>
