'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ToolDemo from '@/components/ToolDemo'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function TailorPage() {
  return (
    <main className="min-h-screen bg-bg text-fg selection:bg-accent/30 selection:text-fg">
      <Nav />
      
      {/* Background Decorative Elements */}
      <div className="bg-mesh" />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12"
          >
            <Link 
              href="/"
              className="inline-flex items-center gap-2 mono text-[10px] tracking-widest uppercase text-muted hover:text-accent transition-colors"
            >
              <ArrowLeft size={14} /> Back to Portfolio
            </Link>
          </motion.div>
          
          <ToolDemo />
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
