// src/pages/og/[id].png.ts — one static OG image per post at /og/<id>.png.
// Emitted at build time (getStaticPaths); referenced by <meta property="og:image">.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getPublishedPosts } from '../../lib/posts';
import { renderOG } from '../../lib/og';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ params: { id: post.id }, props: { post } }));
};

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOG((props as any).post);
  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
