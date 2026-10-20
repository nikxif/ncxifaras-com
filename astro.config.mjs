// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypeFigureCaption from './src/plugins/rehype-figure-caption.mjs';
import rehypeImageSizes from './src/plugins/rehype-image-sizes.mjs';
import yaml from '@rollup/plugin-yaml';


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
    plugins: [yaml()],
    ssr: { external: ['@resvg/resvg-js'] },
  },
  // Responsive images: markdown figures get a srcset instead of one
  // full-size file (Shadow Play shipped 952–1919px images to 390px phones).
  // Components that size their own images (covers) opt out with layout="none".
  image: {
    layout: 'constrained',
  },
  markdown: {
    // Plugins live here, on the processor — markdown.rehypePlugins is
    // deprecated (removed in Astro 8) and only duplicated this (D22).
    processor: unified({
      rehypePlugins: [rehypeFigureCaption, rehypeImageSizes],
      gfm: true,        // keep explicit — otherwise silently dropped
      smartypants: true,
    }),
  },
});
