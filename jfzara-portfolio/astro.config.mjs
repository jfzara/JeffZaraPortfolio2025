import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Remplacer par le domaine définitif avant la mise en ligne.
export default defineConfig({
  site: 'https://jeff-zara-portfolio2025.vercel.app',
  integrations: [sitemap({ i18n: { defaultLocale: 'fr', locales: { fr: 'fr-CA', en: 'en-CA' } } })],
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
