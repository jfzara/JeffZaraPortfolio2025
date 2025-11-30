import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "./theme/ThemeContext";
// 👇 IMPORT POUR LE SEO
import { Helmet, HelmetProvider } from 'react-helmet-async';

// --- IMPORT DES VIDÉOS ---
import livanoVideo from "./assets/projects/major/livano/Livano_video.mp4"; 
import youchefVideo from "./assets/projects/major/youchef/Youchef_video.mp4"; 

/* --- 0. DATA (VERSION FINALE - CODE LIMPIDE) --- */
const CONTENT = {
    fr: {
        nav: { projects: "Projets", expertise: "Expertise", contact: "Contact" },
        hero: {
            role: "Développeur Full-Stack — Montréal", 
            desc: "J’unis la rigueur du développement à une véritable sensibilité esthétique pour saisir vos besoins et ceux de vos utilisateurs, puis les traduire en interfaces harmonieuses, actuelles et profondément fidèles à votre image. Je crée des solutions Full-Stack (MERN/MVC) robustes et durables.",
            ctaPrimary: "Voir mes réalisations",
            ctaSecondary: "Me contacter",
            title: "Code Limpide.", 
            subtitle_start: "Conçu pour",
            subtitle_highlight: "l'impact."
        },
        projects: {
            title: "Projets Sélectionnés",
            items: [
                { 
                    title: "Livano", 
                    category: "Projet de Stage", 
                    desc: "Projet de stage : refonte complète du site vitrine avec un focus sur la performance. J'ai obtenu des scores significatifs : Accessibilité 95% et SEO 100% (Lighthouse). Stack: Astro, React, Tailwind CSS.",
                    stack: ["Astro", "React", "Tailwind CSS"], 
                    video: livanoVideo,
                    links: {
                        github: "https://github.com/jfzara/LivanoWebsite",
                        live: "https://livanoagency.com/fr"
                    }
                },
                { 
                    title: "YouChef App", 
                    category: "Projet Personnel CRUD", 
                    desc: "Plateforme CRUD (MERN) pour une banque de recettes collaborative. Le défi majeur fut la fluidité : j'ai implémenté des UI Skeletons et utilisé Framer Motion pour un design 'quirky' et moderne.",
                    stack: ["MERN Stack", "Mongoose", "Framer Motion"], 
                    video: youchefVideo,
                    links: {
                        github: "https://github.com/jfzara/YouChef",
                        live: "https://youchefjfzara.vercel.app/"
                    }
                },
            ],
            link: "Voir le projet"
        },
        contact: {
            title: "Construisons quelque chose de nouveau!", 
            desc: "Je cherche un rôle où ma proactivité et ma volonté d'apprendre peuvent rapidement faire la différence. Mon engagement est total, ma curiosité, permanente.",
            cta: "Envoyer un email",
            sub: "Disponible pour freelance & contrats",
            linkedinText: "Voir mon profil LinkedIn",
            linkedinURL: "https://www.linkedin.com/in/jeffzara-developpeur-react-node-montreal/"
        },
        footer: "Montréal — 2025"
    },
    en: {
        nav: { projects: "Projects", expertise: "Expertise", contact: "Contact" },
        hero: {
            role: "Full-Stack Developer — Montreal",
            desc: "I unite development rigor with a true aesthetic sensibility to grasp your needs and those of your users, then translate them into harmonious, current interfaces. I create robust and durable Full-Stack (MERN/MVC) solutions, designed to offer refined, clear, and welcoming experiences.",
            ctaPrimary: "View My Projects",
            ctaSecondary: "Contact Me",
            title: "Clean Code.",
            subtitle_start: "Designed for",
            subtitle_highlight: "Impact."
        },
        projects: {
            title: "Selected Works",
            items: [
                { 
                    title: "Livano", 
                    category: "Internship Project", 
                    desc: "Internship project: full redesign with a focus on performance. Achieved strong Lighthouse scores: Accessibility 95% and SEO 100%. Stack: Astro, React, Tailwind CSS.",
                    stack: ["Astro", "React", "Tailwind CSS"], 
                    video: livanoVideo,
                    links: {
                        github: "https://github.com/jfzara/LivanoWebsite",
                        live: "https://livanoagency.com/fr"
                    }
                },
                { 
                    title: "YouChef App", 
                    category: "Personal CRUD Project", 
                    desc: "MERN CRUD platform for a collaborative recipe bank. Key challenge was fluidity: implemented UI Skeletons and used Framer Motion for a 'quirky' and modern design.",
                    stack: ["MERN Stack", "Mongoose", "Framer Motion"], 
                    video: youchefVideo,
                    links: {
                        github: "https://github.com/jfzara/YouChef",
                        live: "https://youchefjfzara.vercel.app/"
                    }
                },
            ],
            link: "View Case Study"
        },
        contact: {
            title: "Let's build something new!", 
            desc: "I seek a role where my proactivity and hunger for learning can quickly make a difference. My commitment is absolute, and my curiosity, permanent.",
            cta: "Send an Email",
            sub: "Available for freelance & contracts",
            linkedinText: "View my LinkedIn profile",
            linkedinURL: "https://www.linkedin.com/in/jeffzara-developpeur-react-node-montreal/"
        },
        footer: "Montreal — 2025"
    }
};

/* --- 1. CSS & ANIMATIONS (INCHANGÉ) --- */
const styles = `
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
    Heading: "font-serif text-3xl md:text-5xl lg:text-6xl font-normal md:font-medium tracking-tight leading-[1.1]", 
    SubHeading: "font-serif text-2xl md:text-3xl font-normal leading-tight",
    Body: "font-sans text-base md:text-xl leading-[1.6] opacity-80 font-light", 
    Meta: "font-sans text-[10px] md:text-sm uppercase tracking-[0.2em] opacity-50 font-bold", 
};


/* --- 2. COMPOSANTS INTERACTIFS ACCESSIBLES --- */

const ReactiveCursor = () => {
    const cursorRef = useRef(null);
    const pos = useRef({ x: 0, y: 0 }); 
    const target = useRef({ x: 0, y: 0 }); 
    const velocity = useRef(0); 

    useEffect(() => {
        // A11Y: Désactiver si l'utilisateur demande "Mouvements Réduits"
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mediaQuery.matches) return;

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

    // A11Y: aria-hidden="true" car c'est purement décoratif
    return (
        <div 
            ref={cursorRef}
            aria-hidden="true"
            className="fixed top-0 left-0 w-6 h-6 -ml-3 -mt-3 rounded-full bg-orange-500 blur-xl pointer-events-none z-50 mix-blend-screen transition-opacity duration-100 hidden md:block"
            style={{ opacity: 0.15 }} 
        />
    );
};

const OpenButton = ({ children, href, className = "" }) => {
    return (
        <a 
            href={href}
            target="_blank" 
            rel="noopener noreferrer"
            className={`relative group inline-block px-8 py-4 text-sm md:px-10 md:py-5 md:text-base font-sans font-bold tracking-widest uppercase transition-all duration-300 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-orange-500 outline-none ${className}`}
        >
            <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-current transition-all duration-300 group-hover:w-full group-hover:h-full opacity-60 group-hover:opacity-100 group-hover:border-orange-500" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-current transition-all duration-300 group-hover:w-full group-hover:h-full opacity-60 group-hover:opacity-100 group-hover:border-orange-500" />
            <span className="relative z-10 block group-hover:translate-x-1 transition-transform duration-300">
                {children}
            </span>
        </a>
    );
};

const FadeIn = ({ children, delay = 0 }) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);
    return <div className={`${visible ? 'animate-appear' : 'opacity-0'}`}>{children}</div>;
};

// Composant Helper pour les lettres animées
const AliveLetter = ({ char, delay = 0 }) => {
    const [isWaveActive, setWaveActive] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    
    // Pour A11Y: réduire animations si demandé
    const [reduceMotion, setReduceMotion] = useState(false);

    const colors = [
        'text-[#db2777]', 'text-[#06b6d4]', 'text-[#84cc16]', 'text-[#8b5cf6]', 'text-[#f59e0b]', 
    ];
    const randomColorClass = useRef(colors[Math.floor(Math.random() * colors.length)]).current;

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduceMotion(mediaQuery.matches);

        if (mediaQuery.matches) return;

        const startTimer = setTimeout(() => {
            setWaveActive(true);
            const endTimer = setTimeout(() => setWaveActive(false), 400); 
            return () => clearTimeout(endTimer);
        }, 800 + delay * 50); 

        return () => clearTimeout(startTimer);
    }, [delay]);

    const isActive = (isWaveActive || isHovered) && !reduceMotion;

    return (
        <span 
            className="relative inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-hidden="true" // A11Y: Caché aux lecteurs d'écran (géré par le parent)
        >
            <span className="opacity-0 pointer-events-none block">
                {char === " " ? "\u00A0" : char}
            </span>
            <span 
                className={`
                    absolute inset-0 flex items-center justify-center
                    transition-all duration-300 ease-out 
                    pointer-events-none whitespace-nowrap
                    ${isActive ? `-translate-y-2 font-mono rotate-3 font-bold scale-110 ${randomColorClass} z-10` : ''}
                `}
            >
                {char === " " ? "\u00A0" : char}
            </span>
        </span>
    );
};


// A11Y FIX: Le texte interactif est maintenant accessible aux lecteurs d'écran
const InteractiveText = ({ text }) => {
    let charGlobalIndex = 0;
    const words = text.split(" ");
    
    return (
        // A11Y: Le label lit tout le texte d'un coup
        <span className="inline-block leading-tight" aria-label={text} role="text">
            {words.map((word, wIndex) => (
                <span key={wIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
                    {word.split("").map((char, cIndex) => {
                        const currentDelay = charGlobalIndex;
                        charGlobalIndex++;
                        return <AliveLetter key={cIndex} char={char} delay={currentDelay} />;
                    })}
                </span>
            ))}
        </span>
    );
};

const Background = ({ themeMode }) => {
    const bgClass = themeMode === 'dark' ? 'bg-[#050505]' : 'bg-[#F0EEE6]'; 
    return (
        <div className={`fixed inset-0 -z-50 transition-colors duration-700 ${bgClass}`} aria-hidden="true">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }} 
            />
        </div>
    );
};


/* --- 3. SECTIONS VUE PRINCIPALE --- */

const Navbar = ({ toggleTheme, lang, setLang, t, themeMode }) => { 
    const defaultColorClass = themeMode === 'dark' ? 'text-[#999]' : 'text-[#333]';
    const hoverColorClass = themeMode === 'light' ? 'hover:text-orange-600' : 'hover:text-white';

    return (
        <nav className={`fixed top-0 w-full px-6 py-8 flex justify-between items-start z-40 ${defaultColorClass} backdrop-blur-sm bg-black/5 dark:bg-white/5 md:bg-transparent`}> 
            <a href="#" className="font-serif text-2xl italic font-bold hover:opacity-70 transition-opacity relative z-20 focus-visible:ring-2 focus-visible:ring-orange-500 outline-none rounded-sm"> 
                Jeff Zara
            </a>
            <div className="flex flex-col items-end gap-2 relative z-20"> 
                <button 
                    onClick={() => setLang(l => l === 'fr' ? 'en' : 'fr')} 
                    aria-label={lang === 'fr' ? "Switch to English" : "Passer en Français"}
                    className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-xs md:text-sm font-mono font-bold ${hoverColorClass} transition-colors focus-visible:ring-2 focus-visible:ring-orange-500 outline-none rounded-full`}
                >
                    {lang === 'fr' ? 'EN' : 'FR'}
                </button>
                <button 
                    onClick={toggleTheme} 
                    aria-label={themeMode === 'light' ? "Activer le mode sombre" : "Activer le mode clair"}
                    className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-xs md:text-sm font-mono font-bold ${hoverColorClass} transition-colors focus-visible:ring-2 focus-visible:ring-orange-500 outline-none rounded-full`}
                >
                    ●
                </button>
            </div>
        </nav>
    );
};

const HeroSection = ({ t, lang }) => {
    const displayTitle = t.hero.title;
    const displaySubStart = t.hero.subtitle_start;
    const displaySubHighlight = t.hero.subtitle_highlight;

    return (
        <section className="min-h-[85vh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-32 md:pt-48"> 
            <FadeIn delay={100}>
                <span className={`${TYPO.Meta} text-orange-600 block mb-8`}>{t.hero.role}</span>
                
                <h1 className={`${TYPO.Heading} mb-12 max-w-4xl`}>
                    <InteractiveText text={displayTitle} /> <br/>
                    <span className="opacity-60 italic font-light block mt-4">
                          {displaySubStart} {" "}
                          <span className="not-italic opacity-100 text-neon-text-custom">
                             <InteractiveText text={displaySubHighlight} />
                          </span>
                    </span>
                </h1>
            </FadeIn>
            
            <FadeIn delay={300}>
                <p className={`${TYPO.Body} mb-8 max-w-2xl`}>
                    {t.hero.desc}
                </p>
                <div className="flex flex-wrap gap-8 items-center mt-8">
                    <OpenButton href="#projets">{t.hero.ctaPrimary}</OpenButton>
                    <a href="#contact" className="text-sm md:text-base font-bold border-b border-current/20 hover:border-orange-500 hover:text-orange-600 transition-colors pb-1 focus-visible:ring-2 focus-visible:ring-orange-500 outline-none">
                        {t.hero.ctaSecondary}
                    </a>
                </div>
            </FadeIn>
        </section>
    );
};

// A11Y FIX: ProjectCard est maintenant focusable et activable au clavier
const ProjectCard = ({ project, index, t, onSelectProject }) => { 
    const offsetClass = index % 2 === 0 ? 'md:translate-y-12' : 'md:-translate-y-12';
    
    const handleClick = () => {
        onSelectProject(project);
    };

    // Gestion du clavier (Entrée ou Espace)
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    return (
        <div 
            role="button"
            tabIndex={0} // Rend l'élément focusable
            onKeyDown={handleKeyDown}
            aria-label={`Voir les détails du projet ${project.title}`}
            className={`
                min-w-[85vw] md:min-w-0 flex-shrink-0 md:flex-shrink 
                group relative p-6 md:p-0 cursor-pointer
                transition-all duration-700 ${offsetClass}
                focus-visible:ring-4 focus-visible:ring-orange-500 focus-visible:ring-offset-4 outline-none rounded-md
            `}
            onClick={handleClick}
        >
            <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-gray-200 dark:bg-[#111] mb-6 rounded-sm shadow-md">
                
                {project.video ? (
                    <>
                        <video 
                            src={project.video}
                            title={`Aperçu vidéo du projet ${project.title}`}
                            aria-label={`Aperçu vidéo du projet ${project.title}`}
                            autoPlay 
                            muted 
                            loop 
                            playsInline 
                            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-orange-900/10 mix-blend-overlay pointer-events-none" />
                    </>
                ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-[#111] flex items-center justify-center font-serif text-9xl opacity-[0.05] italic group-hover:scale-110 group-hover:rotate-2 transition-transform duration-700 ease-out">
                        {index + 1}
                    </div>
                )}

                <span className="absolute top-4 left-4 text-[10px] md:text-xs font-mono font-bold bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-current/10 z-20 shadow-sm">
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

const ProjectsSection = ({ t, onSelectProject }) => ( 
    <section id="projets" className="py-32 w-full overflow-hidden">
        <div className="px-6 md:px-12 mb-20 flex items-end justify-between max-w-7xl mx-auto">
            <h2 className={TYPO.SubHeading}>
                {t.projects.title}
            </h2>
            <span className="text-xs font-mono opacity-60 font-bold" aria-hidden="true">
                <span className="md:hidden">Swipe →</span>
                <span className="hidden md:inline-block">Scroll →</span>
            </span>
        </div>

        <div className="
            flex gap-6 overflow-x-auto snap-x px-6 pb-12 no-scrollbar
            md:grid md:grid-cols-2 md:gap-12 md:overflow-visible md:px-12 md:max-w-7xl md:mx-auto
        ">
            {t.projects.items.map((p, i) => (
                <ProjectCard key={i} index={i} project={p} t={t} onSelectProject={onSelectProject} />
            ))}
        </div>
    </section>
);

const ContactSection = ({ t }) => (
    <section id="contact" className="pt-8 pb-24 md:pt-24 md:pb-40 px-6 md:px-12 max-w-4xl mx-auto text-center"> 
        <div className="inline-block w-px h-24 bg-gradient-to-b from-transparent via-orange-500 to-transparent mb-8" aria-hidden="true"></div>
        <h2 className={`${TYPO.Heading} mb-12`}>
            <InteractiveText text={t.contact.title} />
        </h2>
        
        <OpenButton href="mailto:zarajeanfabrice@gmail.com">
            {t.contact.cta}
        </OpenButton>

        {t.contact.linkedinURL && (
            <a 
                href={t.contact.linkedinURL}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-6 text-sm md:text-base font-bold border-b border-current/20 hover:border-orange-500 hover:text-orange-600 transition-colors pb-1 mx-auto w-fit focus-visible:ring-2 focus-visible:ring-orange-500 outline-none"
            >
                {t.contact.linkedinText}
            </a>
        )}
        
        <p className={`${TYPO.Meta} mt-10 opacity-50`}>
            {t.contact.sub}
        </p>
    </section>
);

const Footer = ({ t }) => (
    <footer className="py-8 text-center opacity-30 text-xs font-mono uppercase tracking-widest border-t border-current/5"> 
        {t.footer}
    </footer>
);


/* --- 4. COMPOSANT VUE DÉTAILLÉE --- */

const CaseStudy = ({ project, onBack, t }) => {
    
    // Auto-focus sur le bouton retour quand la vue s'ouvre pour l'accessibilité
    const backButtonRef = useRef(null);
    useEffect(() => {
        if (backButtonRef.current) {
            backButtonRef.current.focus();
        }
    }, []);

    const getTechHighlights = (title) => {
        if (title.includes('Livano')) {
            return [
                "Accessibilité (95% Lighthouse) et SEO (100%) : Maîtrise des standards",
                "Stack moderne : Astro (performance) et Tailwind CSS (rapidité/flexibilité)",
                "Intégration de services tiers (Sentry, Resend)",
                "Collaboration Agile (Kanban) en environnement de stage."
            ];
        }
        if (title.includes('YouChef')) {
            return [
                "Full Stack MERN : Maîtrise complète du cycle CRUD avec Mongoose",
                "Performance perçue : Implémentation des Skeletons UI pour l'UX",
                "Design 'quirky' : Utilisation de Framer Motion pour un UX vivant",
                "Sécurité : API REST sécurisée par JWT et hébergement sur Render."
            ];
        }
        return ["Défis non listés."];
    };

    return (
        <section className="min-h-screen px-6 md:px-12 max-w-6xl mx-auto py-24">
            <button 
                ref={backButtonRef}
                onClick={onBack} 
                className="flex items-center gap-2 mb-16 text-sm opacity-60 hover:opacity-100 transition-opacity focus-visible:ring-2 focus-visible:ring-orange-500 outline-none rounded-sm p-2"
                aria-label="Retour à la liste des projets"
            >
                ← {t.projects.title}
            </button>
            
            {/* --- SECTION 1: TITRE & VISUEL --- */}
            <div className="mb-16">
                <p className={`${TYPO.Meta} text-orange-600 mb-2`}>{project.category}</p>
                <h2 className={`${TYPO.Heading} text-5xl`}>{project.title}</h2>
            </div>

            {/* Visual */}
            <div className="relative aspect-video w-full mb-16 rounded-md shadow-2xl overflow-hidden">
                {project.video ? (
                    <video 
                        src={project.video}
                        title={`Démonstration détaillée du projet ${project.title}`}
                        aria-label={`Démonstration détaillée du projet ${project.title}`}
                        autoPlay 
                        muted 
                        loop 
                        playsInline 
                        className="w-full h-full object-cover opacity-90"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-[#111] flex items-center justify-center text-4xl opacity-10 font-serif italic">
                        {project.title}
                    </div>
                )}
            </div>

            {/* --- SECTION 2: RÉSUMÉ & CHIFFRES --- */}
            <div className="md:grid md:grid-cols-2 md:gap-12 mb-20">
                <div>
                    <h3 className="font-serif text-2xl mb-4">Contexte & Mission</h3>
                    <p className={`${TYPO.Body} text-base`}>{project.desc}</p>
                </div>

                <div className="mt-8 md:mt-0 border-l border-current/10 md:pl-8">
                    <h3 className="font-serif text-2xl mb-4">Résultats Clés</h3>
                    <ul className={`${TYPO.Body} text-sm space-y-2`}>
                        {project.title.includes('Livano') && (
                            <>
                                <li className="font-bold text-orange-600">Accessibilité : 95% (Lighthouse)</li>
                                <li className="font-bold text-orange-600">SEO : 100% (Lighthouse)</li>
                                <li>Stack : Astro, React, Tailwind CSS.</li>
                            </>
                        )}
                        {project.title.includes('YouChef') && (
                            <>
                                <li className="font-bold">Défis Résolus : Lenteur perçue des images</li>
                                <li>Solution : Implémentation de Skeletons UI et Framer Motion</li>
                                <li>Stack : Full MERN (Mongoose, Express, React, Node).</li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            {/* --- SECTION 3: DÉFIS TECHNIQUES --- */}
            <div className="mb-20">
                <h3 className="font-serif text-2xl mb-6">Défis Techniques & Compétences</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc list-inside">
                    {getTechHighlights(project.title).map((item, i) => (
                        <li key={i} className={`${TYPO.Body} text-base opacity-90 font-mono text-sm border-b border-current/5 pb-2`}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>


            {/* --- SECTION 4: ACTIONS --- */}
            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                <OpenButton href={project.links.live}>
                    Voir le site →
                </OpenButton>
                <OpenButton href={project.links.github}>
                    Code source (GitHub)
                </OpenButton>
            </div>
            
            <p className="mt-16 text-center opacity-40 text-sm">{project.stack.join(' · ')}</p>

        </section>
    );
};


/* --- 5. ASSEMBLAGE FINAL --- */
export default function Portfolio() {
    const { themeMode, toggleTheme } = useTheme();
    const [lang, setLang] = useState('fr');
    const [selectedProject, setSelectedProject] = useState(null); 
    
    const t = CONTENT[lang];
    const textColor = themeMode === 'dark' ? 'text-[#e5e5e5]' : 'text-[#1a1a1a]';

    const getSeoMetadata = () => {
        if (selectedProject) {
            return {
                title: `${selectedProject.title} | Jeff Zara`,
                desc: lang === 'fr' 
                    ? `Étude de cas du projet ${selectedProject.title}. Technologies: ${selectedProject.stack.join(', ')}.` 
                    : `Case study of project ${selectedProject.title}. Tech Stack: ${selectedProject.stack.join(', ')}.`
            };
        }
        return {
            title: lang === 'fr' 
                ? "Jeff Zara | Développeur React & Node.js Montréal" 
                : "Jeff Zara | React & Node.js Developer Montreal",
            desc: lang === 'fr'
                ? "Portfolio de Jeff Zara, développeur Web Full-Stack (MERN) basé à Montréal. Expert en interfaces React, UI/UX et code propre."
                : "Portfolio of Jeff Zara, Full-Stack Web Developer (MERN) based in Montreal. Expert in React interfaces, UI/UX and clean code."
        };
    };

    const seo = getSeoMetadata();

    const renderContent = () => {
        if (selectedProject) {
            return <CaseStudy project={selectedProject} onBack={() => setSelectedProject(null)} t={t} />;
        }

        return (
            <>
                <HeroSection t={t} lang={lang} />
                <ProjectsSection t={t} onSelectProject={setSelectedProject} /> 
                <ContactSection t={t} />
                <Footer t={t} />
            </>
        );
    };

return (
<HelmetProvider>

  {/* 1. BALISES HEAD (Inclus le script GTM pour le chargement principal) */}
  <Helmet>
    <html lang={lang} />

    {/* GTM FRAGMENT HEAD */}
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-M8R4TLLF');`,
      }}
    />

    {/* METADATA SEO/A11Y */}
    <title>{seo.title}</title>
    <meta name="description" content={seo.desc} />
    <meta property="og:title" content={seo.title} />
    <meta property="og:description" content={seo.desc} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://jeff-zara-portfolio2025.vercel.app/" />
    <meta property="og:image" content="https://jeff-zara-portfolio2025.vercel.app/og-image.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="https://jeff-zara-portfolio2025.vercel.app/og-image.jpg" />
    <meta
      name="keywords"
      content="Développeur React Montréal, Junior Developer, MERN Stack, JavaScript, Jeff Zara, Front-end"
    />
  </Helmet>

  {/* 2. FRAGMENT BODY NO-SCRIPT */}
  <noscript>
    <iframe
      src="https://www.googletagmanager.com/ns.html?id=GTM-M8R4TLLF"
      height="0"
      width="0"
      style={{ display: "none", visibility: "hidden" }}
    />
  </noscript>

  {/* 3. DIV PRINCIPAL */}
  <div
    className={`relative min-h-screen font-sans selection:bg-orange-500 selection:text-white ${textColor}`}
  >
    <style>{styles}</style>
    <ReactiveCursor />
    <Background themeMode={themeMode} />
    <Navbar
      toggleTheme={toggleTheme}
      lang={lang}
      setLang={setLang}
      t={t}
      themeMode={themeMode}
    />

    <main>{renderContent()}</main>
  </div>
</HelmetProvider>
);
}
