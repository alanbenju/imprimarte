/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F28C8C',
        secondary: '#FFDDC1',
        accent: '#FFB6B6',
        background: '#F9F9F9',
        textPrimary: '#333333',
      },
      fontFamily: {
        roboto: ['Roboto'],
        matemasie: ['Matemasie']
      },
    },
  },
  plugins: [],
};
