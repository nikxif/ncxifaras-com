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
  schema: z.object({
    title: z.string(),
    description: z.string(), // deks, <meta>, RSS
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(CATEGORIES).default('note'),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false), // surfaces on homepage + /writing
    draft: z.boolean().default(false),
    cover: z.string().optional(), // image path (photo mode)
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
