/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['../site/templates/**/*.php'],
  theme: {
    fontFamily: {
      // 'sans': ['MaderaRegular', 'sans-serif'],
      // 'bold': ['MaderaBold', 'sans-serif'] 
    },
    fontWeight: {
      // normal: 400,
      // bold: 400,
    },
    colors: {
      // transparent: 'transparent',
      // current: 'currentColor',
      // black: '#000000',
      // white: '#FFFFFF',
    },
    extend: {
      screens: {
        // '3xl': '1920px',
        // => @media (min-width: 1920px) { ... }
      },
    },
  },
  plugins: [],
}
