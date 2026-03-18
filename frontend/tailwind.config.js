/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#1F4037', // Deep Hunter Green
        secondary: '#FDB827', // Marigold Yellow
        'primary-dark': '#152C26',
        'text-dark': '#1F2937',
        'text-light': '#6B7280',
        'bg-light': '#F9FAFB',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'marquee': 'marquee 60s linear infinite',
        'marquee-fast': 'marquee 60s linear infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
