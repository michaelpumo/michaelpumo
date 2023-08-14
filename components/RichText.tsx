import { FC } from 'react'
import { render } from 'storyblok-rich-text-react-renderer'

interface Props {
  content: any
  className?: string
}

const RichText: FC<Props> = ({ content, className }) => {
  return (
    <div data-component="RichText" className={className}>
      {render(content)}
    </div>
  )
}

export default RichText
