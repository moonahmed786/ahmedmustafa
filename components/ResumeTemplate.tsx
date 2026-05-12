'use client'

import { TIMELINE, SKILLS, EDUCATION, CERTIFICATIONS } from '@/lib/cv-data'

const INFO = {
  name: 'Ahmed Mustafa',
  title: 'Senior Solutions Architect and Full-Stack Engineer',
  email: 'moonahmed786@gmail.com',
  phone: '+92 332 837 1943',
  location: 'Rawalpindi, Punjab, PK · UTC+5',
  linkedin: 'linkedin.com/in/ahmed-mustafa-b3613754',
  github: 'github.com/moonahmed786',
  summary:
    'Senior Solutions Architect and Technical Lead with 10+ years designing scalable distributed systems and AI-integrated platforms across Healthcare, Fintech, E-commerce, and Telecom. Expert in MERN stack, Enterprise PHP (Laravel), and Python (FastAPI, RAG, LLMs). Proven track record leading cross-functional engineering teams and architecting high-concurrency microservices.',
}

function HighlightMetrics({ text }: { text: string }) {
  const parts = text.split(/(\d+(?:\s?%|\s?percent|\+)|doubling|tripling|halving|cutting|reducing|increasing|accelerating|raising|boosting|~2x)/gi)
  return (
    <>
      {parts.map((part, i) => {
        const isMetric = /(\d+(?:\s?%|\s?percent|\+)|doubling|tripling|halving|cutting|reducing|increasing|accelerating|raising|boosting|~2x)/i.test(part)
        return isMetric ? (
          <b key={i} style={{ color: '#0f172a' }}>{part}</b>
        ) : (
          part
        )
      })}
    </>
  )
}

function Section({ title, children, accent = false }: { title: string; children: React.ReactNode; accent?: boolean }) {
  return (
    <div style={{ marginBottom: '22px' }}>
      <h2 style={{
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.12em',
        color: accent ? '#38bdf8' : '#0f172a',
        margin: '0 0 10px 0',
        textTransform: 'uppercase',
        borderBottom: accent ? '1px solid #e2e8f0' : 'none',
        paddingBottom: '4px'
      }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

export default function ResumeTemplate() {
  return (
    <div
      id="resume"
      className="resume-container"
      style={{
        background: 'white',
        color: '#334155',
        fontFamily: 'var(--font-geist-sans), Inter, system-ui, sans-serif',
        padding: '40px 50px',
        width: '794px',
        margin: '0 auto',
        lineHeight: 1.45,
        fontSize: '9.5px',
        minHeight: '1123px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
      }}
    >
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { margin: 0; padding: 0; background: white !important; }
          .resume-container { width: 100% !important; box-shadow: none !important; margin: 0 !important; padding: 40px 50px !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      {/* ── Header (Centralized, Premium) ─────────────────── */}
      <header style={{ marginBottom: '28px', textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '12px' }}>
        <h1 style={{
          fontSize: '26px',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: '#0f172a',
          margin: 0,
          lineHeight: 1,
        }}>
          {INFO.name.toUpperCase()}
        </h1>
        <p style={{ 
          fontSize: '12px', 
          color: '#38bdf8', 
          marginTop: '4px', 
          fontWeight: 600, 
          letterSpacing: '0.06em',
          textTransform: 'uppercase'
        }}>
          {INFO.title}
        </p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '2px 12px',
          fontSize: '8.5px',
          color: '#64748b',
          marginTop: '10px',
          fontWeight: 500
        }}>
          <span>{INFO.email}</span>
          <span>•</span>
          <a href="https://wa.me/923328371943" style={{ color: 'inherit', textDecoration: 'none' }}>{INFO.phone}</a>
          <span>•</span>
          <span>{INFO.location}</span>
          <span>•</span>
          <span>{INFO.linkedin}</span>
          <span>•</span>
          <span>{INFO.github}</span>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '35px' }}>
        {/* ── Left Column ──────────────────────────────────── */}
        <aside>
          <Section title="Professional Summary" accent>
            <p style={{ fontSize: '9px', color: '#475569', margin: 0, textAlign: 'justify', lineHeight: 1.5 }}>
              {INFO.summary}
            </p>
          </Section>

          <Section title="Expertise" accent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {SKILLS.map((s) => (
                <div key={s.cat}>
                  <h3 style={{ fontSize: '8.5px', fontWeight: 700, color: '#0f172a', margin: '0 0 2px 0' }}>{s.cat}</h3>
                  <p style={{ fontSize: '8.5px', color: '#475569', margin: 0, lineHeight: 1.35 }}>{s.items.join(', ')}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Education" accent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {EDUCATION.map((e, i) => (
                <div key={i}>
                  <p style={{ fontSize: '9px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{e.degree}</p>
                  <p style={{ fontSize: '8.5px', color: '#64748b', margin: '1px 0' }}>{e.school}</p>
                  <p style={{ fontSize: '8px', color: '#94a3b8', fontWeight: 600 }}>{e.period}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Certifications" accent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {CERTIFICATIONS.map((c, i) => (
                <div key={i}>
                  <p style={{ fontSize: '9px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{c.name}</p>
                  <p style={{ fontSize: '8.5px', color: '#64748b', margin: '1px 0' }}>{c.issuer}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Industries" accent>
            <p style={{ fontSize: '9.5px', color: '#0f172a', margin: 0, fontWeight: 600, lineHeight: 1.4 }}>
              Healthcare, Fintech, E-commerce, Telecommunications, Blockchain, Web3, AI
            </p>
          </Section>
        </aside>

        {/* ── Right Column ─────────────────────────────────── */}
        <main>
          <Section title="Professional Experience" accent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {TIMELINE.map((exp, i) => (
                <div key={i} style={{ pageBreakInside: 'avoid' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                    <h3 style={{ fontSize: '10.5px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                      {exp.role}
                    </h3>
                    <span style={{ fontSize: '8.5px', color: '#94a3b8', fontWeight: 600 }}>
                      {exp.period}
                    </span>
                  </div>
                  <p style={{ fontSize: '9.5px', color: '#38bdf8', fontWeight: 600, margin: '0 0 5px 0' }}>
                    {exp.company} {exp.location && `| ${exp.location}`}
                  </p>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {exp.notes.map((note, j) => (
                      <li key={j} style={{ fontSize: '9px', color: '#475569', display: 'flex', gap: '8px', lineHeight: 1.4 }}>
                        <span style={{ color: '#38bdf8', flexShrink: 0, marginTop: '2px' }}>•</span>
                        <span>
                          <HighlightMetrics text={note} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        </main>
      </div>
    </div>
  )
}
