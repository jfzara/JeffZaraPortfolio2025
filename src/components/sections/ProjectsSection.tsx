// Modifié le 2025-05-24 10:05 - Ajout de la section projets
// Modifié le 2025-05-25 10:01 - Corrections dans les composants et styles
// Modifié le 2025-05-23 10:05 - Ajout de la section projets
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Filter } from 'lucide-react';
import { ProjectCard } from '../ui/ProjectCard';
import { projects } from '../../data/projects';

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  const filters = [
    { key: 'all', label: 'Tous les projets' },
    { key: 'fullstack', label: 'Full Stack' },
    { key: 'backend', label: 'Backend' },
    { key: 'frontend', label: 'Frontend' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects.filter(p => p.featured)
    : projects.filter(p => p.category === activeFilter && p.featured);

  return (
    <section className="py-20 bg-darkgray" id="projects">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Mes <span className="text-neon glow-text">Projets</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Découvrez une sélection de mes projets récents, allant du développement backend 
            aux applications full stack complètes.
          </p>
        </motion.div>

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 ${
                activeFilter === filter.key
                  ? 'bg-neon text-dark'
                  : 'bg-lightgray text-white hover:bg-opacity-80'
              }`}
            >
              <Filter className="w-4 h-4" />
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Grille de projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* CTA vers tous les projets */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-neon text-lg font-semibold hover:text-white transition-colors"
          >
            Voir tous mes projets
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};