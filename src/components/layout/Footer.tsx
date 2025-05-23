// Modifié le 2025-05-22 13:21 - Création du composant Footer
import React from 'react';
import { SocialIcon } from '../ui/SocialIcon';
import { socialLinks } from '../../data/socialLinks';
import { Code2, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-darkgray border-t border-lightgray">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Code2 className="w-6 h-6 text-neon" />
              <span className="text-lg font-heading font-bold">DevPortfolio</span>
            </div>
            <p className="text-gray-300 text-sm">
              Développeur Full Stack passionné par la création d'applications web modernes et performantes.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-300 hover:text-neon transition-colors">Accueil</a></li>
              <li><a href="/projects" className="text-gray-300 hover:text-neon transition-colors">Projets</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-neon transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Suivez-moi</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <SocialIcon key={link.name} {...link} />
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-lightgray mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm flex items-center justify-center gap-2">
            © {currentYear} DevPortfolio. Fait avec <Heart className="w-4 h-4 text-red-500" /> et beaucoup de café.
          </p>
        </div>
      </div>
    </footer>
  );
};