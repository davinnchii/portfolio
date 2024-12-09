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
        welcome: 'draw 3s ease-in-out forwards, fill 1s ease-in-out 3s forwards',
        fadeinup: 'fade-in-up 1s ease-in-out 0.25s 1',
      },
      keyframes: {
        "fade-in-up": {
          "0%": {
            opacity: 0,
            transform: "translate3d(0, 100%, 0)",
          },
          "100%": {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
          },
        },
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
      maxWidth: {
        page: "calc(1280px + 2rem)"
      }
    },
  },
  plugins: [],
};
