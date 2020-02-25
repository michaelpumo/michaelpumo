<template>
  <div
    :class="[
      $options.className,
      { 'is-ready': appReady },
      `is-theme-${appTheme}`,
    ]">
    <router-view />

    <PortalTarget name="modal" />
    <AppCursor />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { vh } from '@/utils/helpers'

const credits = () => import(/* webpackChunkName: "extras" */ '@/utils/colophon')

export default {
  name: 'App',
  className: 'App',
  components: {
    AppCursor: () => import(/* webpackChunkName: "extras" */ '@/components/AppCursor/AppCursor')
  },
  computed: {
    ...mapGetters({
      appReady: 'app/ready',
      appTheme: 'app/theme'
    })
  },
  async mounted() {
    vh()

    this.setAppReady(true)

    window.addEventListener('resize', vh)

    const { colophon } = await credits()
    colophon()
  },
  beforeDestroy() {
    window.removeEventListener('resize', vh)
  },
  methods: {
    ...mapActions({
      setAppReady: 'app/setReady'
    })
  }
}
</script>
