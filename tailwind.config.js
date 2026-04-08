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
        primary: {
          DEFAULT: "#0284c7", // Sky/Sapphire Blue
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          DEFAULT: "#06b6d4", // Cyan
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        slate: {
          950: '#000000',
          900: '#0A0A0A', // Deep Black 
          800: '#1A1A1A',
        },
        offwhite: '#F5F5F0',
      },
      backgroundImage: {
        'ig-gradient': 'linear-gradient(45deg, #0284c7 0%, #0ea5e9 25%, #06b6d4 50%, #22d3ee 75%, #323232 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
        'mesh-gradient': 'radial-gradient(at 0% 0%, rgba(2, 132, 199, 0.15) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(6, 182, 212, 0.1) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(2, 132, 199, 0.1) 0px, transparent 50%), radial-gradient(at 0% 100%, #0A0A0A 0px, transparent 50%)',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'tilt': 'tilt 10s infinite linear',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        tilt: {
          '0%, 50%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1deg)' },
          '75%': { transform: 'rotate(-1deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
    },
  },
  plugins: [],
}