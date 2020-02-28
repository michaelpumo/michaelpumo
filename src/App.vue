<template>
  <div
    :class="[
      $options.className,
      `is-theme-${appTheme}`,
    ]">
    <router-view />

    <PortalTarget name="modal" />
    <AppCursor />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { vh } from '@/utils/helpers'
import { serviceWorker } from '@/utils/service-worker'
import { colophon } from '@/utils/colophon'
import AppCursor from '@/components/AppCursor/AppCursor'

export default {
  name: 'App',
  className: 'App',
  components: {
    AppCursor
  },
  computed: {
    ...mapGetters({
      appTheme: 'app/theme'
    })
  },
  mounted() {
    vh()
    colophon()
    serviceWorker()

    window.addEventListener('resize', vh)
  },
  beforeDestroy() {
    window.removeEventListener('resize', vh)
  }
}
</script>
