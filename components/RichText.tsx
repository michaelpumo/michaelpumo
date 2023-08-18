import { FC } from 'react'
import { render } from 'storyblok-rich-text-react-renderer'
import type { RichtextStoryblok } from '@/types/storyblok'

const RichText: FC<RichtextStoryblok> = ({ content, className }) => (
  <div data-component="RichText" className={className}>
    {render(content)}
  </div>
)

export default RichText
