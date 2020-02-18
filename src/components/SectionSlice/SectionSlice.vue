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
  async mounted() {
    await this.$nextTick()

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
  min-height: calc(var(--vh, 1vh) * 100);

  &.is-sticky {
    position: sticky;
    top: 0;
  }
}
</style>
