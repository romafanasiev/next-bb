/** @type {import('tailwindcss').Config} */
module.exports = {
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
  plugins: [],
};
