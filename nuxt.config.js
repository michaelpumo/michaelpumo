import Sass from 'sass'

export default {
  target: 'static',
  generate: {
    fallback: true,
  },
  head: {
    htmlAttrs: {
      lang: 'en-GB',
    },
    title: 'Michael Pumo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'theme-color', content: '#ffffff' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#0c8275' },
    ],
    script: [
      {
        src: 'https://polyfill.io/v3/polyfill.min.js?features=default',
        body: true,
      },
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-WV93KLCLTG",
        async: true,
        body: true
      },
      {
        src: "/js/ga.js",
        body: true
      }
    ],
  },
  loading: {
    color: '#fd8e8e',
    failedColor: '#ffffff',
    height: '5px',
    throttle: 200,
  },
  css: ['@/assets/scss/app.scss'],
  plugins: [
    { src: '@/plugins/directives.js' },
    { src: '@/plugins/vue-svgicon.js' },
    { src: '@/plugins/portal-vue.js' },
    { src: '@/plugins/vuelidate.js' },
  ],
  components: false,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/pwa',
  ],
  modules: ['@nuxtjs/prismic'],
  prismic: {
    endpoint: 'https://michaelpumo.cdn.prismic.io/api/v2',
    linkResolver: '@/plugins/link-resolver.js',
    htmlSerializer: '@/plugins/html-serializer.js',
  },
  pwa: {
    icon: {
      source: 'static/pwa.png',
      fileName: 'pwa.png',
    },
    workbox: {
      clientsClaim: false,
    },
  },
  router: {
    trailingSlash: false,
  },
  build: {
    transpile: ['swiper', 'dom7'],
    extractCSS: true,
    babel: {
      plugins: ['@babel/plugin-proposal-optional-chaining'],
    },
    postcss: {
      plugins: {},
      preset: {
        autoprefixer: {
          flexbox: true,
          grid: false,
        },
      },
    },
    loaders: {
      scss: {
        implementation: Sass,
      },
    },
  },
}
