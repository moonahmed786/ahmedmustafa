import { PROJECTS } from '@/lib/cv-data'
import { ArrowUpRight } from 'lucide-react'

type Project = typeof PROJECTS[number]

function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="surface p-7 md:p-9 flex flex-col h-full group">
      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <span
            className="mono text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full"
            style={{ backgroundColor: 'rgba(56, 189, 248, 0.1)', color: 'var(--accent)', border: '1px solid rgba(56, 189, 248, 0.2)' }}
          >
            {p.tag}
          </span>
        </div>
        <span className="mono text-[11px]" style={{ color: 'var(--muted)' }}>{p.n}</span>
      </div>

      {/* Name & role */}
      <h3 className="display text-3xl md:text-4xl mb-2" style={{ color: 'var(--fg)', fontWeight: 400 }}>
        {p.name}
      </h3>
      <p className="mono text-[10px] tracking-wider uppercase mb-5" style={{ color: 'var(--muted)' }}>
        {p.role}
      </p>

      {/* Description — readable color */}
      <p className="text-sm leading-relaxed mb-8 flex-1" style={{ color: 'var(--muted-fg)' }}>
        {p.desc}
      </p>

      {/* Stack */}
      <div className="flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <span key={s} className="chip">{s}</span>
        ))}
      </div>
    </div>
  )
}

function FeaturedCard({ p }: { p: Project }) {
  return (
    <div className="surface md:col-span-2 p-7 md:p-9 relative overflow-hidden group">
      {/* Accent bar */}
      <div
        className="absolute top-0 left-8 right-8 h-[2px] rounded-b-full"
        style={{ backgroundColor: 'var(--accent-warm)', opacity: 0.6 }}
      />

      <div className="md:flex gap-12 items-start">
        {/* Content */}
        <div className="md:flex-1">
          <div className="flex items-center gap-3 flex-wrap mb-6">
            <span
              className="mono text-[10px] font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full"
              style={{ backgroundColor: 'var(--accent-warm-soft)', color: 'var(--accent-warm)', border: '1px solid var(--accent-warm-soft)' }}
            >
              ★ Featured Project
            </span>
            <span className="mono text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full" style={{ backgroundColor: 'var(--surface-hover)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
              {p.tag}
            </span>
          </div>

          <h3 className="display text-5xl md:text-6xl mb-2" style={{ color: 'var(--fg)', fontWeight: 400 }}>
            {p.name}
          </h3>
          <p className="mono text-[10px] tracking-wider uppercase mb-6" style={{ color: 'var(--muted)' }}>
            {p.role}
          </p>
          <p className="text-base leading-relaxed max-w-xl mb-8 font-light" style={{ color: 'var(--muted)' }}>
            {p.desc}
          </p>
          <a
            href="#tool"
            className="inline-flex items-center gap-2 mono text-[11px] font-bold tracking-[0.2em] uppercase px-8 py-4 rounded-full transition-all hover:bg-fg hover:text-bg"
            style={{ backgroundColor: 'var(--accent)', color: 'white' }}
          >
            Try it live
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Stack panel */}
        <div className="mt-10 md:mt-0 md:w-44 shrink-0">
          <p className="mono text-[10px] tracking-widest uppercase mb-4" style={{ color: '#4a4238' }}>Stack</p>
          <div className="flex flex-wrap md:flex-col gap-2">
            {p.stack.map((s) => (
              <span key={s} className="chip">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
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
