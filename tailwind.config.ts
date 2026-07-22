import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0B0D09',
          soft: '#101308',
        },
        panel: {
          DEFAULT: '#13160E',
          raised: '#181C11',
        },
        moss: '#262D1A',
        bud: {
          DEFAULT: '#9BE15D',
          deep: '#65A82E',
          glow: '#C4F58C',
        },
        haze: {
          DEFAULT: '#B98CFF',
          deep: '#8B5CF6',
        },
        bone: '#F4F2E9',
        smoke: '#A2A896',
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
