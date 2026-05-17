import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Instrument_Serif } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instrument-serif',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ahmedmustafa.programmersin.com'),
  title: 'Ahmed Mustafa | Senior Software Engineer, Solutions Architect & AI/RAG Developer',
  description:
    'Senior Solutions Architect and Full-Stack Engineer with 10+ years of experience building scalable AI, healthcare, fintech, and enterprise platforms.',
  keywords: ['Ahmed Mustafa', 'Node.js', 'Laravel', 'FastAPI', 'RAG', 'LLM', 'AWS', 'MERN', 'Healthcare SaaS', 'System Design', 'Senior Software Engineer', 'Solutions Architect'],
  authors: [{ name: 'Ahmed Mustafa' }],
  icons: {
    icon: '/assets/logo/favicon.png',
  },
  openGraph: {
    title: 'Ahmed Mustafa — Senior Solutions Architect',
    description: '10+ years of experience in AI, MERN, and Enterprise Software.',
    url: 'https://ahmedmustafa.programmersin.com',
    siteName: 'Ahmed Mustafa Portfolio',
    images: [
      {
        url: '/assets/logo/logo-large.png',
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
    images: ['/assets/logo/logo-large.png'],
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
        <ThemeProvider>
          {/* Fixed Background Logo Watermark */}
          <div 
            className="fixed inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: 'url(/assets/logo/logo-extended.png)',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              backgroundSize: '50%',
              opacity: 0.03
            }}
          />
          <div className="relative z-10">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
