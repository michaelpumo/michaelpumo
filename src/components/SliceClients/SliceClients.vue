<template>
  <section :class="$options.className">
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
  </section>
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

export default {
  name: 'SliceClients',
  className: 'SliceClients',
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

  width: 100%;

  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    min-height: 100vh;
    margin: 0;
    background-color: color("light");
    grid-gap: 1px;
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

  &__logo {
    height: 23px;
    color: color("dark");
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
    visibility: hidden;
    background-color: color("light");
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

    @include media("lg") {
      padding: calc(var(--spacing-unit) / 2);
    }
  }

  &__name,
  &__role {
    width: 100%;
    max-width: 320px;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity $trans-speed $trans-ease,
      visibility $trans-speed $trans-ease;
  }

  &__role {
    margin-bottom: 0;
  }
}
</style>
