'use client'

import { LANGUAGES, SKILLS } from '@/lib/cv-data'
import { motion } from 'framer-motion'
import { BadgeCheck, Brain, Cloud, Code2, Database, Layout, Network, Server, Wrench } from 'lucide-react'

const ICON_MAP: Record<string, any> = {
  Code2,
  Server,
  Layout,
  Database,
  Brain,
  Cloud,
  Network,
  Wrench,
}

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative px-6 py-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 lg:grid-cols-[360px_1fr]">
          <div>
            <p className="section-label mb-6">04 / Capabilities</p>
            <h2 className="display text-4xl leading-tight md:text-6xl" style={{ color: 'var(--fg)' }}>
              A stack organized around outcomes.
            </h2>
          </div>
          <p className="max-w-3xl self-end text-lg leading-relaxed" style={{ color: 'var(--muted)' }}>
            Technologies are grouped by how they support delivery: product interfaces, backend scale, data reliability, AI workflows, and deployment operations.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border md:grid-cols-2 lg:grid-cols-4" style={{ borderColor: 'var(--border)', background: 'var(--border)' }}>
          {SKILLS.map((skill, index) => {
            const Icon = ICON_MAP[skill.icon] || BadgeCheck
            return (
              <motion.div
                key={skill.cat}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="min-h-[300px] p-6"
                style={{ background: 'var(--surface)' }}
              >
                <div className="mb-7 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                    <Icon size={20} />
                  </div>
                  <span className="mono text-[9px] tracking-[0.22em]" style={{ color: 'var(--muted)' }}>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight" style={{ color: 'var(--fg)' }}>{skill.cat}</h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span key={item} className="chip">{item}</span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_2fr]">
          <div className="surface p-7">
            <p className="mono mb-4 text-[10px] tracking-[0.24em]" style={{ color: 'var(--accent)' }}>COMMUNICATION</p>
            <h3 className="text-2xl font-semibold" style={{ color: 'var(--fg)' }}>Global collaboration ready.</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            {LANGUAGES.map((lang) => (
              <div key={lang.name} className="rounded-xl border p-5" style={{ borderColor: 'var(--border)', background: 'var(--surface-elev)' }}>
                <div className="font-semibold" style={{ color: 'var(--fg)' }}>{lang.name}</div>
                <div className="mt-2 mono text-[9px] tracking-[0.2em]" style={{ color: 'var(--muted)' }}>{lang.level}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
