import { FC } from 'react'
import { render } from 'storyblok-rich-text-react-renderer'
import { twMerge } from 'tailwind-merge'
import type { RichtextStoryblok } from '@/types/storyblok'

interface Props {
  content: RichtextStoryblok
  className?: string
}

const RichText: FC<Props> = ({ content, className }) => (
  <div data-component="RichText" className={twMerge('', className)}>
    {render(content)}
  </div>
)

export default RichText
