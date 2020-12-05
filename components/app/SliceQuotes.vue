<template>
  <SectionSlice :class="$options.className">
    <div
      ref="carousel"
      :class="[`${$options.className}__container`, 'swiper-container']"
    >
      <ul :class="[`${$options.className}__list`, 'swiper-wrapper']">
        <li
          v-for="(client, index) in slice.items"
          :key="index"
          :class="[`${$options.className}__item`, 'swiper-slide']"
        >
          <blockquote :class="`${$options.className}__blockquote`">
            <PrismicRichtext
              v-if="client.quote && client.quote.length"
              :class="`${$options.className}__content`"
              :html="client.quote"
            />
            <footer>
              <h4 v-if="client.name" :class="`${$options.className}__name`">
                {{ client.name }}
              </h4>
              <p v-if="client.author" :class="`${$options.className}__author`">
                <cite>{{ client.author }}</cite>
              </p>
            </footer>
          </blockquote>
        </li>
      </ul>
      <div class="swiper-pagination" />
    </div>
  </SectionSlice>
</template>

<script>
import { Swiper, Keyboard, Pagination } from 'swiper'
import 'swiper/swiper-bundle.css'
import PrismicRichtext from '@/components/prismic/RichText.vue'
import SectionSlice from '@/components/app/SectionSlice.vue'

export default {
  name: 'SliceQuotes',
  className: 'SliceQuotes',
  components: {
    PrismicRichtext,
    SectionSlice,
  },
  props: {
    slice: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      carousel: undefined,
    }
  },
  async mounted() {
    await this.$nextTick()

    if (!this.$refs.carousel) {
      return
    }

    Swiper.use([Keyboard, Pagination])

    this.carousel = new Swiper(this.$refs.carousel, {
      keyboard: {
        enabled: true,
      },
      direction: 'horizontal',
      grabCursor: false,
      navigation: false,
      slidesPerView: 1,
      speed: 350,
      loop: false,
      spaceBetween: 0,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
    })
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.SliceQuotes {
  $root: &;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  padding: var(--spacing-unit);
  background-color: var(--color-theme);
  transition: background-color $trans-speed $trans-ease;

  &::v-deep {
    .swiper-pagination {
      bottom: -60px;
      left: -10px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      background-color: transparent;
    }

    .swiper-pagination-bullet {
      position: relative;
      width: 30px;
      height: 30px;
      margin: 0;
      opacity: 0.5;
      background-color: transparent;
      border-radius: 0;
      cursor: none;
      transition: opacity ($trans-speed * 2) $trans-ease;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        width: 10px;
        height: 10px;
        background-color: color('light');
        border-radius: 50%;
        transform: translate3d(-50%, -50%, 0);
      }

      &-active {
        opacity: 1;
      }
    }
  }

  &__container {
    width: 100%;
    max-width: 700px;
    overflow: visible;
    margin: 0 auto;
  }

  &__list {
    width: 100%;
    padding: 0;
    margin: 0;
    user-select: none;
  }

  &__item {
    display: block;
    width: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    color: color('dark');
    transform: translate3d(10px, 0, 0) skew(-10deg);
    transition: transform ($trans-speed * 2) ($trans-speed / 4) $trans-ease,
      opacity ($trans-speed * 2) $trans-ease;

    &.swiper-slide-active {
      opacity: 1;
      transform: translate3d(0, 0, 0) skew(0deg);
    }
  }

  &__blockquote {
    width: 100%;
    margin: 0;
  }

  &__content {
    &::v-deep * {
      @include type-style('3');

      font-weight: 500;

      @include media('sm') {
        @include type-style('2');
      }
    }
  }

  &__name,
  &__author {
    width: 100%;
  }

  &__author {
    margin-bottom: 0;
  }
}
</style>
