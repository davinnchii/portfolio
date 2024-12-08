/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        welcome: 'draw 3s ease-in-out forwards, fill 1s ease-in-out 3s forwards'
      },
        keyframes: {
          draw: {
            'from': {
              strokeDashoffset: 9541.93
            },
            'to': {
              strokeDashoffset: 0
            }
          },
          fill: {
            'to': {
              fill: 'white'
            }
          }
        },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
