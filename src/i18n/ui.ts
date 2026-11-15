export const languages = { fr: 'Français', en: 'English' } as const;
export type Lang = keyof typeof languages;

/** Coordonnées : à compléter une seule fois ici. */
export const contact = {
  email: 'VOTRE@EMAIL.COM',
  github: 'https://github.com/jfzara',
  linkedin: 'https://www.linkedin.com/in/VOTRE-PROFIL',
  cv: { fr: '/cv-jf-zara-fr.pdf', en: '/cv-jf-zara-en.pdf' },
};

export const ui = {
  fr: {
    'meta.title': 'Jean Fabrice Zara — Développeur full-stack, Montréal',
    'meta.desc':
      "Développeur full-stack à Montréal (React, TypeScript, Node, Spring Boot). Études de cas avec journal de décisions techniques.",
    'skip': 'Aller au contenu',
    'nav.work': 'Travaux',
    'nav.about': 'À propos',
    'nav.cv': 'CV (PDF)',
    'nav.menu': 'Menu',
    'nav.close': 'Fermer',
    'lang.switch': 'EN',
    'lang.label': 'Switch to English',
    'theme.label': 'Basculer le thème clair ou sombre',
    'theme.light': 'Clair',
    'theme.dark': 'Sombre',
    'hero.status': 'Disponible — poste, contrat ou freelance',
    'hero.lead':
      "Développeur full-stack à Montréal. Je construis des applications complètes, de la base de données au dernier détail d'interface — et",
    'hero.hl': "j'écris pourquoi",
    'hero.end': ' chaque choix a été fait.',
    'brief.title': '// en bref',
    'brief.path': 'Parcours',
    'brief.pathV': 'Autodidacte depuis 2020 · AEC programmation 2024',
    'brief.lang': 'Langues',
    'brief.langV': 'Français, anglais',
    'brief.method': 'Méthode',
    'brief.methodV': 'Un journal de décisions par projet',
    'cta.read': 'Lire les études',
    'cta.write': 'Écrire',
    'cases.title': 'Études de cas',
    'cases.sub': 'problème → décisions → résultat',
    'cases.key': 'Décision clé',
    'about.title': 'À propos',
    'about.body':
      "J'ai appris à programmer seul à partir de 2020, puis consolidé ces bases par une AEC en programmation terminée en 2024. Je viens des lettres et de la philosophie : j'aborde le code comme une argumentation — chaque choix doit pouvoir se justifier, et ce qu'on refuse compte autant que ce qu'on retient.",
    'foot.q': 'Un poste, un contrat,\nune question technique ?',
    'foot.updated': 'Montréal · mis à jour',
    'case.back': '← Études de cas',
    'case.kicker': 'Étude de cas',
    'case.role': 'Rôle',
    'case.duration': 'Durée',
    'case.live': 'En ligne',
    'case.code': 'Code',
    'case.toc': 'Sommaire',
    'case.problem': 'Le problème',
    'case.decisions': 'Journal de décisions',
    'case.decSub': 'contexte · choix · rejeté · coût',
    'case.choice': 'Choix',
    'case.cost': 'Rejeté · coût assumé',
    'case.outcome': 'Résultat',
    'case.next': 'Et ensuite',
    'case.all': '← Tous les dossiers',
    'notfound': 'Page introuvable.',
  },
  en: {
    'meta.title': 'Jean Fabrice Zara — Full-stack developer, Montréal',
    'meta.desc':
      'Full-stack developer in Montréal (React, TypeScript, Node, Spring Boot). Case studies with a technical decision log.',
    'skip': 'Skip to content',
    'nav.work': 'Work',
    'nav.about': 'About',
    'nav.cv': 'Résumé (PDF)',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'lang.switch': 'FR',
    'lang.label': 'Passer en français',
    'theme.label': 'Toggle light or dark theme',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'hero.status': 'Available — full-time, contract or freelance',
    'hero.lead':
      'Full-stack developer in Montréal. I build complete applications, from the database to the last interface detail — and',
    'hero.hl': 'I write down why',
    'hero.end': ' every choice was made.',
    'brief.title': '// at a glance',
    'brief.path': 'Path',
    'brief.pathV': 'Self-taught since 2020 · Programming AEC 2024',
    'brief.lang': 'Languages',
    'brief.langV': 'French, English',
    'brief.method': 'Method',
    'brief.methodV': 'A decision log for every project',
    'cta.read': 'Read the case studies',
    'cta.write': 'Get in touch',
    'cases.title': 'Case studies',
    'cases.sub': 'problem → decisions → outcome',
    'cases.key': 'Key decision',
    'about.title': 'About',
    'about.body':
      'I taught myself to code from 2020, then consolidated the foundations with a programming AEC completed in 2024. I come from literature and philosophy: I treat code as an argument — every choice should be justifiable, and what you reject matters as much as what you keep.',
    'foot.q': 'A role, a contract,\na technical question?',
    'foot.updated': 'Montréal · updated',
    'case.back': '← Case studies',
    'case.kicker': 'Case study',
    'case.role': 'Role',
    'case.duration': 'Duration',
    'case.live': 'Live',
    'case.code': 'Code',
    'case.toc': 'Contents',
    'case.problem': 'The problem',
    'case.decisions': 'Decision log',
    'case.decSub': 'context · choice · rejected · cost',
    'case.choice': 'Choice',
    'case.cost': 'Rejected · accepted cost',
    'case.outcome': 'Outcome',
    'case.next': 'What’s next',
    'case.all': '← All case studies',
    'notfound': 'Page not found.',
  },
} as const;

export type UIKey = keyof (typeof ui)['fr'];

export const useT = (lang: Lang) => (key: UIKey) => ui[lang][key];

/** Chemins localisés : la page d'un projet n'a pas le même segment selon la langue. */
export const paths = {
  home: (lang: Lang) => (lang === 'fr' ? '/' : '/en/'),
  project: (lang: Lang, slug: string) => (lang === 'fr' ? `/projets/${slug}/` : `/en/projects/${slug}/`),
};

export const LAST_UPDATE = { fr: 'nov. 2026', en: 'Nov 2026' };
