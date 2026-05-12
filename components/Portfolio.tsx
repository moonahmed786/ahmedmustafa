'use client'

import { useState, useEffect } from 'react'
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
    <div className="min-h-screen w-full" style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}>
      <Nav />
      <main className="relative" style={{ zIndex: 2 }}>
        <Hero loaded={loaded} />
        <About />
        <Experience />
        <Work />
        <Capabilities />
        <ToolDemo />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
