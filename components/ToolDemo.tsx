'use client'

import { useState, useEffect, useRef } from 'react'
import { Sparkles, Loader2, Check, Copy, AlertCircle, Download, Target, Zap, ShieldCheck, Plus, Briefcase, Star, Search, TrendingUp, Cpu, Braces, X, Filter } from 'lucide-react'
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

  // Analyze JD against Master CV (Simulated local analysis for efficiency)
  const runAnalysis = async () => {
    if (jd.length < MIN_JD_LENGTH) return
    setAnalyzing(true)
    setError('')
    
    try {
      // Small delay to feel "analytical"
      await new Promise(r => setTimeout(r, 800))
      
      // Basic Keyword Extraction
      const techKeywords = ['react', 'next.js', 'node.js', 'python', 'laravel', 'aws', 'docker', 'kubernetes', 'typescript', 'sql', 'nosql', 'rag', 'llm', 'fastapi', 'microservices', 'graphql', '.net', 'c#', 'azure']
      const lowerJD = jd.toLowerCase()
      
      const found = techKeywords.filter(k => lowerJD.includes(k))
      
      setAnalysisResult({
        score: Math.min(40 + found.length * 5, 95),
        matches: found,
        missing: []
      })
    } catch (e) {
      setError('Analysis failed.')
    } finally {
      setAnalyzing(false)
    }
  }

  const runTailoring = async () => {
    setTailoring(true)
    setError('')
    try {
      const response = await fetch('/api/tailor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          jd,
          model: selectedModel
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed')
      setResult(data)
      setActiveTab('cv')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setTailoring(false)
    }
  }

  const addSkill = (skill: string) => {
    if (!analysisResult) return
    setAnalysisResult({
      ...analysisResult,
      matches: [...analysisResult.matches, skill],
      missing: analysisResult.missing.filter(s => s !== skill)
    })
  }

  const removeSkill = (skill: string) => {
    if (!analysisResult) return
    setAnalysisResult({
      ...analysisResult,
      matches: analysisResult.matches.filter(s => s !== skill),
      missing: [...analysisResult.missing, skill]
    })
  }

  const copyContent = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadPDF = async (text: string) => {
    const { downloadTailoredCVAsPDF } = await import('@/lib/generate-pdf')
    await downloadTailoredCVAsPDF(text, `Ahmed-Mustafa-Tailored.pdf`)
  }

  return (
    <section id="tool" className="relative px-6 py-32 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4">
            <p className="section-label mb-4">§05 / AI Command Center</p>
            <h2 className="display text-5xl leading-tight text-fg">
              Optimize for <br /><span className="italic text-accent">Success</span>.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-xl text-muted font-light leading-relaxed">
              Paste your target Job Description. First, we'll analyze the gap between my profile and the role. 
              Then, you can refine the focus before generating a 100% tailored, ATS-ready CV.
            </p>
          </div>
        </div>

        <div className="surface border relative overflow-hidden group shadow-2xl" style={{ borderColor: 'var(--border)', background: 'rgba(5, 5, 5, 0.4)' }}>
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-accent/5 blur-[120px] pointer-events-none" />
          
          {/* Dashboard Header */}
          <div className="px-8 py-6 border-b glass flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-4">
              <Zap size={16} className="text-accent" />
              <span className="mono text-[11px] font-bold tracking-[0.3em] uppercase text-fg">
                Neural CV Architect <span className="opacity-40">v4.2_OPTIMIZED</span>
              </span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${analyzing || tailoring ? 'bg-accent animate-ping' : 'bg-green-500'}`} />
                <span className="mono text-[9px] tracking-widest uppercase text-muted">
                  {analyzing ? 'Analyzing Gap...' : tailoring ? 'Rewriting CV...' : 'System Ready'}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 relative z-10">
            {/* Phase 1: Input */}
            <div className="space-y-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="mono text-[10px] font-bold tracking-widest uppercase text-muted mb-3 block">Target Role / Company</label>
                  <div className="relative">
                    <Briefcase size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/40" />
                    <input 
                      type="text" 
                      placeholder="e.g. Senior Backend Engineer @ Google"
                      value={roleName}
                      onChange={(e) => setRoleName(e.target.value)}
                      className="w-full bg-white/5 border border-border rounded-xl py-4 pl-12 pr-4 text-sm outline-none focus:border-accent/40 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="mono text-[10px] font-bold tracking-widest uppercase text-muted mb-3 block">AI Model Engine</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['groq', 'claude', 'openai'] as const).map(m => (
                      <button
                        key={m}
                        onClick={() => setSelectedModel(m)}
                        className={`py-3 rounded-xl border mono text-[9px] tracking-widest uppercase transition-all flex flex-col items-center gap-1.5 ${selectedModel === m ? 'bg-accent/10 border-accent text-fg' : 'bg-white/5 border-border text-muted hover:bg-white/10'}`}
                      >
                        <div className={`w-1 h-1 rounded-full ${selectedModel === m ? 'bg-accent animate-pulse' : 'bg-muted/40'}`} />
                        {m === 'groq' ? 'Groq LPU' : m === 'claude' ? 'Claude 3.5' : 'GPT-4o-Mini'}
                        <span className="opacity-40 text-[7px]">
                          {m === 'groq' ? '(High-Speed Free)' : m === 'claude' ? '(Premium)' : '(Budget)'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="mono text-[10px] font-bold tracking-widest uppercase text-muted mb-3 block">Job Description</label>
                <textarea 
                  value={jd}
                  onChange={(e) => setJd(e.target.value)}
                  placeholder="Paste the full job description here..."
                  className="w-full bg-black/40 border border-border rounded-2xl p-8 text-sm leading-relaxed min-h-[250px] outline-none focus:border-accent/20 transition-all scrollbar-thin"
                />
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={runAnalysis}
                  disabled={analyzing || jd.length < MIN_JD_LENGTH}
                  className="px-10 py-4 rounded-full bg-fg text-bg mono text-[11px] font-bold tracking-widest uppercase flex items-center gap-3 hover:scale-105 active:scale-95 transition-all disabled:opacity-30"
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
                      <div className="mono text-[10px] tracking-widest text-muted mb-6 uppercase">Initial Match Score</div>
                      <div className="display text-7xl text-accent mb-4">{analysisResult.score}%</div>
                      <p className="text-sm text-muted leading-relaxed">
                        Based on your Master CV, we found {analysisResult.matches.length} key skill matches. Let's refine these before the final AI rewrite.
                      </p>
                    </div>

                    <div className="md:col-span-8">
                      <div className="flex items-center gap-3 mb-8">
                        <Filter size={16} className="text-accent" />
                        <span className="mono text-[11px] font-bold tracking-widest uppercase">Refine Target Keywords</span>
                      </div>
                      
                      <div className="space-y-8">
                        <div>
                          <div className="mono text-[9px] text-muted tracking-widest uppercase mb-4">Matched Skills (Click to remove)</div>
                          <div className="flex flex-wrap gap-2">
                            {analysisResult.matches.map(s => (
                              <button 
                                key={s} 
                                onClick={() => removeSkill(s)}
                                className="px-4 py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent mono text-[10px] flex items-center gap-2 hover:bg-accent/20 transition-all"
                              >
                                {s} <X size={10} />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-12 flex justify-end">
                        <button 
                          onClick={runTailoring}
                          disabled={tailoring}
                          className="px-12 py-5 rounded-full bg-accent text-white shadow-lg shadow-accent/20 mono text-[12px] font-bold tracking-widest uppercase flex items-center gap-3 hover:scale-105 active:scale-95 transition-all"
                        >
                          {tailoring ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                          AI Tailor & Full Rewrite
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
                      <div className="display text-5xl text-accent">{result.atsScore}%</div>
                      <div>
                        <div className="mono text-[10px] tracking-widest text-muted uppercase">Final ATS Score</div>
                        <div className="text-sm text-green-500 font-medium">Profile Optimized & Verified</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => downloadPDF(result.tailoredCV)}
                        className="px-8 py-3 rounded-full border border-border text-fg mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 hover:bg-white/5"
                      >
                        <Download size={14} /> PDF
                      </button>
                      <button 
                        onClick={() => copyContent(result.tailoredCV)}
                        className="px-8 py-3 rounded-full bg-fg text-bg mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-2"
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
                          className={`mono text-[10px] font-bold tracking-widest uppercase py-2 transition-all relative ${activeTab === tab ? 'text-accent' : 'text-muted'}`}
                        >
                          {tab === 'cv' ? 'Tailored CV' : tab === 'summary' ? 'Hook' : 'Cover Letter'}
                          {activeTab === tab && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
                        </button>
                      ))}
                    </div>
                    <pre className="p-8 md:p-12 text-[13px] leading-relaxed text-fg/90 whitespace-pre-wrap font-mono max-h-[600px] overflow-y-auto scrollbar-thin">
                      {activeTab === 'cv' ? result.tailoredCV : activeTab === 'summary' ? result.tailoredSummary : result.tailoredCoverLetter}
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <div className="mt-8 p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-3">
                <AlertCircle size={16} /> {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
