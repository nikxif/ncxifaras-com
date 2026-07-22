// src/content.config.ts — Content Layer collections (Astro 5+ conventions).
// Overwrites the starter's config. Schemas are the build-time guarantee:
// a malformed post fails the build instead of shipping.
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod'; // v6+ canonical import (not astro:content)
import { glob } from 'astro/loaders';

// Category = the colour-coded set (capped ~4–5 by design, see D12).
// Everything finer-grained is a tag.
export const CATEGORIES = ['osint', 'policy', 'tutorial', 'note'] as const;

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  // Function form so we get the `image()` helper. image() resolves the
  // frontmatter path RELATIVE TO THE MARKDOWN FILE at build time and hands the
  // component real ImageMetadata — which is what makes <Image> emit the hashed
  // /_astro/ URL. Typing `cover` as a plain string instead emits the raw path
  // into the HTML, where the browser resolves it against the page URL and 404s.
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(), // deks, <meta>, RSS
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(CATEGORIES).default('note'),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false), // surfaces on homepage + /writing
    draft: z.boolean().default(false),
    cover: image().optional(), // photo mode: path relative to THIS md file
    coverMode: z.enum(['photo', 'generated']).default('generated'),
    canonicalURL: z.string().url().optional(), // only if canonical lives elsewhere
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { blog, pages };
