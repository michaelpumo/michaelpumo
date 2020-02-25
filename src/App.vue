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
import AppCursor from '@/components/AppCursor/AppCursor'
import { colophon } from '@/utils/colophon'

export default {
  name: 'App',
  className: 'App',
  components: {
    AppCursor
  },
  computed: {
    ...mapGetters({
      appReady: 'app/ready',
      appTheme: 'app/theme'
    })
  },
  async mounted() {
    vh()
    colophon()

    this.setAppReady(true)

    window.addEventListener('resize', vh)
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
