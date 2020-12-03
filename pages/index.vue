<template>
  <div
    :id="$options.className"
    :class="[
      $options.className,
      { 'is-locked': appLocked },
      { 'is-ready': ready },
    ]"
  >
    <AppNavigation
      title="Burger menu"
      :ready="ready"
      :items="global.navigation"
    />

    <header :class="`${$options.className}__introduction`">
      <AppHero
        :ready="ready"
        :title="title"
        :description="description"
        :colophon="colophon"
        :button-id="button_id"
        :button-title="button_title"
      />
    </header>

    <main :class="`${$options.className}__main`">
      <SliceZone :content="body" />
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppHero from '@/components/app/AppHero.vue'
import AppNavigation from '@/components/app/AppNavigation.vue'
import SliceZone from '@/components/app/SliceZone.vue'

export default {
  name: 'Page',
  className: 'Page',
  components: {
    AppHero,
    AppNavigation,
    SliceZone,
  },
  async asyncData({ $prismic, app, error }) {
    try {
      const { params, fullPath } = app.context.route

      if (params?.slug === 'home') {
        app.context.redirect('/')
      }

      const slug = params?.slug || 'home'
      const page = (await $prismic.api.getByUID('page', slug)).data

      return {
        ...page,
        meta_url: `https://michaelpumo.com${fullPath}`,
      }
    } catch (e) {
      error({
        message: 'Page not found',
        statusCode: 404,
      })
    }
  },
  data() {
    return {
      ready: false,
    }
  },
  head() {
    return {
      title: this.meta_title
        ? this.slug === 'home'
          ? this.meta_title
          : `${this.meta_title} - Michael Pumo`
        : 'Michael Pumo',
      meta: [
        {
          hid: 'google-site-verification',
          name: 'google-site-verification',
          content: this.global.meta_google_verification || '',
        },
        {
          hid: 'description',
          name: 'description',
          content: this.meta_description || '',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.meta_keywords || '',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.meta_title || '',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.meta_description || '',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.meta_image?.url || '',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.meta_url,
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: this.global.meta_type,
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary',
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: `@${this.global.meta_twitter_handle}`,
        },
        {
          hid: 'twitter:creator',
          name: 'twitter:creator',
          content: `@${this.global.meta_twitter_handle}`,
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: this.meta_title || '',
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: this.meta_description || '',
        },
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content: this.meta_image?.url || '',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      appLocked: 'app/locked',
      global: 'global/data',
    }),
  },
  mounted() {
    this.ready = true
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.Page {
  $root: &;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  &.is-locked {
    overflow: hidden;
  }

  $colors: ('red', 'green', 'amber');

  @each $color in $colors {
    .is-theme-#{$color} & {
      --color-theme: #{color($color)};
    }
  }

  &__introduction {
    position: sticky;
    top: 0;
    width: 100%;
    height: 100%;
    padding: var(--spacing-unit);
    background-color: color('dark');
    pointer-events: none;

    @include media('lg') {
      position: fixed;
      left: 0;
      z-index: 1;
      width: 100%;
      transition: width ($trans-speed * 4) ($trans-speed * 6) $easeOutQuint;
    }

    #{$root}.is-ready & {
      @include media('lg') {
        width: 50%;
      }
    }
  }

  &__main {
    background-color: color('light');

    @include media('lg') {
      width: 50%;
      min-height: calc(var(--vh, 1vh) * 100);
      margin-left: 50%;
    }
  }
}
</style>
