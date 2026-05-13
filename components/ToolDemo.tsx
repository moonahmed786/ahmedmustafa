'use client'

import { useState, useEffect, useRef } from 'react'
import { Sparkles, Loader2, Check, Copy, AlertCircle, Download, Target, Zap, ShieldCheck, Plus, Briefcase, Star, Search, TrendingUp, Cpu, Braces } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

  const bridgeGap = (keyword: string) => {
    if (!result) return
    const currentCV = result.tailoredCV
    const updatedCV = currentCV.replace(/(SKILLS[\s\S]*?)(?=\n[A-Z\s]+$|\n\n|$)/i, `$1, ${keyword}`)
    setResult({
      ...result,
      tailoredCV: updatedCV,
      matchedKeywords: [...result.matchedKeywords, keyword],
      missingKeywords: result.missingKeywords.filter(k => k !== keyword)
    })
  }

  const score = result?.atsScore ?? 0
  const scoreColor = score >= 95 ? '#38bdf8' : score >= 85 ? '#4ade80' : '#f59e0b'

  return (
    <section id="tool" className="relative px-6 py-32 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-12 gap-12 mb-20"
        >
          <div className="md:col-span-4">
            <p className="section-label mb-4">§05 / AI Tailoring Engine</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="display text-5xl md:text-7xl leading-tight mb-8" style={{ color: 'var(--fg)', fontWeight: 400 }}>
              Tailor my profile to <br /><span className="italic" style={{ color: 'var(--accent)' }}>your role</span>.
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed" style={{ color: 'var(--muted)', fontWeight: 300 }}>
              Paste a Job Description below. Our AI will instantly map my 10+ years of experience to your specific requirements, bridging skill gaps and optimizing for your ATS.
            </p>
          </div>
        </motion.div>

        <div className="surface overflow-hidden border relative" style={{ borderColor: 'var(--border)' }}>
          {/* Header */}
          <div className="px-8 py-5 border-b glass flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3">
              <Zap size={14} className="text-[var(--accent)]" />
              <span className="mono text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: 'var(--fg)' }}>
                Intelligent CV Tailor v2.2
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={12} className="text-[#4ade80]" />
                <span className="mono text-[9px] tracking-widest uppercase text-[#4ade80]">Integrity Verified</span>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 relative z-10">
            
            {/* Role/Company Input */}
            <div className="mb-10 grid sm:grid-cols-2 gap-6">
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Braces size={12} className="text-[var(--accent)]" />
                  <label className="mono text-[10px] font-bold tracking-widest uppercase block" style={{ color: 'var(--muted)' }}>
                    Target Role / Company
                  </label>
                </div>
                <div className="relative">
                  <Briefcase size={14} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
                  <input 
                    type="text"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    placeholder="e.g. Humai (Dubai)"
                    className="w-full bg-white/5 border border-[var(--border)] rounded-xl py-4 pl-11 pr-4 text-sm outline-none focus:border-accent/40 transition-all focus:bg-white/[0.08]"
                    style={{ color: 'var(--fg)' }}
                  />
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Search size={12} className="text-[var(--accent)]" />
                  <label className="mono text-[11px] font-bold tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
                    Paste Job Description
                  </label>
                </div>
                <span className="mono text-[10px]" style={{ color: jd.length < MIN_JD_LENGTH ? '#f59e0b' : 'var(--muted)' }}>
                  {jd.length.toLocaleString()} / {MIN_JD_LENGTH} CHARS
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
                <AnimatePresence>
                  {(debouncing || loading) && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="mono text-[11px] flex items-center gap-3" 
                      style={{ color: 'var(--accent)' }}
                    >
                      <Loader2 size={12} className="animate-spin" />
                      {loading ? 'RESTRUCTURING CV DATA…' : 'ANALYZING JD MATCHES…'}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="flex items-center gap-4">
                {result && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => downloadPDF(result.tailoredCV)}
                    className="px-8 py-4 rounded-full border mono text-[11px] font-bold tracking-widest uppercase flex items-center gap-3 transition-all hover:bg-white/5"
                    style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                  >
                    <Download size={16} />
                    Download PDF
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => generate(jd)}
                  disabled={loading || jd.trim().length < MIN_JD_LENGTH}
                  className="px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase flex items-center gap-3 transition-all shadow-xl"
                  style={{
                    backgroundColor: loading || jd.trim().length < MIN_JD_LENGTH ? 'var(--border)' : 'var(--accent)',
                    color: loading || jd.trim().length < MIN_JD_LENGTH ? 'var(--muted)' : 'var(--bg)',
                    cursor: loading || jd.trim().length < MIN_JD_LENGTH ? 'not-allowed' : 'pointer',
                    boxShadow: loading || jd.trim().length < MIN_JD_LENGTH ? 'none' : '0 10px 40px -10px rgba(56, 189, 248, 0.4)',
                  }}
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Sparkles size={16} />
                  )}
                  {loading ? 'Processing…' : result ? 'Refine Tailoring' : 'Scan & Tailor'}
                </motion.button>
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 rounded-2xl border flex items-start gap-4" 
                style={{ borderColor: '#4a1c1c', backgroundColor: '#1a0a08' }}
              >
                <AlertCircle size={18} style={{ color: '#f87171', flexShrink: 0 }} />
                <div className="text-base" style={{ color: '#fca5a5' }}>{error}</div>
              </motion.div>
            )}

            {/* Results Section */}
            <AnimatePresence>
              {result && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mt-16 space-y-12"
                >
                  {/* Fit Analysis Report */}
                  <div className="grid md:grid-cols-12 gap-8">
                    <div className="md:col-span-4 surface p-8 border relative overflow-hidden" style={{ borderColor: 'var(--border)' }}>
                      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-[60px]" style={{ backgroundColor: `${scoreColor}20` }} />
                      
                      <div className="flex items-center gap-2 mb-6">
                        <Star size={12} style={{ color: scoreColor }} />
                        <div className="mono text-[11px] font-bold tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
                          Alignment Score
                        </div>
                      </div>
                      
                      <div className="display text-7xl mb-4 relative" style={{ color: scoreColor, lineHeight: 1 }}>
                        {score}<span className="text-2xl opacity-40">%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#111] rounded-full overflow-hidden mb-6">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ duration: 1.5, ease: "circOut" }}
                          className="h-full" 
                          style={{ backgroundColor: scoreColor }} 
                        />
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                        {result.scoreExplanation}
                      </p>
                    </div>

                    <div className="md:col-span-8 surface p-8 border" style={{ borderColor: 'var(--border)' }}>
                      <div className="flex items-center gap-3 mb-8">
                        <Target size={18} className="text-[#4ade80]" />
                        <div className="mono text-[11px] font-bold tracking-widest uppercase" style={{ color: '#4ade80' }}>
                          Skill Matching & Gap Bridging
                        </div>
                      </div>
                      
                      <div className="space-y-8">
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                             <Check size={10} className="text-[#4ade80]" />
                             <div className="mono text-[9px] tracking-widest uppercase opacity-60">Verified Matches ({result.matchedKeywords.length})</div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {result.matchedKeywords.map((kw, i) => (
                              <span key={i} className="mono text-[10px] px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(74, 222, 128, 0.05)', color: '#4ade80', border: '1px solid rgba(74, 222, 128, 0.1)' }}>
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>

                        {result.missingKeywords.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-4">
                               <AlertCircle size={10} className="text-[#f59e0b]" />
                               <div className="mono text-[9px] tracking-widest uppercase opacity-60">Gaps to Address ({result.missingKeywords.length})</div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {result.missingKeywords.map((kw, i) => (
                                <motion.button 
                                  key={i} 
                                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(245, 158, 11, 0.1)' }}
                                  onClick={() => bridgeGap(kw)}
                                  className="group mono text-[10px] px-3 py-1.5 rounded-full flex items-center gap-2 transition-all" 
                                  style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.2)' }}
                                >
                                  {kw}
                                  <Plus size={10} className="opacity-40 group-hover:opacity-100" />
                                </motion.button>
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
                      <div className="flex gap-8">
                        {(['cv', 'summary', 'letter'] as const).map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`mono text-[11px] font-bold tracking-widest uppercase transition-all relative py-4 ${activeTab === tab ? 'text-[var(--accent)]' : 'text-[var(--muted)] hover:text-[var(--fg)]'}`}
                          >
                            {tab === 'cv' ? 'Tailored CV' : tab === 'summary' ? 'Summary' : 'Cover Letter'}
                            {activeTab === tab && (
                              <motion.div 
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)] rounded-full" 
                              />
                            )}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => copyContent(activeTab === 'cv' ? result.tailoredCV : activeTab === 'summary' ? result.tailoredSummary : result.tailoredCoverLetter)} 
                          className="px-6 py-2.5 rounded-full mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 border border-[var(--border)] text-[var(--fg)] transition-all hover:bg-white/5 active:scale-95"
                        >
                          {copied ? <Check size={14} className="text-[#4ade80]" /> : <Copy size={14} />}
                          {copied ? 'COPIED' : 'COPY TEXT'}
                        </button>
                      </div>
                    </div>
                    <div className="relative">
                      <pre className="mono p-8 md:p-12 text-[13px] md:text-[14px] leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-[700px] scrollbar-thin" style={{ color: '#ede8e0', backgroundColor: 'rgba(0,0,0,0.4)' }}>
                        {activeTab === 'cv' ? result.tailoredCV : activeTab === 'summary' ? result.tailoredSummary : result.tailoredCoverLetter}
                      </pre>
                    </div>
                  </div>

                  {/* Growth Strategy */}
                  {result.improvements.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="surface p-10 border" 
                      style={{ borderColor: 'var(--border)' }}
                    >
                       <div className="flex items-center gap-3 mb-8">
                          <TrendingUp size={18} className="text-[var(--accent)]" />
                          <div className="mono text-[11px] font-bold tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
                            Growth Strategy for This Role
                          </div>
                       </div>
                       <div className="grid sm:grid-cols-2 gap-6">
                         {result.improvements.map((imp, i) => (
                           <motion.div 
                            key={i} 
                            whileHover={{ y: -5 }}
                            className="flex gap-5 p-6 rounded-2xl border bg-white/[0.02] transition-all hover:bg-white/[0.05]" 
                            style={{ borderColor: 'var(--border)' }}
                           >
                             <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                               <Cpu size={18} style={{ color: 'var(--accent)' }} />
                             </div>
                             <p className="text-[14px] leading-relaxed" style={{ color: 'var(--fg)', fontWeight: 300 }}>{imp}</p>
                           </motion.div>
                         ))}
                       </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
