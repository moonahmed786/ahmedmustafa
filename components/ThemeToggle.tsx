'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, Sparkles } from 'lucide-react'

const THEMES = [
  { id: 'dark', label: 'Dark', Icon: Moon },
  { id: 'light', label: 'Light', Icon: Sun },
  { id: 'colorful', label: 'Colorful', Icon: Sparkles },
] as const

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div
        className={`rounded-full border ${compact ? 'h-9 w-[110px]' : 'h-9 w-[136px]'}`}
        style={{ borderColor: 'var(--border)' }}
        aria-hidden
      />
    )
  }

  const active = (theme as string) || 'dark'

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border p-1"
      style={{ borderColor: 'var(--border)', background: 'var(--surface-elev)' }}
      role="radiogroup"
      aria-label="Theme"
    >
      {THEMES.map(({ id, label, Icon }) => {
        const selected = active === id
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={label}
            title={label}
            onClick={() => setTheme(id)}
            className="relative flex items-center justify-center rounded-full transition-all"
            style={{
              width: compact ? 28 : 30,
              height: compact ? 28 : 30,
              background: selected ? 'var(--accent)' : 'transparent',
              color: selected ? 'var(--on-accent)' : 'var(--muted)',
            }}
          >
            <Icon size={compact ? 13 : 14} />
          </button>
        )
      })}
    </div>
  )
}
