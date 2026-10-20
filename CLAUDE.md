# ncxifaras.com

Personal site + blog for Nick Xifaras (physician & software developer, Athens).
Astro static site on Cloudflare Pages. Private repo. Single author.

**Read `docs/DECISIONS.md` before changing anything architectural** — it's an ADR
log (D1–D35) explaining *why* things are the way they are. Most odd-looking
choices here are deliberate and were paid for in bugs.

---

## Stack

| | |
|---|---|
| Astro | 7.4.x — static output, `trailingSlash: 'never'` |
| MDX | `@astrojs/mdx` 8.x (peers on markdown-remark ^7.3.0 — do not downgrade) |
| Markdown processor | **`unified`**, explicitly (`@astrojs/markdown-remark`) |
| Host | Cloudflare Pages, push-to-deploy from `main` |
| Analytics | GoatCounter (`nikxif`), prod-only component |
| CMS | Sveltia (optional, at `/admin`) — the repo is still the source of truth |

### Version-sensitive patterns (these changed across Astro 5→6→7)

- `z` imports from **`astro/zod`**, not `astro:content`
- Post identifier is **`post.id`**, never `post.slug`
- `render()` imports from **`astro:content`**
- Content config lives at **`src/content.config.ts`** (not `src/content/config.ts`)
- Plugins go on **`markdown.processor: unified({...})`**, not `markdown.rehypePlugins`
  (deprecated, removed in Astro 8)

### Why unified and not Sätteri

Sätteri is Astro's faster default processor but **runs no remark/rehype plugins
at all**. We depend on a local rehype plugin (figure captions) and on the unified
pipeline's `__ASTRO_IMAGE__` mechanism. Switching would mean rewriting that
plugin against Sätteri's `hastPlugins` API. Don't switch casually — see D22.

---

## Commands

```bash
npm run dev       # localhost:4321 — drafts visible here, hidden in prod
npm run build     # the real test; schema violations fail here by design
npm run preview   # serve dist/ — use this to check OG images and /_astro/ paths
```

A failing build is usually the Zod schema catching bad frontmatter. That's
working as intended — it names the file and field.

---

## Layout

```
src/
  content/
    blog/<slug>/index.mdx    posts — one folder each, images beside it (bare filenames)
    pages/*.md               about, contact, privacy
  content.config.ts          Zod schemas — the source of truth for frontmatter
  data/cv.yaml               CV content (structured, not prose)
  lib/
    palette.ts               Category type + concrete hex  ⚠ sync seam
    cover-geometry.ts        shared SVG geometry (on-page covers + OG images)
    og.ts                    build-time OG image generation (satori + resvg)
    posts.ts                 query helpers + CATEGORY_LABELS
  components/
    Sidenote.astro           the signature element
    Cover.astro              dispatches generated vs photo
    GeneratedCover.astro     deterministic Bauhaus SVG
    PhotoCover.astro         duotone filter
    ShareButtons.astro       no third parties
  layouts/
    BaseLayout.astro         head, OG tags, fonts, analytics
    PostLayout.astro         post chrome + sidenote positioning context
  pages/
    [page].astro             renders every entry in the `pages` collection
    posts/[id].astro         one page per post
    og/[id].png.ts           one OG image per post
  plugins/
    rehype-figure-caption.mjs
    rehype-image-sizes.mjs   correct `sizes` for markdown images (D32)
  styles/
    tokens.css               design tokens  ⚠ sync seam
    global.css               base + .prose typography
public/
  _headers                   security headers + CSP  ⚠ see CSP note below
  admin/                     Sveltia CMS (config.yml mirrors content.config.ts)
```

---

## Rules that will bite you

### 1. Three sync seams with nothing enforcing them

**Accent colours** live in both `src/styles/tokens.css` (as CSS vars, for the
browser) and `src/lib/palette.ts` (as hex, for SVG filter *attributes* and the
OG raster — neither can read CSS vars). Change one, change the other, or photo
covers and OG cards drift from the site.

**Categories** touch 6 places. Current set: `project` · `guide` · `opinion` ·
`personal`.
1. `src/content.config.ts` — the enum (schema validation)
2. `src/lib/posts.ts` — `CATEGORY_LABELS` (typed against `Category`, so a
   missing key is a build error)
3. `src/lib/palette.ts` — `CATEGORY_HEX` (+ `DUOTONE_MID` if the colour is very
   dark or very light)
4. `src/styles/tokens.css` — `--cat-<name>`
5. `.cat-<name>` CSS rules in `PostCard.astro`, `PostLayout.astro`, `PhotoCover.astro`
6. `public/admin/config.yml` — the select options

Change the enum first, run the build, and let the errors walk you through the
posts needing updated frontmatter.

**Sveltia config** (`public/admin/config.yml`) duplicates `content.config.ts` by
hand. Nothing checks they agree. Same commit, always.

### 2. Content authoring

- `cover` is typed with the **`image()`** helper, not `z.string()`. Post images go in
  the post's own folder, referenced by bare filename (what Sveltia writes) —
  **never `public/`**, which gets copied
  verbatim with no optimisation and will fail `image()` validation.
- Frontmatter strings use **double quotes**. Apostrophes terminate single-quoted
  YAML and produce a "bad indentation of a mapping entry" error pointing nowhere
  useful.
- `<Sidenote>` is authored **inline, mid-sentence**, inside a paragraph. It
  anchors to the paragraph it lives in (`left: 100%` against a `position:
  relative` `<p>`). A sidenote between paragraphs has nothing to anchor to.
- Internal links carry **no trailing slash**.

### 3. The CSP blocks third parties, deliberately

`public/_headers` has a strict CSP. External images, fonts, scripts and embeds
(YouTube, tweets, gists) are blocked by default. That's the point — the privacy
page makes factual claims that depend on it.

**If you add an embed or external asset, update `src/content/pages/privacy.md`
in the same commit.** It currently states there are none.

**Cloudflare `_headers` combines duplicate headers rather than overriding them.**
Two matching rules that both set `Content-Security-Policy` produce two policies,
and the browser enforces the *intersection* — so a looser rule on a sub-path
cannot widen a stricter global one. Remove first with `! Content-Security-Policy`
under the more specific rule, then set. `/admin` carries a relaxed policy this
way (it needs `api.github.com`, plus `cdn.jsdelivr.net` for icon fonts and
`unpkg.com` for lazy-loaded chunks).

### 4. Build config that looks removable but isn't

```js
vite: {
  plugins: [yaml()],                       // cv.yaml import
  ssr: { external: ['@resvg/resvg-js'] },  // native module; Vite chokes bundling it
}
```

### 5. Unsigned-shift bug class

`src/lib/cover-geometry.ts` derives cover variants from hash bits. Use **`>>>`,
never `>>`** — the signed shift goes negative on high-bit hashes, and
`negative % n` stays negative, which indexes arrays out of bounds. This crashed
the posts page once.

### 6. Fonts in OG images need per-script registration

`satori` does no subset resolution — it uses exactly the byte arrays passed to
it. Latin and Greek are registered under **distinct family names**
(`Commissioner` / `CommissionerGreek`) with a CSS-style fallback list at each use
site. Registering two files under the *same* family does not fall back; satori
matches the first and stops. Any script outside latin+greek will render as tofu
until added the same way.

### 7. Prose styles live in global.css

`.prose` typography is in `src/styles/global.css`, not `PostLayout.astro`, because
Astro only bundles a component's CSS on pages that render it — and `/about` and
friends don't use `PostLayout`. Two rules stay behind in `PostLayout` on purpose:
the sidenote `counter-reset` and the ≥70rem paragraph positioning context.

---

## Verification discipline

This project has a history of changes that *looked* right and weren't. Four
separate times, a fix was declared working while the rendered output was visibly
broken. The pattern each time: reasoning about the mechanism instead of
inspecting the result.

So:

- **Visual changes** (sidenote geometry, covers, OG cards, layout): render them
  and look. If you can't look, say so and ask the user to check — don't assert.
- **Build-pipeline changes** (image handling, markdown plugins, OG generation):
  run `npm run build`, then grep `dist/` for the actual output. A captioned image
  must come out as `/_astro/<name>.<hash>.<ext>`. Dev serves `/_image?href=…`,
  which is also correct — don't confuse the two.
- **Don't invent a metric that can't fail.** A "verification" that passes on
  known-broken output is worse than no verification.
- Sidenotes and OG images are the two most fragile surfaces. Changes near them
  get checked, not assumed.

---

## House style

- Prose in the user's voice — direct, specific, no marketing register. Match the
  existing pages rather than importing a generic tone.
- Comments explain **why**, not what. The non-obvious constraint, not the syntax.
- No new dependencies without a reason that survives "could this be twenty lines
  instead". The site is deliberately small.
- Push back on changes that trade a real property (privacy posture, no-JS
  sidenotes, build-time everything) for convenience. The user prefers an argument
  to silent compliance.

---

## Root design context

- `PRODUCT.md`: who the site is for, what success means, and the product constraints (Impeccable reads it).
- `DESIGN.md`: the token spec and component rules, written from the shipped code, with `.impeccable/design.json` as its sidecar. Keep it in sync with `tokens.css` and `palette.ts`. It's the fourth place a palette change touches.

## Further reading (in `docs/`)

| File | What's in it |
|---|---|
| `DECISIONS.md` | ADR log D1–D35. The why behind everything above. |
| `Authoring.md` | Day-to-day: frontmatter reference, Medium cross-posting, SEO, pre-publish checklist. |
| `INFRASTRUCTURE.md` | DNS, email, headers, analytics runbook. |
| `ARCHITECTURE.md` | Content model and routing. |
| `DESIGN.md` | The why behind the palette, type, sidenotes and cover system. The token spec is the root `/DESIGN.md`. |
| `ROADMAP.md` | What's done, what's deferred (Pagefind, sidenote polish). |
