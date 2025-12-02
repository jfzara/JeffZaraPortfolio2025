 

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
  
      colors: {
        'neon-text-custom': '#45CB80',
      },
     
      fontFamily: {
        'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
      
        'neomorph-light': [
          '9px 9px 16px rgba(163, 177, 198, 0.6)',
          '-9px -9px 16px rgba(255, 255, 255, 0.5)',
        ].join(', '),
        'neomorph-dark': [
          '4px 4px 8px rgba(35, 35, 35, 0.8)',
          '-4px -4px 8px rgba(50, 50, 50, 0.7)',
        ].join(', '),
        'neomorph-inset-light': [
          'inset 3px 3px 6px rgba(163, 177, 198, 0.6)',
          'inset -3px -3px 6px rgba(255, 255, 255, 0.5)',
        ].join(', '),
        'neomorph-inset-dark': [
          'inset 5px 5px 10px rgba(35, 35, 35, 0.8)',
          'inset -5px -5px 10px rgba(50, 50, 50, 0.7)',
        ].join(', '),
      },
      keyframes: {
        'neon-pulse': {
          '0%, 100%': { boxShadow: '0 0 4px rgba(0, 255, 240, 0.4)' },
          '50%': { boxShadow: '0 0 12px rgba(0, 255, 240, 0.8)' },
        },
        'fade-in-up': {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
        }
      },
      animation: {
        'neon-pulse': 'neon-pulse 0.6s ease-in-out infinite alternate',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
      }
    },
  },
  plugins: [],
}