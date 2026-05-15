'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import DownloadCVButton from '@/components/DownloadCVButton'
import ThemeToggle from '@/components/ThemeToggle'

const NAV_LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#certifications', label: 'Certs' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4 glass shadow-2xl shadow-black/20' : 'py-8'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-4 group" onClick={() => setOpen(false)}>
            <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <span className="display text-xl font-medium tracking-tight transition-all group-hover:text-accent" style={{ color: 'var(--fg)' }}>
              Ahmed Mustafa
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-12">
            <div className="flex items-center gap-10 mono text-[9px] tracking-[0.3em] uppercase font-bold" style={{ color: 'var(--muted)' }}>
              {NAV_LINKS.map(l => <a key={l.href} href={l.href} className="nav-link">{l.label}</a>)}
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <DownloadCVButton variant="nav" />
              <a
                href="#contact"
                className="mono text-[9px] font-bold tracking-[0.3em] uppercase px-6 py-3 rounded-full border transition-all hover:border-accent hover:text-accent"
                style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
              >
                Hire me
              </a>
              <a
                href="/tailor"
                className="mono text-[9px] font-bold tracking-[0.3em] uppercase px-6 py-3 rounded-full transition-all hover:scale-105 shadow-xl shadow-accent/20"
                style={{ backgroundColor: 'var(--accent)', color: 'white' }}
              >
                Tailor.cv
              </a>
            </div>
          </div>

          {/* Mobile actions */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle compact />
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
              style={{ color: 'var(--fg)', backgroundColor: open ? 'var(--surface)' : 'transparent', border: '1px solid', borderColor: open ? 'var(--border)' : 'transparent' }}
              aria-label="Toggle menu"
            >
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        className="fixed inset-0 z-40 lg:hidden flex flex-col transition-all duration-300"
        style={{
          backgroundColor: 'var(--bg)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transform: open ? 'translateY(0)' : 'translateY(-12px)',
        }}
      >
        <div className="flex-1 flex flex-col px-6 pt-24 pb-10">
          <div className="space-y-1 flex-1">
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="display block text-5xl py-4 border-b transition-colors hover:text-[var(--accent-warm)]"
                style={{
                  color: 'var(--fg)',
                  borderColor: 'var(--border)',
                  fontWeight: 400,
                  transitionDelay: open ? `${i * 50}ms` : '0ms',
                }}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="pt-10 grid grid-cols-2 gap-3">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mono text-[11px] font-bold tracking-[0.2em] uppercase px-6 py-4 rounded-full text-center transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--accent-warm)', color: '#000' }}
            >
              Hire me
            </a>
            <a
              href="/tailor"
              onClick={() => setOpen(false)}
              className="mono text-[11px] font-bold tracking-[0.2em] uppercase px-6 py-4 rounded-full text-center border transition-all hover:border-[var(--accent)]"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
            >
              Tailor.cv
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
