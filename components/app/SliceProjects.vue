<template>
  <SectionSlice :class="$options.className">
    <PrismicRichtext
      v-if="slice.primary.content"
      :class="`${$options.className}__content`"
      :html="slice.primary.content"
    />

    <div
      ref="carousel"
      :class="[`${$options.className}__container`, 'swiper-container']"
    >
      <ul :class="[`${$options.className}__list`, 'swiper-wrapper']">
        <li
          v-for="(project, index) in slice.items"
          :key="index"
          :class="`${$options.className}__item swiper-slide`"
        >
          <ProjectCard
            :name="project.name"
            :role="project.role"
            :image="project.image"
            :link="project.link"
          />
        </li>
      </ul>
    </div>
  </SectionSlice>
</template>

<script>
import { Swiper, Keyboard } from 'swiper'
import 'swiper/swiper-bundle.css'
import PrismicRichtext from '@/components/prismic/RichText.vue'
import ProjectCard from '@/components/app/ProjectCard.vue'
import SectionSlice from '@/components/app/SectionSlice.vue'

export default {
  name: 'SliceProjects',
  className: 'SliceProjects',
  components: {
    PrismicRichtext,
    ProjectCard,
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

    Swiper.use([Keyboard])

    this.carousel = new Swiper(this.$refs.carousel, {
      keyboard: {
        enabled: true,
      },
      direction: 'horizontal',
      grabCursor: false,
      navigation: false,
      slidesPerView: 'auto',
      speed: 350,
      loop: true,
      spaceBetween: 20,
      pagination: false,
      // freeMode: true
    })
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.SliceProjects {
  $root: &;

  padding: calc((var(--spacing-unit) * 2) + var(--button-size))
    var(--spacing-unit) calc(var(--spacing-unit) * 2);
  background-color: color('light');

  @include media('lg') {
    padding: var(--spacing-unit);
  }

  &__content {
    width: 100%;
    max-width: 550px;
  }

  &__container {
    width: calc(100% + (var(--spacing-unit) * 2));
    padding: 0 var(--spacing-unit) 20px;
    margin: 0 0 0 calc(-1 * var(--spacing-unit));

    @include media('sm') {
      padding: 20px var(--spacing-unit);
    }

    @include media('lg') {
      padding: 25px var(--spacing-unit) 20px;
    }
  }

  &__list {
    margin: 0;
  }

  &__item {
    // width: calc(100% - (var(--spacing-unit) * 2));
    width: 80%;
    max-width: 400px;
  }
}
</style>
