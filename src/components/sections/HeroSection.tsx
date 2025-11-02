// Modifié le 2025-05-26 10:01 - Corrections dans les composants et styles
// Modifié le 2025-05-24 09:11 - Création de la section d'accueil (Hero)
// Modifié le 2025-05-25 10:01 - Corrections dans les composants et styles
// Modifié le 2025-05-23 09:11 - Création de la section d'accueil (Hero)
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Code, Server } from 'lucide-react';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Salutation */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-neon text-lg mb-4 font-medium"
          >
            👋 Salut, je suis
          </motion.p>

          {/* Nom */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl font-heading font-bold mb-6 glow-text"
          >
            Votre Nom
          </motion.h1>

          {/* Titre professionnel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <Server className="w-8 h-8 text-neon" />
            <h2 className="text-2xl md:text-3xl text-gray-300 font-medium">
              Développeur Full Stack
            </h2>
            <Code className="w-8 h-8 text-neon" />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Passionné par le <span className="text-neon font-semibold">backend</span> et capable de créer des solutions 
            <span className="text-neon font-semibold"> full stack</span> complètes. 
            J'aime transformer des idées complexes en applications web élégantes et performantes.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/projects"
              className="group flex items-center gap-2 bg-neon text-dark px-8 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all transform hover:scale-105 glow-box"
            >
              Voir mes projets
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="/cv.pdf"
              download
              className="group flex items-center gap-2 border-2 border-neon text-neon px-8 py-4 rounded-full font-semibold text-lg hover:bg-neon hover:text-dark transition-all transform hover:scale-105"
            >
              Télécharger CV
              <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-neon rounded-full flex justify-center">
              <div className="w-1 h-3 bg-neon rounded-full mt-2 animate-bounce"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};