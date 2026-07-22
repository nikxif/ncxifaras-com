// src/lib/cover-geometry.ts
// Single source of truth for the generated-cover geometry. Both the on-page
// cover (GeneratedCover.astro, themed with CSS vars) and the build-time OG
// image (src/lib/og.ts, concrete hex) call this — so the two can never drift.
//
// The composition space (6 layouts × 2 mirrors × 4 accent rotations × 2 colour
// swaps ≈ 96 outputs) is derived from INDEPENDENT bit-ranges of a slug hash,
// and every shift is UNSIGNED (`>>>`) — a signed `>>` on a high-bit hash goes
// negative and indexes arrays out of bounds. (That was the /hello crash.)

export type Category = 'osint' | 'policy' | 'tutorial' | 'note';

export function coverHash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0; // unsigned
}

export interface CoverColors {
  cat: string; // category colour — a CSS var() string on-page, a hex for OG
  ink: string;
  paper2: string; // cover ground
}

/** Inner SVG markup (one <g>…</g>) for the 160×100 viewBox. */
export function coverInnerSVG(slug: string, c: CoverColors): string {
  const h = coverHash(slug);
  const variant = h % 6;
  const flip = ((h >>> 4) & 1) === 1;
  const rot = (h >>> 6) % 4;
  const swap = ((h >>> 9) & 1) === 1;

  const { cat, ink, paper2 } = c;
  const a = swap ? cat : ink; // primary fill
  const b = swap ? ink : cat; // secondary fill

  const dot = [
    { cx: 128, cy: 22 },
    { cx: 138, cy: 78 },
    { cx: 22, cy: 78 },
    { cx: 22, cy: 22 },
  ][rot];

  const shapes = [
    `<circle cx="126" cy="6" r="44" fill="${cat}"/><rect x="20" y="0" width="10" height="88" fill="${ink}"/>`,
    `<circle cx="2" cy="50" r="60" fill="${cat}"/><rect x="64" y="80" width="96" height="8" fill="${ink}"/><rect x="120" y="12" width="28" height="28" fill="${b}"/>`,
    `<polygon points="26,88 70,18 114,88" fill="${cat}"/><circle cx="128" cy="30" r="22" fill="none" stroke="${ink}" stroke-width="8"/>`,
    `<path d="M160 0 H72 A88 88 0 0 1 160 88 Z" fill="${cat}"/><circle cx="34" cy="30" r="15" fill="none" stroke="${ink}" stroke-width="7"/>`,
    `<rect x="0" y="0" width="70" height="100" fill="${cat}"/><circle cx="112" cy="50" r="30" fill="${b}"/><rect x="128" y="0" width="8" height="100" fill="${ink}"/>`,
    `<circle cx="80" cy="50" r="40" fill="${cat}"/><rect x="0" y="46" width="160" height="8" fill="${ink}"/><rect x="40" y="0" width="8" height="100" fill="${a}" opacity="0.9"/>`,
  ][variant];

  return `<g transform="${flip ? 'translate(160,0) scale(-1,1)' : ''}"><rect width="160" height="100" fill="${paper2}"/>${shapes}<circle cx="${dot.cx}" cy="${dot.cy}" r="8" fill="${b}"/></g>`;
}

/** Full standalone SVG string at a pixel size (used by the OG composition). */
export function coverSVG(
  slug: string,
  c: CoverColors,
  w: number,
  h: number,
): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice">${coverInnerSVG(
    slug,
    c,
  )}</svg>`;
}
