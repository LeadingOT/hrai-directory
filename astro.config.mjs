import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

// Option A: only alternatives pages with real demand stay in the sitemap (rest are noindexed)
const altKeep = new Set(JSON.parse(readFileSync(new URL('./src/data/alternatives-keep.json', import.meta.url), 'utf8')).keep);

// https://astro.build/config
export default defineConfig({
  site: 'https://hrai.tools',
  output: 'server',
  adapter: vercel(),
  
  vite: {
    plugins: [tailwindcss()]
  },
  
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => {
        const m = page.match(/\/alternatives\/([a-z0-9-]+)\/?$/);
        return !m || altKeep.has(m[1]);
      },
    }),
  ],
  
  build: {
    format: 'directory',
  },
});
