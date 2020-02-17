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
        <ProjectCard
          :name="project.name"
          :role="project.role"
          :image="project.image"
          :link="project.link" />
      </li>
    </ul>
  </SectionSlice>
</template>

<script>
import PrismicRichtext from '@/components/PrismicRichtext/PrismicRichtext'
import ProjectCard from '@/components/ProjectCard/ProjectCard'
import SectionSlice from '@/components/SectionSlice/SectionSlice'

export default {
  name: 'SliceProjects',
  className: 'SliceProjects',
  components: {
    PrismicRichtext,
    ProjectCard,
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

  padding: calc((var(--spacing-unit) * 2) + var(--button-size)) var(--spacing-unit) calc(var(--spacing-unit) * 2);
  background-color: color("grey");

  @include media("lg") {
    padding: var(--spacing-unit);
  }

  &__content {
    width: 100%;
    max-width: 550px;
  }

  &__list {
    margin: 0 0 -#{spacing("sm")} 0;

    // @include media("xs") {
    //   display: grid;
    //   grid-template-columns: repeat(2, 1fr);
    //   grid-column-gap: var(--spacing-unit);
    //   grid-row-gap: calc((var(--spacing-unit) - #{spacing("sm")}) / 2);
    // }
  }
}
</style>
