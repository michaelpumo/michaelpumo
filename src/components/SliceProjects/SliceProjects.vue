<template>
  <SectionSlice :class="$options.className">
    <PrismicRichtext
      v-if="slice.primary.content"
      :class="`${$options.className}__content`"
      :html="slice.primary.content" />

    <ul :class="`${$options.className}__list`">
      <li
        v-for="(project, index) in slice.fields"
        :key="index"
        :class="`${$options.className}__item`">
        <!-- {{ project.link }}
        {{ project.image }} -->
        <div :class="`${$options.className}__info`">
          <h4
            v-if="project.name"
            :class="`${$options.className}__name`">
            {{ project.name }}
          </h4>
          <p
            v-if="project.role"
            :class="`${$options.className}__role`">
            {{ project.role }}
          </p>
        </div>
      </li>
    </ul>
  </SectionSlice>
</template>

<script>
import PrismicRichtext from '@/components/PrismicRichtext/PrismicRichtext'
import SectionSlice from '@/components/SectionSlice/SectionSlice'

export default {
  name: 'SliceProjects',
  className: 'SliceProjects',
  components: {
    PrismicRichtext,
    SectionSlice
  },
  props: {
    slice: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
.SliceProjects {
  $root: &;

  padding: var(--spacing-unit);
  background-color: color("grey");

  &__content {
    width: 100%;
    max-width: 550px;
  }

  &__list {
    margin: 0 0 -#{spacing("sm")} 0;

    @include media("xs") {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: var(--spacing-unit);
      grid-row-gap: calc((var(--spacing-unit) - #{spacing("sm")}) / 2);
    }
  }
}
</style>
