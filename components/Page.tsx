import { FC } from 'react'
import { storyblokEditable, StoryblokComponent } from '@storyblok/react/rsc'
import type { PageStoryblok } from '@/types/storyblok'

interface Props {
  blok: PageStoryblok
}

const Page: FC<Props> = ({ blok }) => (
  <main {...storyblokEditable(blok)}>
    {blok.body &&
      blok.body.map((child: any) => (
        <StoryblokComponent blok={child} key={child._uid} />
      ))}
  </main>
)

export default Page
