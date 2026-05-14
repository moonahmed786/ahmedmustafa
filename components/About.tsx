const STATS = [
  { n: '50+', label: 'Projects' },
  { n: '10+', label: 'PHP' },
  { n: '10+', label: 'Laravel' },
  { n: '8+', label: 'MERN' },
  { n: '10+', label: 'AI' },
  { n: '14+', label: 'RoR' },
  { n: '5+', label: 'WordPress' },
  { n: '5+', label: 'Shopify' },
]

export default function About() {
  return (
    <section id="about" className="relative px-6 py-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto">
        <p className="section-label mb-6">§01 / The Profile</p>

        <p className="display text-4xl md:text-6xl leading-tight mb-6 max-w-4xl" style={{ color: 'var(--fg)', fontWeight: 400 }}>
          For a decade, I&apos;ve specialized in turning complex business visions into{' '}
          <span className="italic">scalable, production-ready architectures</span>.
        </p>
        <p className="text-lg mb-20 max-w-2xl" style={{ color: 'var(--muted)', fontWeight: 300 }}>
          From a PHP dev writing first APIs at PTCL to leading architecture for AI-powered healthcare platforms — here&apos;s the breadth of what I&apos;ve shipped.
        </p>

        <div className="grid grid-cols-4 md:grid-cols-8" style={{ borderTop: '1px solid var(--border)' }}>
          {STATS.map((s, i) => (
            <div
              key={i}
              className="py-8 px-3 text-center"
              style={{ borderRight: i < STATS.length - 1 ? '1px solid var(--border)' : 'none' }}
            >
              <div className="display text-3xl md:text-4xl mb-1.5" style={{ color: 'var(--fg)', fontWeight: 400 }}>
                {s.n}
              </div>
              <div className="mono text-[9px] tracking-[0.18em] uppercase" style={{ color: 'var(--muted)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
