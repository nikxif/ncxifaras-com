// src/lib/posts.ts — one place for "which posts, in what order".
import { getCollection, type CollectionEntry } from 'astro:content';
import { LOCALE, UI, type Lang } from './i18n';

export type Post = CollectionEntry<'blog'>;

/** All non-draft posts, newest first. Drafts also excluded in production builds. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getFeaturedPosts(): Promise<Post[]> {
  return (await getPublishedPosts()).filter((p) => p.data.featured);
}

/** Unique tags across published posts, alphabetical. */
export async function getAllTags(): Promise<string[]> {
  const posts = await getPublishedPosts();
  return [...new Set(posts.flatMap((p) => p.data.tags))].sort();
}

/** English labels — the site chrome's. Per-language labels live in i18n.ts. */
export const CATEGORY_LABELS = UI.en.category;

/** Human date, consistent everywhere; a Greek post gets Greek month names. */
export function formatDate(d: Date, lang: Lang = 'en'): string {
  return d.toLocaleDateString(LOCALE[lang].intl, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}
