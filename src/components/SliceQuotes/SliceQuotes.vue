<template>
  <SectionSlice :class="$options.className">
    <div
      ref="carousel"
      :class="[
        `${$options.className}__container`,
        'swiper-container'
      ]">
      <ul
        :class="[
          `${$options.className}__list`,
          'swiper-wrapper'
        ]">
        <li
          v-for="(client, index) in slice.fields"
          :key="index"
          :class="`${$options.className}__item  swiper-slide`">
          <blockquote :class="`${$options.className}__blockquote`">
            <PrismicRichtext
              v-if="client.quote && client.quote.length"
              :class="`${$options.className}__content`"
              :html="client.quote" />
            <footer>
              <h4
                v-if="client.name"
                :class="`${$options.className}__name`">
                {{ client.name }}
              </h4>
              <p
                v-if="client.author"
                :class="`${$options.className}__author`">
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
import { Swiper, Keyboard, Pagination } from 'swiper/js/swiper.esm'
import PrismicRichtext from '@/components/PrismicRichtext/PrismicRichtext'
import SectionSlice from '@/components/SectionSlice/SectionSlice'

export default {
  name: 'SliceQuotes',
  className: 'SliceQuotes',
  components: {
    PrismicRichtext,
    SectionSlice
  },
  props: {
    slice: {
      type: Object,
      default: () => ({})
    }
  },
  mounted() {
    Swiper.use([Keyboard, Pagination])

    this.carousel = new Swiper(this.$refs.carousel, {
      keyboard: {
        enabled: true
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
        clickable: true
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.SliceQuotes {
  $root: &;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: var(--spacing-unit);
  background-color: var(--color-theme);

  &__list {
    width: 100%;
    max-width: 600px;
    padding: 0;
    margin: 0;
    background-color: transparent;
    user-select: none;
  }

  &__item {
    display: block;
    width: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    background-color: transparent;
    color: color("dark");
    transition: opacity $trans-speed $trans-ease;

    &.swiper-slide-active {
      opacity: 1;
    }
  }

  &__blockquote {
    width: 100%;
    margin: 0;
  }

  &__content {
    &::v-deep * {
      @include type-style("3");

      font-weight: 500;

      @include media("sm") {
        @include type-style("2");
      }
    }
  }

  &__name,
  &__author {
    width: 100%;
    max-width: 320px;
  }

  &__author {
    margin-bottom: 0;
  }
}
</style>
