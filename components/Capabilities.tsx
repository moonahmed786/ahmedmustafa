import { SKILLS } from '@/lib/cv-data'

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative px-6 py-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto">
        <p className="section-label mb-6">§04 / Capabilities</p>
        <h2 className="display text-5xl md:text-7xl leading-tight mb-4" style={{ color: 'var(--fg)', fontWeight: 400 }}>
          The <span className="italic">toolkit</span>.
        </h2>
        <p className="text-base mb-16" style={{ color: 'var(--muted)', fontWeight: 300 }}>
          Full-stack to cloud to AI — the technologies I rely on in production.
        </p>

        <div>
          {SKILLS.map((s, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 py-6 border-t"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="md:w-52 shrink-0">
                <span className="mono text-[10px] tracking-[0.2em] uppercase" style={{ color: '#665e52' }}>
                  {String(i + 1).padStart(2, '0')} / {s.cat}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <span key={item} className="chip">{item}</span>
                ))}
              </div>
            </div>
          ))}
          <div className="border-t" style={{ borderColor: 'var(--border)' }} />
        </div>
      </div>
    </section>
  )
}
