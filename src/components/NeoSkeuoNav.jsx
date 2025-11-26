// src/components/NeoSkeuoNav.jsx
import React, { useState } from 'react';

// Configuration des liens de navigation
const NAV_LINKS = [
    { id: 'about', title: 'À PROPOS' },
    { id: 'projects', title: 'PROJETS' },
    { id: 'contact', title: 'CONTACT' },
];

// Fonction utilitaire de scroll
const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (target) {
        window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth',
        });
    }
};

// Composant pour le bouton individuel (Trèfle Néoskeumorphique)
const NavButton = ({ id, title }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onClick={() => scrollToSection(id)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            // Néoskeumorphisme / Trèfle (Cercle avec box-shadow complexe)
            className={`
                relative w-14 h-14 rounded-full flex items-center justify-center 
                shadow-neomorph-light dark:shadow-neomorph-dark 
                bg-gray-200 dark:bg-gray-800 transition-all duration-300 group
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#39FF14]
                hover:scale-105 active:shadow-neomorph-inset-light dark:active:shadow-neomorph-inset-dark
            `}
        >
            {/* Icône/Point au centre */}
            <div className="w-2 h-2 rounded-full bg-black dark:bg-[#39FF14] transition-colors duration-300"></div>
            
            {/* Animation de Rotation au survol/clic */}
            <div 
                className={`
                    absolute inset-0 transition-transform duration-500 
                    ${isHovered ? 'rotate-[360deg]' : 'rotate-0'}
                    // Les 4 "pétales" du trèfle simulés par des ombres/formes
                `}
                // L'effet trèfle est principalement donné par les ombres et la forme du conteneur.
            >
                {/* Texte au survol (simule le label des NavDots) */}
                <span className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-xs font-semibold whitespace-nowrap">
                    {title}
                </span>
            </div>
        </button>
    );
};

// Composant principal de la navigation
export default function NeoSkeuoNav() {
    return (
        <div 
            className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col space-y-4"
            aria-label="Navigation principale"
        >
            {NAV_LINKS.map(link => (
                <NavButton key={link.id} id={link.id} title={link.title} />
            ))}
        </div>
    );
}