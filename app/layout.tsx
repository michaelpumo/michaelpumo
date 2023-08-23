import type { Metadata } from 'next'
import { FC, ReactNode } from 'react'
import { storyblokInit, apiPlugin } from '@storyblok/react/rsc'
import StoryblokProvider from '@/components/StoryblokProvider'
import ButtonMenu from '@/components/ButtonMenu'
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
export const revalidate = 5

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
    <html lang="en-GB">
      <body>
        <header className="fixed top-5 left-5 z-20">
          <ButtonMenu />
        </header>

        {children}
      </body>
    </html>
  </StoryblokProvider>
)

export default RootLayout
