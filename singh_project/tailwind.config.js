/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'registration_pattern': "url('/register_pattern.png')",
        'quote_history': "url('/quote_history.png')", 
        
      }
    },
  },
  plugins: [],
}
