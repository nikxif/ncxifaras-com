# Fix: photo covers (broken image + dead duotone)

Two separate bugs, both mine. The broken image is the one you saw; the second
would have bitten you the moment the first was fixed.

## Bug 1 — the broken cover image

`cover` was typed `z.string()` in the schema, so `PhotoCover` got a plain string
and emitted the author-relative path straight into the HTML:

```html
<img src="../../assets/foo.jpg">
```

The browser resolves that against the **page URL** (`/posts/my-post`), but Astro
has already optimised and content-hashed the file into `/_astro/foo.<hash>.jpg`.
Result: 404.

**Why the same path worked in the post body:** markdown images go through
Astro's build-time image pipeline, which rewrites relative paths to the hashed
URL. Frontmatter strings don't get that treatment — you have to opt in with the
`image()` helper. That asymmetry is the whole bug.

**Fix:** the schema now uses the `image()` helper, which resolves the path
relative to the markdown file at build time and yields real `ImageMetadata`.
`PhotoCover` takes `ImageMetadata` only (the raw-string branch is gone, so this
can't silently regress) and renders through `<Image>`.

**Your frontmatter doesn't change** — `cover: ../../assets/foo.jpg` still works,
it just resolves properly now.

## Bug 2 — the duotone never actually worked

The ramp was written as:

```html
<feFuncR tableValues="0.10 var(--duo-r) 0.98" type="table" />
```

`tableValues` is an **SVG attribute**, not a CSS property — `var()` doesn't
resolve there. And `--duo-r/g/b` were never defined anywhere in the first place.
So the filter was fed garbage regardless of the image.

**Fix:** ramp values are now real numbers computed in `src/lib/palette.ts` from
the actual palette — a three-stop map of ink → category colour → paper, per
channel. Also switched the greyscale step from a flat `0.33/0.33/0.33` split to
Rec. 709 luminance weights (`0.2126/0.7152/0.0722`), which is perceptually
correct — the flat split makes reds and blues muddy.

`duotone-preview.png` shows the result rendered across all four categories, so
you can judge the effect before committing to it.

## Files

```
NEW  src/lib/palette.ts              ← Category type + concrete hex + duotone maths
EDIT src/content.config.ts           ← cover: image() instead of z.string()
EDIT src/components/PhotoCover.astro ← ImageMetadata only; real ramp values
EDIT src/lib/og.ts                   ← imports palette (its own PAL copy deleted)
EDIT src/lib/cover-geometry.ts       ← Category re-exported from palette
EDIT src/components/GeneratedCover.astro ← uses shared Category type
```

`Cover.astro` and `src/pages/og/[id].png.ts` need **no change** (the latter is
included only for completeness — it's unchanged from Phase 4).

## Consolidation: one source of truth

Folding `og.ts` into the shared palette surfaced two real inconsistencies that
were sitting there quietly:

**1. The `note` colour disagreed with itself.** `tokens.css` defines
`--cat-note: var(--ink)`; `og.ts` matched, but the first cut of `palette.ts`
used ink-soft. Photo covers would have rendered a *different* "note" colour than
chips, generated covers, and OG cards.

Fixed by separating two genuinely different needs:
- `CATEGORY_HEX` now mirrors `tokens.css` **exactly** (`note` = ink).
- `DUOTONE_MID` overrides `note` → ink-soft **for the duotone only**, because
  the ramp's shadow stop is already ink — a mid stop equal to the shadow
  collapses the ramp and crushes the image to a flat block. That override is
  now documented in-file rather than being an accidental deviation.

**2. `Category` was declared three times** — in `cover-geometry.ts`, in
`palette.ts`, and inline in `GeneratedCover.astro`. Now declared **once** in
`palette.ts` (derived from `CATEGORY_HEX`, so the type and the colours can't
drift apart) and imported everywhere. `cover-geometry.ts` re-exports it so any
existing `import { type Category } from './cover-geometry'` still resolves.

Audited afterwards: no inline category unions remain, and **no accent hex
appears anywhere outside `palette.ts`**.

### What this means for changing categories

The touchpoint list from before shrinks. Adding or renaming a category is now:

1. `src/content.config.ts` — the `CATEGORIES` enum (schema validation)
2. `src/lib/posts.ts` — `CATEGORY_LABELS` (display name)
3. `src/lib/palette.ts` — `CATEGORY_HEX` (and a `DUOTONE_MID` override if the
   colour is very dark or very light)
4. `src/styles/tokens.css` — the `--cat-<name>` token
5. CSS rules — `.cat-<name>` in `PostCard.astro`, `PostLayout.astro`,
   `PhotoCover.astro`

Down from nine to five, and the TypeScript side is fully automatic now.

## ⚠️ Where your image lives matters

This fix assumes images in **`src/assets/`** (referenced relatively from the
post). That's the recommended location — those get optimised, hashed, and
served efficiently.

If you instead put the image in **`public/`** and referenced it absolutely
(`cover: /images/foo.jpg`), `image()` will **reject it at build time** —
`public/` files are copied verbatim and have no build-time metadata. Either move
the image into `src/assets/` (preferred), or tell me and I'll widen the schema
to accept both.

## Maintenance seam worth knowing about

`src/lib/palette.ts` duplicates the palette as concrete hex, because two
contexts genuinely can't read CSS custom properties: SVG filter attributes and
the OG image raster. **If you tune `--cobalt` (or any accent) in `tokens.css`,
update `palette.ts` too**, or photo covers and OG cards will drift from the site.

## Verify

```bash
npm run dev
```

- The post with `coverMode: photo` shows a duotoned cover on `/posts` and on the
  post page — no broken icon.
- View source: the cover `<img>` points at `/_astro/…` with a hash.
- Several photo covers on one index page each render (filter ids are unique per
  instance now — they used to collide).
