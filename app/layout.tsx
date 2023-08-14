import type { Metadata } from 'next'
import { FC, ReactNode } from 'react'
import { storyblokInit, apiPlugin } from '@storyblok/react/rsc'
import StoryblokProvider from '@/components/StoryblokProvider'
import ButtonMenu from '@/components/ButtonMenu'
import '@/assets/css/app.css'

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin]
})

export const metadata: Metadata = {
  title: 'Michael Pumo',
  description: 'Portfolio'
}

interface Props {
  children: ReactNode
}

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <StoryblokProvider>
      <html lang="en-GB">
        <body>
          <ButtonMenu />
          {children}
        </body>
      </html>
    </StoryblokProvider>
  )
}

export default RootLayout
