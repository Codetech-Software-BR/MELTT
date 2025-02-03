/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FE602F",
        secondary: "#A2BF00",
        default: "#342394"
      },
      backgroundColor: {
        primary: "#342394",
        secondary: "#FFE70B"
      }
    },
  },
  plugins: [],
}

