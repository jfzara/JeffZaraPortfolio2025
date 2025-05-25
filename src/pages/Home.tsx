// Modifié le 2025-05-25 13:07 - Création de la page d'accueil
// Modifié le 2025-05-24 13:07 - Création de la page d'accueil
import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { SkillsSection } from '../components/sections/SkillsSection';
import { ContactSection } from '../components/sections/ContactSection';

export const Home: React.FC = () => {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
};