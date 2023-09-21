import type { Metadata } from 'next'
import { FC, ReactNode } from 'react'
import { storyblokInit, apiPlugin } from '@storyblok/react/rsc'
import StoryblokProvider from '@/components/StoryblokProvider'
import LenisProvider from '@/components/LenisProvider'
import '@/assets/css/app.css'

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: process.env.NEXT_PUBLIC_STORYBLOK_REGION
  }
})

// Revalidate every 5 seconds.
// Disable for production.
export const revalidate = process.env.NODE_ENV === 'development' ? 0 : null

export const metadata: Metadata = {
  title: 'Michael Pumo',
  description: 'Web development portfolio of Michael Pumo',
  openGraph: {
    title: 'Michael Pumo',
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
  <StoryblokProvider>
    <LenisProvider>
      <html lang="en-GB">
        <body>{children}</body>
      </html>
    </LenisProvider>
  </StoryblokProvider>
)

export default RootLayout
