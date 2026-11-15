# Portfolio — Jean Fabrice Zara

Site statique Astro, bilingue (FR par défaut sur `/`, EN sur `/en/`), thème clair/sombre sans flash, menu mobile accessible, études de cas avec journal de décisions.

## Démarrer
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # sortie statique dans dist/
```
Vercel détecte Astro automatiquement (build `npm run build`, sortie `dist`).

## Où modifier quoi
| Fichier | Contenu |
|---|---|
| `src/i18n/ui.ts` | Tous les textes d'interface FR/EN, email, liens GitHub/LinkedIn, CV, date de mise à jour |
| `src/data/projects.ts` | Les études de cas (bilingues) : problème, décisions, métriques, liens, image |
| `src/styles/global.css` | Jetons de couleur des deux thèmes, typographie |
| `public/shots/` | Captures des projets (WebP conseillé, 1440×720 pour la page projet) |
| `public/cv-jf-zara-fr.pdf`, `public/cv-jf-zara-en.pdf` | Les CV liés dans l'en-tête |
| `astro.config.mjs` | `site` : le domaine définitif |

## Règles du contenu
- Tout ce qui est entre `[CROCHETS]` est à remplacer par un fait réel.
- Une métrique dont `value` vaut `null` n'est pas affichée : ne jamais publier un chiffre non mesuré.
- Ajouter un projet = ajouter un objet dans `projects` ; les pages `/projets/<slug>/` et `/en/projects/<slug>/` sont générées.

## Choix techniques
- **Zéro JavaScript côté client** hormis ~1 Ko pour le thème et le menu : tout le contenu est dans le HTML, lisible par les crawlers et les lecteurs d'écran.
- **Thème** : script inline dans `<head>` qui lit `localStorage`, sinon `prefers-color-scheme`, avant le premier rendu.
- **i18n** : routage natif d'Astro, `hreflang` et canonique sur chaque page, sitemap bilingue.
- **Polices auto-hébergées** (Fontsource) : Archivo variable (axe de largeur) et JetBrains Mono.
- **Accessibilité** : lien d'évitement, cibles ≥ 44 px, `aria-expanded`/`aria-pressed`, fermeture du menu par Échap, contrastes AA dans les deux thèmes, ligne de projet entièrement cliquable avec un seul lien annoncé.
