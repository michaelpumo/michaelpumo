'use client'

import { FC, ReactNode } from 'react'
import { storyblokInit, apiPlugin } from '@storyblok/react/rsc'
import Page from '@/components/Page'

const components = {
  page: Page
}

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components
})

interface Props {
  children: ReactNode
}

const StoryblokProvider: FC<Props> = ({ children }) => {
  return children
}

export default StoryblokProvider
