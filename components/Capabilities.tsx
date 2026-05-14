'use client'

import { SKILLS } from '@/lib/cv-data'
import { motion } from 'framer-motion'
import { Code2, Server, Layout, Database, Brain, Cloud, Network, Wrench, BadgeCheck } from 'lucide-react'

const ICON_MAP: Record<string, any> = {
  Code2,
  Server,
  Layout,
  Database,
  Brain,
  Cloud,
  Network,
  Wrench
}

const CATEGORY_COLORS: Record<string, string> = {
  'Languages': '#38bdf8',         // Blue
  'Backend Frameworks': '#4ade80', // Green
  'Frontend': '#f472b6',          // Pink
  'Databases': '#fbbf24',         // Amber
  'AI & ML': '#818cf8',           // Indigo
  'Cloud & DevOps': '#2dd4bf',    // Teal
  'APIs & Architecture': '#a78bfa', // Purple
  'Tools': '#94a3b8'              // Slate
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }
  }
}

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 }
  }
}

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative px-6 py-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-label mb-6">§04 / Capabilities</p>
          <h2 className="display text-5xl md:text-7xl leading-tight mb-4" style={{ color: 'var(--fg)', fontWeight: 400 }}>
            The <span className="italic" style={{ color: 'var(--accent)' }}>toolkit</span>.
          </h2>
          <p className="text-base mb-16" style={{ color: 'var(--muted)', fontWeight: 300 }}>
            Full-stack to cloud to AI — the technologies I rely on in production.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-x-12 gap-y-1"
        >
          {SKILLS.map((s, i) => {
            const Icon = ICON_MAP[s.icon] || BadgeCheck
            const color = CATEGORY_COLORS[s.cat] || '#38bdf8'
            
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex flex-col gap-8 py-12 border-t group transition-all"
                style={{ borderColor: 'var(--border)' }}
              >
                <div className="flex items-center gap-6">
                   <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-black/20"
                    style={{ backgroundColor: 'var(--surface-hover)', border: `1px solid ${color}30`, color: color }}
                   >
                     <Icon size={24} />
                   </div>
                   <div>
                    <span className="mono text-[9px] tracking-[0.4em] uppercase block opacity-30 mb-2 font-bold">
                      {String(i + 1).padStart(2, '0')} / {s.cat}
                    </span>
                    <h3 className="text-xl font-medium tracking-tight" style={{ color: 'var(--fg)' }}>{s.cat}</h3>
                   </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {s.items.map((item) => (
                    <motion.span 
                      key={item} 
                      variants={pillVariants}
                      whileHover={{ scale: 1.05, borderColor: color, color: color, backgroundColor: `${color}05` }}
                      className="chip border-opacity-20 px-5 py-2.5"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
        <div className="border-t" style={{ borderColor: 'var(--border)' }} />
      </div>
    </section>
  )
}
