/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // Blue-600
        secondary: "#bfdbfe", // Blue-200
        accent: "#93c5fd", // Blue-300
        background: "#F9F9F9",
        textPrimary: "#1e3a8a", // Blue-900
      },
      fontFamily: {
        roboto: ["Roboto"],
        matemasie: ["Matemasie"],
      },
    },
  },
  plugins: [],
};
