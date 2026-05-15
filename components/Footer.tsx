export default function Footer() {
  return (
    <footer className="relative px-6 py-12 border-t" style={{ borderColor: 'var(--border)', zIndex: 2 }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-warm)' }} />
            <span className="mono text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: 'var(--fg)' }}>
              Ahmed Mustafa
            </span>
          </div>
          <p className="mono text-[10px] tracking-[0.15em] uppercase pl-4" style={{ color: 'var(--footer-muted)' }}>
            Solutions Architect · Full-Stack Engineer · AI Builder
          </p>
        </div>

        <div className="flex items-center gap-6">
          <span className="mono text-[10px] tracking-[0.12em] uppercase" style={{ color: 'var(--footer-muted-soft)' }}>
            © {new Date().getFullYear()}
          </span>
          <a
            href="#top"
            className="mono text-[10px] tracking-[0.2em] uppercase flex items-center gap-1.5 transition-colors hover:text-[var(--accent-warm)]"
            style={{ color: 'var(--footer-muted)' }}
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
