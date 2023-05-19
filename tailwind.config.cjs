/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        handwrite: 'Shantell Sans',
        book: 'Libre Caslon Text',
      },
    },
  },
  plugins: [],
};
