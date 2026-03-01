import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jost)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-ibm-mono)', 'monospace'],
      },
      colors: {
        parchment: {
          50:  '#fdf8f0',
          100: '#f8eed8',
          200: '#f0d9a8',
          300: '#e4be72',
          400: '#d9a43e',
          500: '#c98c24',
          600: '#a96e1a',
          700: '#875317',
          800: '#6e4218',
          900: '#5c3716',
        },
        ink: {
          50:  '#f4f3f1',
          100: '#e5e2dc',
          200: '#cec8bc',
          300: '#b2a895',
          400: '#9a8b77',
          500: '#8a7a65',
          600: '#766657',
          700: '#60524a',
          800: '#504542',
          900: '#463c3b',
          950: '#1e1714',
        },
        emerald: {
          50:  '#edfaf4',
          100: '#d3f3e3',
          200: '#aae6cb',
          300: '#72d3aa',
          400: '#3fba87',
          500: '#1f9f6e',
          600: '#148059',
          700: '#116649',
          800: '#12523c',
          900: '#104433',
          950: '#072619',
        },
        gold: {
          300: '#fde68a',
          400: '#fbbf24',
          500: '#c98c24',
          600: '#a96e1a',
        },
      },
      backgroundImage: {
        'parchment-texture': "url('/textures/parchment.svg')",
      },
      boxShadow: {
        'manuscript': '0 2px 20px rgba(30, 23, 20, 0.12), 0 1px 4px rgba(30, 23, 20, 0.08)',
        'manuscript-lg': '0 8px 40px rgba(30, 23, 20, 0.18), 0 2px 8px rgba(30, 23, 20, 0.1)',
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
        DEFAULT: '3px',
        'md': '4px',
        'lg': '6px',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
