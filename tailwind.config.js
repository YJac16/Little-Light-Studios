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
        cream: '#fff9f1',
        'cream-dark': '#f3ebe0',
        sage: '#6f9b78',
        'sage-light': '#b7d0bb',
        'sage-dark': '#3f6b4a',
        sky: '#6eb0d4',
        'sky-soft': '#d4eef8',
        'sky-deep': '#2f6f8f',
        honey: '#f0b429',
        'honey-soft': '#ffe8a8',
        'honey-deep': '#a87412',
        lavender: '#b79fd0',
        'lavender-light': '#e8daf5',
        ink: '#1f2a2e',
        'ink-muted': '#5b676c',
      },
      fontFamily: {
        display: ['"Fredoka"', 'system-ui', 'sans-serif'],
        sans: ['"Outfit"', 'system-ui', 'sans-serif'],
        serif: ['"Fredoka"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -14px rgba(31, 42, 46, 0.22)',
        lift: '0 18px 44px -18px rgba(31, 42, 46, 0.28)',
      },
      backgroundImage: {
        'studio-mesh':
          'radial-gradient(90% 70% at 12% 0%, #ffe8a8 0%, transparent 55%), radial-gradient(80% 60% at 100% 10%, #d4eef8 0%, transparent 50%), radial-gradient(70% 55% at 50% 100%, #b7d0bb 0%, transparent 45%), linear-gradient(180deg, #fff9f1 0%, #f7f1e8 100%)',
        'dawn-mesh':
          'radial-gradient(90% 70% at 12% 0%, #ffe8a8 0%, transparent 55%), radial-gradient(80% 60% at 100% 10%, #d4eef8 0%, transparent 50%), radial-gradient(70% 55% at 50% 100%, #b7d0bb 0%, transparent 45%), linear-gradient(180deg, #fff9f1 0%, #f7f1e8 100%)',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-14px, 12px)' },
        },
        'drift-slow': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(12px, -16px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
          '50%': { transform: 'translateX(-50%) translateY(6px)' },
        },
      },
      animation: {
        rise: 'rise 0.65s cubic-bezier(0.22, 1, 0.36, 1) both',
        drift: 'drift 14s ease-in-out infinite',
        'drift-slow': 'drift-slow 18s ease-in-out infinite',
        glow: 'glow 8s ease-in-out infinite',
        'bounce-soft': 'bounce-soft 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
