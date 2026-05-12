'use client'

import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'
import { downloadMasterCVAsPDF } from '@/lib/generate-pdf'

interface Props {
  variant: 'hero' | 'nav'
}

export default function DownloadCVButton({ variant }: Props) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (loading) return
    setLoading(true)
    try {
      await downloadMasterCVAsPDF()
    } finally {
      setLoading(false)
    }
  }

  if (variant === 'hero') {
    return (
      <button
        onClick={handleClick}
        disabled={loading}
        className="flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all hover:opacity-90 active:scale-95"
        style={{
          backgroundColor: 'var(--accent-warm)',
          color: '#000',
          cursor: loading ? 'wait' : 'pointer',
        }}
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
        <span className="mono text-[12px] tracking-[0.15em] uppercase font-bold">
          {loading ? 'Generating…' : 'Download CV'}
        </span>
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="mono text-[10px] tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border transition-all hover:border-[var(--accent-warm)] hover:text-[var(--accent-warm)] inline-flex items-center gap-2"
      style={{ borderColor: 'var(--border)', color: 'var(--fg)', cursor: loading ? 'wait' : 'pointer' }}
    >
      {loading ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
      {loading ? 'Generating…' : 'CV'}
    </button>
  )
}
