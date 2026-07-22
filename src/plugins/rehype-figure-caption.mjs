// rehype-figure-caption.mjs
// Wraps a block-level markdown image that has a TITLE into
// <figure><img><figcaption>…</figcaption></figure>.
//
//   ![alt text for screen readers](../../assets/x.jpg "Visible caption. Credit: [Name](https://…)")
//
// Design constraints that matter with Astro:
//  * It runs at the REHYPE stage and only ever WRAPS the existing <img> node —
//    it never reads or rewrites src. Astro's rehypeImages drops `src` and
//    substitutes `__ASTRO_IMAGE__`, so any plugin keying off src silently
//    no-ops (see withastro/astro#10643). Wrapping is agnostic to that.
//  * alt stays alt (screen readers), title becomes the visible caption. These
//    are different jobs and shouldn't be conflated — rehype-figure uses alt,
//    which is the wrong call for credits.
//  * Only fires when the image is the SOLE child of a paragraph, i.e. a
//    block-level figure. Inline images inside a sentence are left alone.
//  * The title is consumed (removed from the img) so browsers don't also show
//    it as a hover tooltip duplicating the caption.

import { visit } from 'unist-util-visit';

/** Minimal inline-markdown → hast for captions: [text](url), *em*, `code`. */
function parseInline(text) {
  const nodes = [];
  // Order matters: links first, then em, then code.
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)|\*([^*]+)\*|`([^`]+)`/g;
  let last = 0;
  let m;
  while ((m = pattern.exec(text)) !== null) {
    if (m.index > last) nodes.push({ type: 'text', value: text.slice(last, m.index) });
    if (m[1] !== undefined) {
      nodes.push({
        type: 'element',
        tagName: 'a',
        properties: {
          href: m[2],
          // external links get safe rel; internal ones don't need it
          ...(/^https?:\/\//.test(m[2]) ? { rel: 'noopener', target: '_blank' } : {}),
        },
        children: [{ type: 'text', value: m[1] }],
      });
    } else if (m[3] !== undefined) {
      nodes.push({ type: 'element', tagName: 'em', properties: {}, children: [{ type: 'text', value: m[3] }] });
    } else if (m[4] !== undefined) {
      nodes.push({ type: 'element', tagName: 'code', properties: {}, children: [{ type: 'text', value: m[4] }] });
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) nodes.push({ type: 'text', value: text.slice(last) });
  return nodes.length ? nodes : [{ type: 'text', value: text }];
}

export default function rehypeFigureCaption() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'p' || !parent || index === null) return;

      // The paragraph must contain exactly one meaningful child: the image.
      const meaningful = node.children.filter(
        (c) => !(c.type === 'text' && c.value.trim() === ''),
      );
      if (meaningful.length !== 1) return;

      const img = meaningful[0];
      if (img.type !== 'element' || img.tagName !== 'img') return;

      const title = img.properties?.title;
      if (!title || typeof title !== 'string' || !title.trim()) return;

      // Consume the title so it doesn't double as a tooltip.
      delete img.properties.title;

      // Replace the <p> with <figure>. The <img> node itself is untouched —
      // whatever Astro did to it (src, __ASTRO_IMAGE__, dimensions) survives.
      parent.children[index] = {
        type: 'element',
        tagName: 'figure',
        properties: {},
        children: [
          img,
          {
            type: 'element',
            tagName: 'figcaption',
            properties: {},
            children: parseInline(title.trim()),
          },
        ],
      };
    });
  };
}
