# Phase 4 — polish & quality floor

Four things: **auto-generated OG images** (the big one — closes the "shared links
are bare text cards" gap from the authoring guide), **`robots.txt`**, an
**accessibility fix**, and notes for the **performance** pass.

---

## New / changed files

```
NEW  src/lib/cover-geometry.ts       ← shared cover geometry (see below)
NEW  src/lib/og.ts                    ← build-time OG image generation (satori + resvg)
NEW  src/pages/og/[id].png.ts         ← emits /og/<slug>.png per post
NEW  public/robots.txt
NEW  public/og-default.png            ← site card for non-post pages (commit this)
EDIT src/components/GeneratedCover.astro ← now uses cover-geometry.ts (no visual change)
EDIT src/layouts/BaseLayout.astro     ← always emits og:image (+ dimensions); default fallback
EDIT src/layouts/PostLayout.astro     ← points each post at its /og/<slug>.png
EDIT src/styles/global.css            ← focus-ring contrast fix
```

`og-samples/` holds five rendered previews (four categories + the site default)
so you can see the output — **don't commit that folder**, it's just for you.

---

## 1. OG images — install & wire

### Dependencies (build-time only)

```bash
npm i satori @resvg/resvg-js
npm i -D @fontsource/commissioner @fontsource/jetbrains-mono
```

Note these are the **static** Fontsource packages (not the `-variable` ones the
site renders with). satori needs a static-weight `.woff`, which these ship;
`og.ts` reads them straight from `node_modules` via `require.resolve` (verified
to resolve cleanly).

### One config change (important — do this or the build fails)

`@resvg/resvg-js` is a **native** module; Vite will try to bundle it and choke.
Externalise it in `astro.config.mjs`:

```js
export default defineConfig({
  // ...existing config...
  vite: {
    ssr: { external: ['@resvg/resvg-js'] },
  },
});
```

The project is static output (the default), so the endpoint is prerendered and
the PNGs are written into `dist/og/` at build. (If you ever switch to a
server/hybrid adapter, add `export const prerender = true;` to the endpoint.)

### How it works

- `/og/<slug>.png` is generated per post at build time. `satori` composes the
  card (category label + rule, Commissioner title with real wrapping, site mark,
  and the **same Bauhaus geometry** as the post's on-page cover), rendering text
  to vector paths; `resvg` rasterises to a 1200×630 PNG.
- `BaseLayout` now always emits `og:image` + `og:image:width/height` +
  `twitter:card=summary_large_image`. Posts get their generated card; every
  other page falls back to `public/og-default.png`.
- The geometry is shared via `src/lib/cover-geometry.ts`, so a post's OG card and
  its on-page cover are always the same composition — they can't drift.

### Expect

- Build is a bit slower (one PNG per post). Fine at blog scale.
- After deploy, test a post URL in a preview debugger (e.g. the Facebook Sharing
  Debugger or a Slack/Discord paste). You should see the on-brand card. Social
  platforms cache OG images aggressively — if you change a post's title, they
  may show the old card until their cache expires.

---

## 2. robots.txt

`public/robots.txt` allows everything and points at the sitemap
(`https://ncxifaras.com/sitemap-index.xml`). Once live, submit that sitemap in
Google Search Console (one-time).

---

## 3. Accessibility fix — focus ring contrast

The `:focus-visible` outline was `--ochre` on `--paper` — measured **2.03:1**,
below the WCAG **3:1** for a focus indicator (1.4.11). Keyboard users got a weak
ring. Fixed with a two-tone ring: an **ink** outline (16.7:1 on paper — always
visible on light surfaces) plus an **ochre** halo (keeps the brand accent and
carries the contrast on dark/coloured surfaces like the ink skip-link, where an
ink outline would vanish).

Everything else in the a11y pass already passed — I measured the palette:

| Pair | Ratio | Verdict |
|---|---|---|
| ink on paper (body) | 16.7:1 | ✅ |
| ink-soft on paper (meta) | 7.6:1 | ✅ |
| cobalt-deep on paper (links) | 11.9:1 | ✅ |
| vermilion-deep / ochre-deep on paper | 8.4 / 7.5:1 | ✅ |
| cobalt on paper (large/non-text) | 7.1:1 | ✅ |
| **ochre focus ring on paper** | **2.03:1** | ❌ → fixed above |

**One guardrail (no code change, just don't do it):** paper text on a *vermilion*
fill is **4.05:1** — fine for large text, fails AA for small text. Nothing does
this today; if you ever add a filled policy-coloured chip/button, use **ink**
text on it (or the `--vermilion-deep` background), not paper.

The rest of the floor was already solid from Phase 1: visible focus, skip link,
reduced-motion handling, underlined links (not colour-only), semantic landmarks,
responsive images.

---

## 4. Performance notes (mostly already good)

- Fonts self-host as variable woff2 via Fontsource, which defaults to
  `font-display: swap` — no invisible-text flash. Good as-is.
- `PhotoCover` uses Astro's `<Image>` (optimised, lazy). Generated covers are
  inline SVG (tiny). OG images are static PNGs.
- **You should run Lighthouse on the deployed site** (I can't from here). Likely
  green already; the usual first nit is an explicit `width`/`height` or
  `loading="lazy"` on any images you add to post bodies — do that and you avoid
  layout shift.
- Optional micro-win if Lighthouse flags render-blocking fonts: preload the one
  or two most-used font files. Not worth it pre-emptively.

---

## Optional next: Pagefind search

Still unbuilt and flagged optional in the roadmap: **Pagefind** — static,
zero-backend search that indexes `dist/` after build and ships a small UI widget.
It's a clean drop-in (a build step + a search component) and fits the
no-backend/privacy posture. Say the word and I'll wire it as a Phase 4.5; it's
not needed for launch.

---

## After dropping these in

1. `npm i satori @resvg/resvg-js && npm i -D @fontsource/commissioner @fontsource/jetbrains-mono`
2. Add the `vite.ssr.external` line to `astro.config.mjs`.
3. `npm run build` — confirm `dist/og/*.png` exist and the build is green.
4. `npm run preview`, open a post, view source: `og:image` →
   `https://ncxifaras.com/og/<slug>.png`.
5. Commit `public/og-default.png` and `public/robots.txt`.
