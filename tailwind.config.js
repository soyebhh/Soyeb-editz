/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        /* CSS-var driven so theme switching auto-propagates */
        primary: {
          DEFAULT: 'var(--c-primary)',
          900: 'color-mix(in srgb, var(--c-primary) 70%, black)',
        },
        accent: {
          DEFAULT: 'var(--c-accent)',
          900: 'color-mix(in srgb, var(--c-accent) 70%, black)',
        },
        /* Static palette kept for inline references */
        gold: '#FFD700',
        red:  '#E63946',
        slate: {
          950: '#000000',
          900: '#0A0A0A',
          800: '#1A1A1A',
        },
        offwhite: '#F5F5F0',
      },
      backgroundImage: {
        'ig-gradient': 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2397 75%, #323232 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
      },
      animation: {
        'pulse-slow':  'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':       'float 6s ease-in-out infinite',
        'shimmer':     'shimmer 4s linear infinite',
        'slide-up':    'slideUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}