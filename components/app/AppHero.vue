<template>
  <div :class="$options.className">
    <div :class="`${$options.className}__top`" />

    <div :class="`${$options.className}__middle`">
      <AppReveal
        v-if="title"
        tag="h1"
        :active="ready"
        :delay="250"
        :class="`${$options.className}__title`"
      >
        {{ title }}
      </AppReveal>

      <AppReveal
        v-if="description && description.length"
        :active="ready"
        :delay="500"
      >
        <PrismicRichtext
          :class="`${$options.className}__description`"
          :html="description"
          br-off="xsMax"
        />
      </AppReveal>

      <AppReveal
        v-if="buttonId && buttonTitle"
        tag="p"
        :active="ready"
        :delay="750"
        :class="`${$options.className}__cta`"
      >
        <ButtonInput
          v-jump-to="{
            id: slugify(buttonId),
          }"
          :label="buttonTitle"
        />
      </AppReveal>
    </div>

    <AppReveal v-if="colophon && colophon.length" :active="ready" :delay="1000">
      <PrismicRichtext
        :class="`${$options.className}__colophon`"
        :html="colophon"
      />
    </AppReveal>
  </div>
</template>

<script>
import { slugify } from '@/utils/helpers.js'
import AppReveal from '@/components/app/AppReveal.vue'
import ButtonInput from '@/components/app/ButtonInput.vue'
import PrismicRichtext from '@/components/prismic/RichText.vue'

export default {
  name: 'AppHero',
  className: 'AppHero',
  components: {
    AppReveal,
    ButtonInput,
    PrismicRichtext,
  },
  props: {
    ready: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: Array,
      default: () => [],
    },
    colophon: {
      type: Array,
      default: () => [],
    },
    buttonTitle: {
      type: String,
      default: '',
    },
    buttonId: {
      type: String,
      default: '',
    },
  },
  methods: {
    slugify,
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.AppHero {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  color: var(--color-theme);

  &::v-deep {
    a {
      color: color('light');
    }
  }

  &__top {
    width: 100%;
    height: var(--button-size);
  }

  &__middle {
    max-width: 450px;

    @include media('sm') {
      max-width: 600px;
    }
  }

  &__title {
    color: var(--color-theme);
    transition: color $trans-speed $trans-ease;
  }

  &__description {
    margin-top: 0;

    @include media('sm') {
      margin-bottom: spacing('md');
    }

    &::v-deep {
      * {
        transition: color $trans-speed $trans-ease;
      }

      p {
        @include type-style('5');

        @include media('sm') {
          @include type-style('4');
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
    color: tint(color('slate'), 50%);

    &::v-deep {
      p {
        @include type-style('6');

        margin-bottom: 0;
      }
    }
  }
}
</style>
