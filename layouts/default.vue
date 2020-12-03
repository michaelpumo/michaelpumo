<template>
  <div :class="[$options.className, `is-theme-${appTheme}`]">
    <Nuxt />
    <PortalTarget name="modal" />
    <AppCursor />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { vh } from '@/utils/helpers.js'
import { colophon } from '@/utils/colophon.js'
import AppCursor from '@/components/app/AppCursor.vue'

export default {
  name: 'App',
  className: 'App',
  components: {
    AppCursor,
  },
  computed: {
    ...mapGetters({
      appTheme: 'app/theme',
    }),
  },
  mounted() {
    vh()
    colophon()

    window.addEventListener('resize', vh)
  },
  beforeDestroy() {
    window.removeEventListener('resize', vh)
  },
}
</script>
