import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx,mdx}',
    './components/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#111111',
        'bg-sub': '#3D3D3D',
        'text-base': '#F4F1EB',
        'accent-gold': '#F7C843',
        'cta-brass': '#D9AE5F',
        'error': '#BF3F3F',
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Times New Roman"', 'serif'],
        sans: ['"Inter"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        label: ['"Space Grotesk"', 'var(--font-sans)'],
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