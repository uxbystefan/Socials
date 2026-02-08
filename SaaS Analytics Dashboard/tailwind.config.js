/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#4F46E5', // Example color
        'sidebar-bg': '#F9FAFB',
      }
    },
  },
  plugins: [],
}
