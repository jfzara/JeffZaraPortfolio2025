// C:\Users\Jeff\Desktop\PROJETS VS CODE\JAVASCRIPT\REACT\mon_portfolio\src\Portfolio.jsx
import React, { useState, useEffect, useRef } from "react";
import ScrambledText from "./components/ScrambledText"; 
import QuadToggle from "./components/QuadToggle";
import NeoSkeuoNav from "./components/NeoSkeuoNav";
import { useTheme } from "./theme/ThemeContext";

// 🚨 IMPORTATION DE VOTRE VIDÉO LOCALE
import AbstractTexture from './assets/texture_color_drops.mp4'; 


/* --- 0. Data de Sections (inchangé) --- */
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
        ctaHref: "mailto:zarajeanfabrice@gmail.aom",
    },
];

/* --- Composant VideoBackground (NOUVELLE LOGIQUE D'ANIMATION) --- */
const VideoBackground = ({ src, themeMode }) => {
    const [isVisible, setIsVisible] = useState(true);
    const videoRef = useRef(null);

    // Contrôle le fondu et la durée
    useEffect(() => {
        // 1. Déclenche le fondu à 0 après 1.5 secondes
        const fadeTimer = setTimeout(() => {
            setIsVisible(false);
        }, 1500); // Fondu démarré après 1.5s

        // 2. Assure que la vidéo s'arrête complètement après 4 secondes max
        const stopTimer = setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.style.display = 'none'; // Cache l'élément après l'arrêt
            }
        }, 4000); // Durée maximale de 4 secondes

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(stopTimer);
        };
    }, []);

    // Définition des filtres et modes de fusion basés sur le thème
    const experimentalStyles = {
        playbackRate: 0.6, // Ralentissement de la vitesse de lecture
        // Filtres et mode de fusion audacieux
        filter: 'grayscale(50%) brightness(1.2)', 
        mixBlendMode: themeMode === 'dark' ? 'lighten' : 'multiply', 
        transition: 'opacity 1s ease-in-out', // 1 seconde de transition de fondu
    };

    return (
        <div 
            className={`fixed inset-0 overflow-hidden -z-20 w-full h-full`}
            style={{ opacity: isVisible ? 1 : 0, transition: experimentalStyles.transition }}
        >
            <video 
                ref={videoRef}
                className="w-full h-full"
                style={{ ...experimentalStyles, objectFit: 'cover' }}
                autoPlay 
                loop={false} // 🚨 JOUE SEULEMENT UNE FOIS
                muted 
                playsInline 
                onLoadedMetadata={(e) => { 
                    e.target.playbackRate = experimentalStyles.playbackRate; 
                }}
                src={src} 
            />
        </div>
    );
};

/* --- Composants de base (SimpleNavbar, SimpleFooter - inchangés) --- */
const SimpleNavbar = () => {
    const { themeMode, toggleTheme, currentTheme } = useTheme();
    const [prefOpen, setPrefOpen] = useState(false);
    const buttonRef = useRef();

    const brandColor = currentTheme.accentClass;
    const navBg = themeMode === 'dark' ? 'bg-[#0A0A0A]/90 border-gray-800' : 'bg-white/80 border-gray-200';
    const linkColor = themeMode === 'dark' ? 'hover:text-gray-50' : 'hover:text-gray-900';
    
    return (
        <nav className={`sticky top-0 w-full h-16 z-50 transition-colors duration-500 ${navBg} backdrop-blur-sm border-b`}>
            <div className="flex items-center h-full max-w-7xl mx-auto px-4 md:px-8">
                {/* Brand */}
                <a href="#home" className={`text-xl font-extrabold uppercase tracking-widest ${brandColor} transition-colors duration-500`}>
                    JEFF ZARA
                </a>
                
                <div className="ml-auto flex items-center gap-4">
                    {/* Navigation principale */}
                    <a href="#projects" className={`hidden sm:block text-sm font-semibold uppercase transition-colors duration-300 ${linkColor} ${currentTheme.subtleTextClass}`}>
                        Projets
                    </a>
                    <a href="#competences" className={`hidden sm:block text-sm font-semibold uppercase transition-colors duration-300 ${linkColor} ${currentTheme.subtleTextClass}`}>
                        Compétences
                    </a>
                    <a href="#contact" className={`hidden sm:block text-sm font-semibold uppercase transition-colors duration-300 ${linkColor} ${currentTheme.subtleTextClass}`}>
                        Contact
                    </a>
                    
                    {/* Toggle Préférences */}
                    <div className="relative">
                        <button
                            ref={buttonRef}
                            onClick={() => setPrefOpen(p => !p)}
                            className={`text-sm font-semibold uppercase transition-colors duration-300 ${linkColor} ${currentTheme.subtleTextClass} focus:outline-none`}
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


/* --- Composant Section générique --- */
const PortfolioSection = ({ data, isHero, isLoaded }) => {
    
    const { currentTheme } = useTheme();
    const neonAccent = currentTheme.accentClass.replace('text', 'border');
    
    const AnimatedTitle = () => (
        <h1 className={`text-6xl md:text-8xl font-black mb-6 text-current/90 tracking-tighter transition-colors duration-500`}>
            {data.title.split("").map((letter, idx) => (
                <span 
                    key={idx} 
                    className="inline-block transition-transform duration-200 hover:text-current hover:-translate-y-2 animate-fade-in-up"
                    style={{ 
                        animationDelay: `${idx * 0.05}s`
                    }}
                >
                    {letter === ' ' ? '\u00A0' : letter}
                </span>
            ))}
        </h1>
    );
    
    const ctaClasses = `
        border-2 
        bg-transparent 
        ${currentTheme.accentClass} 
        hover:${currentTheme.hoverBgClass} 
        hover:${currentTheme.hoverTextClass} 
        hover:shadow-xl
        transition-all duration-200 ease-out 
        hover:shadow-neomorph-inset-dark 
        hover:scale-[0.98]
    `; 

    return (
        <section 
            id={data.id} 
            className={`min-h-[60vh] flex flex-col justify-center items-start px-4 md:px-8 max-w-7xl mx-auto py-16 md:py-24 w-full relative z-10`}
        >
            
            {/* Conteneur pour le contenu textuel (assure qu'il reste au-dessus) */}
            <div className="relative z-10 w-full">
                {/* Titre avec animation des caractères */}
                <div className={`mb-8 ${isHero ? 'mt-16 md:mt-24' : ''}`}>
                    <AnimatedTitle data={data} />
                    
                    {/* H2 AVEC SCRAMBLED TEXT STABLE */}
                    <h2 
                        className={`text-2xl md:text-3xl font-mono mt-4 mb-6 border-b-2 ${neonAccent} pb-2 transition-colors duration-500 ${currentTheme.textClass} !font-normal`}
                    > 
                        {isHero && isLoaded ? ( 
                            <ScrambledText 
                                targetText={data.subtitle} 
                                isLoaded={isLoaded} 
                                scrambleDuration={800} 
                            />
                        ) : (
                            data.subtitle
                        )}
                    </h2>
                </div>
                
                {/* Corps du texte */}
                <div 
                    className={`text-lg leading-relaxed space-y-4 max-w-3xl ${currentTheme.subtleTextClass}`} 
                    dangerouslySetInnerHTML={{ __html: data.body }} 
                />
                
                {/* CTA */}
                {data.ctaText && (
                    <a 
                        href={data.ctaHref} 
                        className={`mt-10 px-6 py-3 font-bold text-lg transition-all duration-300 ${ctaClasses}`}
                    >
                        {data.ctaText}
                    </a>
                )}
            </div>
        </section>
    );
};

/* --- Composant ProjectsSection (Ajouté pour résoudre l'erreur) --- */
const ProjectsSection = () => {
    const { currentTheme } = useTheme();
    
    const majorProjects = [
        { id: 1, title: "Livano – Appli immobilière", techStack: ["React", "Node.js", "GraphQL", "TypeScript"], desc: "Plateforme web complète avec CRUD et recherche avancée. Conception UX/UI." },
        { id: 2, title: "YouChef – Gestion de recettes", techStack: ["React", "Express", "MongoDB", "TailwindCSS"], desc: "Application complète de gestion de recettes par utilisateur. Filtrage et recherche par catégorie." },
    ];

    const cardBg = currentTheme.cardBgClass;
    const shadowClass = currentTheme.shadowClass; 
    const tagBg = currentTheme.themeModeClass === 'dark' ? 'bg-gray-700/50' : 'bg-gray-300/50';
    const demoColor = currentTheme.accentClass;

    return (
        <section id="projects" className="min-h-[60vh] px-4 md:px-8 max-w-7xl mx-auto py-16 md:py-24 w-full">
             <h1 className="text-6xl md:text-8xl font-black mb-16 text-current/90 tracking-tighter">
                PROJETS
            </h1>
            <div className="grid md:grid-cols-2 gap-8">
                {majorProjects.map(p => (
                    <div 
                        key={p.id} 
                        className={`p-6 rounded-xl ${cardBg} ${shadowClass} transition-all duration-300 border border-current/10`}
                    >
                        {/* Titre et corps utilisent des classes de texte stables */}
                        <h3 className={`text-3xl font-extrabold mb-3 ${currentTheme.textClass}/90`}>{p.title}</h3>
                        <p className={`text-current/70 mb-4 ${currentTheme.subtleTextClass}`}>{p.desc}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {p.techStack.map(tech => (
                                <span key={tech} className={`text-xs font-semibold px-3 py-1 rounded-full ${tagBg} ${currentTheme.subtleTextClass}`}>
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <div className="flex mt-6 gap-4">
                            <button className={`text-sm font-semibold ${demoColor} hover:underline transition-colors`}>
                                Voir Démo
                            </button>
                            {/* Le bouton de droite utilise subtleTextClass pour être discret */}
                            <button className={`text-sm font-semibold ${currentTheme.subtleTextClass} hover:${currentTheme.textClass} transition-colors`}>
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
    const { themeMode, toggleTheme, currentTheme } = useTheme();
    const [isLoaded, setIsLoaded] = useState(false); 

    useEffect(() => {
        setIsLoaded(true);
    }, []);
    
    return (
        <div className={`relative min-h-screen`}>
            
            {/* 🚨 INTÉGRATION DU NOUVEAU COMPOSANT DE FOND */}
            <VideoBackground src={AbstractTexture} themeMode={themeMode} /> 

            <SimpleNavbar />
            
            <main className="relative z-10">
                <PortfolioSection data={dynamicSections[0]} isHero={true} isLoaded={isLoaded} />
                <ProjectsSection /> 
                <PortfolioSection data={dynamicSections[1]} isLoaded={isLoaded} />
                <PortfolioSection data={dynamicSections[2]} isLoaded={isLoaded} />
            </main>
            
            <SimpleFooter />
        </div>
    );
}