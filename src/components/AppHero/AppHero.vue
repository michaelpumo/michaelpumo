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
        :html="description"
        br-off="xsMax" />

      <p
        v-if="buttonId && buttonTitle"
        :class="`${$options.className}__cta`">
        <ButtonInput
          v-jump-to="{
            id: slugify(buttonId)
          }"
          :label="buttonTitle" />
      </p>
    </div>

    <PrismicRichtext
      v-if="colophon && colophon.length"
      :class="`${$options.className}__colophon`"
      :html="colophon" />
  </div>
</template>

<script>
import { slugify } from '@/utils/helpers'
import { jumpTo } from '@/utils/directives'
import ButtonInput from '@/components/ButtonInput/ButtonInput.vue'
import PrismicRichtext from '@/components/PrismicRichtext/PrismicRichtext'

export default {
  name: 'AppHero',
  className: 'AppHero',
  components: {
    ButtonInput,
    PrismicRichtext
  },
  directives: {
    jumpTo
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
    },
    buttonTitle: {
      type: String,
      default: ''
    },
    buttonId: {
      type: String,
      default: ''
    }
  },
  methods: {
    slugify
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
    width: 100%;
    height: var(--button-size);
  }

  &__middle {
    max-width: 600px;
  }

  &__title {
    color: var(--color-theme);
    transition: color $trans-speed $trans-ease;
  }

  &__description {
    @include media("sm") {
      margin-bottom: spacing("md");
    }

    &::v-deep {
      * {
        transition: color $trans-speed $trans-ease;
      }

      p {
        @include type-style("5");

        @include media("sm") {
          @include type-style("4");
        }
      }
    }
  }

  &__cta,
  &__colophon {
    display: inline-block;
    width: auto;
    pointer-events: auto;
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
