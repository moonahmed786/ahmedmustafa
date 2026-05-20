'use client'

import { TIMELINE } from '@/lib/cv-data'
import { motion } from 'framer-motion'
import { ArrowUpRight, Building2, CalendarDays } from 'lucide-react'

const highlightMetric = (text: string) => {
  const parts = text.split(/(\d+(?:\s?%|\s?percent|\+)|~2x|2x|30%|45%|60%|47%|38%|33%|28%|23%)/gi)

  return (
    <>
      {parts.map((part, i) => {
        const isMatch = /(\d+(?:\s?%|\s?percent|\+)|~2x|2x)/gi.test(part)
        return isMatch ? (
          <span key={i} className="font-semibold" style={{ color: 'var(--accent)' }}>{part}</span>
        ) : (
          part
        )
      })}
    </>
  )
}

export default function Experience() {
  const [current, ...previous] = TIMELINE

  return (
    <section id="experience" className="relative px-6 py-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 lg:grid-cols-[360px_1fr]">
          <div>
            <p className="section-label mb-6">02 / Experience</p>
            <h2 className="display text-4xl leading-tight md:text-6xl" style={{ color: 'var(--fg)' }}>
              Career ledger, from code to architecture.
            </h2>
          </div>
          <p className="max-w-3xl self-end text-lg leading-relaxed" style={{ color: 'var(--muted)' }}>
            A decade-long progression through backend engineering, full-stack delivery, enterprise integration, cloud systems, and AI product leadership.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="surface mb-8 grid gap-8 p-7 md:p-10 lg:grid-cols-[360px_1fr]"
        >
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-lg border px-3 py-2" style={{ borderColor: 'var(--border)', color: 'var(--accent)' }}>
              <CalendarDays size={15} />
              <span className="mono text-[9px] tracking-[0.22em]">CURRENT ROLE</span>
            </div>
            <h3 className="text-3xl font-semibold leading-tight" style={{ color: 'var(--fg)' }}>{current.role}</h3>
            <div className="mt-4 flex items-center gap-2 text-base" style={{ color: 'var(--accent)' }}>
              <Building2 size={16} />
              {current.company}
            </div>
            <p className="mt-2 mono text-[10px] tracking-[0.2em]" style={{ color: 'var(--muted)' }}>{current.period} / {current.location}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {current.notes.slice(0, 6).map((note, index) => (
              <div key={note} className="rounded-xl border p-5" style={{ borderColor: 'var(--border)', background: 'var(--surface-elev)' }}>
                <div className="mb-4 flex items-center justify-between">
                  <span className="mono text-[9px] tracking-[0.2em]" style={{ color: 'var(--accent)' }}>IMPACT {String(index + 1).padStart(2, '0')}</span>
                  <ArrowUpRight size={14} style={{ color: 'var(--muted)' }} />
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{highlightMetric(note)}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-4">
          {previous.map((role, index) => (
            <motion.article
              key={`${role.company}-${role.period}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="grid gap-6 border-t py-8 lg:grid-cols-[260px_300px_1fr]"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="mono text-[10px] tracking-[0.22em]" style={{ color: 'var(--accent)' }}>{role.period}</div>
              <div>
                <h3 className="text-xl font-semibold" style={{ color: 'var(--fg)' }}>{role.role}</h3>
                <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>{role.company} / {role.location}</p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {role.notes.slice(0, 2).map((note) => (
                  <p key={note} className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {highlightMetric(note)}
                  </p>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
