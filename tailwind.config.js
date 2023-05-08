/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1b3b47',
        secondary: '#e1392a',
        additional: '#8ba5bc',
        error: '#d32f2f',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
});
