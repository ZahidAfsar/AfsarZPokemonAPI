/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./*.{html,js}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        PottaOne: ["PottaOne"],
        Manjari: ["Manjari"]
      },
      colors: {
        'custom-red': '#EE1515',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
]
}
