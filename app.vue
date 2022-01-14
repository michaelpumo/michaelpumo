<template>
  <NuxtPage />
</template>

<script lang="ts" setup>
import '@/assets/css/app.css'
import { useStoryApi, useStoryBridge } from '@storyblok/nuxt/composables'

const storyapi = useStoryApi()
const { data } = await storyapi.get('cdn/stories/home', { version: 'draft' })
const state = reactive({ stories: data.story })

onMounted(() => {
  useStoryBridge(state.story.id, (story) => (state.story = story))
})
</script>
