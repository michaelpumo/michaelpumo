<template>
  <SectionSlice :class="$options.className">
    <ul :class="`${$options.className}__list`">
      <li
        v-for="(client, index) in slice.items"
        :key="index"
        :class="`${$options.className}__item`"
      >
        <SvgIcon
          :class="`${$options.className}__logo`"
          :name="`logo-${client.logo}`"
        />
        <div :class="`${$options.className}__info`">
          <h4 v-if="client.name" :class="`${$options.className}__name`">
            {{ client.name }}
          </h4>
          <p v-if="client.role" :class="`${$options.className}__role`">
            {{ client.role }}
          </p>
        </div>
      </li>
    </ul>
  </SectionSlice>
</template>

<script>
import '@/assets/icons/js/logo-allofus.js'
import '@/assets/icons/js/logo-foolproof.js'
import '@/assets/icons/js/logo-parallel.js'
import '@/assets/icons/js/logo-raggededge.js'
import '@/assets/icons/js/logo-rotate.js'
import '@/assets/icons/js/logo-someone.js'
import '@/assets/icons/js/logo-somo.js'
import '@/assets/icons/js/logo-thehoxton.js'
import SectionSlice from '@/components/app/SectionSlice.vue'

export default {
  name: 'SliceClients',
  className: 'SliceClients',
  components: {
    SectionSlice,
  },
  props: {
    slice: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.SliceClients {
  $root: &;

  background-color: color('light');

  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    min-height: calc(var(--vh, 1vh) * 100);
    margin: 0;
    grid-gap: 2px;
  }

  &__item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: color('grey');

    &:hover {
      #{$root}__info {
        opacity: 1;
        transition-delay: 0s;
      }

      #{$root}__name,
      #{$root}__role {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        transition-delay: $trans-speed;
      }
    }
  }

  &__logo {
    max-width: 60%;
    height: 16px;
    color: color('dark');

    @include media('sm') {
      max-width: 200px;
      height: 23px;
    }
  }

  &__info {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    display: none;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: var(--spacing-unit);
    opacity: 0;
    background-color: color('light');
    pointer-events: none;
    transition: opacity ($trans-speed * 2) $trans-ease,
      visibility ($trans-speed * 2) $trans-ease;
    transition-delay: $trans-speed;

    @include media('sm') {
      display: block;
    }

    @include media('lg') {
      padding: calc(var(--spacing-unit) / 2);
    }
  }

  &__name,
  &__role {
    width: 100%;
    max-width: 320px;
    opacity: 0;
    transform: translate3d(0, 5px, 0);
    transition: transform ($trans-speed) ($trans-speed / 4) $trans-ease,
      opacity ($trans-speed) $trans-ease;
  }

  &__role {
    margin-bottom: 0;
  }
}
</style>
