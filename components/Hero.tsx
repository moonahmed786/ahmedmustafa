'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Brain, BriefcaseBusiness, CheckCircle2, MapPin, Network, ShieldCheck, Sparkles } from 'lucide-react'
import DownloadCVButton from '@/components/DownloadCVButton'

interface HeroProps {
  loaded: boolean
}

const IMPACT = [
  { value: '10+', label: 'Years building platforms' },
  { value: '50+', label: 'Production systems shipped' },
  { value: '14+', label: 'Enterprise apps integrated' },
]

const FOCUS = [
  { icon: Brain, title: 'AI product architecture', text: 'RAG, LLM workflows, FastAPI services, vector search, and applied automation.' },
  { icon: Network, title: 'Enterprise delivery', text: 'Scalable APIs, platform migrations, cloud deployment, and cross-team technical leadership.' },
  { icon: ShieldCheck, title: 'Healthcare-grade systems', text: 'Secure, reliable platforms for healthcare, fintech, sustainability, and operations teams.' },
]

export default function Hero({ loaded }: HeroProps) {
  return (
    <section id="top" className="relative min-h-screen px-6 pt-28 pb-10">
      <div className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-7xl grid-rows-[auto_1fr_auto]">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex flex-wrap items-center justify-between gap-4 border-b pb-6"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_24px_var(--accent)]" />
            <span className="mono text-[10px] font-bold tracking-[0.28em]" style={{ color: 'var(--accent)' }}>
              Available for senior engineering leadership
            </span>
          </div>
          <div className="hidden items-center gap-2 sm:flex mono text-[10px] tracking-[0.2em]" style={{ color: 'var(--muted)' }}>
            <MapPin size={13} style={{ color: 'var(--accent)' }} />
            Rawalpindi, PK / Working globally
          </div>
        </motion.div>

        <div className="grid items-center gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="max-w-4xl"
          >
            <div
              className="mb-7 inline-flex max-w-full items-center gap-3 rounded-xl border px-4 py-2"
              style={{ borderColor: 'var(--border)', background: 'var(--surface-elev)' }}
            >
              <Sparkles size={15} style={{ color: 'var(--accent)' }} />
              <span className="mono truncate text-[10px] tracking-[0.22em]" style={{ color: 'var(--muted)' }}>
                AI systems / cloud platforms / high-trust software
              </span>
            </div>

            <h1
              className="display max-w-5xl break-words"
              style={{
                color: 'var(--fg)',
                fontSize: 'clamp(42px, 7.2vw, 100px)',
                lineHeight: 0.92,
                letterSpacing: '-0.032em',
              }}
            >
              Architecture for AI, cloud, and enterprise systems.
            </h1>

            <div className="mt-9 grid max-w-4xl gap-6 border-l pl-6 md:grid-cols-[1fr_auto]" style={{ borderColor: 'var(--accent)' }}>
              <p className="text-lg leading-relaxed md:text-xl" style={{ color: 'var(--muted)' }}>
                Ahmed Mustafa is a Senior Solutions Architect and engineering lead with a decade of experience across AI, healthcare, fintech, enterprise integrations, and full-stack delivery.
              </p>
              <div className="flex flex-wrap items-start gap-3 md:flex-col">
                <DownloadCVButton variant="hero" />
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl border px-8 py-4 mono text-[10px] font-bold tracking-[0.22em] transition-all hover:border-accent hover:text-accent"
                  style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                >
                  Start a conversation
                </a>
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 36 }}
            animate={loaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.38 }}
            className="surface relative overflow-hidden p-5 md:p-6"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
            <div className="rounded-xl border p-5" style={{ borderColor: 'var(--border)', background: 'var(--surface-elev)' }}>
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="mono mb-2 text-[9px] tracking-[0.28em]" style={{ color: 'var(--muted)' }}>EXECUTIVE BRIEF</p>
                  <h2 className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--fg)' }}>Technical operator</h2>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                  <BriefcaseBusiness size={20} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {IMPACT.map((item) => (
                  <div key={item.label} className="rounded-lg border p-3" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
                    <div className="display text-3xl" style={{ color: 'var(--fg)' }}>{item.value}</div>
                    <div className="mt-2 mono text-[8px] leading-relaxed tracking-[0.16em]" style={{ color: 'var(--muted)' }}>{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                {FOCUS.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="grid grid-cols-[34px_1fr] gap-4 rounded-lg border p-4" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap items-center justify-between gap-5 border-t pt-6"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="flex flex-wrap gap-3">
            {['MERN', 'Laravel', 'FastAPI', 'AWS', 'RAG / LLM'].map((item) => (
              <span key={item} className="chip inline-flex items-center gap-2">
                <CheckCircle2 size={12} style={{ color: 'var(--accent)' }} />
                {item}
              </span>
            ))}
          </div>
          <a href="#about" className="flex items-center gap-2 mono text-[10px] tracking-[0.22em]" style={{ color: 'var(--accent)' }}>
            Explore profile <ArrowDown size={13} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
