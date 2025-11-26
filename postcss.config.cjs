// postcss.config.js (Mise à jour)
module.exports = {
  plugins: {
    tailwindcss: {
      // 🚨 AJOUT : Forcer le chemin de configuration (relatif à postcss.config.js)
      config: './tailwind.config.js', 
    },
    autoprefixer: {},
  },
};