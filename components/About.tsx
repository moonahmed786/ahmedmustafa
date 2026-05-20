const STATS = [
  { n: '30%', label: 'Productivity lift', text: 'Led standards, reviews, and delivery rhythms across engineering squads.' },
  { n: '60%', label: 'Manual work reduced', text: 'Migrated and integrated fragmented enterprise workflows into Salesforce.' },
  { n: '45%', label: 'Accuracy improved', text: 'Architected AI chatbot flows with RAG, LLMs, and production feedback loops.' },
]

const PRINCIPLES = [
  'Translate ambiguous business goals into executable technical roadmaps.',
  'Build backend foundations that can scale without becoming fragile.',
  'Make AI features measurable, observable, and useful inside real products.',
  'Lead teams through delivery, tradeoffs, and production accountability.',
]

export default function About() {
  return (
    <section id="about" className="relative px-6 py-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[360px_1fr]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="section-label mb-6">01 / Profile</p>
          <h2 className="display text-4xl leading-tight md:text-5xl" style={{ color: 'var(--fg)' }}>
            Architect, lead, and ship.
          </h2>
          <p className="mt-6 text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
            A portfolio built around delivery maturity: business context first, architecture second, code that survives production third.
          </p>
        </aside>

        <div className="space-y-8">
          <div className="surface grid gap-8 p-7 md:grid-cols-[1.2fr_0.8fr] md:p-10">
            <div>
              <p className="mono mb-5 text-[10px] tracking-[0.26em]" style={{ color: 'var(--accent)' }}>OPERATING NARRATIVE</p>
              <p className="display text-3xl leading-tight md:text-5xl" style={{ color: 'var(--fg)', fontWeight: 600 }}>
                I turn complex business visions into systems teams can actually run, scale, and improve.
              </p>
            </div>
            <p className="self-end text-lg leading-relaxed" style={{ color: 'var(--muted)' }}>
              From early PHP APIs at PTCL to AI healthcare platforms and enterprise integrations, the thread is consistent: practical architecture, measurable outcomes, and strong delivery habits.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {STATS.map((stat) => (
              <div key={stat.label} className="surface p-6">
                <div className="display text-5xl" style={{ color: 'var(--accent)' }}>{stat.n}</div>
                <h3 className="mt-4 text-lg font-semibold" style={{ color: 'var(--fg)' }}>{stat.label}</h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{stat.text}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {PRINCIPLES.map((item, index) => (
              <div key={item} className="grid grid-cols-[48px_1fr] gap-5 border-t pt-6" style={{ borderColor: 'var(--border)' }}>
                <div className="mono text-[10px] tracking-[0.22em]" style={{ color: 'var(--accent)' }}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--fg)' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
