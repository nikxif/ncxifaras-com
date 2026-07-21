# Phase 2 — install & wiring

## 1. Drop in the files

```
src/content.config.ts            → REPLACES the starter's version
src/lib/posts.ts                 → new
src/components/Analytics.astro   → new (GoatCounter, prod-only)
src/components/PostCard.astro    → new
src/components/SectionHead.astro → new
src/components/Header.astro      → replaces Phase 1 version (nav: Writing → /writing)
src/layouts/BaseLayout.astro     → replaces Phase 1 version (adds <Analytics/>)
src/layouts/PostLayout.astro     → new (replaces the starter's BlogPost.astro)
src/pages/index.astro            → REPLACES the placeholder — real homepage
src/pages/writing.astro          → new (curated/featured view)
src/pages/about.astro            → new (placeholder copy)
src/pages/cv.astro               → new (quiet, hand-written v1)
src/pages/posts/[...page].astro  → new (paginated archive)
src/pages/posts/[id].astro       → new (post pages)
src/pages/tags/[tag].astro       → new
src/pages/rss.xml.js             → replaces the starter's rss route if present
src/content/blog/hello.md        → sample post (delete later)
src/content/blog/sample-tutorial.md → sample post (delete later)
```

## 2. Retire the starter leftovers (the clean sweep)

Delete these — everything they did is now done by BaseLayout/PostLayout:

```bash
rm -f src/components/BaseHead.astro \
      src/layouts/BlogPost.astro \
      src/consts.ts            # if only BaseHead/starter pages used it
rm -rf src/content/blog/<the starter's lorem posts>
rm -f public/fonts/atkinson-*.woff*
```

Also delete any starter pages that referenced them (e.g. the starter's
`src/pages/blog/...` routes — our archive lives at `/posts`). Then:

```bash
grep -rn "BaseHead\|BlogPost\|consts" src/   # should return nothing
```

If the starter had `src/pages/blog/[...slug].astro` etc., removing the whole
`src/pages/blog/` directory is correct.

## 3. CSP: activate GoatCounter

In `public/_headers`, replace both `YOURCODE.goatcounter.com` occurrences with
**`nikxif.goatcounter.com`**. The relevant directives end up as:

```
script-src 'self' https://gc.zgo.at
connect-src 'self' https://nikxif.goatcounter.com
img-src 'self' data: https://nikxif.goatcounter.com
```

Note: the Analytics component uses `https://gc.zgo.at/count.js` (explicit
scheme, not GoatCounter's protocol-relative `//gc.zgo.at`) and only renders in
production builds — so dev traffic never hits your stats, and you won't see it
locally. To verify after deploying: load the live site, then check
https://nikxif.goatcounter.com for the pageview. (Remember your own AdGuard
will block the beacon on your LAN unless you allowlisted it.)

## 4. Run it

```bash
npm run dev
```

Expected:
- `/` — hero with the geometric motif; "Writing" section led by the featured
  sample tutorial (ochre chip), 1 more post below.
- `/posts` — archive with both samples + tag cloud + (no pager yet, 2 posts).
- `/posts/sample-tutorial` — post page: chip, meta, prose styling, highlighted
  code, Greek text rendering in Alegreya + JetBrains Mono.
- `/writing` — the featured sample only.
- `/tags/meta`, `/tags/sample`, `/tags/astro` — tag views.
- `/about`, `/cv` — placeholder structure.
- `/rss.xml` — valid feed.

## 5. Known TODOs after this phase

- Real copy for `/about`; real data for `/cv` (v1 hand-written; master-CV
  transform is v2 — D5).
- Replace the two sample posts with your first real content — including
  re-hosting the two Medium pieces (then set their Medium canonicals).
- Phase 3: `<Sidenote>` MDX component + the cover system (generated Bauhaus +
  duotone photos), which slots into PostCard above the meta row.
