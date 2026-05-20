'use client'

import { PROJECTS } from '@/lib/cv-data'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

function ProjectPreview({ name, tag, large = false }: { name: string; tag: string; large?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden border ${large ? 'h-72' : 'h-36 sm:h-full'} rounded-xl`}
      style={{ borderColor: 'var(--border)', background: 'var(--surface-elev)' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,var(--accent-soft),transparent_34%),linear-gradient(135deg,transparent,rgba(255,255,255,0.04))]" />
      <div className="absolute inset-5 grid grid-rows-[1fr_auto]">
        <div className="grid grid-cols-3 gap-2 opacity-55">
          {Array.from({ length: large ? 12 : 6 }).map((_, index) => (
            <span key={index} className="rounded-md border" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }} />
          ))}
        </div>
        <div>
          <p className="mono text-[9px] tracking-[0.22em]" style={{ color: 'var(--accent)' }}>{tag}</p>
          <p className={`${large ? 'text-4xl' : 'text-2xl'} mt-2 font-semibold tracking-tight`} style={{ color: 'var(--fg)' }}>{name}</p>
        </div>
      </div>
    </div>
  )
}

export default function Work() {
  const featured = PROJECTS.find((project) => project.featured) ?? PROJECTS[0]
  const projects = PROJECTS.filter((project) => project.name !== featured.name)

  return (
    <section id="work" className="relative px-6 py-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 lg:grid-cols-[360px_1fr]">
          <div>
            <p className="section-label mb-6">03 / Selected Work</p>
            <h2 className="display text-4xl leading-tight md:text-6xl" style={{ color: 'var(--fg)' }}>
              Systems with measurable business outcomes.
            </h2>
          </div>
          <p className="max-w-3xl self-end text-lg leading-relaxed" style={{ color: 'var(--muted)' }}>
            The work is intentionally mixed: AI products, healthcare platforms, sustainability marketplaces, enterprise integrations, and mobility systems.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.a
            href={featured.link}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="surface group min-h-[620px] overflow-hidden"
          >
            <div className="relative border-b p-5" style={{ borderColor: 'var(--border)' }}>
              <ProjectPreview name={featured.name} tag={featured.tag} large />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
              <span className="absolute left-6 top-6 rounded-lg border px-4 py-2 mono text-[9px] tracking-[0.22em]" style={{ borderColor: 'var(--border)', background: 'var(--glass-bg)', color: 'var(--accent)' }}>
                Featured platform
              </span>
            </div>
            <div className="p-7 md:p-10">
              <div className="mb-5 flex items-center justify-between gap-5">
                <span className="mono text-[10px] tracking-[0.24em]" style={{ color: 'var(--accent)' }}>{featured.tag}</span>
                <ArrowUpRight className="transition group-hover:translate-x-1 group-hover:-translate-y-1" size={20} style={{ color: 'var(--accent)' }} />
              </div>
              <h3 className="display text-5xl md:text-7xl" style={{ color: 'var(--fg)' }}>{featured.name}</h3>
              <p className="mt-3 mono text-[10px] tracking-[0.24em]" style={{ color: 'var(--muted)' }}>{featured.role}</p>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed" style={{ color: 'var(--muted)' }}>{featured.desc}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {featured.stack.map((item) => (
                  <span key={item} className="chip">{item}</span>
                ))}
              </div>
            </div>
          </motion.a>

          <div className="grid gap-5">
            {projects.map((project, index) => (
              <motion.a
                key={project.n}
                href={project.link}
                target={project.link.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="surface group grid gap-5 p-5 sm:grid-cols-[140px_1fr]"
              >
                <ProjectPreview name={project.name} tag={project.tag} />
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <span className="mono text-[9px] tracking-[0.22em]" style={{ color: 'var(--accent)' }}>{project.tag}</span>
                      <span className="mono text-[9px]" style={{ color: 'var(--muted)' }}>{project.n}</span>
                    </div>
                    <h3 className="text-2xl font-semibold tracking-tight transition group-hover:text-accent" style={{ color: 'var(--fg)' }}>{project.name}</h3>
                    <p className="mt-1 mono text-[9px] tracking-[0.2em]" style={{ color: 'var(--muted)' }}>{project.role}</p>
                    <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{project.desc}</p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.slice(0, 3).map((item) => (
                      <span key={item} className="chip">{item}</span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
