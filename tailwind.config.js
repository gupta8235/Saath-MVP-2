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
        blush:    '#F5E6E8',
        ivory:    '#FDFAF8',
        mauve:    '#D4B8C4',
        rose:     '#C97A9A',
        gold:     '#C9A96E',
        bark:     '#7B3D5E',
        petal:    '#EDD5DC',
        mist:     '#F0EBF4',
      },
      fontFamily: {
        serif:  ['Playfair Display', 'Georgia', 'serif'],
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
