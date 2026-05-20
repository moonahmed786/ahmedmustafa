import { EDUCATION } from '@/lib/cv-data'

export default function Education() {
  return (
    <section id="education" className="relative px-6 py-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[360px_1fr]">
        <aside>
          <p className="section-label mb-6">06 / Education</p>
          <h2 className="display text-4xl leading-tight md:text-5xl" style={{ color: 'var(--fg)' }}>
            Academic foundation for technical leadership.
          </h2>
        </aside>

        <div className="grid gap-5 md:grid-cols-2">
          {EDUCATION.map((edu, index) => (
            <article key={edu.degree} className="surface p-7 md:p-9">
              <div className="mb-10 flex items-center justify-between border-b pb-5" style={{ borderColor: 'var(--border)' }}>
                <span className="mono text-[10px] tracking-[0.24em]" style={{ color: 'var(--accent)' }}>{edu.period}</span>
                <span className="mono text-[10px]" style={{ color: 'var(--muted)' }}>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="text-3xl font-semibold leading-tight" style={{ color: 'var(--fg)' }}>
                {edu.degree}
              </h3>
              <p className="mt-4 text-base" style={{ color: 'var(--muted)' }}>{edu.school}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
