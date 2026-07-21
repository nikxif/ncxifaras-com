// src/pages/rss.xml.js — the feed. Non-negotiable (ARCHITECTURE.md).
import rss from '@astrojs/rss';
import { getPublishedPosts } from '../lib/posts';

export async function GET(context) {
  const posts = await getPublishedPosts();
  return rss({
    title: 'Nick Xifaras',
    description:
      'Physician & software developer in Athens — clinical medicine, digital health, OSINT, and the software between them.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/posts/${post.id}`,
      categories: [post.data.category, ...post.data.tags],
    })),
  });
}
