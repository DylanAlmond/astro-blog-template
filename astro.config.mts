import { defineConfig } from 'astro/config';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import AstroPWA from '@vite-pwa/astro';
import getModifiedTime from './src/util/getModifiedTime';
import path from 'node:path';
import fs from 'node:fs';
import { site } from './src/config/site';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  vite: {
    plugins: [],
  },
  integrations: [
    mdx(),
    AstroPWA({
      base: '/',
      scope: '/',
      includeAssets: ['favicon.svg'],
      registerType: 'autoUpdate',
      manifest: {
        name: site.name,
        short_name: site.name,
        theme_color: '#303030',
        background_color: '#fffaf0',
      },
      pwaAssets: {
        config: true,
      },
      workbox: {
        globPatterns: [
          '**/*.{css,js,html,svg,png,ico,txt,webp,woff,woff2,pdf}',
        ],
        // Exclude error pages from cache
        globIgnores: ['**/404.html', '**/500.html'],
        navigateFallbackDenylist: [
          /\/[^?]*\.[^/]+$/, // “has an extension”
        ],
        maximumFileSizeToCacheInBytes: 30000000,
      },
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\/$/],
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
    }),
    sitemap({
      async serialize(item) {
        const url = new URL(item.url);
        const isFromBlog = !!url.pathname.startsWith('/blog');

        // If a blog post, grab the last modified date of the post's file based on the url
        if (isFromBlog) {
          const slug = url.pathname.replace('/blog/', '').replace(/\/$/, '');

          const possibleFiles = [
            path.join(process.cwd(), 'src', 'blog', `${slug}.mdx`),
            path.join(process.cwd(), 'src', 'blog', `${slug}.md`),
          ];

          item.changefreq = ChangeFreqEnum.WEEKLY;
          item.priority = 0.7;

          for (const filePath of possibleFiles) {
            if (fs.existsSync(filePath)) {
              const { lastModified } = getModifiedTime(filePath);
              item.lastmod = lastModified;
              break;
            }
          }
        } else {
          item.changefreq = ChangeFreqEnum.WEEKLY;
          item.priority = 1;
        }

        return item;
      },
    }),
  ],
});
