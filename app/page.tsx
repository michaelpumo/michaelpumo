import { getStoryblokApi } from '@storyblok/react/rsc'
import StoryblokStory from '@storyblok/react/story'

export async function fetchPage() {
  const storyblokApi = getStoryblokApi()
  const options = {
    version: process.env.NEXT_PUBLIC_STORYBLOK_VERSION
    // resolve_relations: ['global.navigation']
  }

  return storyblokApi.get(`cdn/stories/home`, options)
}

const Page = async () => {
  const { data } = await fetchPage()

  return <StoryblokStory story={data.story} />
}

export default Page
