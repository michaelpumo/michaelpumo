<template>
  <SectionSlice :class="$options.className">
    <ul :class="`${$options.className}__list`">
      <li
        v-for="(project, index) in slice.fields"
        :key="index"
        :class="`${$options.className}__item`">
        {{ project.link }}
        {{ project.image }}
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
import SectionSlice from '@/components/SectionSlice/SectionSlice'

export default {
  name: 'SliceProjects',
  className: 'SliceProjects',
  components: {
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

  background-color: color("grey");
}
</style>
