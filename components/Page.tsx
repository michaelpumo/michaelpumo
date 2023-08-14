import { FC } from 'react'
import { storyblokEditable, StoryblokComponent } from '@storyblok/react/rsc'

interface Props {
  blok: any
}

const Page: FC<Props> = ({ blok }) => (
  <main {...storyblokEditable(blok)}>
    {blok.body.map((child: any) => (
      <StoryblokComponent blok={child} key={child._uid} />
    ))}
  </main>
)

export default Page
