import { Mail, Phone, Linkedin, Github, ArrowUpRight } from 'lucide-react'

const LINKS = [
  { icon: Mail, label: 'moonahmed786@gmail.com', sub: 'Email', href: 'mailto:moonahmed786@gmail.com' },
  { icon: Phone, label: '+92 332 8371943', sub: 'WhatsApp', href: 'https://wa.me/923328371943' },
  {
    icon: Linkedin,
    label: 'linkedin.com/in/ahmed-mustafa-b3613754',
    sub: 'LinkedIn',
    href: 'https://linkedin.com/in/ahmed-mustafa-b3613754',
  },
  { icon: Github, label: 'github.com/moonahmed786', sub: 'GitHub', href: 'https://github.com/moonahmed786' },
  { icon: ArrowUpRight, label: 'ahmedmustafa.programmersin.com', sub: 'Portfolio', href: 'https://ahmedmustafa.programmersin.com/' },
]

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-24 md:py-32 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto">
        <p className="section-label mb-10 md:mb-16">§08 / Contact</p>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          
          {/* Left Column: Heading & Info */}
          <div>
            <h2
              className="display leading-[0.9] mb-8"
              style={{ color: 'var(--fg)', fontSize: 'clamp(52px, 7vw, 120px)', fontWeight: 400 }}
            >
              Let&apos;s{' '}
              <span className="italic" style={{ color: 'var(--accent)' }}>build</span>
              <br />
              something.
            </h2>

            <p className="text-xl md:text-2xl leading-relaxed max-w-xl" style={{ color: 'var(--muted)', fontWeight: 300 }}>
              Open to senior engineering, solutions architect, and AI / RAG leadership roles. 
              I reply within 24 hours — real conversations only.
            </p>

            {/* Availability Badge */}
            <div className="mt-12 flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent)' }} />
              <span className="mono text-[10px] tracking-[0.2em] uppercase font-bold" style={{ color: 'var(--accent)' }}>
                Available for New Projects
              </span>
            </div>
          </div>

          {/* Right Column: Contact Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {LINKS.map((l, i) => {
              const Icon = l.icon
              return (
                <a
                  key={i}
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="surface flex flex-col justify-between p-8 group border transition-all hover:border-accent/40"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div className="flex flex-col gap-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-accent/10"
                      style={{ backgroundColor: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.1)', color: 'var(--accent)' }}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="mono text-[9px] tracking-widest uppercase opacity-60" style={{ color: 'var(--fg)' }}>{l.sub}</p>
                        <ArrowUpRight
                          size={14}
                          className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 opacity-40 group-hover:opacity-100"
                          style={{ color: 'var(--accent)' }}
                        />
                      </div>
                      <p className="text-[13px] font-medium break-all" style={{ color: 'var(--fg)' }}>{l.label}</p>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
