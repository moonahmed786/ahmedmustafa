import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Instrument_Serif } from 'next/font/google'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instrument-serif',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ahmedmustafa.programmersin.com'),
  title: 'Ahmed Mustafa — Senior Solutions Architect & AI Lead',
  description:
    'Senior Solutions Architect with 10+ years of experience in AI, MERN, and Enterprise PHP. Leading AI Agent development, RAG systems, and scalable healthcare platforms.',
  keywords: ['Solutions Architect', 'Full Stack Engineer', 'AI Agent Developer', 'RAG Specialist', 'Ahmed Mustafa Portfolio'],
  authors: [{ name: 'Ahmed Mustafa' }],
  openGraph: {
    title: 'Ahmed Mustafa — Senior Solutions Architect',
    description: '10+ years of experience in AI, MERN, and Enterprise Software.',
    url: 'https://ahmedmustafa.programmersin.com',
    siteName: 'Ahmed Mustafa Portfolio',
    images: [
      {
        url: '/og-image.png', // User should add this image to public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmed Mustafa — Solutions Architect',
    description: 'Expert in AI Agents, RAG, and Scalable Backend Systems.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <div className="bg-mesh" />
        {children}
      </body>
    </html>
  )
}
