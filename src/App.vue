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

<static-query>
  query {
    metadata {
      siteName
      siteDescription
    }
  }
</static-query>

<script>
import { mapGetters, mapActions } from 'vuex'
import { vh } from '@/utils/helpers'
import { colophon } from '@/utils/colophon'
import AppCursor from '@/components/AppCursor/AppCursor.vue'

export default {
  name: 'App',
  className: 'App',
  metaInfo() {
    return {
      title: this.$static.metadata.siteName,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$static.metadata.siteDescription
        }
      ]
    }
  },
  components: {
    AppCursor
  },
  computed: {
    ...mapGetters({
      appReady: 'app/ready',
      appTheme: 'app/theme'
    })
  },
  mounted() {
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
