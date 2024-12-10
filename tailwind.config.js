/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4CAF50", // Default color
          dark: "#4CAF50", // Same primary color for dark mode
        },
        background: {
          DEFAULT: "#F9F9F9", // Light mode background
          dark: "#2C3E50", // Dark mode background
        },
        text: {
          DEFAULT: "#2C3E50", // Light mode text
          dark: "#FFFFFF", // Dark mode text
        },
      },
    },
  },
  plugins: [],
};
