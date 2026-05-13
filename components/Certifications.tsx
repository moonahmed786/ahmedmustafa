'use client'

import { useState, useEffect } from 'react'
import { CERTIFICATIONS } from '@/lib/cv-data'
import { PenTool, Globe, MessageSquare, BadgeCheck, X, Maximize2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const ICON_MAP: Record<string, any> = {
  PenTool,
  Globe,
  MessageSquare,
  BadgeCheck
}

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<typeof CERTIFICATIONS[0] | null>(null)

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedCert])

  return (
    <section id="certifications" className="relative px-6 py-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-label mb-6">§07 / Certifications</p>
          <h2
            className="display text-5xl md:text-7xl leading-tight mb-16"
            style={{ color: 'var(--fg)', fontWeight: 400 }}
          >
            Professional <span className="italic" style={{ color: 'var(--accent)' }}>Validation</span>.
          </h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
          className="grid md:grid-cols-3 gap-6"
        >
          {CERTIFICATIONS.map((cert, i) => {
            const IconComponent = ICON_MAP[cert.icon] || BadgeCheck
            return (
              <motion.button 
                key={i} 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                onClick={() => setSelectedCert(cert)}
                className="surface p-8 flex flex-col gap-6 group transition-all hover:border-accent/40 border border-transparent text-left w-full relative overflow-hidden"
              >
                <div
                  className="w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-accent/10 relative z-10"
                  style={{ backgroundColor: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.1)', color: 'var(--accent)' }}
                >
                  <IconComponent size={24} />
                </div>
                
                <div className="flex-1 relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <p className="mono text-[10px] tracking-[0.2em] uppercase opacity-60" style={{ color: 'var(--fg)' }}>
                      {cert.issuer}
                    </p>
                    <Maximize2 size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--accent)' }} />
                  </div>
                  <h4 className="text-xl font-medium leading-tight" style={{ color: 'var(--fg)' }}>
                    {cert.name}
                  </h4>
                </div>

                <div className="pt-4 border-t relative z-10" style={{ borderColor: 'var(--border)' }}>
                  <span className="mono text-[9px] font-bold tracking-widest uppercase opacity-40 group-hover:opacity-100 group-hover:text-accent transition-all">
                    Expand Certificate
                  </span>
                </div>

                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            )
          })}
        </motion.div>
      </div>

      {/* Certificate Modal - Refactored with Framer Motion */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-20">
                <div className="pointer-events-none">
                  <h3 className="display text-xl md:text-2xl text-white">{selectedCert.name}</h3>
                  <p className="mono text-[9px] tracking-[0.3em] uppercase text-white/50">
                    {selectedCert.issuer}
                  </p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedCert(null)}
                  className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                  style={{ color: 'white' }}
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Image Viewer */}
              <div className="w-full flex-1 flex items-center justify-center mt-12 mb-8">
                <motion.div 
                  layoutId={`cert-${selectedCert.name}`}
                  className="relative shadow-2xl rounded-lg overflow-hidden border border-white/10"
                >
                  <img 
                    src={encodeURI(selectedCert.file)} 
                    alt={selectedCert.name}
                    className="max-w-full max-h-[70vh] object-contain"
                  />
                </motion.div>
              </div>

              {/* Modal Footer */}
              <div className="pb-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCert(null)}
                  className="mono text-[10px] tracking-widest uppercase py-3 px-10 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all hover:bg-white/5"
                >
                  Close Gallery
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
