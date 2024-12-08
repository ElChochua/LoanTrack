/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"  ],
  theme: {
    extend: {
      colors:{
        'azul-perron': '#0F172A',
        'azul-claro': '#253865',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

