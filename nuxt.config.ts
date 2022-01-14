import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  buildModules: ["@storyblok/nuxt"], //, { accessToken: "BzDKEHUuNg5uk2Nw3hqODgtt" }],
  storyblok: {
    accessToken: "BzDKEHUuNg5uk2Nw3hqODgtt",
  },
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
