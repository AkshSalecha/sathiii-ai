import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        saffron: '#FF6B1A',
        'saffron-dark': '#C94E00',
        'saffron-light': '#FFF0E8',
        night: { DEFAULT: '#0F0F14', 2: '#16161E', 3: '#1E1E2A', 4: '#252535' },
        gold: '#E8B84B',
      },
      fontFamily: { sans: ['Sora', 'sans-serif'] },
    },
  },
  plugins: [],
}
export default config
