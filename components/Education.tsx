import { EDUCATION } from '@/lib/cv-data'

export default function Education() {
  return (
    <section id="education" className="relative px-6 py-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto">
        <p className="section-label mb-6">§06 / Education</p>
        <h2
          className="display text-5xl md:text-7xl leading-tight mb-16"
          style={{ color: 'var(--fg)', fontWeight: 400 }}
        >
          Academic{' '}
          <span className="italic">Foundation</span>.
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {EDUCATION.map((edu, i) => (
            <div key={i} className="surface p-10">
              <div
                className="mono text-[11px] font-bold tracking-[0.3em] uppercase mb-4"
                style={{ color: 'var(--accent)' }}
              >
                {edu.period}
              </div>
              <h3 className="display text-3xl mb-2" style={{ color: 'var(--fg)' }}>
                {edu.degree}
              </h3>
              <div className="text-base" style={{ color: 'var(--muted)' }}>
                {edu.school}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
