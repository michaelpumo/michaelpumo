<template>
  <AppLayout
    :title="title"
    :description="description"
    :colophon="colophon"
    :button-id="button_id"
    :button-title="button_title"
  >
    <SliceZone :content="body" />
  </AppLayout>
</template>

<script>
import AppLayout from '@/components/app/AppLayout.vue'
import SliceZone from '@/components/app/SliceZone.vue'

export default {
  name: 'Page',
  className: 'Page',
  components: {
    AppLayout,
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
  head() {
    return {
      title: this.meta_title
        ? this.slug === 'home'
          ? this.meta_title
          : `${this.meta_title} - Michael Pumo`
        : 'Michael Pumo',
      meta: [
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
          hid: 'robots',
          name: 'robots',
          content: this.meta_robots,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base.scss';

.Page {
  $root: &;
}
</style>
