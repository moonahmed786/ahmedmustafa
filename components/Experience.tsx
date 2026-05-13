'use client'

import { TIMELINE } from '@/lib/cv-data'
import { Briefcase, Calendar, Users, Cpu, Code2, Sparkles, Rocket } from 'lucide-react'

const highlightMetric = (text: string) => {
  const parts = text.split(/(\d+(?:\s?%|\s?percent|\+)|doubling|tripling|halving|cutting|reducing|increasing|accelerating|raising|boosting|~2x)/gi)

  return (
    <>
      {parts.map((part, i) => {
        const isMatch = /(\d+(?:\s?%|\s?percent|\+)|doubling|tripling|halving|cutting|reducing|increasing|accelerating|raising|boosting|~2x)/gi.test(part)
        return isMatch ? (
          <span key={i} className="font-bold" style={{ color: 'var(--accent)' }}>{part}</span>
        ) : (
          part
        )
      })}
    </>
  )
}

const STATS = [
  { label: 'Experience', value: '10 Years', icon: Calendar },
  { label: 'Engineering', value: '3 Companies', icon: Briefcase },
  { label: 'Production', value: '50+ Projects', icon: Rocket },
  { label: 'Network', value: '20+ Clients', icon: Users },
]

const TAGS = [
  'Solutions Architect',
  'Tech Lead',
  'AI Agent Developer',
  'RAG & LLM Specialist',
  'Full Stack Expert',
  'Legacy Software Modernizer',
  'Vibe Code Cleaner'
]

export default function Experience() {
  return (
    <section id="experience" className="relative px-6 py-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto">
        <p className="section-label mb-6">§02 / Experience</p>
        <h2 className="display text-5xl md:text-7xl leading-tight mb-12" style={{ color: 'var(--fg)', fontWeight: 400 }}>
          Career <span className="italic">Trajectory</span>.
        </h2>

        {/* Enhanced Summary Section */}
        <div className="mb-20 space-y-10">
          {/* Top Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="surface p-6 flex flex-col items-center text-center group border border-transparent hover:border-accent/10 transition-all">
                <stat.icon size={18} className="mb-4 opacity-40 group-hover:opacity-100 group-hover:text-accent transition-all" />
                <div className="display text-2xl md:text-3xl mb-1" style={{ color: 'var(--fg)' }}>{stat.value}</div>
                <div className="mono text-[9px] tracking-[0.2em] uppercase opacity-40">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Role & Vibe Tags */}
          <div className="flex flex-wrap gap-2 pt-2 justify-center md:justify-start">
            {TAGS.map((tag, i) => (
              <div
                key={i}
                className="mono text-[10px] tracking-wider px-4 py-2 rounded-full border border-[var(--border)] transition-all hover:bg-white/5 hover:border-accent/40"
                style={{ color: 'var(--muted)', backgroundColor: 'rgba(255,255,255,0.02)' }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {TIMELINE.map((t, i) => (
            <div key={i} className="surface p-6 md:p-8 hover:border-accent/20 transition-colors">
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">

                {/* Left — company identity */}
                <div className="md:w-64 shrink-0">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    {i === 0 && (
                      <span
                        className="mono text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full"
                        style={{ backgroundColor: 'rgba(56, 189, 248, 0.1)', color: 'var(--accent)', border: '1px solid rgba(56, 189, 248, 0.2)' }}
                      >
                        Current
                      </span>
                    )}
                    <span className="mono text-[10px] tracking-widest opacity-40 uppercase">{t.period}</span>
                  </div>
                  <h3 className="text-2xl font-medium leading-tight mb-1" style={{ color: 'var(--fg)' }}>{t.role}</h3>
                  <div className="text-sm italic" style={{ color: 'var(--accent)' }}>{t.company}</div>
                  <div className="mono text-[10px] mt-3 flex items-center gap-2" style={{ color: 'var(--muted)' }}>
                    <div className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                    {t.location}
                  </div>
                </div>

                {/* Right — impact bullets */}
                <div className="flex-1 space-y-4">
                  {t.notes.map((note, j) => (
                    <div key={j} className="flex gap-4">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--border)' }} />
                      <p className="text-base leading-relaxed" style={{ color: 'var(--muted)', fontWeight: 300 }}>
                        {highlightMetric(note)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
