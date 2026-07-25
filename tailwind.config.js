/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        touch: { raw: '(hover: none) and (pointer: coarse)' },
      },
      colors: {
        mist: {
          DEFAULT: '#e8f0f4',
          soft: '#f2f7f9',
          deep: '#d4e4ec',
        },
        sage: {
          DEFAULT: '#6f8f7a',
          light: '#9db5a4',
          dark: '#4f6b58',
          muted: '#c5d4ca',
        },
        dawn: {
          DEFAULT: '#7fa8bc',
          light: '#b7d0dc',
          soft: '#dceaf0',
        },
        ink: {
          DEFAULT: '#2f3a36',
          muted: '#5a6862',
          soft: '#7a8781',
        },
        sand: {
          DEFAULT: '#f7f4ef',
          warm: '#efe8dc',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(2%, -1.5%, 0) scale(1.03)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s ease-out both',
        'fade-up-delayed': 'fade-up 0.9s ease-out 0.15s both',
        'fade-up-late': 'fade-up 0.9s ease-out 0.3s both',
        'fade-in': 'fade-in 1.1s ease-out both',
        drift: 'drift 18s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
