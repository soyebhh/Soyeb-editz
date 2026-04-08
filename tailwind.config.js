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
          DEFAULT: "#FFD700", // Electric Gold
          50: '#fffbea',
          100: '#fff3c4',
          200: '#ffe885',
          300: '#ffda46',
          400: '#ffcc15',
          500: '#ffd700', // Actual gold
          600: '#e6b800',
          700: '#b38f00',
          800: '#85690b',
          900: '#715812',
        },
        accent: {
          DEFAULT: "#E63946", // Accent Red
          50: '#fdf2f3',
          100: '#fbe4e6',
          200: '#f5c3c8',
          300: '#efa2a9',
          400: '#e63946', // Actual Red
          500: '#d72331',
          600: '#b61925',
          700: '#99121d',
          800: '#82131b',
          900: '#71151b',
        },
        slate: {
          950: '#000000',
          900: '#0A0A0A', // Deep Black 
          800: '#1A1A1A',
        },
        offwhite: '#F5F5F0',
      },
      backgroundImage: {
        'ig-gradient': 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2397 75%, #323232 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
        'mesh-gradient': 'radial-gradient(at 0% 0%, rgba(255, 215, 0, 0.1) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(230, 57, 70, 0.1) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(255, 215, 0, 0.05) 0px, transparent 50%), radial-gradient(at 0% 100%, #0A0A0A 0px, transparent 50%)',
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