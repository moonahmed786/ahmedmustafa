'use client'

import ResumeTemplate from '@/components/ResumeTemplate'
import { Download, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ResumePage() {
  return (
    <div className="bg-slate-100 min-h-screen py-10 print:p-0 print:bg-white">
      <div className="max-w-[850px] mx-auto">
        <div className="mb-8 flex justify-between items-center print:hidden px-4">
          <Link 
            href="/"
            className="text-slate-600 hover:text-slate-900 flex items-center gap-2 font-medium"
          >
            <ArrowLeft size={18} />
            Back to Portfolio
          </Link>
          <button 
            onClick={() => window.print()}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md flex items-center gap-2 active:scale-95"
          >
            <Download size={18} />
            Download PDF
          </button>
        </div>
        
        <div className="shadow-2xl print:shadow-none">
          <ResumeTemplate />
        </div>
        
        <div className="mt-10 text-center text-slate-400 text-sm print:hidden">
          <p>Best printed on A4 paper size</p>
        </div>
      </div>
    </div>
  )
}

