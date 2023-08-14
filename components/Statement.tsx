import { FC } from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'

interface Statement {
  title?: string
}

interface Props {
  blok: any
}

const Statement: FC<Props> = ({ blok }) => {
  return (
    <section
      {...storyblokEditable(blok)}
      data-component="Statement"
      className="w-full min-h-screen bg-white flex items-center justify-center px-4 sm:px-10 lg:px-14 xl:px-20"
    >
      <h2 className="font-display text-3xl sm:text-7xl text-balance text-center text-brand-blue mb-10">
        Wonderful things happen when you work together.
      </h2>
    </section>
  )
}

export default Statement
