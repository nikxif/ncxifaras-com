# Phase 1 — install & wiring

## 1. Install dependencies

```bash
npm i @astrojs/mdx @astrojs/sitemap \
  @fontsource-variable/commissioner \
  @fontsource-variable/alegreya \
  @fontsource-variable/jetbrains-mono
```

(If the blog starter already installed `@astrojs/mdx`/`sitemap`, npm will just no-op them.)

## 2. Drop in the files

Copy into the repo, overwriting the starter's versions where they exist:

```
astro.config.mjs                → repo root (replaces starter config; keep any
                                  extras the starter had if you added some)
src/styles/tokens.css           → new
src/styles/global.css           → new (replaces/retires the starter's global css)
src/layouts/BaseLayout.astro    → new (the starter's Layout/BlogPost layouts can
                                  be migrated onto this in Phase 2)
src/components/Header.astro     → replaces starter header
src/components/Footer.astro     → replaces starter footer
```

Then point one page at it to see it live, e.g. in `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Nick Xifaras" description="Physician & software developer in Athens.">
  <section class="container" style="padding-block: var(--space-6);">
    <h1>I build the tools clinical work keeps breaking.</h1>
    <p class="text-lede">Placeholder — real homepage lands in Phase 2.</p>
  </section>
</BaseLayout>
```

## 3. Fill the TODOs

- `src/components/Footer.astro` — real GitHub and Medium profile URLs.
- `public/favicon.svg` — the starter ships one; replace whenever.

## 4. Font swap note (important)

**Archivo was dropped**: it has **no Greek subset** (latin/latin-ext/vietnamese
only), which violates the D9 hard requirement. Display face is now
**Commissioner** (100–900 variable, native Greek — designed by Greek type
designer Kostas Bartsokas). If you want to audition alternatives
(Manrope / Alegreya Sans / Fira Sans — all verified Greek-capable), it's a
one-line change in `tokens.css` (`--font-display`) plus the matching import in
`BaseLayout.astro`.

## 5. Tuning the cobalt

Everything references `--cobalt` in `tokens.css`. Candidates to try live:
`#1E45C9` (current) · `#2B4FD8` (brighter) · `#1A3AAE` (deeper) ·
`#274ED6` / klein-ish `#2339B8`. Change one line, whole site follows.
If you change it, consider re-deriving `--cobalt-deep` (used for small
hover text) to keep contrast.

## 6. What's deliberately NOT here yet

- GoatCounter snippet (account pending + your AdGuard is eating it locally
  anyway) — lands with a small `<Analytics />` include later.
- Content collections/schemas, post pages, homepage proper → Phase 2.
- Sidenotes, covers → Phase 3.
