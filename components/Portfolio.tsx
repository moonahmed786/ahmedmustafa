'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from './Nav'
import Hero from './Hero'
import DownloadCVButton from '@/components/DownloadCVButton'
import About from './About'
import Experience from './Experience'
import Work from './Work'
import Capabilities from './Capabilities'
import Education from './Education'
import Certifications from './Certifications'
import Contact from './Contact'
import Footer from './Footer'

const CanvasBackground = dynamic(() => import('./CanvasBackground'), {
  ssr: false,
  loading: () => null,
})

export default function Portfolio() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      clearTimeout(t)
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])

  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}>
      <div className="bg-grid" />
      <div className="bg-mesh" />
      <CanvasBackground />
      <AnimatePresence>
        {!loaded && (
          <motion.div 
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[5000] bg-black flex items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-8 h-[1px] bg-accent animate-pulse" />
              <span className="mono text-[9px] tracking-[0.4em] uppercase text-white/50">Initializing Architect...</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Nav />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative" 
        style={{ zIndex: 2 }}
      >
        <Hero loaded={loaded} />
        <About />
        <Experience />
        <Work />
        <Capabilities />
        
        <section className="px-6 py-24 border-t border-border">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="surface grid gap-10 px-6 py-12 md:px-12 lg:grid-cols-[1fr_360px]"
            >
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
            </motion.div>
          </div>
        </section>

        <Education />
        <Certifications />
        <Contact />
      </motion.main>
      <Footer />
    </div>
  )
}
