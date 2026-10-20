// rehype-image-sizes.mjs
// Tells the browser how wide a markdown image actually renders, so it picks
// the right file from the srcset that `image.layout: 'constrained'` builds.
//
// Without this, Astro writes sizes="(min-width: <intrinsic>px) <intrinsic>px,
// 100vw", which on a 1440px desktop asks for a ~1668px file to fill a 736px
// column. Every markdown image renders in the prose column, so one value fits:
// the column (46rem) once it fits the viewport, else the viewport minus the
// mobile gutters.
//
// Like rehype-figure-caption, this never reads or rewrites `src`: it runs
// before Astro's rehypeImages, which spreads the node's properties into the
// image options (so `sizes` survives into the generated <img>).

import { visit } from 'unist-util-visit';

// Keep in step with --width-content (46rem) + 2 × the max gutter (2.5rem).
const SIZES = '(min-width: 51rem) 46rem, calc(100vw - 2.5rem)';

export default function rehypeImageSizes() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img' && node.properties && !node.properties.sizes) {
        node.properties.sizes = SIZES;
      }
    });
  };
}
