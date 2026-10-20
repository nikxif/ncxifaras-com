// src/lib/posts.ts — one place for "which posts, in what order".
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Category } from './palette';

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

export const CATEGORY_LABELS: Record<Category, string> = {
  project: 'Project',
  guide: 'Guide',
  opinion: 'Opinion',
  personal: 'Personal',
};

/**
 * Curly quotes for frontmatter strings (titles, deks). Markdown bodies get
 * this from smartypants; frontmatter never passes through it, and a CMS
 * textbox types straight quotes — hence "Bellingcat’s 'Shadow Play'".
 * A quote after start/space/bracket/dash opens; every other one closes, which
 * also makes apostrophes right. Known miss: a leading elision ('90s) opens.
 */
export function typeset(s: string): string {
  return s
    .replace(/(^|[\s([{—–-])'/g, '$1‘')
    .replace(/'/g, '’')
    .replace(/(^|[\s([{—–-])"/g, '$1“')
    .replace(/"/g, '”');
}

/** Human date, consistent everywhere (English on every post, D30). */
export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}

/**
 * Whole minutes to read a post body (~225 wpm). Counts the prose only: the
 * MDX imports, JSX tags, image syntax and link targets would inflate it.
 * Same rough count works for Greek, which spaces words the same way.
 */
export function readingMinutes(body: string | undefined): number {
  const text = (body ?? '')
    .replace(/^import .*$/gm, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\]\([^)]*\)/g, ']')
    .replace(/<[^>]+>/g, ' ');
  return Math.max(1, Math.round((text.match(/\S+/g) ?? []).length / 225));
}
