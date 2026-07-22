// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeFigureCaption from './src/plugins/rehype-figure-caption.mjs';


// https://astro.build/config
export default defineConfig({
  // The canonical origin. Powers absolute URLs in RSS/sitemap and lets layouts
  // emit <link rel="canonical"> — which is also what neutralises the
  // ncxifaras-com.pages.dev duplicate for search engines.
  site: 'https://ncxifaras.com',

  integrations: [mdx(), sitemap()],

  // Explicit default (URLs without trailing slashes). Locking it in avoids
  // accidental duplicate-URL variants later.
  trailingSlash: 'never',
  vite: {
    ssr: { external: ['@resvg/resvg-js'] },
  },
  markdown: {
    rehypePlugins: [rehypeFigureCaption],
  },
});
