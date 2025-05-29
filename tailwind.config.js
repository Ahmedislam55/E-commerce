/* eslint-disable no-undef */
const flowbite = require('flowbite/plugin');

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "main": "#0aad0a",
        "parg": "#5c6c75",
        "dark": "#001e2b",
      },
      keyframes: {
        up: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        up: 'up 1s infinite',
      },
    },
  },
  plugins: [
    flowbite,
  ],
};
