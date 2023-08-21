import { FC } from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import type { ProjectsStoryblok } from '@/types/storyblok'

interface Props {
  blok: ProjectsStoryblok
}

const Projects: FC<Props> = ({ blok }) => (
  <section
    {...storyblokEditable(blok)}
    data-component="Projects"
    className="relative z-10 w-full min-h-screen bg-brand-blue text-brand-pink flex items-center justify-center px-4 sm:px-10 lg:px-14 xl:px-20"
  >
    <h2 className="font-display text-3xl sm:text-7xl text-balance text-center">
      Wonderful things happen when you work together.
    </h2>
  </section>
)

export default Projects
