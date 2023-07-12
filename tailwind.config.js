/** @type {import('tailwindcss').Config} */
import { breakpoints } from './src/constants';
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
    screens: {
      sm: `${breakpoints.mobile}px`,
      md: `${breakpoints.tablet}px`,
      lg: `${breakpoints.desktop}px`,
      xl: `${breakpoints.largeDesktop}px`,
      '2xl': `${breakpoints.extraLargeDesktop}px`,
    },
  },
  plugins: [require('tailwindcss-animate')],
});
