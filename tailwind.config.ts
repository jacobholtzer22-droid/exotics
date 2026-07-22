import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // Light "botanical paper" theme. Token NAMES are legacy (from the original
      // dark build) — only the VALUES changed, so components need no churn:
      // ink = page background (warm paper), bone = primary text (deep green-black),
      // panel = cards (white), moss = borders, bud = leaf-green accent/CTA.
      colors: {
        ink: {
          DEFAULT: '#F8F6EF',
          soft: '#F0EDE2',
        },
        panel: {
          DEFAULT: '#FFFFFF',
          raised: '#FBFAF4',
        },
        moss: '#E4E0D1',
        bud: {
          DEFAULT: '#2E7A3C',
          deep: '#21622D',
          glow: '#379149',
        },
        haze: {
          DEFAULT: '#7448B8',
          deep: '#5B3694',
        },
        bone: '#20261B',
        smoke: '#5C6355',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      maxWidth: {
        page: '76rem',
      },
    },
  },
  plugins: [],
}

export default config
