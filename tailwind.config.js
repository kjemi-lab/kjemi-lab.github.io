/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0D0D1A',
        surface: '#1A1A2B',
        primary: '#9f55ff',
        primaryLight: '#b366ff',
        accent: '#ff3366',
        neon: {
          red: '#ff4444',
          blue: '#4444ff',
          yellow: '#ffff44',
          green: '#44ff44',
          orange: '#ff8844',
          cyan: '#44ffff',
          purple: '#8844ff',
          magenta: '#ff44ff'
        }
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #9f55ff, 0 0 10px #9f55ff, 0 0 15px #9f55ff' },
          '100%': { boxShadow: '0 0 10px #9f55ff, 0 0 20px #9f55ff, 0 0 30px #9f55ff' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace']
      }
    },
  },
  plugins: [],
}
