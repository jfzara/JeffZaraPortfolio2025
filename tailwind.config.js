// C:\Users\Jeff\Desktop\PROJETS VS CODE\JAVASCRIPT\REACT\mon_portfolio\src\tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    // Tailwind scanne tous les fichiers JS/TS/JSX/TSX dans src/
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  // Active le mode sombre basé sur la présence de la classe 'dark' sur le body ou html
  darkMode: 'class', 
  theme: {
    extend: {
      // Configuration des ombres pour l'effet Néoskeumorphisme
      boxShadow: {
        'neomorph-light': '9px 9px 16px rgba(163, 177, 198, 0.6), -9px -9px 16px rgba(255, 255, 255, 0.5)',
        'neomorph-dark': '9px 9px 18px rgba(0, 0, 0, 0.8), -9px -9px 18px rgba(25, 25, 25, 0.7)',
        'neomorph-inset-light': 'inset 3px 3px 6px rgba(163, 177, 198, 0.6), inset -3px -3px 6px rgba(255, 255, 255, 0.5)',
        'neomorph-inset-dark': 'inset 3px 3px 6px rgba(0, 0, 0, 0.8), inset -3px -3px 6px rgba(25, 25, 25, 0.7)',
      },
      // Keyframes pour les animations
      keyframes: {
        'neon-pulse': {
          '0%, 100%': { boxShadow: '0 0 4px rgba(0, 255, 240, 0.4)' },
          '50%': { boxShadow: '0 0 12px rgba(0, 255, 240, 0.8)' },
        },
        // Keyframe pour simuler l'animation d'apparition des lettres (fade-in-up)
        'fade-in-up': {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      // Attribution des animations
      animation: {
        'neon-pulse': 'neon-pulse 0.6s ease-in-out infinite alternate',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
      },
      // NOTE: L'entrée `backgroundImage` pour le grain a été retirée.
    },
  },
  plugins: [],
}