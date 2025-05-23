// Modifié le 2025-05-23 13:57 - Ajout des fichiers de données (projets, skills, etc.)
// Modifié le 2025-05-22 13:57 - Ajout des fichiers de données (projets, skills, etc.)
import { Skill } from '../types';

export const skills: Skill[] = [
  // Backend
  { name: 'Node.js', level: 90, category: 'backend', icon: '🚀' },
  { name: 'Express.js', level: 85, category: 'backend', icon: '⚡' },
  { name: 'Python', level: 75, category: 'backend', icon: '🐍' },
  { name: 'PHP', level: 70, category: 'backend', icon: '🔧' },
  { name: 'Java', level: 65, category: 'backend', icon: '☕' },
  
  // Frontend
  { name: 'React', level: 85, category: 'frontend', icon: '⚛️' },
  { name: 'Angular', level: 75, category: 'frontend', icon: '🅰️' },
  { name: 'TypeScript', level: 80, category: 'frontend', icon: '📘' },
  { name: 'JavaScript', level: 90, category: 'frontend', icon: '🟨' },
  { name: 'CSS Avancé', level: 85, category: 'frontend', icon: '🎨' },
  { name: 'Astro', level: 70, category: 'frontend', icon: '🚀' },
  
  // Bases de données
  { name: 'MySQL', level: 85, category: 'database', icon: '🐬' },
  { name: 'PostgreSQL', level: 80, category: 'database', icon: '🐘' },
  { name: 'MongoDB', level: 75, category: 'database', icon: '🍃' },
  { name: 'Redis', level: 70, category: 'database', icon: '📦' },
  
  // Outils
  { name: 'Git', level: 90, category: 'tools', icon: '📚' },
  { name: 'Docker', level: 75, category: 'tools', icon: '🐳' },
  { name: 'AWS', level: 65, category: 'tools', icon: '☁️' },
  { name: 'Linux', level: 80, category: 'tools', icon: '🐧' }
];