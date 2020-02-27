<template>
  <component
    :is="tag"
    ref="element">
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
      default: false
    },
    tag: {
      type: String,
      default: 'div'
    },
    delay: {
      type: Number,
      default: 0
    }
  },
  watch: {
    active(val) {
      if (val) {
        this.animation.play()
      } else {
        this.animation.reverse()
      }
    }
  },
  mounted() {
    const target = this.$refs.element

    this.animation = anime.timeline({
      loop: false,
      autoplay: false
    })
      .add({
        targets: target,
        skew: ['-10deg', '0deg'],
        translateX: [10, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 500,
        delay: this.delay
      })
  }
}
</script>
