/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['Newsreader', 'Lora', 'Georgia', 'serif'],
        sans: ['Inter', 'Geist', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        claude: {
          terracotta: '#D97757',
          'terracotta-hover': '#C26547',
          'terracotta-light': '#F7ECE6',
          'terracotta-dark': '#E08264',
          bg: '#FAF9F5',
          'bg-dark': '#181816',
          surface: '#FFFFFF',
          'surface-dark': '#23221F',
          'surface-hover': '#F5F2EB',
          'surface-hover-dark': '#2C2B27',
          sidebar: '#F5F3ED',
          'sidebar-dark': '#1F1E1B',
          border: '#EBE6DC',
          'border-dark': '#33312B',
          'border-subtle': '#F0ECE4',
          'border-subtle-dark': '#2A2925',
          primary: '#1F1E1D',
          'primary-dark': '#F3F1EC',
          secondary: '#6B6862',
          'secondary-dark': '#A09C92',
          muted: '#949087',
          'muted-dark': '#737067',
        },
        dark: {
          bg: '#181816',
          card: '#23221F',
          border: '#33312B',
          hover: '#2C2B27',
          muted: '#A09C92',
          accent: '#D97757',
        }
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.25s ease-out both',
        'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

