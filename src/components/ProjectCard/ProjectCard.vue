<template>
  <PrismicLink
    :link="link"
    :class="$options.className">
    <g-image
      v-if="!isObjectEmpty(image)"
      :src="image.url"
      :width="image.dimensions.width.toString()"
      :height="image.dimensions.height.toString()"
      :alt="image.alt || name || 'Michael Pumo'"
      :class="`${$options.className}__image`" />

    <div :class="`${$options.className}__info`">
      <h4
        v-if="name"
        :class="`${$options.className}__name`">
        {{ name }}
      </h4>
      <p
        v-if="role"
        :class="`${$options.className}__role`">
        {{ role }}
      </p>
    </div>
  </PrismicLink>
</template>

<script>
import { isObjectEmpty } from '@/utils/helpers'
import PrismicLink from '@/components/PrismicLink/PrismicLink.vue'

export default {
  name: 'ProjectCard',
  className: 'ProjectCard',
  components: {
    PrismicLink
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      default: ''
    },
    image: {
      type: Object,
      default: () => ({})
    },
    link: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    isObjectEmpty
  }
}
</script>

<style lang="scss" scoped>
.ProjectCard {
  $root: &;

  @include shadow-box();

  position: relative;
  display: block;
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-bottom: 133%;
  margin: 0;
  background-color: color("light");
  color: color("light");

  &__image {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__info {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    box-sizing: border-box;
    padding: var(--spacing-unit);
    background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);

    @include media("sm") {
      padding: calc(var(--spacing-unit) / 2);
    }
  }

  &__name {
    // margin: 0;
    color: inherit;
  }

  &__role {
    margin-bottom: 0;
  }
  // &__window {

  //   display: flex;
  //   flex-direction: column;
  //   width: calc(100vw - var(--spacing-unit));
  //   max-width: 600px;
  //   height: calc((var(--vh, 1vh) * 100) - var(--spacing-unit));
  //   overflow: hidden;
  //   opacity: 0;
  //   background-color: color("light");
  //   transform: scale(0.95);
  //   transition:
  //     opacity $trans-speed $trans-ease $trans-speed,
  //     transform $trans-speed $trans-ease $trans-speed;

  //   #{$root}.is-open & {
  //     opacity: 1;
  //     transform: scale(1);
  //   }
  // }

  // &__header {
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  //   width: 100%;
  //   padding: var(--spacing-unit);
  //   background-color: color("light");

  //   @include media("sm") {
  //     padding: calc(var(--spacing-unit) / 2);
  //   }
  // }

  // &__close {
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   width: 15px;
  //   height: 15px;
  //   background-color: transparent;
  //   color: color("dark");
  // }

  // &__cross {
  //   width: 100%;
  //   height: 100%;
  // }

  // &__a11y {
  //   @extend %a11y-hidden;
  // }

  // &__content {
  //   flex: 1;
  //   width: 100%;
  //   overflow-y: scroll;
  //   -webkit-overflow-scrolling: touch;
  //   padding: var(--spacing-unit);
  //   padding-top: 0;

  //   @include media("sm") {
  //     padding: calc(var(--spacing-unit) / 2);
  //     padding-top: 0;
  //   }
  // }
}
</style>
