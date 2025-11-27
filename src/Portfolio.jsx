// C:\Users\Jeff\Desktop\PROJETS VS CODE\JAVASCRIPT\REACT\mon_portfolio\src\Portfolio.jsx
import React, { useState, useEffect } from "react";
import { useTheme } from "./theme/ThemeContext";

/* --- 0. DICTIONNAIRE DE CONTENU (FR / EN) --- */
const CONTENT = {
    fr: {
        nav: { projects: "Projets", expertise: "Expertise", contact: "Contact", mode: "Mode" },
        hero: {
            role: "Développeur React & UX — Montréal",
            title: "Je conçois des interfaces numériques",
            subtitle: "fiables, rapides et vivantes.",
            desc: "La technique ne doit pas être froide. Je traduis vos besoins business en applications web performantes qui ont du caractère et que vos utilisateurs aimeront utiliser.",
            ctaPrimary: "Voir mes réalisations",
            ctaSecondary: "Me contacter"
        },
        projects: {
            title: "Projets Sélectionnés",
            items: [
                { 
                    title: "Livano Immobilier", 
                    category: "Plateforme Web", 
                    desc: "Une expérience de recherche fluide. L'objectif : supprimer la friction technique pour laisser place à l'émotion de la découverte immobilière.",
                    stack: ["React", "Next.js", "Tailwind"]
                },
                { 
                    title: "YouChef App", 
                    category: "SaaS B2B", 
                    desc: "Tableau de bord culinaire. Une interface dense rendue digeste et apaisante pour une utilisation intensive en cuisine.",
                    stack: ["TypeScript", "Node.js", "Mongo"]
                }
            ],
            link: "Voir le projet"
        },
        contact: {
            title: "Parlons de votre projet",
            desc: "Un besoin spécifique ou une question technique ? Je suis toujours partant pour une discussion détendue et constructive.",
            cta: "Envoyer un email",
            sub: "Disponible pour freelance & contrats"
        },
        footer: "Fait à Montréal avec React & Tailwind."
    },
    en: {
        nav: { projects: "Projects", expertise: "Expertise", contact: "Contact", mode: "Mode" },
        hero: {
            role: "React Developer & UX — Montreal",
            title: "Crafting digital interfaces that are",
            subtitle: "reliable, fast, and alive.",
            desc: "Tech shouldn't feel cold. I translate your business needs into high-performance web apps that have character and that your users will genuinely enjoy.",
            ctaPrimary: "View Selected Work",
            ctaSecondary: "Get in Touch"
        },
        projects: {
            title: "Selected Works",
            items: [
                { 
                    title: "Livano Real Estate", 
                    category: "Web Platform", 
                    desc: "A fluid search experience. The goal: remove technical friction to make room for the emotion of finding a home.",
                    stack: ["React", "Next.js", "Tailwind"]
                },
                { 
                    title: "YouChef App", 
                    category: "B2B SaaS", 
                    desc: "Culinary dashboard. Making a data-dense interface feel digestible and calming for high-stress kitchen environments.",
                    stack: ["TypeScript", "Node.js", "Mongo"]
                }
            ],
            link: "View Case Study"
        },
        contact: {
            title: "Let's discuss your project",
            desc: "Have a specific need or a technical question? I'm always up for a relaxed and constructive chat.",
            cta: "Send an Email",
            sub: "Available for freelance & contracts"
        },
        footer: "Made in Montreal with React & Tailwind."
    }
};

/* --- 1. SYSTÈME DE DESIGN & ANIMATIONS --- */

// Import de FRAUNCES (Soft Serif) et DM SANS (Friendly Sans)
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;400;500;700&family=Fraunces:opsz,wght@9..144,300;400;500;600&display=swap');

  @keyframes crystallize {
    0% { opacity: 0; transform: translateY(20px); filter: blur(6px); border-radius: 30px; }
    100% { opacity: 1; transform: translateY(0); filter: blur(0px); border-radius: 12px; }
  }

  .animate-focus {
    animation: crystallize 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }
`;

// Raccourcis Typographiques (ADAPTÉS À FRAUNCES)
const TYPO = {
    // Fraunces est très expressive. On réduit un peu le letter-spacing (tracking-tight) pour faire bloc.
    Heading: "font-serif text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]", 
    
    // Pour les sous-titres, Fraunces en "Light" ou "Regular" est magnifique
    SubHeading: "font-serif text-2xl md:text-3xl font-normal leading-snug",
    
    // DM Sans est très lisible.
    Body: "font-sans text-lg md:text-xl leading-[1.6] opacity-80 font-normal",
    
    // Meta data un peu plus discret
    Meta: "font-sans text-xs md:text-sm uppercase tracking-widest opacity-60 font-bold",
    
    Action: "font-sans text-sm md:text-base font-bold border-b-2 border-current hover:text-blue-600 hover:border-blue-600 transition-colors pb-1"
};


/* --- 2. COMPOSANTS UTILITAIRES --- */

const FocusContainer = ({ children, delay = 0, className = "" }) => {
    const [start, setStart] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setStart(true), 100); 
        return () => clearTimeout(timer);
    }, []);

    return (
        <div 
            className={`${start ? 'animate-focus' : 'opacity-0'} ${className}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const CleanBackground = ({ themeMode }) => {
    // Fond : Dark Mode profond / Light Mode "Warm Paper" (plus chaud que le blanc pur)
    const bgClass = themeMode === 'dark' ? 'bg-[#121212]' : 'bg-[#FDFCF8]'; 
    return (
        <div className={`fixed inset-0 -z-50 transition-colors duration-700 ${bgClass}`}>
            <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }} 
            />
        </div>
    );
};


/* --- 3. COMPOSANTS D'INTERFACE --- */

const Navbar = ({ toggleTheme, lang, setLang, t }) => (
    <nav className="fixed top-0 w-full px-6 py-6 md:px-12 flex justify-between items-center z-50 bg-opacity-90 backdrop-blur-sm border-b border-current/5">
        {/* Logo Fraunces Italic : Donne une signature très personnelle */}
        <a href="#" className="font-serif text-2xl font-semibold italic tracking-tight hover:opacity-70 transition-opacity">
            Jeff Zara.
        </a>

        <div className="hidden md:flex gap-10 items-center">
            {/* Navigation sans-serif pour la clarté */}
            <a href="#projets" className={`${TYPO.Meta} hover:opacity-100 hover:text-blue-600 transition-colors`}>{t.nav.projects}</a>
            <a href="#expertise" className={`${TYPO.Meta} hover:opacity-100 hover:text-blue-600 transition-colors`}>{t.nav.expertise}</a>
            <a href="#contact" className={`${TYPO.Meta} hover:opacity-100 hover:text-blue-600 transition-colors`}>{t.nav.contact}</a>
        </div>

        <div className="flex items-center gap-3">
            <button 
                onClick={() => setLang(l => l === 'fr' ? 'en' : 'fr')}
                className="font-sans text-xs font-bold border border-current/20 px-4 py-2 rounded-full hover:bg-current hover:text-white dark:hover:text-black transition-all min-w-[3rem]"
            >
                {lang === 'fr' ? 'EN' : 'FR'}
            </button>

            <button 
                onClick={toggleTheme}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-current/20 hover:bg-current hover:text-white dark:hover:text-black transition-all"
                aria-label="Toggle Theme"
            >
                ☀
            </button>
        </div>
    </nav>
);

const HeroSection = ({ t }) => {
    return (
        <section className="min-h-[85vh] flex flex-col justify-center px-6 md:px-12 max-w-6xl mx-auto pt-20">
            <FocusContainer delay={100}>
                <span className={`${TYPO.Meta} text-blue-600 dark:text-blue-400 mb-6 block`}>
                    {t.hero.role}
                </span>
                
                <h1 className={`${TYPO.Heading} mb-8`}>
                    {t.hero.title}<br/> 
                    {/* L'italique de Fraunces est magnifique et moins rigide */}
                    <span className="opacity-70 italic font-light">{t.hero.subtitle}</span>
                </h1>
            </FocusContainer>
            
            <FocusContainer delay={300} className="max-w-2xl">
                <p className={`${TYPO.Body} mb-12`}>
                    {t.hero.desc}
                </p>
                
                <div className="flex flex-wrap gap-6">
                    <a 
                        href="#projets" 
                        className="bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-8 py-4 rounded-xl font-sans font-bold text-base hover:scale-[1.02] transition-transform shadow-xl hover:shadow-2xl"
                    >
                        {t.hero.ctaPrimary}
                    </a>
                    
                    <a 
                        href="#contact" 
                        className="px-8 py-4 rounded-xl font-sans font-bold text-base border border-current/20 hover:border-current hover:bg-current/5 transition-all"
                    >
                        {t.hero.ctaSecondary}
                    </a>
                </div>
            </FocusContainer>
        </section>
    );
};

const ProjectCard = ({ project, index, themeMode, t }) => {
    const cardBg = themeMode === 'dark' ? 'bg-[#1a1a1a]' : 'bg-white';
    
    return (
        <FocusContainer delay={index * 150} className={`group flex flex-col md:flex-row rounded-2xl overflow-hidden border border-current/5 shadow-sm hover:shadow-xl transition-all duration-500 ${cardBg}`}>
            
            <div className="w-full md:w-5/12 min-h-[280px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative overflow-hidden">
                {/* On utilise le chiffre en gros et en Fraunces Italic pour le style */}
                <div className="font-serif text-8xl opacity-10 italic font-black group-hover:scale-110 transition-transform duration-700">
                    {index + 1}
                </div>
                <span className="absolute top-6 left-6 bg-white dark:bg-black/80 backdrop-blur px-3 py-1.5 text-xs font-sans font-bold uppercase tracking-widest border border-current/10 rounded-full">
                    {project.category}
                </span>
            </div>

            <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col items-start justify-center">
                <h3 className={`${TYPO.SubHeading} mb-4 group-hover:text-blue-600 transition-colors`}>
                    {project.title}
                </h3>
                
                <p className={`${TYPO.Body} text-base mb-8`}>
                    {project.desc}
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                    {project.stack.map(tech => (
                        <span key={tech} className="text-xs font-sans font-medium opacity-60 border border-current/20 px-3 py-1.5 rounded-full">
                            {tech}
                        </span>
                    ))}
                </div>

                <a href="#" className={TYPO.Action}>
                    {t.projects.link} &rarr;
                </a>
            </div>
        </FocusContainer>
    );
};

const ProjectsSection = ({ themeMode, t }) => {
    return (
        <section id="projets" className="px-6 md:px-12 max-w-6xl mx-auto py-32">
            <div className="mb-16 border-b border-current/10 pb-6 flex justify-between items-end">
                <h2 className={TYPO.SubHeading}>{t.projects.title}</h2>
                {/* Petite touche : Date en serif italic */}
                <span className="font-serif italic text-lg opacity-60">2023 — 2025</span>
            </div>
            
            <div className="flex flex-col gap-16"> {/* Plus d'espace entre les cartes */}
                {t.projects.items.map((p, i) => (
                    <ProjectCard key={i} index={i} project={p} themeMode={themeMode} t={t} />
                ))}
            </div>
        </section>
    );
};

const ContactSection = ({ t }) => {
    return (
        <section id="contact" className="px-6 md:px-12 max-w-4xl mx-auto py-32 text-center bg-current/5 rounded-[2rem] mb-12 mx-6">
            <h2 className={`${TYPO.Heading} mb-8 text-4xl`}>{t.contact.title}</h2>
            <p className={`${TYPO.Body} mb-10 max-w-xl mx-auto`}>
                {t.contact.desc}
            </p>
            <a 
                href="mailto:zarajeanfabrice@gmail.com"
                className="inline-block bg-blue-600 text-white px-10 py-5 rounded-xl font-bold font-sans text-lg hover:bg-blue-700 transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-1 transform duration-300"
            >
                {t.contact.cta}
            </a>
            <p className={`${TYPO.Meta} mt-10 opacity-50`}>
                {t.contact.sub}
            </p>
        </section>
    );
};

const Footer = ({ t }) => (
    <footer className="py-10 text-center border-t border-current/5">
        <p className={TYPO.Meta}>
            © 2025 Jeff Zara — {t.footer}
        </p>
    </footer>
);

/* --- 4. ASSEMBLAGE FINAL --- */
export default function Portfolio() {
    const { themeMode, toggleTheme } = useTheme();
    const [lang, setLang] = useState('fr'); 

    const t = CONTENT[lang];
    
    const textColor = themeMode === 'dark' ? 'text-[#ededed]' : 'text-[#2a2a2a]';

    return (
        <div className={`relative min-h-screen font-['DM_Sans',sans-serif] selection:bg-blue-200 selection:text-blue-900 ${textColor}`}>
            
            <style>{styles}</style>
            
            {/* On force Fraunces pour les classes serif */}
            <style>{`.font-serif { font-family: 'Fraunces', serif; }`}</style>
            
            <CleanBackground themeMode={themeMode} />
            <Navbar toggleTheme={toggleTheme} lang={lang} setLang={setLang} t={t} />
            
            <main>
                <HeroSection t={t} />
                <ProjectsSection themeMode={themeMode} t={t} />
                <ContactSection t={t} />
            </main>
            
            <Footer t={t} />
        </div>
    );
}