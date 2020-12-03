<template>
  <component :is="tag" ref="element" :class="$options.className">
    <slot />
  </component>
</template>

<script>
import anime from 'animejs'

export default {
  name: 'AppReveal',
  className: 'AppReveal',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'div',
    },
    delay: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    target() {
      return this.$refs.element
    },
  },
  watch: {
    active(val) {
      if (val) {
        this.animationPlay()
      } else {
        this.animationReverse()
      }
    },
  },
  mounted() {
    this.animationCreate()
  },
  methods: {
    animationCreate() {
      this.animation = anime
        .timeline({
          loop: false,
          autoplay: false,
        })
        .add({
          targets: this.target,
          skew: ['-10deg', '0deg'],
          translateX: [10, 0],
          translateZ: 0,
          opacity: [0, 1],
          easing: 'easeInOutQuad',
          duration: 500,
          delay: 250 + this.delay,
        })
    },
    animationPlay() {
      this.animation.play()
    },
    animationReverse() {
      this.animation.reverse()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.AppReveal {
  opacity: 0;
}
</style>
