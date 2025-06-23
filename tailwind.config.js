/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'emerald-forest': '#014421',
        'oxblood-red': '#4A0000',
        'imperial-yellow': '#F6C700',
        'royal-blue': '#002366',
        'ivory-mist': '#F6F5F0',
        'charcoal-black': '#121212',
        // Legacy colors for existing components
        charcoal: '#121212',
        ivory: '#F6F5F0',
      },
      fontFamily: {
        headline: ['"Söhne"', '"Neue Haas Grotesk"', 'sans-serif'],
        body: ['Inter', '"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
