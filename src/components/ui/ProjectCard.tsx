// Modifié le 2025-05-25 09:27 - Création du composant pour afficher un projet
// Modifié le 2025-05-24 09:27 - Création du composant pour afficher un projet
import React from 'react';
import { motion } from 'framer-motion';
import { Github,  Code, Database, Monitor } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

const categoryIcons = {
  fullstack: Code,
  backend: Database,
  frontend: Monitor
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const CategoryIcon = categoryIcons[project.category];

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative glass-effect rounded-xl overflow-hidden hover:glow-box transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 bg-lightgray overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = `https://via.placeholder.com/400x200/1A1A1A/39FF14?text=${encodeURIComponent(project.title)}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60"></div>

        {/* Category badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-neon text-dark px-3 py-1 rounded-full text-sm font-semibold">
          <CategoryIcon className="w-4 h-4" />
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-bold text-white">{project.title}</h3>
        <p className="text-sm text-gray-300">{project.description}</p>

        {/* Technologies */}
        {project.technologies && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="text-xs bg-gray-800 text-white px-2 py-1 rounded">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-4 mt-3">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-neon">
              <Github />
            </a>
          )}
         
        </div>
      </div>
    </motion.div>
  );
};