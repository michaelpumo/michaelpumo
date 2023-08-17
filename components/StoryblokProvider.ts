'use client'

import { FC, ReactNode } from 'react'
import { storyblokInit, apiPlugin } from '@storyblok/react/rsc'
import Clients from '@/components/Clients'
import Contact from '@/components/Contact'
import Hero from '@/components/Hero'
import Page from '@/components/Page'
import Projects from '@/components/Projects'
import Statement from '@/components/Statement'

const components = {
  clients: Clients,
  contact: Contact,
  hero: Hero,
  page: Page,
  projects: Projects,
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

const StoryblokProvider: FC<Props> = ({ children }) => children

export default StoryblokProvider
