// src/lib/palette.ts — the single source of truth for category identity.
//
// Exports the Category type (imported everywhere instead of re-declaring the
// union) and concrete hex values for the two contexts that CANNOT read CSS
// custom properties:
//   - SVG filter attributes (tableValues etc. are attributes, not CSS)
//   - the build-time OG image raster (src/lib/og.ts)
//
// ⚠️ MAINTENANCE SEAM: CATEGORY_HEX mirrors the --cat-* tokens in
// src/styles/tokens.css. If you tune --cobalt / --vermilion / --ochre there,
// change them here too. Anything rendering in the browser should still use the
// CSS vars — this file exists only for the two cases above.

export const INK = '#1A1714';
export const INK_SOFT = '#544F45';
export const PAPER = '#FAF7F0';
export const PAPER_2 = '#F2ECDD';

/** Mirrors --cat-* in tokens.css exactly. */
export const CATEGORY_HEX = {
  osint: '#1A3AAE',    // --cat-osint    → --cobalt
  policy: '#DE3F24',   // --cat-policy   → --vermilion
  tutorial: '#E7A32A', // --cat-tutorial → --ochre
  note: INK,           // --cat-note     → --ink
} as const;

/** The canonical category union. Import this; don't re-declare it. */
export type Category = keyof typeof CATEGORY_HEX;

export const CATEGORIES = Object.keys(CATEGORY_HEX) as Category[];

/**
 * Mid-stop colour for the duotone ramp.
 * Same as CATEGORY_HEX except for `note`: its category colour IS ink, which is
 * also the shadow stop — a mid stop equal to the shadow collapses the ramp and
 * yields a flat, crushed image. Ink-soft keeps `note` photos legibly neutral
 * (a greyscale duotone) while staying on-brand.
 */
const DUOTONE_MID: Record<Category, string> = {
  ...CATEGORY_HEX,
  note: INK_SOFT,
};

/** '#RRGGBB' → ['0.1234','0.5678','0.9012'] normalised channels. */
function channels(hex: string): string[] {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => (parseInt(h.slice(i, i + 2), 16) / 255).toFixed(4));
}

/**
 * Three-stop duotone ramp for <feComponentTransfer type="table">:
 * shadow (ink) → mid (category colour) → highlight (paper).
 * Returns [R, G, B] tableValues strings.
 */
export function duotoneRamp(category: Category): [string, string, string] {
  const s = channels(INK);
  const m = channels(DUOTONE_MID[category]);
  const h = channels(PAPER);
  return [0, 1, 2].map((i) => `${s[i]} ${m[i]} ${h[i]}`) as [string, string, string];
}
