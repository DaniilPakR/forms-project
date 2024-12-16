/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4CAF50",
          dark: "#388E3C",
          hover: "#66BB6A",
          light: "#A5D6A7",
        },
        secondary: {
          DEFAULT: "#FFC107",
          dark: "#FFA000",
          hover: "#FFD54F",
          light: "#FFE082",
        },
        background: {
          DEFAULT: "#F9F9F9",
          dark: "#2C3E50",
          accent: "#E3F2FD", // Accent background for cards, etc.
        },
        text: {
          DEFAULT: "#2C3E50",
          dark: "#FFFFFF",
          muted: "#757575", // For less prominent text
        },
        button: {
          DEFAULT: "#4CAF50", // Same as primary
          hover: "#66BB6A",
          dark: "#388E3C",
          text: "#FFFFFF", // Button text color
        },
        border: {
          DEFAULT: "#4CAF50",
          dark: "#388E3C",
          hover: "#66BB6A",
          light: "#A5D6A7",
        }
      },
    },
  },
  plugins: [],
};
