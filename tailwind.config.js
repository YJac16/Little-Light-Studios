/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '400px',
        touch: { raw: '(hover: none) and (pointer: coarse)' },
      },
      colors: {
        cream: '#faf8f5',
        'cream-dark': '#f3efe8',
        sage: '#9caa97',
        'sage-light': '#b8c4b0',
        'sage-dark': '#6f7f68',
        sky: '#a8c5da',
        'sky-soft': '#d7e8f2',
        'sky-deep': '#5f849c',
        honey: '#e8c96a',
        'honey-soft': '#f7ecd0',
        'honey-deep': '#b0892a',
        lavender: '#c4b5d4',
        'lavender-light': '#ddd3e8',
        ink: '#3d3d3d',
        'ink-muted': '#6b6b6b',
      },
      fontFamily: {
        display: ['"Nunito"', 'system-ui', 'sans-serif'],
        sans: ['"Nunito Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Nunito"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 28px -12px rgba(61, 61, 61, 0.18)',
        lift: '0 16px 40px -16px rgba(61, 61, 61, 0.22)',
      },
      backgroundImage: {
        'dawn-mesh':
          'radial-gradient(120% 80% at 50% -10%, #fff8e8 0%, transparent 55%), radial-gradient(90% 70% at 100% 20%, #d7e8f2 0%, transparent 50%), radial-gradient(80% 60% at 0% 40%, #e4ecdf 0%, transparent 45%), linear-gradient(180deg, #faf8f5 0%, #f5f1ea 100%)',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-12px, 10px)' },
        },
        'drift-slow': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(10px, -14px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1)' },
          '50%': { opacity: '0.75', transform: 'scale(1.08)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
          '50%': { transform: 'translateX(-50%) translateY(6px)' },
        },
      },
      animation: {
        rise: 'rise 0.7s ease-out both',
        drift: 'drift 14s ease-in-out infinite',
        'drift-slow': 'drift-slow 18s ease-in-out infinite',
        glow: 'glow 8s ease-in-out infinite',
        'bounce-soft': 'bounce-soft 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
