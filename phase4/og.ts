// src/lib/og.ts — build-time Open Graph image generation.
// satori (card → SVG, text shaped to vector paths) + resvg (SVG → PNG). Runs
// during `astro build`, emitting static PNGs — nothing runs at the edge.
//
// Fonts: satori needs ttf/otf/woff (NOT woff2). Fontsource ships .woff files,
// which we read straight from node_modules via require.resolve. These are
// build-only deps — see PHASE4-README for the install line.
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { coverSVG, type Category } from './cover-geometry';
import { CATEGORY_LABELS, type Post } from './posts';

const require = createRequire(import.meta.url);
const fontFile = (pkgPath: string) => readFileSync(require.resolve(pkgPath));

// weight/style typed loosely to satisfy satori's FontOptions union at runtime
const fonts = [
  { name: 'Commissioner', weight: 700, style: 'normal', data: fontFile('@fontsource/commissioner/files/commissioner-latin-700-normal.woff') },
  { name: 'Commissioner', weight: 800, style: 'normal', data: fontFile('@fontsource/commissioner/files/commissioner-latin-800-normal.woff') },
  { name: 'JetBrains Mono', weight: 500, style: 'normal', data: fontFile('@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff') },
] as any;

// Keep these in sync with tokens.css (concrete hex — no CSS vars in a raster).
const PAL = {
  paper: '#FAF7F0',
  paper2: '#F2ECDD',
  ink: '#1A1714',
  inkSoft: '#544F45',
  cat: {
    osint: '#1E45C9',
    policy: '#DE3F24',
    tutorial: '#E7A32A',
    note: '#1A1714',
  } as Record<Category, string>,
};

const BAND = 430; // width of the geometry band on the right
const W = 1200;
const H = 630;

function card(title: string, category: Category, slug: string) {
  const cat = PAL.cat[category];
  const svg = coverSVG(slug, { cat, ink: PAL.ink, paper2: PAL.paper2 }, BAND, H);
  const bg = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;

  return {
    type: 'div',
    props: {
      style: { display: 'flex', width: `${W}px`, height: `${H}px`, background: PAL.paper, fontFamily: 'Commissioner' },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              width: `${W - BAND}px`, height: '100%', padding: '64px 56px', boxSizing: 'border-box',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'column' },
                  children: [
                    { type: 'div', props: { style: { fontFamily: 'JetBrains Mono', fontSize: '26px', color: cat, letterSpacing: '2px', textTransform: 'uppercase' }, children: CATEGORY_LABELS[category] } },
                    { type: 'div', props: { style: { marginTop: '14px', width: '92px', height: '8px', background: cat } } },
                  ],
                },
              },
              { type: 'div', props: { style: { display: 'flex', fontFamily: 'Commissioner', fontWeight: 800, fontSize: '68px', lineHeight: 1.04, color: PAL.ink, letterSpacing: '-1px' }, children: title } },
              { type: 'div', props: { style: { fontFamily: 'JetBrains Mono', fontSize: '26px', color: PAL.inkSoft }, children: 'ncxifaras.com' } },
            ],
          },
        },
        { type: 'img', props: { src: bg, width: BAND, height: H, style: { display: 'flex' } } },
      ],
    },
  };
}

/** Render a post's OG card to PNG bytes. */
export async function renderOG(post: Post): Promise<Buffer> {
  const { title, category } = post.data;
  const svg = await satori(card(title, category, post.id) as any, { width: W, height: H, fonts });
  return new Resvg(svg, { fitTo: { mode: 'width', value: W } }).render().asPng();
}
