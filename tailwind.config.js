/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'touch': { 'raw': '(hover: none) and (pointer: coarse)' },
      },
      colors: {
        cream: '#faf8f5',
        'cream-dark': '#f5f0e8',
        sage: '#9caa97',
        'sage-light': '#b8c4b0',
        'sage-dark': '#7d8b75',
        'soft-blue': '#a8c5da',
        'soft-blue-light': '#c5dce9',
        lavender: '#c4b5d4',
        'lavender-light': '#d8cde2',
        ink: '#4a4a4a',
        'ink-muted': '#6b6b6b',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}
