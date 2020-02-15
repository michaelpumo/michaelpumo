<template>
  <SectionSlice :class="$options.className">
    <ul :class="`${$options.className}__list`">
      <li
        v-for="(client, index) in slice.fields"
        :key="index"
        :class="`${$options.className}__item`">
        <SvgIcon
          :class="`${$options.className}__logo`"
          :name="`logo-${client.logo}`"
        />
        <div :class="`${$options.className}__info`">
          <h4
            v-if="client.name"
            :class="`${$options.className}__name`">
            {{ client.name }}
          </h4>
          <p
            v-if="client.role"
            :class="`${$options.className}__role`">
            {{ client.role }}
          </p>
        </div>
      </li>
    </ul>
  </SectionSlice>
</template>

<script>
import '@/assets/icons/logo-allofus'
import '@/assets/icons/logo-foolproof'
import '@/assets/icons/logo-parallel'
import '@/assets/icons/logo-raggededge'
import '@/assets/icons/logo-rotate'
import '@/assets/icons/logo-someone'
import '@/assets/icons/logo-somo'
import '@/assets/icons/logo-thehoxton'
import SectionSlice from '@/components/SectionSlice/SectionSlice'

export default {
  name: 'SliceClients',
  className: 'SliceClients',
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
.SliceClients {
  $root: &;

  background-color: color("light");

  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    min-height: 100vh;
    margin: 0;
    grid-gap: 2px;
  }

  &__item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: color("grey");

    &:hover {
      #{$root}__info {
        @supports (clip-path: circle(0% at 0 0)) {
          clip-path: circle(100% at 50% 50%);
        }
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
    max-width: 80%;
    height: 16px;
    color: color("dark");

    @include media("sm") {
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
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: var(--spacing-unit);
    opacity: 0;
    background-color: color("light");
    pointer-events: none;
    transition:
      opacity $trans-speed $trans-ease,
      visibility $trans-speed $trans-ease;

    @supports (clip-path: circle(0% at 0 0)) {
      opacity: 1;
      clip-path: circle(0% at 50% 50%);
      transition: clip-path ($trans-speed * 2) $trans-ease;
    }

    @include media("lg") {
      padding: calc(var(--spacing-unit) / 2);
    }
  }

  &__name,
  &__role {
    width: 100%;
    max-width: 320px;
    opacity: 0;
    transform: translate3d(0, 10px, 0);
    transition:
      opacity $trans-speed $trans-ease,
      transform $trans-speed $trans-ease;
  }

  &__role {
    margin-bottom: 0;
  }
}
</style>
