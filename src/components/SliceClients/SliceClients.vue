<template>
  <ul :class="$options.className">
    <li
      v-for="(client, index) in slice.fields"
      :key="index"
      :class="`${$options.className}__item`">
      <div :class="`${$options.className}__info`">
        <h3
          v-if="client.name"
          :class="`${$options.className}__name`">
          {{ client.name }}
        </h3>
        <p
          v-if="client.role"
          :class="`${$options.className}__role`">
          {{ client.role }}
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
// import PrismicRichtext from '@/components/PrismicRichtext/PrismicRichtext'

export default {
  name: 'SliceClients',
  className: 'SliceClients',
  components: {
    // PrismicRichtext
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
.SliceClients {
  $root: &;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1px;
  width: 100%;
  min-height: 100vh;
  background-color: color("light");

  &__item {
    position: relative;
    background-color: color("grey");

    &:hover {
      #{$root}__info {
        @supports (clip-path: circle(0% at 0 0)) {
          clip-path: circle(145% at 0 0);
        }
      }

      #{$root}__name,
      #{$root}__role {
        opacity: 1;
        visibility: visible;
        transition-delay: $trans-speed;
      }
    }
  }

  &__info {
    width: 100%;
    height: 100%;
    background-color: color("light");
    padding: calc(var(--spacing-unit) / 2);
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition:
      opacity $trans-speed $trans-ease,
      visibility $trans-speed $trans-ease;

    @supports (clip-path: circle(0% at 0 0)) {
      opacity: 1;
      visibility: visible;
      clip-path: circle(0% at 0 0);
      transition: clip-path ($trans-speed * 2) $trans-ease;
    }
  }

  &__name,
  &__role {
    width: 100%;
    max-width: 300px;
    margin: 0;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity $trans-speed $trans-ease,
      visibility $trans-speed $trans-ease;
  }
}
</style>
