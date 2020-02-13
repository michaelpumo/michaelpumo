<template>
  <div :class="$options.className">
    <div :class="`${$options.className}__top`" />

    <div :class="`${$options.className}__middle`">
      <h1
        v-if="title"
        :class="`${$options.className}__title`">
        {{ title }}
      </h1>

      <PrismicRichtext
        v-if="description && description.length"
        :class="`${$options.className}__description`"
        :html="description" />

      <p :class="`${$options.className}__cta`">
        <ButtonInput
          label="Let's work together!" />
      </p>
    </div>

    <PrismicRichtext
      v-if="colophon && colophon.length"
      :class="`${$options.className}__colophon`"
      :html="colophon" />
  </div>
</template>

<script>
import ButtonInput from '@/components/ButtonInput/ButtonInput.vue'
import PrismicRichtext from '@/components/PrismicRichtext/PrismicRichtext'

export default {
  name: 'AppHero',
  className: 'AppHero',
  components: {
    ButtonInput,
    PrismicRichtext
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: Array,
      default: () => ([])
    },
    colophon: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style lang="scss" scoped>
.AppHero {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  color: var(--color-theme);

  &::v-deep {
    a {
      color: color("light");
    }
  }

  &__top {

  }

  &__middle {
    max-width: 600px;
  }

  &__bottom {

  }

  &__title {
    color: var(--color-theme);
  }

  &__description {
    @include media("sm") {
      margin-bottom: spacing("md");
    }

    &::v-deep {
      p {
        @include type-style("5");

        @include media("sm") {
          @include type-style("4");
        }
      }

      br {
        display: none;

        @include media("sm") {
          display: block;
        }
      }
    }
  }

  &__cta {
    margin: 0;
  }

  &__colophon {
    color: color("slate");

    &::v-deep {
      p {
        @include type-style("6");

        margin-bottom: 0;
      }
    }
  }
}
</style>
