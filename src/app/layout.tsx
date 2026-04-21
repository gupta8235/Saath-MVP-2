import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Saath — Plan your wedding with clarity & community',
  description: 'AI-powered wedding planning for the modern Indian bride.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-ivory">
        {children}
      </body>
    </html>
  )
}
