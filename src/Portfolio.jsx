// src/Portfolio.jsx
import React, { useState, useEffect, useRef } from "react";
import ScrambledText from "./components/ScrambledText";
import QuadToggle from "./components/QuadToggle";
import NeoSkeuoNav from "./components/NeoSkeuoNav";
import { useTheme } from "./theme/ThemeContext";

/* --- 0. Data de Sections (Conservée) --- */
const dynamicSections = [
    {
        id: "about",
        title: "À PROPOS",
        subtitle: "Développeur React — Freelance Montréal",
        body: "<p>Création d’expériences web performantes, maintenables et orientées conversion. Mon portfolio met l'accent sur le design expérientiel, l'accessibilité et la performance. Le but est de créer des interfaces utilisateur mémorables et optimisées.</p>",
        ctaText: "Discutons du projet",
        ctaHref: "#contact",
    },
    {
        id: "competences",
        title: "COMPÉTENCES",
        subtitle: "Stack & expertise",
        body: "<p>Expertise complète en React, Next.js, TypeScript. Forte expérience en Styled-Components (remplacé par Tailwind ici) et intégration CI/CD. Je me concentre sur l'Accessibilité (WCAG) et l'optimisation des performances (Lighthouse).</p>",
        ctaText: "Contact pro",
        ctaHref: "#contact",
    },
    {
        id: "contact",
        title: "CONTACT",
        subtitle: "Disponible pour missions",
        body: "<p>Mail : zarajeanfabrice@gmail.com — Disponible à Montréal et à distance.</p>",
        ctaText: "Envoyer un email",
        ctaHref: "mailto:zarajeanfabrice@gmail.com",
    },
];

/* --- Layout et Composants de base simplifiés --- */
const SimpleNavbar = ({ themeMode, toggleTheme }) => {
    const [prefOpen, setPrefOpen] = useState(false);
    const buttonRef = useRef();

    // Style basé sur le mode : accents de couleur
    const brandColor = themeMode === 'dark' ? 'text-[#39FF14]' : 'text-[#6458FF]';
    const linkColor = themeMode === 'dark' ? 'hover:text-gray-50' : 'hover:text-gray-900';
    
    // Le Nav utilise des classes dynamiques pour le thème et l'opacité/flou (navbar.styles.js était pour cela)
    return (
        <nav className={`sticky top-0 w-full h-16 z-50 transition-colors duration-500 ${themeMode === 'dark' ? 'bg-[#0A0A0A]/90 border-b border-gray-800' : 'bg-white/80 border-b border-gray-200'} backdrop-blur-sm`}>
            <div className="flex items-center h-full max-w-7xl mx-auto px-4 md:px-8">
                {/* Brand */}
                <a href="#home" className={`text-xl font-extrabold uppercase tracking-widest ${brandColor} transition-colors duration-500`}>
                    JEFF ZARA
                </a>
                
                <div className="ml-auto flex items-center gap-4">
                    {/* Navigation principale */}
                    <a href="#projects" className={`hidden sm:block text-sm font-semibold uppercase transition-colors duration-300 ${linkColor} text-gray-500`}>
                        Projets
                    </a>
                    
                    {/* Toggle Préférences */}
                    <div className="relative">
                        <button
                            ref={buttonRef}
                            onClick={() => setPrefOpen(p => !p)}
                            className={`text-sm font-semibold uppercase transition-colors duration-300 ${linkColor} text-gray-500 focus:outline-none`}
                        >
                            Préférences
                        </button>
                        <QuadToggle 
                            isOpen={prefOpen} 
                            onClose={() => setPrefOpen(false)} 
                            parentRef={buttonRef} 
                            themeMode={themeMode}
                            toggleTheme={toggleTheme}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
};

const SimpleFooter = () => (
    <footer className="py-4 text-center text-xs text-gray-500 border-t border-current/20">
        © 2025 Jean Fabrice ZARA — Montréal — Disponible pour projets —
        <a 
            href="https://github.com/zarajeanfabrice" 
            target="_blank" 
            rel="noreferrer" 
            className="ml-1 font-semibold underline hover:text-current transition-colors duration-300"
        >
            GitHub
        </a>
    </footer>
);


/* --- Composant Section générique (avec animation de titre conservée) --- */
const PortfolioSection = ({ data, isHero, isLoaded, themeMode }) => {
    
    // Accents de couleur basés sur le thème
    const neonAccent = themeMode === 'dark' ? 'border-[#39FF14]' : 'border-[#6458FF]';

    // Rendu du titre avec l'animation de caractères (From Space / Flash)
    const AnimatedTitle = () => (
        <h1 className={`text-6xl md:text-8xl font-black mb-6 text-current/80 tracking-tighter transition-colors duration-500`}>
            {data.title.split("").map((letter, idx) => (
                <span 
                    key={idx} 
                    className="inline-block transition-transform duration-200 hover:text-[#39FF14] hover:-translate-y-2 animate-fade-in-up"
                    // Application du délai d'animation séquentiel
                    style={{ 
                        animationDelay: `${idx * 0.05}s`
                    }}
                >
                    {letter === ' ' ? '\u00A0' : letter}
                </span>
            ))}
        </h1>
    );
    
    // Style CTA
    const ctaClasses = themeMode === 'dark' 
        ? 'border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14] hover:text-black' 
        : 'border-[#6458FF] text-[#6458FF] hover:bg-[#6458FF] hover:text-white';

    return (
        <section 
            id={data.id} 
            className={`min-h-[80vh] flex flex-col justify-center items-start px-4 md:px-8 max-w-7xl mx-auto py-24 w-full`}
        >
            {/* Titre avec animation des caractères */}
            <div className={`mb-8 ${isHero ? 'mt-24' : ''}`}>
                <AnimatedTitle />
                
                {/* Sous-titre avec ScrambledText (Glitch) */}
                <h2 className={`text-2xl md:text-3xl font-mono mt-[-2rem] mb-6 border-b-2 ${neonAccent} pb-2 transition-colors duration-500`}>
                    <ScrambledText 
                        targetText={data.subtitle} 
                        isLoaded={isLoaded && isHero} 
                        className="text-current/60"
                    />
                </h2>
            </div>
            
            {/* Corps du texte */}
            <div 
                className="text-lg leading-relaxed space-y-4 max-w-3xl text-current/80"
                dangerouslySetInnerHTML={{ __html: data.body }} 
            />
            
            {/* CTA */}
            {data.ctaText && (
                <a 
                    href={data.ctaHref} 
                    className={`mt-10 px-6 py-3 font-bold border-2 transition-all duration-300 ${ctaClasses} text-lg hover:shadow-xl`}
                >
                    {data.ctaText}
                </a>
            )}
        </section>
    );
};

/* --- Composant ProjectsSection (Simplifié en tuiles) --- */
const ProjectsSection = ({ themeMode }) => {
    // Les données des projets sont ici (simplifiées pour l'exemple)
    const majorProjects = [
        { id: 1, title: "Livano – Appli immobilière", techStack: ["React", "Node.js", "GraphQL", "TypeScript"], desc: "Plateforme web complète avec CRUD et recherche avancée. Conception UX/UI." },
        { id: 2, title: "YouChef – Gestion de recettes", techStack: ["React", "Express", "MongoDB", "TailwindCSS"], desc: "Application complète de gestion de recettes par utilisateur. Filtrage et recherche par catégorie." },
    ];

    const cardBg = themeMode === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
    const shadowClass = themeMode === 'dark' ? 'shadow-2xl shadow-gray-900/70' : 'shadow-xl shadow-gray-300/50';
    const tagBg = themeMode === 'dark' ? 'bg-gray-600/30' : 'bg-gray-300/50';
    const demoColor = themeMode === 'dark' ? 'text-[#39FF14]' : 'text-[#6458FF]';

    return (
        <section id="projects" className="min-h-[80vh] px-4 md:px-8 max-w-7xl mx-auto py-24 w-full">
             <h1 className="text-6xl md:text-8xl font-black mb-16 text-current/80 tracking-tighter">
                PROJETS
            </h1>
            <div className="grid md:grid-cols-2 gap-8">
                {majorProjects.map(p => (
                    <div 
                        key={p.id} 
                        className={`p-6 rounded-xl ${cardBg} ${shadowClass} hover:scale-[1.01] transition-transform duration-300 border border-current/10`}
                    >
                        <h3 className="text-3xl font-extrabold mb-3 text-current">{p.title}</h3>
                        <p className="text-current/70 mb-4">{p.desc}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {p.techStack.map(tech => (
                                <span key={tech} className={`text-xs font-semibold px-3 py-1 rounded-full ${tagBg} text-current/70`}>
                                    {tech}
                                </span>
                            ))}
                        </div>
                        {/* Actions : Remplacent les tags SVG morphing pour simplifier */}
                        <div className="flex mt-6 gap-4">
                            <button className={`text-sm font-semibold ${demoColor} hover:underline transition-colors`}>
                                Voir Démo
                            </button>
                            <button className="text-sm font-semibold text-current/50 hover:text-current transition-colors">
                                Étude de cas
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};


/* --- Composant Principal du Portfolio --- */
export default function Portfolio() {
    const { themeMode, toggleTheme } = useTheme();
    const [isLoaded, setIsLoaded] = useState(false); 

    // Déclencher l'état de chargement pour les animations initiales
    useEffect(() => {
        setIsLoaded(true);
    }, []);
    
   
    return (
        // Le `document.body` gère déjà les classes de fond grâce à `ThemeContext.jsx`
        <div className={`relative min-h-screen`}>
            
            {/* Le background-image est géré par la classe "filter-grain-..." appliquée ci-dessous */}
            <div 
                className={`fixed inset-0 pointer-events-none z-0 opacity-[0.05]`} 
                style={{ 
                    // Cette partie doit rester vide car l'image de grain est maintenant dans le CSS de la classe "filter-grain-..."
                }}
            >
                {/* Simulation de l'effet de grain global par une div fixe (pour performance) */}
                {/* Le background-image qui causait l'erreur a été déplacé dans le CSS généré par Tailwind */}
            </div>
            
            <SimpleNavbar themeMode={themeMode} toggleTheme={toggleTheme} />
            
            <main className="relative z-10">
                <PortfolioSection data={dynamicSections[0]} isHero={true} isLoaded={isLoaded} themeMode={themeMode} />
                <ProjectsSection themeMode={themeMode} />
                <PortfolioSection data={dynamicSections[1]} isLoaded={isLoaded} themeMode={themeMode} />
                <PortfolioSection data={dynamicSections[2]} isLoaded={isLoaded} themeMode={themeMode} />
            </main>
            
            <SimpleFooter />
        </div>
    );
}

// FIN du fichier Portfolio.jsx. AUCUN autre caractère ne doit suivre ici.