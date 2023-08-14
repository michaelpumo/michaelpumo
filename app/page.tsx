import { getStoryblokApi } from '@storyblok/react/rsc'
import StoryblokStory from '@storyblok/react/story'

export async function fetchData() {
  const options = { version: process.env.NEXT_PUBLIC_STORYBLOK_VERSION }
  const storyblokApi = getStoryblokApi()

  return storyblokApi.get(`cdn/stories/home`, options)
}

export default async function Home() {
  const { data } = await fetchData()

  return <StoryblokStory story={data.story} />
}
