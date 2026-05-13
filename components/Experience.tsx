'use client'

import { TIMELINE } from '@/lib/cv-data'
import { Briefcase, Calendar, Users, Rocket, Terminal, Layers, Globe, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

const highlightMetric = (text: string) => {
  const parts = text.split(/(\d+(?:\s?%|\s?percent|\+)|doubling|tripling|halving|cutting|reducing|increasing|accelerating|raising|boosting|~2x)/gi)

  return (
    <>
      {parts.map((part, i) => {
        const isMatch = /(\d+(?:\s?%|\s?percent|\+)|doubling|tripling|halving|cutting|reducing|increasing|accelerating|raising|boosting|~2x)/gi.test(part)
        return isMatch ? (
          <span key={i} className="font-bold" style={{ color: 'var(--accent)' }}>{part}</span>
        ) : (
          part
        )
      })}
    </>
  )
}

const STATS = [
  { label: 'Experience', value: '10 Years', icon: Calendar, color: '#38bdf8' },
  { label: 'Engineering', value: '3 Companies', icon: Briefcase, color: '#4ade80' },
  { label: 'Production', value: '50+ Projects', icon: Rocket, color: '#f472b6' },
  { label: 'Network', value: '20+ Clients', icon: Users, color: '#fbbf24' },
]

const TAGS = [
  'Solutions Architect',
  'Tech Lead',
  'AI Agent Developer',
  'RAG & LLM Specialist',
  'Full Stack Expert',
  'Legacy Software Modernizer',
  'Vibe Code Cleaner'
]

const ROLE_ICONS: Record<number, any> = {
  0: Terminal,  // Current
  1: Layers,    // Senior
  2: Globe,     // Junior/Mid
  3: Shield,    // Junior
  4: Rocket     // Entry
}

const ROLE_COLORS: Record<number, string> = {
  0: '#38bdf8', // Blue
  1: '#4ade80', // Green
  2: '#a78bfa', // Purple
  3: '#f472b6', // Pink
  4: '#fbbf24'  // Amber
}

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

export default function Experience() {
  return (
    <section id="experience" className="relative px-6 py-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-label mb-6">§02 / Experience</p>
          <h2 className="display text-5xl md:text-7xl leading-tight mb-12" style={{ color: 'var(--fg)', fontWeight: 400 }}>
            Career <span className="italic" style={{ color: 'var(--accent)' }}>Trajectory</span>.
          </h2>
        </motion.div>

        {/* Enhanced Summary Section */}
        <div className="mb-20 space-y-10">
          {/* Top Stats Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          >
            {STATS.map((stat, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="surface p-6 flex flex-col items-center text-center group border border-transparent hover:border-accent/10 transition-all cursor-default"
              >
                <stat.icon size={18} className="mb-4 transition-all" style={{ color: stat.color, opacity: 0.5 }} />
                <div className="display text-2xl md:text-3xl mb-1" style={{ color: 'var(--fg)' }}>{stat.value}</div>
                <div className="mono text-[9px] tracking-[0.2em] uppercase opacity-40">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Role & Vibe Tags */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap gap-2 pt-2 justify-center md:justify-start"
          >
            {TAGS.map((tag, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(56, 189, 248, 0.05)', color: 'var(--accent)', borderColor: 'var(--accent)' }}
                className="mono text-[10px] tracking-wider px-4 py-2 rounded-full border border-[var(--border)] transition-all cursor-default"
                style={{ color: 'var(--muted)', backgroundColor: 'rgba(255,255,255,0.02)' }}
              >
                {tag}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {TIMELINE.map((t, i) => {
            const RoleIcon = ROLE_ICONS[i] || Terminal
            const color = ROLE_COLORS[i] || '#38bdf8'

            return (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="surface p-6 md:p-10 hover:border-accent/20 border border-transparent relative overflow-hidden group transition-all"
              >
                {/* Decorative background glow */}
                <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: color }} />

                <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-14 relative z-10">

                  {/* Left — company identity */}
                  <div className="md:w-64 shrink-0">
                    <div className="flex items-center gap-3 mb-6">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center transition-all group-hover:scale-110"
                        style={{ backgroundColor: `${color}10`, border: `1px solid ${color}30`, color: color }}
                      >
                        <RoleIcon size={18} />
                      </div>
                      <div className="flex flex-col">
                         <span className="mono text-[9px] tracking-widest opacity-40 uppercase">{t.period}</span>
                         {i === 0 && (
                          <span className="mono text-[8px] font-bold tracking-[0.1em] uppercase" style={{ color: color }}>Active Role</span>
                         )}
                      </div>
                    </div>

                    <h3 className="text-2xl font-medium leading-tight mb-2" style={{ color: 'var(--fg)' }}>{t.role}</h3>
                    <div className="text-base font-medium" style={{ color: color }}>{t.company}</div>
                    <div className="mono text-[10px] mt-4 flex items-center gap-2" style={{ color: 'var(--muted)' }}>
                      <MapPin size={10} style={{ color: color }} />
                      {t.location}
                    </div>
                  </div>

                  {/* Right — impact bullets */}
                  <div className="flex-1 space-y-5">
                    {t.notes.map((note, j) => (
                      <div key={j} className="flex gap-4">
                        <div className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: `${color}40` }} />
                        <p className="text-[15px] leading-relaxed" style={{ color: 'var(--muted)', fontWeight: 300 }}>
                          {highlightMetric(note)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

function MapPin({ size, style }: { size: number; style: any }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      style={style}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  )
}
