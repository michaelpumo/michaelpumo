<template>
  <PrismicLink :link="link" :class="$options.className">
    <ImageLazy
      v-if="!isObjectEmpty(image)"
      :src="image.url"
      :width="image.dimensions.width.toString()"
      :height="image.dimensions.height.toString()"
      :alt="image.alt || name || 'Web development project'"
      :class="`${$options.className}__image`"
    />

    <div :class="`${$options.className}__info`">
      <h3 v-if="name" :class="`${$options.className}__name`">
        {{ name }}
      </h3>
      <p v-if="role" :class="`${$options.className}__role`">
        {{ role }}
      </p>
    </div>
  </PrismicLink>
</template>

<script>
import { isObjectEmpty } from '@/utils/helpers.js'
import ImageLazy from '@/components/app/ImageLazy.vue'
import PrismicLink from '@/components/prismic/Link.vue'

export default {
  name: 'ProjectCard',
  className: 'ProjectCard',
  components: {
    ImageLazy,
    PrismicLink,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      default: '',
    },
    image: {
      type: Object,
      default: () => ({}),
    },
    link: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    isObjectEmpty,
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

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
  background-color: color('dark');
  color: color('light');

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
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0) 100%
    );

    @include media('sm') {
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
}
</style>
