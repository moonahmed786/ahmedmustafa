'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from './Nav'
import Hero from './Hero'
import About from './About'
import Experience from './Experience'
import Work from './Work'
import Capabilities from './Capabilities'
import ToolDemo from './ToolDemo'
import Education from './Education'
import Certifications from './Certifications'
import Contact from './Contact'
import Footer from './Footer'

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
              className="flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="mono text-[10px] tracking-[0.3em] uppercase text-white">Initializing Engine...</span>
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
        
        {/* AI Engine CTA */}
        <section className="px-6 py-24 border-t border-border">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="mono text-[10px] tracking-[0.2em] uppercase text-accent">Neural CV Engine</div>
              <h2 className="display text-4xl md:text-6xl text-fg">Tailor my profile to <br /><span className="italic">your exact requirements</span>.</h2>
              <p className="text-muted text-lg max-w-2xl mx-auto font-light">Experience our next-gen AI tailoring engine on a dedicated platform.</p>
              <div className="pt-6">
                <a 
                  href="/tailor"
                  className="inline-flex items-center gap-4 px-10 py-5 rounded-full bg-accent text-white mono text-[11px] font-bold tracking-[0.2em] uppercase hover:scale-105 transition-all shadow-xl shadow-accent/20"
                >
                  Launch Neural Architect
                </a>
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
