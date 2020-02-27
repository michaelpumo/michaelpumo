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
      appTheme: 'app/theme'
    })
  },
  mounted() {
    vh()
    colophon()

    window.addEventListener('resize', vh)
  },
  beforeDestroy() {
    window.removeEventListener('resize', vh)
  }
}
</script>
