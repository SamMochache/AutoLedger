
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        mpesa: {
          DEFAULT: '#00A651',
          50: '#e6f6ec',
          100: '#ccecd9',
          500: '#00A651',
          600: '#008541',
          700: '#006431',
        },
        sidebar: '#0F172A',
      }
    },
  },
  plugins: [],
}
