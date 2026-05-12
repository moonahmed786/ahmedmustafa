import { ArrowDown, MapPin, Database, Server, Code, Brain } from 'lucide-react'
import DownloadCVButton from './DownloadCVButton'

interface HeroProps {
  loaded: boolean
}

const STATS = [
  { n: '10+', label: 'Years Exp', icon: Server },
  { n: '50+', label: 'Projects', icon: Code },
  { n: '100%', label: 'Delivery', icon: Database },
  { n: 'AI', label: 'Enabled', icon: Brain },
]

export default function Hero({ loaded }: HeroProps) {
  return (
    <section id="top" className="relative min-h-screen flex flex-col px-6 pt-28 pb-10 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl -z-10" />

      {/* Top bar */}
      <div className={`flex items-center justify-between fade-in delay-1 ${loaded ? 'in' : ''}`}>
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
          <span className="mono text-[11px] tracking-[0.2em] uppercase" style={{ color: 'var(--accent)' }}>
            Open to work
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 mono text-[11px] tracking-[0.12em]" style={{ color: 'var(--muted)' }}>
          <MapPin size={11} style={{ color: 'var(--accent)' }} />
          Rawalpindi, Punjab, PK · UTC+5
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="flex-1 flex items-center py-10 md:py-20">
        <div className="w-full grid lg:grid-cols-[1.2fr,0.8fr] gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Information */}
          <div className="space-y-8">
            <div className={`fade-in delay-2 ${loaded ? 'in' : ''}`}>
              <h1
                className="display"
                style={{
                  fontSize: 'clamp(56px, 10vw, 120px)',
                  lineHeight: 0.9,
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                }}
              >
                Ahmed
                <br />
                <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Mustafa</span>
                <span className="display" style={{ color: 'var(--accent)' }}>.</span>
              </h1>
            </div>

            <div className={`fade-in delay-3 ${loaded ? 'in' : ''}`}>
              <div
                className="mono text-[11px] tracking-[0.15em] uppercase px-5 py-2.5 rounded-full inline-block mb-6"
                style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--accent)', fontWeight: 600 }}
              >
                Senior Solutions Architect · Full-Stack Engineer
              </div>
              <p className="max-w-xl" style={{ color: 'var(--muted-fg)', fontSize: '1.25rem', lineHeight: 1.6, fontWeight: 300 }}>
                I architect scalable distributed systems and AI platforms. 
                Expert in <span className="font-medium text-fg">MERN, Laravel, and Python RAG</span> — 
                transforming complex business needs into premium, production-grade software.
              </p>
            </div>

            <div className={`flex flex-wrap items-center gap-4 fade-in delay-4 ${loaded ? 'in' : ''}`}>
              <DownloadCVButton variant="hero" />
              <a
                href="#contact"
                className="flex items-center gap-2 px-8 py-4 rounded-full border mono text-[11px] font-bold tracking-[0.18em] uppercase transition-all hover:bg-fg hover:text-bg"
                style={{ borderColor: 'var(--border)', color: 'var(--muted-fg)' }}
              >
                Let&apos;s talk
              </a>
            </div>
          </div>

          {/* Right Column: Visual Stats Card */}
          <div className={`hidden lg:block fade-in delay-5 ${loaded ? 'in' : ''}`}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-accent/5 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000" />
              <div className="relative surface border p-10 rounded-2xl grid grid-cols-2 gap-8 bg-bg/80 backdrop-blur-xl">
                {STATS.map(({ n, label, icon: Icon }, i) => (
                  <div key={i} className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon size={18} style={{ color: 'var(--accent)' }} />
                    </div>
                    <div>
                      <div className="display text-4xl mb-1" style={{ color: 'var(--fg)' }}>{n}</div>
                      <div className="mono text-[10px] tracking-[0.2em] uppercase opacity-60">{label}</div>
                    </div>
                  </div>
                ))}
                
                {/* Visual Connector Lines (Abstract) */}
                <div className="col-span-2 pt-6 border-t mt-4" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center justify-between opacity-40">
                    <span className="mono text-[9px] tracking-[0.1em] uppercase">System Latency: 24ms</span>
                    <span className="mono text-[9px] tracking-[0.1em] uppercase">Uptime: 99.9%</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-accent w-[92%] animate-[shimmer_2s_infinite]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div
        className={`pt-8 border-t flex items-center justify-between flex-wrap gap-6 fade-in delay-5 ${loaded ? 'in' : ''}`}
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="flex lg:hidden items-center gap-8 md:gap-14 flex-wrap">
          {STATS.map(({ n, label }, i) => (
            <div key={i} className="flex items-baseline gap-2">
              <span className="display text-3xl md:text-4xl" style={{ color: 'var(--fg)', fontWeight: 400 }}>{n}</span>
              <span className="mono text-[10px] tracking-[0.15em] uppercase opacity-60">{label}</span>
            </div>
          ))}
        </div>
        <div className="hidden lg:block mono text-[10px] tracking-[0.15em] opacity-40 uppercase">
          Based in Rawalpindi, PK · Working Globally
        </div>
        <div className="flex items-center gap-2 mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--accent)' }}>
          Scroll to explore
          <ArrowDown size={12} className="animate-bounce" />
        </div>
      </div>
    </section>
  )
}
