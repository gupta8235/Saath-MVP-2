/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base
        ivory:   '#FFFFFF',       // page background — pure white
        surface: '#F8F6F3',       // subtle warm off-white sections
        border:  '#E5DDD4',       // 1px borders everywhere
        // Typography
        ink:     '#141414',       // primary — near black
        dim:     '#8A8078',       // secondary — warm gray
        faint:   '#C0BAB0',       // tertiary / placeholders
        // Accent
        gold:    '#B8965C',       // champagne — used very sparingly
        // Status
        decided:   '#2D5A3D',     // deep green
        exploring: '#8B6914',     // warm amber
        // Legacy aliases so old classes still work
        blush:   '#F8F6F3',
        bark:    '#141414',
        mauve:   '#8A8078',
        rose:    '#141414',
        petal:   '#E5DDD4',
        mist:    '#F8F6F3',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        widest2: '0.2em',
      },
    },
  },
  plugins: [],
}
