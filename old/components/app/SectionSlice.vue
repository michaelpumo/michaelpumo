<template>
  <section
    ref="section"
    :class="[$options.className, { 'is-sticky': isSticky }]"
  >
    <slot />
  </section>
</template>

<script>
export default {
  name: 'SectionSlice',
  className: 'SectionSlice',
  data: () => ({
    isSticky: false,
  }),
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
      const { section } = this.$refs
      this.isSticky = section
        ? parseInt(section.offsetHeight, 10) <= window.innerHeight
        : false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

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
