<template>
  <SectionSlice :class="$options.className">
    <Flickity
      ref="flickity"
      :options="flickityOptions"
      :class="`${$options.className}__list`">
      <blockquote
        v-for="(client, index) in slice.fields"
        :key="index"
        :class="`${$options.className}__item`">
        <PrismicRichtext
          v-if="client.quote && client.quote.length"
          :class="`${$options.className}__quote`"
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
    </Flickity>
  </SectionSlice>
</template>

<script>
import Flickity from 'vue-flickity'
import PrismicRichtext from '@/components/PrismicRichtext/PrismicRichtext'
import SectionSlice from '@/components/SectionSlice/SectionSlice'

export default {
  name: 'SliceQuotes',
  className: 'SliceQuotes',
  components: {
    Flickity,
    PrismicRichtext,
    SectionSlice
  },
  props: {
    slice: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      flickityOptions: {
        autoPlay: 5000,
        pauseAutoPlayOnHover: true,
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: true,
        wrapAround: true,
        resize: true,
        fade: true
      }
    }
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

  &::v-deep {
    .flickity-page-dots {
      bottom: -55px;
      left: -8px;
      display: flex;
      width: 100%;
      overflow: hidden;
      text-align: left;

      .dot {
        position: relative;
        display: block;
        width: 25px;
        height: 30px;
        margin: 0;
        opacity: 0.5;
        background-color: transparent;
        border-radius: 0;
        cursor: none;
        transition: opacity $trans-speed $trans-ease;

        &.is-selected {
          opacity: 1;
        }

        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 10px;
          height: 10px;
          background-color: color("light");
          border-radius: 50%;
          transform: translate3d(-50%, -50%, 0);
        }
      }
    }
  }

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

    &.is-selected {
      opacity: 1;
    }
  }

  &__quote {
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
