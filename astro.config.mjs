// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://hrai.tools',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: [
        'https://hrai.tools/', // Homepage priority 1.0
      ],
      serialize(item) {
        // Homepage gets highest priority
        if (item.url === 'https://hrai.tools/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        }
        // Listing pages
        else if (item.url.includes('/listing/')) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        }
        // Best/Category pages
        else if (item.url.includes('/best/') || item.url.includes('/category/')) {
          item.priority = 0.7;
          item.changefreq = 'weekly';
        }
        // Compare/Alternatives pages
        else if (item.url.includes('/compare/') || item.url.includes('/alternatives/')) {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        // Blog posts
        else if (item.url.includes('/blog/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }
        // Other pages
        else {
          item.priority = 0.5;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
  build: {
    format: 'directory',
  },
});
