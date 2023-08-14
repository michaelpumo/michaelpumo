'use client'

import { FC, ReactNode } from 'react'
import { storyblokInit, apiPlugin } from '@storyblok/react/rsc'
import Hero from '@/components/Hero'
import Page from '@/components/Page'
import Statement from '@/components/Statement'

const components = {
  hero: Hero,
  page: Page,
  statement: Statement
}

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components,
  apiOptions: {
    region: process.env.NEXT_PUBLIC_STORYBLOK_REGION
  }
})

interface Props {
  children: ReactNode
}

const StoryblokProvider: FC<Props> = ({ children }) => {
  return children
}

export default StoryblokProvider
