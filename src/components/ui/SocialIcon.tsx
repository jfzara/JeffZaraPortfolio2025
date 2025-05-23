// Modifié le 2025-05-24 10:39 - Ajout du composant pour les icônes sociales
import React from 'react';
import { Github, Linkedin, Mail, Twitter, ExternalLink } from 'lucide-react';
import { SocialLink } from '../../types';

const iconMap = {
  Github,
  Linkedin,
  Mail,
  Twitter,
  ExternalLink
};

export const SocialIcon: React.FC<SocialLink> = ({ name, url, icon, color }) => {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || ExternalLink;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative p-3 rounded-full bg-lightgray hover:bg-opacity-80 transition-all duration-300 transform hover:scale-110"
      style={{ '--hover-color': color } as React.CSSProperties}
    >
      <IconComponent 
        className="w-5 h-5 text-white group-hover:text-neon transition-colors" 
      />
      <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-dark text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
        {name}
      </span>
    </a>
  );
};