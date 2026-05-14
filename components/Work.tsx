import { PROJECTS } from '@/lib/cv-data'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

type Project = typeof PROJECTS[number]

function ProjectCard({ p }: { p: Project }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="surface p-7 md:p-9 flex flex-col h-full group"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <span
            className="mono text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full"
            style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid var(--border)' }}
          >
            {p.tag}
          </span>
        </div>
        <span className="mono text-[11px] opacity-30 tracking-widest">{p.n}</span>
      </div>

      {/* Name & role */}
      <h3 className="display text-3xl md:text-4xl mb-2 group-hover:text-accent transition-colors duration-500" style={{ color: 'var(--fg)', fontWeight: 400 }}>
        {p.name}
      </h3>
      <p className="mono text-[10px] tracking-widest uppercase mb-5 opacity-40">
        {p.role}
      </p>

      {/* Description — readable color */}
      <p className="text-[15px] leading-relaxed mb-8 flex-1 font-light" style={{ color: 'var(--muted)', fontWeight: 300 }}>
        {p.desc}
      </p>

      {/* Stack & Link */}
      <div className="flex flex-col gap-6 mt-auto">
        <div className="flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span key={s} className="chip">{s}</span>
          ))}
        </div>
        
        {p.link && (
          <a 
            href={p.link} 
            target={p.link.startsWith('http') ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="flex items-center gap-2 mono text-[10px] font-bold tracking-[0.3em] uppercase transition-all hover:text-accent group/link"
            style={{ color: 'var(--muted)' }}
          >
            View Project <ArrowUpRight size={12} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
          </a>
        )}
      </div>
    </motion.div>
  )
}

function FeaturedCard({ p }: { p: Project }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="surface md:col-span-2 p-7 md:p-12 relative overflow-hidden group"
    >
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10 group-hover:bg-accent/10 transition-colors duration-1000" />
      
      <div className="md:flex gap-16 items-start">
        {/* Content */}
        <div className="md:flex-1">
          <div className="flex items-center gap-3 flex-wrap mb-8">
            <span
              className="mono text-[10px] font-bold tracking-[0.2em] uppercase px-5 py-2 rounded-full"
              style={{ backgroundColor: 'var(--accent-warm-soft)', color: 'var(--accent-warm)', border: '1px solid var(--border)' }}
            >
              ★ Featured System
            </span>
            <span className="mono text-[10px] tracking-[0.2em] uppercase px-5 py-2 rounded-full" style={{ backgroundColor: 'var(--surface-hover)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
              {p.tag}
            </span>
          </div>

          <h3 className="display text-5xl md:text-7xl mb-4 group-hover:text-accent transition-colors duration-700" style={{ color: 'var(--fg)', fontWeight: 400 }}>
            {p.name}
          </h3>
          <p className="mono text-[11px] tracking-[0.3em] uppercase mb-8 opacity-40 font-bold">
            {p.role}
          </p>
          <p className="text-lg leading-relaxed max-w-xl mb-12 font-light" style={{ color: 'var(--muted)', fontWeight: 300 }}>
            {p.desc}
          </p>
          <a
            href={p.link}
            className="inline-flex items-center gap-4 mono text-[11px] font-bold tracking-[0.2em] uppercase px-10 py-5 rounded-full transition-all bg-accent text-white shadow-xl shadow-accent/10 hover:shadow-accent/30 hover:scale-105 active:scale-95"
          >
            {p.name === 'Tailor.cv' ? 'Launch System' : 'View Case Study'}
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Stack panel */}
        <div className="mt-12 md:mt-0 md:w-56 shrink-0 pt-4">
          <p className="mono text-[10px] tracking-[0.4em] uppercase mb-6 opacity-30 font-bold">Tech Stack</p>
          <div className="flex flex-wrap md:flex-col gap-3">
            {p.stack.map((s) => (
              <span key={s} className="chip text-center">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Work() {
  return (
    <section id="work" className="relative px-6 py-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto">
        <p className="section-label mb-6">§03 / Selected Work</p>
        <h2 className="display text-5xl md:text-7xl leading-tight mb-4" style={{ color: 'var(--fg)', fontWeight: 400 }}>
          Six things I&apos;m{' '}
          <span className="italic">proud</span> to have built.
        </h2>
        <p className="text-base mb-16" style={{ color: 'var(--muted)', fontWeight: 300 }}>
          AI tools, healthcare platforms, sustainability marketplaces, and mobility APIs.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {PROJECTS.map((p) =>
            p.featured ? (
              <FeaturedCard key={p.n} p={p} />
            ) : (
              <ProjectCard key={p.n} p={p} />
            )
          )}
        </div>
      </div>
    </section>
  )
}
