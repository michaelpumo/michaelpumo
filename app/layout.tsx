import type { Metadata } from 'next'
import { FC, ReactNode } from 'react'
import { storyblokInit, apiPlugin } from '@storyblok/react/rsc'
import StoryblokProvider from '@/components/Provider/StoryblokProvider'
import LenisProvider from '@/components/Provider/LenisProvider'
import '@/assets/css/app.css'

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: process.env.NEXT_PUBLIC_STORYBLOK_REGION
  }
})

// Revalidate cache. Disable for production.
export const revalidate = process.env.NODE_ENV === 'development' ? 0 : null

export const metadata: Metadata = {
  title: 'Michael Pumo - Web Developer + Designer',
  description: 'Web development portfolio of Michael Pumo',
  twitter: {
    site: '@michaelpumo',
    creator: '@michaelpumo',
    title: 'Michael Pumo - Web Developer + Designer',
    description: 'Web development portfolio of Michael Pumo'
    // images?: TwitterImage | Array<TwitterImage>;
  },
  openGraph: {
    type: 'website',
    title: 'Michael Pumo - Web Developer + Designer',
    description: 'Web development portfolio of Michael Pumo',
    url: 'https://michaelpumo.com',
    siteName: 'Michael Pumo'
    // images: [
    //   {
    //     url: '',
    //     width: 1200,
    //     height: 600
    //   }
    // ]
  }
}

interface Props {
  children: ReactNode
}

const RootLayout: FC<Props> = ({ children }) => (
  <html lang="en-GB">
    <body className="antialiased">
      <StoryblokProvider>
        <LenisProvider>{children}</LenisProvider>
      </StoryblokProvider>
    </body>
  </html>
)

export default RootLayout
