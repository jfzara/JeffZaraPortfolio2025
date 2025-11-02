// Modifié le 2025-05-25 14:42 - Ajout de la page des projets
// Modifié le 2025-05-24 14:42 - Ajout de la page des projets
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProjectCard } from '../components/ui/ProjectCard';
import { projects } from '../data/projects';

export const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filters = [
    { key: 'all', label: 'Tous les projets', count: projects.length },
    { key: 'fullstack', label: 'Full Stack', count: projects.filter(p => p.category === 'fullstack').length },
    { key: 'backend', label: 'Backend', count: projects.filter(p => p.category === 'backend').length },
    { key: 'frontend', label: 'Frontend', count: projects.filter(p => p.category === 'frontend').length }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'all' || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-darkgray"
      >
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-neon transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>

          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Mes <span className="text-neon glow-text">Projets</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez l'ensemble de mes réalisations, du développement backend aux applications 
              full stack complètes. Chaque projet représente un défi technique relevé avec passion.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Filtres et recherche */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="py-12 bg-dark sticky top-20 z-40 border-b border-lightgray"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Barre de recherche */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un projet, une technologie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-lightgray border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon focus:border-transparent text-white placeholder-gray-400"
              />
            </div>

            {/* Filtres */}
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all transform hover:scale-105 ${
                    activeFilter === filter.key
                      ? 'bg-neon text-dark'
                      : 'bg-lightgray text-white hover:bg-opacity-80'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  {filter.label}
                  <span className="text-xs bg-opacity-20 bg-white px-2 py-1 rounded-full">
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Résultats de recherche */}
          {searchTerm && (
            <div className="mt-4 text-center">
              <p className="text-gray-300">
                {filteredProjects.length} projet{filteredProjects.length !== 1 ? 's' : ''} trouvé{filteredProjects.length !== 1 ? 's' : ''} 
                pour "{searchTerm}"
              </p>
            </div>
          )}
        </div>
      </motion.section>

      {/* Grille des projets */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-6">
          {filteredProjects.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  layout
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-heading font-semibold mb-4">Aucun projet trouvé</h3>
              <p className="text-gray-300 mb-8">
                Essayez de modifier vos critères de recherche ou de filtrage.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveFilter('all');
                }}
                className="bg-neon text-dark px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
              >
                Réinitialiser les filtres
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Statistiques */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-darkgray"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="glass-effect p-6 rounded-xl">
              <div className="text-3xl font-bold text-neon mb-2">{projects.length}</div>
              <div className="text-gray-300">Projets réalisés</div>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <div className="text-3xl font-bold text-neon mb-2">
                {Array.from(new Set(projects.flatMap(p => p.technologies))).length}
              </div>
              <div className="text-gray-300">Technologies utilisées</div>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <div className="text-3xl font-bold text-neon mb-2">
                {projects.filter(p => p.category === 'fullstack').length}
              </div>
              <div className="text-gray-300">Projets Full Stack</div>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <div className="text-3xl font-bold text-neon mb-2">
                {projects.filter(p => p.demoUrl).length}
              </div>
              <div className="text-gray-300">Démos disponibles</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-dark"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Un projet en tête ?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discutons ensemble de vos besoins et transformons votre idée en réalité digitale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-neon text-dark px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
              Commencer un projet
            </Link>
            <Link
              to="/about"
              className="border border-neon text-neon px-8 py-4 rounded-lg font-semibold hover:bg-neon hover:text-dark transition-all transform hover:scale-105"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};