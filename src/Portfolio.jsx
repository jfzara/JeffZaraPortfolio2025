// C:\Users\Jeff\Desktop\PROJETS VS CODE\JAVASCRIPT\REACT\mon_portfolio\src\Portfolio.jsx
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "./theme/ThemeContext";

/* --- 0. DATA --- */
const CONTENT = {
    fr: {
        nav: { projects: "Projets", expertise: "Expertise", contact: "Contact" },
        hero: {
            role: "Développeur React & UX — Montréal",
            desc: "La technique ne doit pas être froide. Je traduis vos besoins business en applications web performantes qui ont du caractère.",
            ctaPrimary: "Voir mes réalisations",
            ctaSecondary: "Me contacter"
        },
        projects: {
            title: "Projets Sélectionnés",
            items: [
                { 
                    title: "Livano Immobilier", 
                    category: "Plateforme Web", 
                    desc: "Expérience de recherche fluide. Suppression de la friction technique pour laisser place à l'émotion.",
                    stack: ["React", "Next.js"]
                },
                { 
                    title: "YouChef App", 
                    category: "SaaS B2B", 
                    desc: "Tableau de bord culinaire. Une interface dense rendue digeste pour une utilisation intensive.",
                    stack: ["TypeScript", "Mongo"]
                },
                { 
                    title: "Archi.Tech", 
                    category: "Design System", 
                    desc: "Bibliothèque de composants pour une agence d'architecture. Rigueur et flexibilité.",
                    stack: ["Storybook", "Figma"]
                }
            ],
            link: "Voir le projet"
        },
        contact: {
            title: "Parlons de votre projet",
            desc: "Un besoin spécifique ? Je suis toujours partant pour une discussion détendue.",
            cta: "Envoyer un email",
            sub: "Disponible pour freelance"
        },
        footer: "Montréal — 2025"
    },
    en: {
        nav: { projects: "Projects", expertise: "Expertise", contact: "Contact" },
        hero: {
            role: "React Developer & UX — Montreal",
            desc: "Tech shouldn't feel cold. I translate business needs into high-performance web apps with character.",
            ctaPrimary: "View Work",
            ctaSecondary: "Get in Touch"
        },
        projects: {
            title: "Selected Works",
            items: [
                { 
                    title: "Livano Real Estate", 
                    category: "Web Platform", 
                    desc: "Fluid search experience. Removing friction to make room for emotion.",
                    stack: ["React", "Next.js"]
                },
                { 
                    title: "YouChef App", 
                    category: "B2B SaaS", 
                    desc: "Culinary dashboard. Making data-dense interfaces feel digestible.",
                    stack: ["TypeScript", "Mongo"]
                },
                { 
                    title: "Archi.Tech", 
                    category: "Design System", 
                    desc: "Component library for an architecture firm. Rigor meets flexibility.",
                    stack: ["Storybook", "Figma"]
                }
            ],
            link: "View Case Study"
        },
        contact: {
            title: "Let's discuss",
            desc: "Have a specific need? I'm always up for a relaxed chat.",
            cta: "Send an Email",
            sub: "Available for freelance"
        },
        footer: "Montreal — 2025"
    }
};

/* --- 1. CSS & ANIMATIONS --- */

const styles = `
  /* Importation de Space Mono pour l'effet "Code Switch" */
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;400;500;700&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,300&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

  @keyframes float-up {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  @keyframes text-flow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .animate-appear {
    animation: float-up 1.0s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }

  .text-gradient-alive {
    background: linear-gradient(-45deg, #ea580c, #fdba74, #ea580c);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: text-flow 6s linear infinite;
  }
  
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const TYPO = {
    Heading: "font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1]", 
    SubHeading: "font-serif text-2xl md:text-3xl font-normal leading-tight",
    Body: "font-sans text-lg md:text-xl leading-[1.6] opacity-80 font-light",
    Meta: "font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-50 font-bold",
};


/* --- 2. COMPOSANTS INTERACTIFS --- */

// 2.1 CURSEUR REACTIF
const ReactiveCursor = () => {
    const cursorRef = useRef(null);
    const pos = useRef({ x: 0, y: 0 }); 
    const target = useRef({ x: 0, y: 0 }); 
    const velocity = useRef(0); 

    useEffect(() => {
        const handleMove = (e) => {
            target.current = { x: e.clientX, y: e.clientY };
        };

        const update = () => {
            const dx = target.current.x - pos.current.x;
            const dy = target.current.y - pos.current.y;
            pos.current.x += dx * 0.1;
            pos.current.y += dy * 0.1;

            const speed = Math.hypot(dx, dy);
            velocity.current = velocity.current * 0.9 + speed * 0.1;
            
            const intensity = Math.min(Math.max(velocity.current / 40, 0), 1); 
            const scale = 1 + intensity * 1.5; 
            const opacity = 0.15 + intensity * 0.4; 

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) scale(${scale})`;
                cursorRef.current.style.opacity = opacity;
            }
            requestAnimationFrame(update);
        };

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("touchmove", (e) => handleMove(e.touches[0]));
        
        update();
        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("touchmove", handleMove);
        };
    }, []);

    return (
        <div 
            ref={cursorRef}
            className="fixed top-0 left-0 w-6 h-6 -ml-3 -mt-3 rounded-full bg-orange-500 blur-xl pointer-events-none z-50 mix-blend-screen transition-opacity duration-100"
            style={{ opacity: 0.15 }} 
        />
    );
};

// 2.2 BOUTON OUVERT (Brackets)
const OpenButton = ({ children, href, className = "" }) => {
    return (
        <a 
            href={href}
            className={`relative group inline-block px-8 py-4 font-sans font-bold text-sm tracking-widest uppercase transition-all duration-500 ${className}`}
        >
            <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-current transition-all duration-300 group-hover:w-full group-hover:h-full opacity-60 group-hover:opacity-100 group-hover:border-orange-500" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-current transition-all duration-300 group-hover:w-full group-hover:h-full opacity-60 group-hover:opacity-100 group-hover:border-orange-500" />
            <span className="relative z-10 block group-hover:translate-x-1 transition-transform duration-300">
                {children}
            </span>
        </a>
    );
};

// 2.3 FADE IN
const FadeIn = ({ children, delay = 0 }) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);
    return <div className={`${visible ? 'animate-appear' : 'opacity-0'}`}>{children}</div>;
};

// 2.4 LETTRE VIVANTE (FIXED: PLUS DE ZOOM)
const AliveLetter = ({ char }) => {
    // Palette "Bijou"
    const colors = [
        'hover:text-[#db2777]', // Pink
        'hover:text-[#06b6d4]', // Cyan
        'hover:text-[#84cc16]', // Lime
        'hover:text-[#8b5cf6]', // Violet
        'hover:text-[#f59e0b]', // Amber
    ];
    
    const randomColorClass = useRef(colors[Math.floor(Math.random() * colors.length)]).current;

    return (
        <span 
            className={`
                inline-block cursor-default transition-all duration-300 ease-out origin-center
                
                /* ETAT DE BASE */
                hover:z-10 relative
                
                /* AU SURVOL (SANS GROSSISSEMENT) */
                /* On garde juste le mouvement vertical, la rotation et le changement de style */
                hover:-translate-y-1        /* Lévitation subtile */
                hover:font-mono             /* Code Switch */
                hover:rotate-1              /* Micro rotation */
                hover:font-bold
                ${randomColorClass}         /* Couleur */
            `}
        >
            {char}
        </span>
    );
};

// 2.5 TEXTE INTERACTIF
const InteractiveText = ({ text }) => {
    const words = text.split(" ");
    return (
        <span className="inline-block leading-tight">
            {words.map((word, wIndex) => (
                <span key={wIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
                    {word.split("").map((char, cIndex) => (
                        <AliveLetter key={cIndex} char={char} />
                    ))}
                </span>
            ))}
        </span>
    );
};

// 2.6 FOND ATMOSPHÉRIQUE
const Background = ({ themeMode }) => {
    const bgClass = themeMode === 'dark' ? 'bg-[#050505]' : 'bg-[#F0EEE6]'; 
    return (
        <div className={`fixed inset-0 -z-50 transition-colors duration-700 ${bgClass}`}>
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }} 
            />
        </div>
    );
};


/* --- 3. LAYOUT & SECTIONS --- */

const Navbar = ({ toggleTheme, lang, setLang, t }) => (
    <nav className="fixed top-0 w-full px-6 py-8 flex justify-between items-start z-40 mix-blend-difference text-[#999]">
        <a href="#" className="font-serif text-2xl italic font-bold text-white/90 hover:opacity-70 transition-opacity">
            J.Zara
        </a>
        <div className="flex flex-col items-end gap-2">
            <button onClick={() => setLang(l => l === 'fr' ? 'en' : 'fr')} className="text-xs font-mono font-bold hover:text-white transition-colors">
                {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <button onClick={toggleTheme} className="text-xs font-mono font-bold hover:text-white transition-colors">
                ●
            </button>
        </div>
    </nav>
);

const Hero = ({ t, lang }) => {
    const titleFr = "Je conçois des interfaces numériques";
    const subStartFr = "fiables, rapides et";
    const subHighFr = "vivantes.";
    
    const titleEn = "Crafting digital interfaces that are";
    const subStartEn = "reliable, fast, and";
    const subHighEn = "alive.";

    const displayTitle = lang === 'fr' ? titleFr : titleEn;
    const displaySubStart = lang === 'fr' ? subStartFr : subStartEn;
    const displaySubHigh = lang === 'fr' ? subHighFr : subHighEn;

    return (
        <section className="min-h-[85vh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-20">
            <FadeIn delay={100}>
                <span className={`${TYPO.Meta} text-orange-600 block mb-8`}>{t.hero.role}</span>
                
                <h1 className={`${TYPO.Heading} mb-12 max-w-4xl`}>
                    <InteractiveText text={displayTitle} /> <br/>
                    
                    <span className="opacity-60 italic font-light block mt-4">
                         {displaySubStart} {" "}
                         <span className="not-italic opacity-100">
                             <InteractiveText text={displaySubHigh} />
                         </span>
                    </span>
                </h1>
            </FadeIn>
            
            <FadeIn delay={300}>
                <div className="flex flex-wrap gap-8 items-center mt-12">
                    <OpenButton href="#projets">{t.hero.ctaPrimary}</OpenButton>
                    <a href="#contact" className="text-sm font-bold border-b border-current/20 hover:border-orange-500 hover:text-orange-600 transition-colors pb-1">
                        {t.hero.ctaSecondary}
                    </a>
                </div>
            </FadeIn>
        </section>
    );
};

const ProjectCard = ({ project, index, t }) => {
    const offsetClass = index % 2 === 0 ? 'md:translate-y-12' : 'md:-translate-y-12';
    
    return (
        <div className={`
            min-w-[85vw] md:min-w-0 flex-shrink-0 md:flex-shrink 
            group relative p-6 md:p-0 
            transition-all duration-700 ${offsetClass}
        `}>
            <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-gray-200 dark:bg-[#111] mb-6 rounded-sm">
                <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay z-10" />
                <div className="w-full h-full flex items-center justify-center font-serif text-9xl opacity-[0.05] italic group-hover:scale-110 group-hover:rotate-2 transition-transform duration-700 ease-out">
                    {index + 1}
                </div>
                <span className="absolute top-4 left-4 text-[10px] font-mono border border-current/20 px-2 py-1 rounded-full backdrop-blur-sm">
                    {project.category}
                </span>
            </div>

            <div className="border-l border-current/20 pl-4 group-hover:border-orange-500 transition-colors duration-300">
                <h3 className="font-serif text-3xl mb-2 group-hover:translate-x-2 transition-transform duration-300">
                    <InteractiveText text={project.title} />
                </h3>
                
                <p className="text-sm opacity-60 mb-4 max-w-xs line-clamp-2">
                    {project.desc}
                </p>
                <div className="flex gap-2 text-[10px] font-mono uppercase opacity-40">
                    {project.stack.map(s => <span key={s}>{s}</span>)}
                </div>
            </div>
        </div>
    );
};

const Projects = ({ t }) => (
    <section id="projets" className="py-32 w-full overflow-hidden">
        <div className="px-6 md:px-12 mb-20 flex items-end justify-between max-w-7xl mx-auto">
            <h2 className={TYPO.SubHeading}>
                {t.projects.title}
            </h2>
            <span className="hidden md:inline-block text-xs font-mono opacity-40">Scroll →</span>
        </div>

        <div className="
            flex gap-6 overflow-x-auto snap-x px-6 pb-12 no-scrollbar
            md:grid md:grid-cols-3 md:gap-12 md:overflow-visible md:px-12 md:max-w-7xl md:mx-auto
        ">
            {t.projects.items.map((p, i) => (
                <ProjectCard key={i} index={i} project={p} t={t} />
            ))}
        </div>
    </section>
);

const Contact = ({ t }) => (
    <section id="contact" className="py-40 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <div className="inline-block w-px h-24 bg-gradient-to-b from-transparent via-orange-500 to-transparent mb-8"></div>
        <h2 className={`${TYPO.Heading} mb-12`}>
            <InteractiveText text={t.contact.title} />
        </h2>
        <OpenButton href="mailto:zarajeanfabrice@gmail.com">
            {t.contact.cta}
        </OpenButton>
    </section>
);

const Footer = ({ t }) => (
    <footer className="py-8 text-center opacity-30 text-[10px] font-mono uppercase tracking-widest border-t border-current/5">
        {t.footer}
    </footer>
);

export default function Portfolio() {
    const { themeMode, toggleTheme } = useTheme();
    const [lang, setLang] = useState('fr');
    const t = CONTENT[lang];
    const textColor = themeMode === 'dark' ? 'text-[#e5e5e5]' : 'text-[#1a1a1a]';

    return (
        <div className={`relative min-h-screen font-sans selection:bg-orange-500 selection:text-white ${textColor}`}>
            <style>{styles}</style>
            
            <ReactiveCursor />
            <Background themeMode={themeMode} />
            <Navbar toggleTheme={toggleTheme} lang={lang} setLang={setLang} t={t} />
            
            <main>
                <Hero t={t} lang={lang} />
                <Projects t={t} />
                <Contact t={t} />
            </main>
            
            <Footer t={t} />
        </div>
    );
}