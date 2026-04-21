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
        blush:    '#F5F1EC',   // warm stone — backgrounds, tags
        ivory:    '#FAFAF7',   // page background
        mauve:    '#9A9187',   // secondary text, borders
        rose:     '#5C4A3A',   // dark warm brown — active states, CTAs
        gold:     '#C9A96E',   // champagne gold accent
        bark:     '#1C1C1C',   // near black — primary text
        petal:    '#EDE8E2',   // light stone — subtle fills
        mist:     '#F8F5F1',   // warm white — card backgrounds
      },
      fontFamily: {
        serif:  ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:   ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 20px rgba(201,122,154,0.10)',
        card: '0 4px 30px rgba(123,61,94,0.08)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
