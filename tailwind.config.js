module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e4f2ff",
          100: "#bcdeff",
          200: "#8fc8ff",
          300: "#62b1ff",
          400: "#40a1ff",
          500: "#1e90ff",
          600: "#1a88ff",
          700: "#167dff",
          800: "#1273ff",
          900: "#0a61ff",
        }
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}