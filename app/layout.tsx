import '@/css/app.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Michael Pumo',
  description: 'Portfolio'
}

export default function RootLayout(
  { children }: { children: React.ReactNode }
) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  )
}
