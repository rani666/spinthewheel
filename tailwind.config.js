/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      transitionDuration: {
        '4000': '4000ms',
      },
      animation: {
        'spin-slow': 'spin 4s ease-out',
      }
    },
  },
  plugins: [],
};