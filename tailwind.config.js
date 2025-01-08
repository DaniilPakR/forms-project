/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B82F6", // Blue for primary elements
          dark: "#1E3A8A", // Dark blue for dark mode
          hover: "#60A5FA", // Lighter blue for hover states
          light: "#93C5FD", // Light blue for accents
        },
        secondary: {
          DEFAULT: "#F97316", // Orange for secondary elements
          dark: "#EA580C", // Darker orange for dark mode
          hover: "#FDBA74", // Lighter orange for hover
          light: "#FFEDD5", // Very light orange for accents
        },
        background: {
          DEFAULT: "#FFFFFF", // White background for light mode
          dark: "#231d33", // Dark blue-gray for dark mode
          accent: "#F1F5F9", // Light gray accent background for light mode
          "dark-accent": "#1F2737", // Dark gray accent background for dark mode
        },
        text: {
          DEFAULT: "#374151", // Gray for primary text in light mode
          dark: "#F9FAFB", // White for primary text in dark mode
          muted: "#6B7280", // Muted gray for less prominent text in light mode
          "dark-muted": "#9CA3AF", // Muted gray for dark mode
        },
        button: {
          DEFAULT: "#3B82F6", // Blue for primary buttons
          hover: "#60A5FA", // Lighter blue for hover
          dark: "#1E3A8A", // Dark blue for buttons in dark mode
          text: "#FFFFFF", // White text on buttons
        },
        border: {
          DEFAULT: "#E5E7EB", // Light gray for borders in light mode
          dark: "#1E3A8A", // Blue for borders in dark mode
          hover: "#3B82F6", // Blue for hover state borders
          light: "#F3F4F6", // Very light gray borders for accents
        },
      },
    },
  },
  plugins: [],
};
