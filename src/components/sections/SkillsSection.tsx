// Modifié le 2025-05-23 15:30 - Ajout de la section compétences
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Monitor, Wrench } from 'lucide-react';
import { SkillBar } from '../ui/SkillBar';
import { skills } from '../../data/skills';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'Toutes', icon: Code },
    { key: 'backend', label: 'Backend', icon: Database },
    { key: 'frontend', label: 'Frontend', icon: Monitor },
    { key: 'database', label: 'Bases de données', icon: Database },
    { key: 'tools', label: 'Outils', icon: Wrench }
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section className="py-20 bg-dark" id="skills">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Mes <span className="text-neon glow-text">Compétences</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Voici un aperçu de mes compétences techniques et des technologies que je maîtrise
            pour créer des applications web performantes et modernes.
          </p>
        </motion.div>

        {/* Filtres de catégories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 ${
                  activeCategory === category.key
                    ? 'bg-neon text-dark shadow-lg glow-box'
                    : 'bg-lightgray text-white hover:bg-opacity-80'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                {category.label}
              </button>
            );
          })}
        </motion.div>

        {/* Grille des compétences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              layout
              className="glass-effect p-6 rounded-xl hover:glow-box transition-all duration-300"
            >
              <SkillBar skill={skill} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Statistiques globales */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div className="glass-effect p-6 rounded-xl">
            <div className="text-2xl font-bold text-neon">{skills.filter(s => s.category === 'backend').length}</div>
            <div className="text-gray-300">Technologies Backend</div>
          </div>
          <div className="glass-effect p-6 rounded-xl">
            <div className="text-2xl font-bold text-neon">{skills.filter(s => s.category === 'frontend').length}</div>
            <div className="text-gray-300">Technologies Frontend</div>
          </div>
          <div className="glass-effect p-6 rounded-xl">
            <div className="text-2xl font-bold text-neon">{skills.filter(s => s.category === 'database').length}</div>
            <div className="text-gray-300">Bases de données</div>
          </div>
          <div className="glass-effect p-6 rounded-xl">
            <div className="text-2xl font-bold text-neon">{Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}%</div>
            <div className="text-gray-300">Niveau moyen</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};