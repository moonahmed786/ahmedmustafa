'use client'

import { useState, useEffect, useRef } from 'react'
import { Sparkles, Loader2, Check, Copy, AlertCircle, Download, Target, Zap, ShieldCheck, Plus, Briefcase } from 'lucide-react'

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

const MIN_JD_LENGTH = 200
const DEBOUNCE_MS = 1500

export default function ToolDemo() {
  const [jd, setJd] = useState('')
  const [roleName, setRoleName] = useState('') // For filename customization
  const [result, setResult] = useState<TailorResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [debouncing, setDebouncing] = useState(false)
  const [activeTab, setActiveTab] = useState<'cv' | 'summary' | 'letter'>('cv')
  const loadingRef = useRef(false)

  const generate = async (jobDesc: string) => {
    if (!jobDesc.trim() || loadingRef.current) return
    loadingRef.current = true
    setLoading(true)
    setDebouncing(false)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/tailor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jd: jobDesc }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || `Request failed: ${response.status}`)
      setResult(data)
      setActiveTab('cv')
    } catch (e) {
      setError('Generation failed. ' + (e instanceof Error ? e.message : 'Try again.'))
    } finally {
      setLoading(false)
      loadingRef.current = false
    }
  }

  useEffect(() => {
    if (jd.trim().length < MIN_JD_LENGTH || loadingRef.current) {
      setDebouncing(false)
      return
    }
    setDebouncing(true)
    const timer = setTimeout(() => {
      generate(jd)
    }, DEBOUNCE_MS)
    return () => {
      clearTimeout(timer)
      setDebouncing(false)
    }
  }, [jd])

  const copyContent = (text: string) => {
    if (!text) return
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const downloadPDF = async (text: string) => {
    if (!text) return
    const { downloadTailoredCVAsPDF } = await import('@/lib/generate-pdf')
    const cleanRole = roleName.trim() || 'Tailored-Role'
    const filename = `ahmed-mustafa-${cleanRole.replace(/\s+/g, '-')}`
    await downloadTailoredCVAsPDF(text, `${filename}.pdf`)
  }

  // Feature: Manually bridge a gap by adding it to the SKILLS section in the string
  const bridgeGap = (keyword: string) => {
    if (!result) return
    const currentCV = result.tailoredCV
    // Simple logic: find SKILLS section and append
    const updatedCV = currentCV.replace(/(SKILLS[\s\S]*?)(?=\n[A-Z\s]+$|\n\n|$)/i, `$1, ${keyword}`)
    setResult({
      ...result,
      tailoredCV: updatedCV,
      matchedKeywords: [...result.matchedKeywords, keyword],
      missingKeywords: result.missingKeywords.filter(k => k !== keyword)
    })
  }

  const score = result?.atsScore ?? 0
  const scoreColor = score >= 95 ? '#38bdf8' : score >= 85 ? '#9bc473' : '#c46a3a'

  return (
    <section id="tool" className="relative px-6 py-32 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-4">
            <p className="section-label mb-4">§05 / AI Tailoring Engine</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="display text-5xl md:text-7xl leading-tight mb-8" style={{ color: 'var(--fg)', fontWeight: 400 }}>
              Tailor my profile to <br /><span className="italic">your role</span>.
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed" style={{ color: 'var(--muted)', fontWeight: 300 }}>
              Paste a Job Description below. Our AI will instantly map my 10+ years of experience to your specific requirements, bridging skill gaps and optimizing for your ATS.
            </p>
          </div>
        </div>

        <div className="surface overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
          {/* Header */}
          <div className="px-8 py-5 border-b glass flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3">
              <Zap size={14} className="text-[var(--accent)]" />
              <span className="mono text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: 'var(--fg)' }}>
                Intelligent CV Tailor v2.1
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={12} className="text-[#9bc473]" />
                <span className="mono text-[9px] tracking-widest uppercase text-[#9bc473]">Integrity Verified</span>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            
            {/* Role/Company Input for Filename */}
            <div className="mb-8 grid sm:grid-cols-2 gap-6">
              <div className="relative">
                <label className="mono text-[10px] font-bold tracking-widest uppercase mb-2 block" style={{ color: 'var(--muted)' }}>
                  Target Role / Company (For Filename)
                </label>
                <div className="relative">
                  <Briefcase size={14} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
                  <input 
                    type="text"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    placeholder="e.g. Humai (Dubai)"
                    className="w-full bg-white/5 border border-[var(--border)] rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:border-accent/40 transition-colors"
                    style={{ color: 'var(--fg)' }}
                  />
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <label className="mono text-[11px] font-bold tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
                  Paste Job Description
                </label>
                <span className="mono text-[10px]" style={{ color: jd.length < MIN_JD_LENGTH ? '#c46a3a' : 'var(--muted)' }}>
                  {jd.length.toLocaleString()} / {MIN_JD_LENGTH} CHARS REQUIRED
                </span>
              </div>
              <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="Paste the target Job Description here..."
                className="w-full p-8 rounded-2xl outline-none text-base leading-relaxed border transition-all duration-500 focus:ring-1 focus:ring-accent/20"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderColor: debouncing ? 'var(--accent)' : 'var(--border)',
                  color: 'var(--fg)',
                  minHeight: '220px',
                  resize: 'vertical',
                }}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-4">
                {debouncing && (
                  <span className="mono text-[11px] flex items-center gap-2" style={{ color: 'var(--accent)' }}>
                    <Loader2 size={12} className="animate-spin" />
                    ANALYZING JD MATCHES…
                  </span>
                )}
                {loading && (
                  <span className="mono text-[11px] flex items-center gap-2" style={{ color: 'var(--accent)' }}>
                    <Loader2 size={12} className="animate-spin" />
                    RESTRUCTURING CV DATA…
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                {result && (
                  <button
                    onClick={() => downloadPDF(result.tailoredCV)}
                    className="px-8 py-4 rounded-full border mono text-[11px] font-bold tracking-widest uppercase flex items-center gap-3 transition-all hover:bg-white/5"
                    style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                  >
                    <Download size={16} />
                    Download PDF
                  </button>
                )}
                <button
                  onClick={() => generate(jd)}
                  disabled={loading || jd.trim().length < MIN_JD_LENGTH}
                  className="px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-accent/10"
                  style={{
                    backgroundColor: loading || jd.trim().length < MIN_JD_LENGTH ? 'var(--border)' : 'var(--accent)',
                    color: loading || jd.trim().length < MIN_JD_LENGTH ? 'var(--muted)' : 'var(--bg)',
                    cursor: loading || jd.trim().length < MIN_JD_LENGTH ? 'not-allowed' : 'pointer',
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Processing…
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      {result ? 'Refine Tailoring' : 'Scan & Tailor'}
                    </>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="mt-8 p-6 rounded-2xl border flex items-start gap-4" style={{ borderColor: '#4a1c1c', backgroundColor: '#1a0a08' }}>
                <AlertCircle size={18} style={{ color: '#e88080', flexShrink: 0 }} />
                <div className="text-base" style={{ color: '#f0c0c0' }}>{error}</div>
              </div>
            )}

            {/* Results Section */}
            {result && (
              <div className="mt-16 space-y-10 fade-in in">
                {/* Fit Analysis Report */}
                <div className="grid md:grid-cols-12 gap-8">
                  <div className="md:col-span-4 surface p-8 border" style={{ borderColor: 'var(--border)' }}>
                    <div className="mono text-[11px] font-bold tracking-widest uppercase mb-6" style={{ color: 'var(--muted)' }}>
                      Alignment Score
                    </div>
                    <div className="display text-7xl mb-4" style={{ color: scoreColor, lineHeight: 1 }}>
                      {score}<span className="text-2xl opacity-40">%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#111] rounded-full overflow-hidden mb-6">
                      <div className="h-full" style={{ width: `${score}%`, backgroundColor: scoreColor, transition: 'width 1.5s cubic-bezier(0.65, 0, 0.35, 1)' }} />
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                      {result.scoreExplanation}
                    </p>
                  </div>

                  <div className="md:col-span-8 surface p-8 border" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex items-center gap-3 mb-8">
                      <Target size={18} className="text-[#9bc473]" />
                      <div className="mono text-[11px] font-bold tracking-widest uppercase" style={{ color: '#9bc473' }}>
                        Skill Matching & Gap Bridging
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="mono text-[9px] tracking-widest uppercase mb-3 opacity-60">Verified Matches ({result.matchedKeywords.length})</div>
                        <div className="flex flex-wrap gap-2">
                          {result.matchedKeywords.map((kw, i) => (
                            <span key={i} className="mono text-[10px] px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(56, 189, 248, 0.05)', color: 'var(--accent)', border: '1px solid rgba(56, 189, 248, 0.1)' }}>
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>

                      {result.missingKeywords.length > 0 && (
                        <div>
                          <div className="mono text-[9px] tracking-widest uppercase mb-3 opacity-60">Gaps to Address ({result.missingKeywords.length})</div>
                          <div className="flex flex-wrap gap-2">
                            {result.missingKeywords.map((kw, i) => (
                              <button 
                                key={i} 
                                onClick={() => bridgeGap(kw)}
                                className="group mono text-[10px] px-3 py-1.5 rounded-full flex items-center gap-2 transition-all hover:scale-105" 
                                style={{ backgroundColor: 'rgba(196,106,58,0.05)', color: '#e8a890', border: '1px solid rgba(196,106,58,0.1)' }}
                              >
                                {kw}
                                <Plus size={10} className="opacity-40 group-hover:opacity-100" />
                              </button>
                            ))}
                          </div>
                          <p className="mt-4 text-[10px] italic" style={{ color: 'var(--muted)' }}>Tip: Click a gap to add it to your tailored CV.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Output Tabs */}
                <div className="surface overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                  <div className="px-8 py-4 border-b glass flex items-center justify-between flex-wrap gap-4" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex gap-6">
                      {(['cv', 'summary', 'letter'] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`mono text-[11px] font-bold tracking-widest uppercase transition-all relative py-3 ${activeTab === tab ? 'text-[var(--accent)]' : 'text-[var(--muted)] hover:text-[var(--fg)]'}`}
                        >
                          {tab === 'cv' ? 'Tailored CV' : tab === 'summary' ? 'Summary' : 'Cover Letter'}
                          {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)] rounded-full" />
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => copyContent(activeTab === 'cv' ? result.tailoredCV : activeTab === 'summary' ? result.tailoredSummary : result.tailoredCoverLetter)} 
                        className="px-5 py-2 rounded-full mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 border border-[var(--border)] text-[var(--fg)] transition-all hover:bg-white/5 active:scale-95"
                      >
                        {copied ? <Check size={14} className="text-[#9bc473]" /> : <Copy size={14} />}
                        {copied ? 'COPIED' : 'COPY TEXT'}
                      </button>
                    </div>
                  </div>
                  <div className="relative group">
                    <pre className="mono p-8 md:p-12 text-[13px] md:text-[14px] leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-[700px] scrollbar-thin" style={{ color: '#eee', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                      {activeTab === 'cv' ? result.tailoredCV : activeTab === 'summary' ? result.tailoredSummary : result.tailoredCoverLetter}
                    </pre>
                  </div>
                </div>

                {/* Growth Strategy */}
                {result.improvements.length > 0 && (
                  <div className="surface p-8 border" style={{ borderColor: 'var(--border)' }}>
                     <div className="mono text-[11px] font-bold tracking-widest uppercase mb-6" style={{ color: 'var(--muted)' }}>
                        Growth Strategy for This Role
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {result.improvements.map((imp, i) => (
                          <div key={i} className="flex gap-4 p-4 rounded-xl border bg-white/5" style={{ borderColor: 'var(--border)' }}>
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--fg)' }}>{imp}</p>
                          </div>
                        ))}
                      </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
