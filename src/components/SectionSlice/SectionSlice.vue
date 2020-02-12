<template>
  <section
    ref="section"
    :class="[
      $options.className,
      { 'is-sticky': isSticky }
    ]">
    <slot />
  </section>
</template>

<script>
export default {
  name: 'SectionSlice',
  className: 'SectionSlice',
  data() {
    return ({
      isSticky: false
    })
  },
  mounted() {
    this.evaluateSticky()
    window.addEventListener('resize', this.evaluateSticky)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.evaluateSticky)
  },
  methods: {
    evaluateSticky() {
      this.isSticky = parseInt(this.$refs.section.offsetHeight, 10) <= window.innerHeight
    }
  }
}
</script>

<style lang="scss" scoped>
.SectionSlice {
  position: relative;
  width: 100%;
  min-height: 100vh;

  &.is-sticky {
    position: sticky;
    top: 0;
  }
}
</style>
