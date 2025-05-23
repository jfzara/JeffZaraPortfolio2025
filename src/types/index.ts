// Modifié le 2025-05-22 11:06 - Ajout des types de base dans index.ts
export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    technologies: string[];
    githubUrl: string;
    demoUrl?: string;
    imageUrl: string;
    category: 'fullstack' | 'backend' | 'frontend';
    featured: boolean;
  }
  
  export interface Skill {
    name: string;
    level: number;
    category: 'backend' | 'frontend' | 'database' | 'tools';
    icon?: string;
  }
  
  export interface SocialLink {
    name: string;
    url: string;
    icon: string;
    color: string;
  }
  
  export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
  }