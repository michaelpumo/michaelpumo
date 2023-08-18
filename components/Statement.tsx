import { FC } from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import type { StatementStoryblok } from '@/types/storyblok'

interface Props {
  blok: StatementStoryblok
}

const Statement: FC<Props> = ({ blok }) => (
  <section
    {...storyblokEditable(blok)}
    data-component="Statement"
    className="relative z-10 w-full min-h-screen bg-brand-light text-brand-blue flex items-center justify-center px-4 sm:px-10 lg:px-14 xl:px-20"
  >
    <h2 className="font-display text-3xl sm:text-7xl text-balance text-center">
      Wonderful things happen when you work together.
    </h2>
  </section>
)

export default Statement
