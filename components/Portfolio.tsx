'use client'

import dynamic from 'next/dynamic'
import Nav from './Nav'
import Hero from './Hero'
import DownloadCVButton from '@/components/DownloadCVButton'
import Footer from './Footer'

const CanvasBackground = dynamic(() => import('./CanvasBackground'), {
  ssr: false,
  loading: () => null,
})

function SectionFallback() {
  return <div className="h-24 border-t" style={{ borderColor: 'var(--border)' }} />
}

const About = dynamic(() => import('./About'), { loading: SectionFallback })
const Experience = dynamic(() => import('./Experience'), { loading: SectionFallback })
const Work = dynamic(() => import('./Work'), { loading: SectionFallback })
const Capabilities = dynamic(() => import('./Capabilities'), { loading: SectionFallback })
const Education = dynamic(() => import('./Education'), { loading: SectionFallback })
const Certifications = dynamic(() => import('./Certifications'), { loading: SectionFallback })
const Contact = dynamic(() => import('./Contact'), { loading: SectionFallback })

export default function Portfolio() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}>
      <div className="bg-grid" />
      <div className="bg-mesh" />
      <CanvasBackground />
      <Nav />
      <main 
        className="relative" 
        style={{ zIndex: 2 }}
      >
        <Hero />
        <About />
        <Experience />
        <Work />
        <Capabilities />
        
        <section className="px-6 py-24 border-t border-border">
          <div className="mx-auto max-w-7xl">
            <div className="surface grid gap-10 px-6 py-12 md:px-12 lg:grid-cols-[1fr_360px]">
              <div>
                <div className="mono mb-5 text-[10px] tracking-[0.24em] uppercase text-accent">Executive CV Intelligence</div>
                <h2 className="display max-w-4xl text-4xl leading-tight md:text-6xl text-fg">
                  Match my background against the exact role you are hiring for.
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                  A dedicated AI workflow tailors the profile, maps keywords, and produces role-specific material for fast screening.
                </p>
              </div>
              <div className="flex flex-col justify-end gap-4">
                <a 
                  href="/tailor"
                  className="inline-flex justify-center px-10 py-5 rounded-xl bg-accent text-[var(--on-accent)] mono text-[11px] font-bold tracking-[0.2em] uppercase hover:scale-[1.02] transition-all shadow-xl shadow-accent/20"
                >
                  Launch CV Engine
                </a>
                <DownloadCVButton variant="hero" />
              </div>
            </div>
          </div>
        </section>

        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
