import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx,mdx}',
    './components/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Construct brand palette - direct hex values for stability
        'emerald-forest': '#014421',
        'oxblood-red': '#4A0000',
        'imperial-yellow': '#F6C700',
        'royal-blue': '#002366',
        'ivory-mist': '#F6F5F0',
        'charcoal-black': '#121212',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        headline: ['"Söhne"', '"Neue Haas Grotesk"', 'sans-serif'],
      },
      fontSize: {
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
        '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
      },
    },
  },
  plugins: [],
};

export default config;