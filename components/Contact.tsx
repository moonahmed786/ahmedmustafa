import { ArrowUpRight, Github, Linkedin, Mail, Phone } from 'lucide-react'

const LINKS = [
  { icon: Mail, label: 'moonahmed786@gmail.com', sub: 'Email', href: 'mailto:moonahmed786@gmail.com' },
  { icon: Phone, label: '+92 332 8371943', sub: 'WhatsApp', href: 'https://wa.me/923328371943' },
  { icon: Linkedin, label: 'LinkedIn profile', sub: 'LinkedIn', href: 'https://linkedin.com/in/ahmed-mustafa-b3613754' },
  { icon: Github, label: 'GitHub work', sub: 'GitHub', href: 'https://github.com/moonahmed786' },
]

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-24 md:py-32 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="mx-auto max-w-7xl">
        <div className="surface overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-7 md:p-12 lg:p-16">
              <p className="section-label mb-8">08 / Contact</p>
              <h2
                className="display max-w-4xl leading-[0.95]"
                style={{ color: 'var(--fg)', fontSize: 'clamp(48px, 8vw, 110px)' }}
              >
                Let&apos;s discuss the system you need to ship.
              </h2>
              <p className="mt-8 max-w-2xl text-xl leading-relaxed" style={{ color: 'var(--muted)' }}>
                Open to senior engineering, solutions architecture, AI/RAG leadership, and high-trust platform work.
              </p>
              <div className="mt-10 inline-flex items-center gap-3 rounded-xl border px-4 py-3" style={{ borderColor: 'var(--border)', background: 'var(--surface-elev)' }}>
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                <span className="mono text-[10px] font-bold tracking-[0.22em]" style={{ color: 'var(--accent)' }}>Replies within 24 hours</span>
              </div>
            </div>

            <div className="grid border-t lg:border-l lg:border-t-0" style={{ borderColor: 'var(--border)' }}>
              {LINKS.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.sub}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group grid grid-cols-[44px_1fr_24px] items-center gap-5 border-b p-6 transition hover:bg-[var(--surface-elev)] last:border-b-0"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                      <Icon size={19} />
                    </div>
                    <div className="min-w-0">
                      <p className="mono text-[9px] tracking-[0.22em]" style={{ color: 'var(--muted)' }}>{link.sub}</p>
                      <p className="mt-1 truncate text-base font-semibold" style={{ color: 'var(--fg)' }}>{link.label}</p>
                    </div>
                    <ArrowUpRight size={18} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: 'var(--accent)' }} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
