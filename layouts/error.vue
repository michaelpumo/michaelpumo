<template>
  <main :class="$options.className">
    <section :class="`${$options.className}__content`">
      <h3>{{ error.message }}</h3>

      <p>
        Something went a bit awry. You can also reach out to me on
        <a target="_blank" rel="noopener" href="https://twitter.com/michaelpumo"
          >Twitter</a
        >
        or
        <a
          target="_blank"
          rel="noopener"
          href="https://www.linkedin.com/in/michaelpumo/"
          >LinkedIn</a
        >
      </p>

      <p>
        <ImageLazy
          :class="`${$options.className}__image`"
          src="/icons/icon-facepalm.png"
          width="60"
          height="60"
          alt="Page not found"
        />
      </p>

      <ButtonInput label="Get me out of here!" :route="{ path: '/' }" />
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import ButtonInput from '@/components/app/ButtonInput.vue'
import ImageLazy from '@/components/app/ImageLazy.vue'

export default {
  name: 'Page',
  className: 'Page',
  components: {
    ButtonInput,
    ImageLazy,
  },
  props: {
    error: {
      type: Object,
      default: () => ({
        message: 'Page not found',
        statusCode: 404,
      }),
    },
  },
  async asyncData({ $prismic, app, error }) {
    const { fullPath } = app.context.route
    const page = (await $prismic.api.getByUID('page', '404')).data

    return {
      ...page,
      meta_url: `https://michaelpumo.com${fullPath}`,
    }
  },
  head() {
    return {
      title: this.meta_title
        ? `${this.meta_title} - Michael Pumo`
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
      global: 'global/data',
    }),
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background-color: color('light');

  &__content {
    width: 100%;
    max-width: 300px;
    text-align: center;
  }
}
</style>
