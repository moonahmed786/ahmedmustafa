import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        accent: 'var(--accent)',
        'accent-warm': 'var(--accent-warm)',
        surface: 'var(--surface)',
        border: 'var(--border)',
        muted: 'var(--muted)',
      },
    },
  },
  plugins: [],
}

export default config
