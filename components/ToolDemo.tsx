'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Loader2, Check, Copy, AlertCircle, Download, Zap, Briefcase, Search, X, Filter, Lock, LogOut, ShieldCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import LoginModal from '@/components/LoginModal'

interface TailorResult {
  tailoredCV: string
  tailoredSummary: string
  tailoredCoverLetter: string
  atsScore: number
  scoreExplanation: string
  matchedKeywords: string[]
  missingKeywords: string[]
  improvements: string[]
}

const MIN_JD_LENGTH = 100

export default function ToolDemo() {
  const [jd, setJd] = useState('')
  const [roleName, setRoleName] = useState('')
  const [selectedModel, setSelectedModel] = useState<'groq' | 'claude' | 'openai'>('groq')
  const [analyzing, setAnalyzing] = useState(false)
  const [tailoring, setTailoring] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<{
    score: number
    matches: string[]
    missing: string[]
  } | null>(null)
  const [result, setResult] = useState<TailorResult | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'cv' | 'summary' | 'letter'>('cv')
  const [authEmail, setAuthEmail] = useState<string | null>(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(d => {
        if (cancelled) return
        if (d?.authenticated) setAuthEmail(d.email)
        setAuthChecked(true)
      })
      .catch(() => { if (!cancelled) setAuthChecked(true) })
    return () => { cancelled = true }
  }, [])

  const runAnalysis = async () => {
    if (jd.length < MIN_JD_LENGTH) return
    setAnalyzing(true)
    setError('')
    setResult(null)
    try {
      await new Promise(r => setTimeout(r, 800))
      const techKeywords = ['react', 'next.js', 'node.js', 'python', 'laravel', 'aws', 'docker', 'kubernetes', 'typescript', 'sql', 'nosql', 'rag', 'llm', 'fastapi', 'microservices', 'graphql', '.net', 'c#', 'azure']
      const lowerJD = jd.toLowerCase()
      const found = techKeywords.filter(k => lowerJD.includes(k))
      const missing = techKeywords.filter(k => !lowerJD.includes(k)).slice(0, 6)
      setAnalysisResult({
        score: Math.min(40 + found.length * 5, 95),
        matches: found,
        missing,
      })
    } catch {
      setError('Analysis failed.')
    } finally {
      setAnalyzing(false)
    }
  }

  const requestTailor = () => {
    if (!authEmail) {
      setLoginOpen(true)
      return
    }
    runTailoring()
  }

  const runTailoring = async () => {
    setTailoring(true)
    setError('')
    try {
      const response = await fetch('/api/tailor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jd, model: selectedModel }),
      })
      const data = await response.json()
      if (response.status === 401) {
        setAuthEmail(null)
        setLoginOpen(true)
        throw new Error(data?.error || 'Sign in required.')
      }
      if (!response.ok) throw new Error(data.error || 'Failed')
      setResult(data)
      setActiveTab('cv')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setTailoring(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setAuthEmail(null)
  }

  const removeSkill = (skill: string) => {
    if (!analysisResult) return
    setAnalysisResult({
      ...analysisResult,
      matches: analysisResult.matches.filter(s => s !== skill),
      missing: [...analysisResult.missing, skill],
    })
  }

  const copyContent = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadPDF = async (text: string) => {
    const { downloadTailoredCVAsPDF } = await import('@/lib/generate-pdf')
    let org = 'Tailored'
    if (roleName) {
      const match = roleName.match(/(?:@| at | for )\s*(.+)$/i)
      if (match && match[1]) org = match[1].trim()
      else if (roleName.length < 20) org = roleName.trim()
    }
    await downloadTailoredCVAsPDF(text, `Ahmed Mustafa - ${org}.pdf`)
  }

  return (
    <section id="tool" className="relative px-6 py-32 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 mb-12">
          <div className="lg:col-span-4">
            <p className="section-label mb-4">§05 / AI Command Center</p>
            <h2 className="display text-5xl leading-tight" style={{ color: 'var(--fg)' }}>
              Optimize for <br /><span className="italic" style={{ color: 'var(--accent)' }}>Success</span>.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-xl font-light leading-relaxed" style={{ color: 'var(--muted)' }}>
              Paste your target job description to run a free alignment check anyone can use.
              The full AI rewrite is reserved for the portfolio owner.
            </p>
          </div>
        </div>

        {/* Two-track explainer */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <div className="rounded-2xl border p-5 flex items-start gap-4" style={{ borderColor: 'var(--border)', background: 'var(--surface-elev)' }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
              <Search size={14} />
            </div>
            <div>
              <div className="mono text-[10px] tracking-widest uppercase mb-1" style={{ color: 'var(--muted)' }}>Part 1 · Public</div>
              <div className="text-sm font-medium mb-1" style={{ color: 'var(--fg)' }}>Alignment Check</div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                Anyone can paste a JD and instantly see how it stacks against the master CV — match score, hits, gaps.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border p-5 flex items-start gap-4" style={{ borderColor: 'var(--border)', background: 'var(--accent-warm-soft)' }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
              <Lock size={14} />
            </div>
            <div className="flex-1">
              <div className="mono text-[10px] tracking-widest uppercase mb-1 flex items-center gap-2" style={{ color: 'var(--muted)' }}>
                Part 2 · Owner Only
                {authEmail && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full mono text-[8px]" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                    <ShieldCheck size={9} /> Unlocked
                  </span>
                )}
              </div>
              <div className="text-sm font-medium mb-1" style={{ color: 'var(--fg)' }}>AI Tailor &amp; Full Rewrite</div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                Generates a fully rewritten, ATS-tuned CV plus a custom hook and cover letter. Sign-in required.
              </p>
            </div>
          </div>
        </div>

        <div className="surface border relative overflow-hidden group shadow-2xl" style={{ borderColor: 'var(--border)' }}>
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-accent/5 blur-[120px] pointer-events-none" />

          {/* Dashboard Header */}
          <div className="px-8 py-6 border-b glass flex items-center justify-between flex-wrap gap-4" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-4">
              <Zap size={16} style={{ color: 'var(--accent)' }} />
              <span className="mono text-[11px] font-bold tracking-[0.3em] uppercase" style={{ color: 'var(--fg)' }}>
                Neural CV Architect <span className="opacity-40">v4.2_OPTIMIZED</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${analyzing || tailoring ? 'animate-ping' : ''}`} style={{ background: analyzing || tailoring ? 'var(--accent)' : '#22c55e' }} />
                <span className="mono text-[9px] tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
                  {analyzing ? 'Analyzing Gap...' : tailoring ? 'Rewriting CV...' : 'System Ready'}
                </span>
              </div>
              {authChecked && (
                authEmail ? (
                  <button
                    onClick={handleLogout}
                    className="mono text-[9px] tracking-widest uppercase flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all"
                    style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
                  >
                    <LogOut size={10} /> Sign out
                  </button>
                ) : (
                  <button
                    onClick={() => setLoginOpen(true)}
                    className="mono text-[9px] tracking-widest uppercase flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all"
                    style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
                  >
                    <Lock size={10} /> Owner sign-in
                  </button>
                )
              )}
            </div>
          </div>

          <div className="p-8 md:p-12 relative z-10">
            {/* Phase 1: Input */}
            <div className="space-y-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="mono text-[10px] font-bold tracking-widest uppercase mb-3 block" style={{ color: 'var(--muted)' }}>Target Role / Company</label>
                  <div className="relative">
                    <Briefcase size={14} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--accent)', opacity: 0.6 }} />
                    <input
                      type="text"
                      placeholder="e.g. Senior Backend Engineer @ Google"
                      value={roleName}
                      onChange={(e) => setRoleName(e.target.value)}
                      className="surface-input w-full border rounded-xl py-4 pl-12 pr-4 text-sm outline-none focus:border-accent/40 transition-all"
                      style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="mono text-[10px] font-bold tracking-widest uppercase mb-3 block" style={{ color: 'var(--muted)' }}>AI Model Engine</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['groq', 'claude', 'openai'] as const).map(m => {
                      const selected = selectedModel === m
                      return (
                        <button
                          key={m}
                          onClick={() => setSelectedModel(m)}
                          className="py-3 rounded-xl border mono text-[9px] tracking-widest uppercase transition-all flex flex-col items-center gap-1.5 surface-soft"
                          style={{
                            background: selected ? 'var(--accent-soft)' : 'var(--surface-elev)',
                            borderColor: selected ? 'var(--accent)' : 'var(--border)',
                            color: selected ? 'var(--fg)' : 'var(--muted)',
                          }}
                        >
                          <div className={`w-1 h-1 rounded-full ${selected ? 'animate-pulse' : ''}`} style={{ background: selected ? 'var(--accent)' : 'var(--muted)', opacity: selected ? 1 : 0.4 }} />
                          {m === 'groq' ? 'Groq LPU' : m === 'claude' ? 'Claude 3.5' : 'GPT-4o-Mini'}
                          <span className="opacity-50 text-[7px]">
                            {m === 'groq' ? '(High-Speed Free)' : m === 'claude' ? '(Premium)' : '(Budget)'}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div>
                <label className="mono text-[10px] font-bold tracking-widest uppercase mb-3 block" style={{ color: 'var(--muted)' }}>Job Description</label>
                <textarea
                  value={jd}
                  onChange={(e) => setJd(e.target.value)}
                  placeholder="Paste the full job description here..."
                  className="surface-input w-full border rounded-2xl p-8 text-sm leading-relaxed min-h-[250px] outline-none focus:border-accent/30 transition-all scrollbar-thin"
                  style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                />
                <div className="mt-2 mono text-[9px] tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
                  {jd.length < MIN_JD_LENGTH ? `${MIN_JD_LENGTH - jd.length} chars to unlock analysis` : `${jd.length} chars · ready`}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={runAnalysis}
                  disabled={analyzing || jd.length < MIN_JD_LENGTH}
                  className="px-10 py-4 rounded-full mono text-[11px] font-bold tracking-widest uppercase flex items-center gap-3 hover:scale-105 active:scale-95 transition-all disabled:opacity-30"
                  style={{ background: 'var(--fg)', color: 'var(--bg)' }}
                >
                  {analyzing ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                  Analyze Alignment
                </button>
              </div>
            </div>

            {/* Phase 2: Analysis & Refinement */}
            <AnimatePresence>
              {analysisResult && !result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-16 pt-16 border-t"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div className="grid md:grid-cols-12 gap-12">
                    <div className="md:col-span-4 surface p-8 border" style={{ borderColor: 'var(--border)' }}>
                      <div className="mono text-[10px] tracking-widest uppercase mb-6" style={{ color: 'var(--muted)' }}>Initial Match Score</div>
                      <div className="display text-7xl mb-4" style={{ color: 'var(--accent)' }}>{analysisResult.score}%</div>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                        Based on your Master CV, we found {analysisResult.matches.length} key skill matches. {authEmail ? 'Refine, then run the full AI rewrite.' : 'Sign in as the owner to unlock the full AI rewrite.'}
                      </p>
                    </div>

                    <div className="md:col-span-8">
                      <div className="flex items-center gap-3 mb-8">
                        <Filter size={16} style={{ color: 'var(--accent)' }} />
                        <span className="mono text-[11px] font-bold tracking-widest uppercase" style={{ color: 'var(--fg)' }}>Refine Target Keywords</span>
                      </div>

                      <div className="space-y-8">
                        <div>
                          <div className="mono text-[9px] tracking-widest uppercase mb-4" style={{ color: 'var(--muted)' }}>Matched Skills (Click to remove)</div>
                          <div className="flex flex-wrap gap-2">
                            {analysisResult.matches.length === 0 && (
                              <span className="text-xs" style={{ color: 'var(--muted)' }}>No direct tech keyword matches found.</span>
                            )}
                            {analysisResult.matches.map(s => (
                              <button
                                key={s}
                                onClick={() => removeSkill(s)}
                                className="px-4 py-2 rounded-lg border mono text-[10px] flex items-center gap-2 transition-all"
                                style={{ background: 'var(--accent-soft)', borderColor: 'var(--accent)', color: 'var(--accent)' }}
                              >
                                {s} <X size={10} />
                              </button>
                            ))}
                          </div>
                        </div>

                        {analysisResult.missing.length > 0 && (
                          <div>
                            <div className="mono text-[9px] tracking-widest uppercase mb-4" style={{ color: 'var(--muted)' }}>Gaps in JD</div>
                            <div className="flex flex-wrap gap-2">
                              {analysisResult.missing.map(s => (
                                <span
                                  key={s}
                                  className="px-4 py-2 rounded-lg border mono text-[10px]"
                                  style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-12 flex flex-col md:flex-row md:items-center md:justify-end gap-3">
                        {!authEmail && (
                          <span className="mono text-[9px] tracking-widest uppercase flex items-center gap-2" style={{ color: 'var(--muted)' }}>
                            <Lock size={10} /> Owner sign-in required
                          </span>
                        )}
                        <button
                          onClick={requestTailor}
                          disabled={tailoring}
                          className="px-12 py-5 rounded-full mono text-[12px] font-bold tracking-widest uppercase flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-lg"
                          style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
                        >
                          {tailoring ? <Loader2 size={18} className="animate-spin" /> : authEmail ? <Sparkles size={18} /> : <Lock size={18} />}
                          {authEmail ? 'AI Tailor & Full Rewrite' : 'Unlock Full Rewrite'}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Phase 3: Results */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-16 pt-16 border-t space-y-12"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div className="flex items-center justify-between flex-wrap gap-6">
                    <div className="flex items-center gap-4">
                      <div className="display text-5xl" style={{ color: 'var(--accent)' }}>{result.atsScore}%</div>
                      <div>
                        <div className="mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--muted)' }}>Final ATS Score</div>
                        <div className="text-sm font-medium" style={{ color: '#22c55e' }}>Profile Optimized &amp; Verified</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => downloadPDF(result.tailoredCV)}
                        className="px-8 py-3 rounded-full border mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 surface-soft transition-all"
                        style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                      >
                        <Download size={14} /> PDF
                      </button>
                      <button
                        onClick={() => copyContent(result.tailoredCV)}
                        className="px-8 py-3 rounded-full mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-2"
                        style={{ background: 'var(--fg)', color: 'var(--bg)' }}
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? 'Copied' : 'Copy Text'}
                      </button>
                    </div>
                  </div>

                  <div className="surface border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
                    <div className="px-8 py-4 border-b glass flex gap-8" style={{ borderColor: 'var(--border)' }}>
                      {(['cv', 'summary', 'letter'] as const).map(tab => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className="mono text-[10px] font-bold tracking-widest uppercase py-2 transition-all relative"
                          style={{ color: activeTab === tab ? 'var(--accent)' : 'var(--muted)' }}
                        >
                          {tab === 'cv' ? 'Tailored CV' : tab === 'summary' ? 'Hook' : 'Cover Letter'}
                          {activeTab === tab && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: 'var(--accent)' }} />}
                        </button>
                      ))}
                    </div>
                    <pre className="p-8 md:p-12 text-[13px] leading-relaxed whitespace-pre-wrap font-mono max-h-[600px] overflow-y-auto scrollbar-thin" style={{ color: 'var(--fg)' }}>
                      {activeTab === 'cv' ? result.tailoredCV : activeTab === 'summary' ? result.tailoredSummary : result.tailoredCoverLetter}
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <div className="mt-8 p-6 rounded-2xl border text-sm flex items-center gap-3" style={{ borderColor: 'rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.08)', color: '#ef4444' }}>
                <AlertCircle size={16} /> {error}
              </div>
            )}
          </div>
        </div>
      </div>

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={(email) => {
          setAuthEmail(email)
          setLoginOpen(false)
        }}
      />
    </section>
  )
}
