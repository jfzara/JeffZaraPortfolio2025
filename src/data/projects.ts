import type { Lang } from '../i18n/ui';

type L = Record<Lang, string>;

export interface Decision {
  title: L;
  context: L;
  choice: L;
  cost: L;
}

export interface Metric {
  label: L;
  /** Valeur MESURÉE. Laisser null tant qu'elle ne l'est pas : la ligne n'est pas affichée. */
  value: string | null;
}

export interface Project {
  slug: string;
  title: string;
  kind: L;
  problemShort: L;
  keyDecision: L;
  lead: L;
  problem: L[];
  role: L;
  duration: L | null;
  stack: string[];
  live?: string;
  repo?: string;
  /** Chemin dans /public, ex. '/shots/lisn.webp'. null = cadre de remplacement. */
  image: string | null;
  imageAlt: L;
  decisions: Decision[];
  metrics: Metric[];
  next: L | null;
}

/*
 * Tout ce qui est entre [CROCHETS] est à remplacer par un fait réel.
 * Ne jamais publier un chiffre non mesuré.
 */
export const projects: Project[] = [
  {
    slug: 'lisn',
    title: 'LISN',
    kind: { fr: 'Application web, projet personnel', en: 'Web application, personal project' },
    problemShort: {
      fr: "Les mélomanes exigeants n'ont personne à leur niveau avec qui parler musique. LISN analyse une œuvre, la note, argumente et en discute.",
      en: 'Demanding music lovers have no one at their level to talk music with. LISN analyses a work, scores it, argues its case and discusses it.',
    },
    keyDecision: {
      fr: "Une chaîne de prompts qui se vérifient mutuellement plutôt qu'un appel unique : plus lent, mais des verdicts cohérents d'une écoute à l'autre.",
      en: 'A chain of prompts that check each other instead of a single call: slower, but verdicts stay consistent from one listen to the next.',
    },
    lead: {
      fr: "Un critique musical qui argumente. On lui soumet une œuvre ; il l'écoute à travers un système esthétique explicite, la note, et en débat avec vous.",
      en: 'A music critic that argues its case. Give it a work; it listens through an explicit aesthetic system, scores it, and debates it with you.',
    },
    problem: [
      {
        fr: "Les outils de découverte musicale recommandent ce qui ressemble à ce qu'on écoute déjà. Ils ne disent jamais pourquoi une œuvre est forte ou faible, et ne permettent pas de progresser.",
        en: "Music discovery tools recommend whatever sounds like what you already play. They never say why a work is strong or weak, and they don't help you grow.",
      },
      {
        fr: "Le public visé : l'amateur cultivé qui n'a personne à son niveau avec qui en parler, ou qui veut progresser mais tourne en rond.",
        en: 'The audience: the cultivated listener with no one at their level to talk to, or who wants to progress but keeps going in circles.',
      },
    ],
    role: { fr: 'Seul — conception, front, back', en: 'Solo — design, front end, back end' },
    duration: null, // ex. { fr: '10 mois', en: '10 months' }
    stack: ['[STACK À CONFIRMER]'],
    live: 'https://lisn-three.vercel.app',
    repo: 'https://github.com/jfzara/LISN',
    image: null,
    imageAlt: { fr: "Interface de LISN : le globe des œuvres et un verdict ouvert", en: 'LISN interface: the globe of works and an open verdict' },
    decisions: [
      {
        title: { fr: 'Une chaîne de prompts qui se contrôlent', en: 'A chain of prompts that check each other' },
        context: {
          fr: 'Un appel unique à un modèle donne des notes instables : la même œuvre peut recevoir 6 puis 8.',
          en: 'A single model call gives unstable scores: the same work can get a 6, then an 8.',
        },
        choice: {
          fr: "Découper l'évaluation en étapes qui s'appellent et se vérifient mutuellement, sur la base d'un système esthétique explicite.",
          en: 'Split the evaluation into steps that call and verify each other, grounded in an explicit aesthetic system.',
        },
        cost: {
          fr: 'Rejeté : un prompt géant. Coût : latence plus élevée, [CHIFFRE]. Le système lui-même reste privé.',
          en: 'Rejected: one giant prompt. Cost: higher latency, [FIGURE]. The system itself stays private.',
        },
      },
      {
        title: { fr: 'Comparer, c’est peser', en: 'Comparing means weighing' },
        context: {
          fr: 'Deux scores côte à côte se lisent comme un tableau, pas comme un jugement.',
          en: 'Two scores side by side read like a table, not a judgement.',
        },
        choice: {
          fr: "Présenter la comparaison comme une balance : l'œuvre la plus forte pèse, visuellement et littéralement.",
          en: 'Present the comparison as a scale: the stronger work weighs more, visually and literally.',
        },
        cost: {
          fr: 'Rejeté : le tableau comparatif. Coût : un panneau dessiné sur mesure, détaché du globe sans glassmorphisme.',
          en: 'Rejected: the comparison table. Cost: a custom panel that lifts off the globe without glassmorphism.',
        },
      },
      {
        title: { fr: 'Mobile : la pochette d’abord', en: 'Mobile: the sleeve first' },
        context: {
          fr: "Le globe en 3D écrase l'écran d'un téléphone et cache l'essentiel : l'œuvre.",
          en: 'The 3D globe crushes a phone screen and hides what matters: the work.',
        },
        choice: {
          fr: 'Direction « Pochette » : la pochette en perspective au-dessus d’une feuille, filtres dans un tiroir qui descend du haut.',
          en: '“Sleeve” direction: the cover in perspective above a sheet, filters in a drawer that drops from the top.',
        },
        cost: {
          fr: 'Rejeté : le globe réduit. Coût : deux mises en page à maintenir.',
          en: 'Rejected: a shrunken globe. Cost: two layouts to maintain.',
        },
      },
    ],
    metrics: [
      { label: { fr: 'Œuvres analysées', en: 'Works analysed' }, value: null },
      { label: { fr: "Temps moyen d'un verdict", en: 'Average time per verdict' }, value: null },
      { label: { fr: 'Lighthouse mobile (perf / a11y)', en: 'Lighthouse mobile (perf / a11y)' }, value: null },
    ],
    next: {
      fr: "Le verdict partageable. Et un moteur de comparaison plus fin, capable de justifier un écart d'un demi-point — LISN est une app de nuance.",
      en: 'Shareable verdicts. And a finer comparison engine, able to justify a half-point gap — LISN is an app about nuance.',
    },
  },
  {
    slug: 'livano',
    title: 'Livano',
    kind: { fr: "Refonte de site d'agence", en: 'Agency website rebuild' },
    problemShort: {
      fr: "Refonte d'un site d'agence : [PROBLÈME DE DÉPART — lenteur, SEO, maintenance ?].",
      en: 'Agency website rebuild: [STARTING PROBLEM — speed, SEO, maintenance?].',
    },
    keyDecision: {
      fr: 'Architecture statique en Astro : [CE QUE ÇA A COÛTÉ / CE QUI A ÉTÉ ABANDONNÉ].',
      en: 'Static architecture with Astro: [WHAT IT COST / WHAT WAS DROPPED].',
    },
    lead: { fr: '[UNE PHRASE QUI RÉSUME LE PROJET]', en: '[ONE SENTENCE SUMMING UP THE PROJECT]' },
    problem: [{ fr: '[CONTEXTE ET PROBLÈME DE DÉPART]', en: '[CONTEXT AND STARTING PROBLEM]' }],
    role: { fr: '[VOTRE RÔLE EXACT]', en: '[YOUR EXACT ROLE]' },
    duration: null,
    stack: ['Astro', 'React', 'Tailwind CSS'],
    image: null,
    imageAlt: { fr: "Page d'accueil du site Livano", en: 'Livano website home page' },
    decisions: [
      {
        title: { fr: 'Passer au statique', en: 'Going static' },
        context: { fr: '[CONTEXTE]', en: '[CONTEXT]' },
        choice: { fr: '[CHOIX]', en: '[CHOICE]' },
        cost: { fr: '[REJETÉ · COÛT]', en: '[REJECTED · COST]' },
      },
    ],
    metrics: [
      { label: { fr: 'Lighthouse SEO (avant → après)', en: 'Lighthouse SEO (before → after)' }, value: null },
      { label: { fr: 'Lighthouse accessibilité (avant → après)', en: 'Lighthouse accessibility (before → after)' }, value: null },
    ],
    next: null,
  },
  {
    slug: 'youchef',
    title: 'YouChef',
    kind: { fr: 'Plateforme collaborative, MERN', en: 'Collaborative platform, MERN' },
    problemShort: {
      fr: "Plateforme collaborative de recettes : [QUI L'UTILISE, POUR QUOI FAIRE].",
      en: 'Collaborative recipe platform: [WHO USES IT, FOR WHAT].',
    },
    keyDecision: {
      fr: "Skeleton screens plutôt que spinners : la latence réseau reste, mais l'interface paraît stable pendant le chargement.",
      en: 'Skeleton screens instead of spinners: network latency remains, but the interface feels stable while loading.',
    },
    lead: { fr: '[UNE PHRASE QUI RÉSUME LE PROJET]', en: '[ONE SENTENCE SUMMING UP THE PROJECT]' },
    problem: [{ fr: '[CONTEXTE ET PROBLÈME]', en: '[CONTEXT AND PROBLEM]' }],
    role: { fr: 'Seul — front, back', en: 'Solo — front end, back end' },
    duration: null,
    stack: ['MongoDB', 'Express', 'React', 'Node', 'JWT', 'Framer Motion'],
    image: null,
    imageAlt: { fr: "Écran d'accueil de YouChef", en: 'YouChef home screen' },
    decisions: [
      {
        title: { fr: 'Skeleton screens', en: 'Skeleton screens' },
        context: {
          fr: "Les spinners rendent l'attente visible et font sauter la mise en page à l'arrivée des données.",
          en: 'Spinners make waiting visible and cause layout shifts when data arrives.',
        },
        choice: {
          fr: 'Des squelettes aux dimensions réelles des cartes, remplacés sur place.',
          en: 'Skeletons sized like the real cards, replaced in place.',
        },
        cost: { fr: '[REJETÉ · COÛT]', en: '[REJECTED · COST]' },
      },
    ],
    metrics: [],
    next: null,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
