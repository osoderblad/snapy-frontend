/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./components/**/*.vue",
    "./pages/**/*.vue",
    "./layouts/*.vue",
    "./app.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
