/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../studio/src/**/*.{js,ts,jsx,tsx}", // Add studio package components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}