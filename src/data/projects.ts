// Modifié le 2025-05-22 13:57 - Ajout des fichiers de données (projets, skills, etc.)
import { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Plateforme e-commerce complète avec gestion des commandes et paiements',
    longDescription: 'Application fullstack avec authentification, panier, gestion des stocks et tableau de bord admin. Interface utilisateur moderne avec React et backend robuste en Node.js.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'JWT', 'Tailwind CSS'],
    githubUrl: 'https://github.com/votre-username/ecommerce-platform',
    demoUrl: 'https://demo-ecommerce.vercel.app',
    imageUrl: '/images/ecommerce-preview.jpg',
    category: 'fullstack',
    featured: true
  },
  {
    id: '2',
    title: 'API REST Gestion Inventaire',
    description: 'API robuste pour la gestion d\'inventaire avec authentification et documentation',
    longDescription: 'API REST complète avec authentification JWT, validation des données, gestion des erreurs et documentation Swagger. Architecture scalable avec tests unitaires.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger', 'Jest'],
    githubUrl: 'https://github.com/votre-username/inventory-api',
    demoUrl: 'https://inventory-api-docs.herokuapp.com',
    imageUrl: '/images/api-preview.jpg',
    category: 'backend',
    featured: true
  },
  {
    id: '3',
    title: 'Dashboard Analytics',
    description: 'Interface d\'analyse de données avec graphiques interactifs',
    longDescription: 'Dashboard moderne pour visualiser des données complexes avec graphiques interactifs, filtres avancés et export des rapports.',
    technologies: ['React', 'TypeScript', 'Chart.js', 'Material-UI', 'API REST'],
    githubUrl: 'https://github.com/votre-username/analytics-dashboard',
    demoUrl: 'https://analytics-dashboard-demo.netlify.app',
    imageUrl: '/images/dashboard-preview.jpg',
    category: 'frontend',
    featured: false
  },
  {
    id: '4',
    title: 'Microservices Architecture',
    description: 'Architecture microservices avec Docker et orchestration Kubernetes',
    longDescription: 'Système distribué avec plusieurs microservices, communication asynchrone, monitoring et déploiement automatisé.',
    technologies: ['Node.js', 'Docker', 'Kubernetes', 'Redis', 'RabbitMQ', 'Prometheus'],
    githubUrl: 'https://github.com/votre-username/microservices-app',
    imageUrl: '/images/microservices-preview.jpg',
    category: 'backend',
    featured: true
  },
  {
    id: '5',
    title: 'Portfolio Site Generator',
    description: 'Générateur de sites portfolio avec CMS intégré',
    longDescription: 'Outil permettant de créer rapidement des portfolios personnalisés avec un CMS pour la gestion du contenu.',
    technologies: ['Astro', 'React', 'Node.js', 'SQLite', 'Tailwind CSS'],
    githubUrl: 'https://github.com/votre-username/portfolio-generator',
    demoUrl: 'https://portfolio-gen.vercel.app',
    imageUrl: '/images/generator-preview.jpg',
    category: 'fullstack',
    featured: false
  }
];