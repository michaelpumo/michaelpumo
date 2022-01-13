import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  // modules: ["@storyblok/nuxt", { accessToken: "BzDKEHUuNg5uk2Nw3hqODgtt" }]
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  }
})
