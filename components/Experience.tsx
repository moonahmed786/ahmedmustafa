import { TIMELINE } from '@/lib/cv-data'

function HighlightMetrics({ text }: { text: string }) {
  // Regex to match percentages (e.g. 30%, 30 percent) and large numbers (e.g. 14+)
  // Also matches "doubling", "tripling", etc.
  const parts = text.split(/(\d+(?:\s?%|\s?percent|\+)|doubling|tripling|halving|cutting|reducing|increasing|accelerating|raising|boosting|~2x)/gi)
  
  return (
    <>
      {parts.map((part, i) => {
        const isMetric = /(\d+(?:\s?%|\s?percent|\+)|doubling|tripling|halving|cutting|reducing|increasing|accelerating|raising|boosting|~2x)/i.test(part)
        return isMetric ? (
          <span key={i} className="font-bold" style={{ color: 'var(--accent)' }}>{part}</span>
        ) : (
          part
        )
      })}
    </>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="relative px-6 py-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto">
        <p className="section-label mb-6">§02 / Experience</p>
        <h2 className="display text-5xl md:text-7xl leading-tight mb-4" style={{ color: 'var(--fg)', fontWeight: 400 }}>
          Career <span className="italic">Trajectory</span>.
        </h2>
        <p className="text-base mb-16" style={{ color: 'var(--muted)', fontWeight: 300 }}>
          10 years · 5 companies · Senior Solutions Architect & Tech Lead
        </p>

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
                    <span className="mono text-[10px] tracking-wider" style={{ color: i === 0 ? 'var(--accent)' : 'var(--muted)' }}>
                      {t.period}
                    </span>
                  </div>
                  <h3 className="display text-3xl mb-1" style={{ color: 'var(--fg)' }}>{t.company}</h3>
                  <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)', fontSize: '11px' }}>{t.role}</p>
                </div>

                {/* Right — bullet notes */}
                <div className="flex-1 border-l pl-8" style={{ borderColor: 'var(--border)' }}>
                  <ul className="space-y-4">
                    {t.notes.map((note, j) => (
                      <li key={j} className="flex gap-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--muted-fg)' }}>
                        <span
                          className="mt-[9px] w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: 'var(--accent)' }}
                        />
                        <span>
                          <HighlightMetrics text={note} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
