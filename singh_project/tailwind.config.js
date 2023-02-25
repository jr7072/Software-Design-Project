/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
<<<<<<< HEAD
        'registration_pattern': "url('/register_pattern.png')",
        'quote_history': "url('/quote_history.png')", 
        
      }
=======
        'quoteForm' : "url('/mesh-852.png')"
      },
      fontFamily: {
        'inter': ['Inter var', 'sans-serif']
      }

>>>>>>> ebd1a3eb19864c59e9c1ad58665298ee1b8cdfe2
    },
  },
  plugins: [],
}
