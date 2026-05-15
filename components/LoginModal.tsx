'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Loader2, X, AlertCircle, Mail } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
  onSuccess: (email: string) => void
}

export default function LoginModal({ open, onClose, onSuccess }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    setError('')
    setPassword('')
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => emailRef.current?.focus(), 80)
    return () => {
      document.body.style.overflow = ''
      clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Login failed')
      onSuccess(data.email)
    } catch (err: any) {
      setError(err?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border overflow-hidden shadow-2xl"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                >
                  <Lock size={15} />
                </div>
                <div>
                  <div className="mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--muted)' }}>Owner Access</div>
                  <div className="text-sm font-medium" style={{ color: 'var(--fg)' }}>Unlock AI Full Rewrite</div>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-2 rounded-full transition-colors"
                style={{ color: 'var(--muted)' }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={submit} className="px-6 py-6 space-y-5">
              <div>
                <label className="mono text-[10px] tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>Email</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
                  <input
                    ref={emailRef}
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="surface-input w-full rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition-all border focus:border-accent/50"
                    style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mono text-[10px] tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
                  <input
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="surface-input w-full rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition-all border focus:border-accent/50"
                    style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                    required
                  />
                </div>
              </div>

              {error && (
                <div
                  className="flex items-center gap-2 text-sm p-3 rounded-lg border"
                  style={{ borderColor: 'rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.08)', color: '#ef4444' }}
                >
                  <AlertCircle size={14} /> {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full mono text-[11px] font-bold tracking-widest uppercase py-3.5 rounded-full flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Lock size={14} />}
                {loading ? 'Signing in…' : 'Sign in'}
              </button>

              <p className="mono text-[9px] tracking-widest uppercase text-center" style={{ color: 'var(--muted)' }}>
                Only the portfolio owner can unlock the full rewrite.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
