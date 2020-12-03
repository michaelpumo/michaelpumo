<template>
  <div
    :class="[$options.className, { 'is-visible': active }]"
    :style="[position]"
  >
    <SvgIcon :class="`${$options.className}__pointer`" name="cursor-arrow" />
  </div>
</template>

<script>
import '@/assets/icons/js/cursor-arrow.js'

export default {
  name: 'AppCursor',
  className: 'AppCursor',
  data: () => ({
    x: 0,
    y: 0,
    active: false,
  }),
  computed: {
    position() {
      const scale = this.active ? 1 : 2

      return {
        transform: `scale(${scale})`,
        top: `${this.y}px`,
        left: `${this.x}px`,
      }
    },
  },
  mounted() {
    window.addEventListener('mousemove', this.track)
    document.addEventListener('mouseover', this.documentOver)
    document.addEventListener('mouseout', this.documentOut)
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.track)
    document.removeEventListener('mouseover', this.documentOver)
    document.removeEventListener('mouseout', this.documentOut)
  },
  methods: {
    track(e) {
      this.x = e.clientX
      this.y = e.clientY
    },
    documentOver() {
      this.active = true
    },
    documentOut() {
      this.active = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.AppCursor {
  $root: &;

  position: fixed;
  top: 0;
  left: 0;
  z-index: depth('cursor');
  display: none;
  width: 44px;
  height: 44px;
  opacity: 0;
  cursor: none;
  pointer-events: none;
  transition: opacity $trans-speed $trans-ease,
    transform $trans-speed $trans-ease;
  user-select: none;

  @media (any-pointer: fine) {
    display: block;
  }

  &.is-visible {
    opacity: 1;
  }

  &__pointer {
    width: 100%;
    height: 100%;
    fill: color('dark');
    filter: drop-shadow(5px 5px 5px #{rgba(color('dark'), 0.3)});
    stroke: color('light');
  }
}
</style>
