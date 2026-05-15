/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkGreen: '#0f5132',
        lightGreen: '#198754',
        neonGreen: '#00ff00',
        darkBg: '#0a0a0a',
        darkSurface: '#121212',
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00ff00, 0 0 10px #0f5132' },
          '100%': { boxShadow: '0 0 20px #00ff00, 0 0 30px #198754' },
        }
      }
    },
  },
  plugins: [],
}
