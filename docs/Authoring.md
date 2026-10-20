# Authoring & publishing — ncxifaras.com

Everything you need to write, publish, and cross-post. Skim the checklist at the
bottom before every publish; the rest is reference.

---

## 1. Where posts live

```
src/content/blog/<slug>/index.mdx   ← one folder per post (what Sveltia writes)
src/content/blog/<slug>/cover.jpg   ← its images sit beside it
```

**The folder name is the URL.** `my-post/index.mdx` → `https://ncxifaras.com/posts/my-post`.
A few old flat files (`<slug>.md`) still load, because the loader globs both, but new posts go in a folder.

Images are referenced by **bare filename** (`cover.jpg`, `figure.png`), which is
exactly what Sveltia writes, so hand-written and CMS-written posts look the same.
Imports count from the post's folder, so `src/` is **three** levels up
(`../../../components/Sidenote.astro`). The old flat files used `../../`.
Pick the slug deliberately: short, hyphenated, keyword-bearing, no dates. Renaming
it later changes the URL and breaks inbound links (you'd need a redirect rule),
so get it right the first time.

`index.mdx` is the norm, so sidenotes are always available. Plain `.md` works too,
but it can't import components.

---

## 2. Frontmatter

Every post starts with a YAML block. The schema is enforced at build time, so a
typo or missing required field **fails the build** instead of shipping broken.

```yaml
---
title: "Front-loaded, keyword-first, under ~60 chars"
description: "One or two sentences. Used for the SERP snippet, OG/social preview, and RSS. ~150–160 chars."
pubDate: 2026-07-22
updatedDate: 2026-08-01        # optional — shows "updated" + helps SEO on revisions
category: guide                # one of: project | guide | opinion | personal
tags: ["greek-health", "fastapi"]
featured: false                # true → homepage lead slot + /writing
draft: false                   # true → hidden in production, visible in dev
coverMode: generated           # generated (default) | photo
cover: "cover.jpg"            # only when coverMode: photo — a file in the post's folder
canonicalURL: "https://..."    # RARELY needed — see §5
---
```

**Use double quotes for strings.** An apostrophe inside single quotes ends the
YAML string and produces "bad indentation of a mapping entry", an error that
points nowhere useful.

| Field | Required | Notes |
|---|---|---|
| `title` | ✅ | Also the `<title>`, `<h1>`, OG title, RSS title. |
| `description` | ✅ | Meta description + OG + RSS. Write it for a human skimming a search result. |
| `pubDate` | ✅ | Drives ordering (newest first) and the displayed date. |
| `updatedDate` | — | Shows "updated" on the post. |
| `category` | — (defaults to `personal`) | One of the four enum values, or the build fails. Colour-coded. |
| `tags` | — | Finer-grained than category; each becomes `/tags/<tag>`. |
| `featured` | — | Surfaces on the homepage lead + `/writing`. Don't feature everything — it's a curation signal. |
| `draft` | — | `true` keeps it out of production builds, RSS, and sitemap. |
| `coverMode` | — (defaults to `generated`) | See §4. |
| `cover` | only if `photo` | Path to the image, relative to the post file. Validated by `image()`: a wrong path fails the build. |
| `canonicalURL` | — | Leave unset for your own original posts (see §5). |

**Categories are capped at four by design**, because each owns a colour. They
describe what *kind* of post it is. The subject goes in tags.

| category | colour | for |
|---|---|---|
| `project` | cobalt | I built something |
| `guide` | ochre | how to do something (incl. OSINT challenge solves) |
| `opinion` | vermilion | an argument or stance (incl. policy) |
| `personal` | ink | notes, meta, everything else |

If you're tempted to add a fifth, it's probably a tag, not a category. A real new
category touches six places (enum, labels, palette hex, token, `.cat-*` CSS,
Sveltia options); see `CLAUDE.md`.

---

## 3. Sidenotes (`.mdx` only)

Import once at the top, then write them **inline, mid-sentence**, exactly where
the marker should appear:

```mdx
---
title: "..."
# ...frontmatter...
---
import Sidenote from '../../../components/Sidenote.astro';

The main claim sits here,<Sidenote>the aside that would otherwise clutter the sentence</Sidenote> and the sentence carries on.

You can force a custom marker<Sidenote label="†">like this dagger, instead of the running number</Sidenote> when you want one.
```

- Desktop: always visible in the right margin, aligned to the paragraph's top.
- Mobile: collapses to a `[n]` marker that expands on tap.
- **Write them inside a paragraph, not on their own line.** A sidenote between
  paragraphs has no paragraph to anchor to and won't place correctly.
- Known rough edges (fine for normal use): alignment is to the paragraph top, not
  the exact line; and two notes crammed into adjacent short paragraphs can overlap
  in the margin. Space them out and you'll never see it.

---

## 4. Covers

**Default (`generated`): do nothing.** Each post gets a deterministic geometric
cover seeded from its slug, in its category colour. Same slug → same cover, always.

**Photo cover:** set `coverMode: photo` and `cover: "yourimage.jpg"`, with the file
in the post's folder. **Never `public/`.** Files
there skip optimisation and fail `image()` validation. The image is duotoned into
the category colour (ink → category → paper) to match the generated covers. The
treatment has been validated on real photos.

**Inline images with captions:** the markdown *title* becomes a visible caption,
while alt text stays alt text:

```md
![What a screen reader should hear](figure.png "Visible caption. Credit: [Name](https://…)")
```

This only applies when the image is alone in its paragraph.

---

## 5. Cross-posting to Medium (POSSE)

The model: **your site is the original and canonical home; Medium is a syndicated
copy that points back to you.** Done right, Google credits *your* site as the
source even though Medium has more traffic. Done wrong (a naive copy-paste), you
create a duplicate that can outrank your own page. The mechanism that makes it
right is the **canonical link**, and the reliable way to set it is Medium's
**Import tool** — it sets the canonical automatically.

**Steps, every time:**

1. **Publish on your site first.** It must be live at its real URL before you
   import — Medium fetches from that URL.
2. Go to **medium.com** → your avatar → **"Stories"**, or straight to the import
   page (top-level menu → **"Import a story"**). Paste the full post URL
   (`https://ncxifaras.com/posts/<slug>`).
3. Medium fetches it and creates a **draft**. Behind the scenes it sets the
   canonical tag to your URL — this is the whole point of using Import rather than
   pasting.
4. **Fix up the draft.** Medium's importer mangles things:
   - **Sidenotes won't survive** as margin notes (they're a custom element).
     Rewrite them inline as parentheticals, or drop them, on the Medium copy.
   - **Code blocks** sometimes lose language/formatting — recheck them.
   - **The generated SVG cover won't carry over** as a real image. Add a proper
     image at the top if you want a decent Medium preview/social card.
   - Check links resolve (internal `/posts/...` links become absolute — verify).
5. **Publish** on Medium. Add to any relevant Medium publications after.
6. **Verify the canonical.** On the published Medium story it should say
   *"Originally published at ncxifaras.com"* and the page's canonical should point
   to your URL. If it doesn't, you pasted instead of imported — delete and redo
   via Import.

**Backfill:** your two existing Medium posts predate the site. Once you've
re-hosted them here, either (a) leave the Medium originals and add
`canonicalURL: '<their-medium-URL>'` to *your* copies to concede canonical to
Medium, or (b) better — treat your site as canonical: keep your versions
canonical-free, and on the Medium originals there's no easy retroactive canonical,
so the cleanest fix is to unpublish/replace them via the Import flow above so the
canonical points home. (b) is more work but correct long-term; (a) is a one-line
shortcut. Your call per post.

> `canonicalURL` in frontmatter is **only** for case (a) — when you're deliberately
> pointing Google at a copy that lives elsewhere. For anything you wrote here
> first, leave it unset; the site is canonical by default.

---

## 6. SEO notes

Most of the plumbing is automatic (canonical tags, sitemap, RSS, OG tags, clean
URLs). What's left is the writing:

- **`title` and `description` are your SERP listing.** Write them as if you're
  looking at them in Google results. Front-load the title; make the description
  earn a click. Every post must have a real description — don't reuse a generic one.
- **Slugs are permanent-ish.** Short, descriptive, hyphenated. Changing them later
  loses accumulated link equity.
- **Alt text on images** (accessibility + image search). Photo covers take it from
  the title automatically; inline images in a post need it written: `![clear description](path)`.
- **Internal links help.** Link between related posts and lean on tags — it spreads
  crawl equity and keeps people reading.
- **Submit the sitemap once.** In Google Search Console, add the property and submit
  `https://ncxifaras.com/sitemap-index.xml`. Do it once; it auto-updates thereafter.
- **`updatedDate` signals freshness** on substantive revisions — use it when a post
  materially changes, not for typos.
- **OG images are automatic.** Each post gets `/og/<slug>.png` at build time,
  using the same geometry as its generated cover. Other pages use
  `public/og-default.png`. Platforms cache these aggressively, so a retitled post
  may show the old card for a while.

---

## 7. Publishing = git push

The repo is the source of truth. You can edit in **Sveltia at `/admin`**, which
commits to the same repo, or by hand. Either way, publishing is a push to `main`:

```bash
git add .
git commit -m "post: <slug>"
git push
```

Cloudflare Pages sees the push, builds, and deploys (~1–2 min). If the build
**fails**, it's almost always a frontmatter schema error — the Cloudflare build
log names the file and field. Fix, push again.

To preview locally before pushing:

```bash
npm run dev      # drafts visible here; the live site hides them
```

---

## 8. Pre-publish checklist

Run through this before every `git push`:

- [ ] **Slug** (folder name) is final, short, keyworded — you won't want to rename it.
- [ ] **`title` + `description`** are written for search results, not placeholders, in double quotes.
- [ ] **`category`** is one of `project` / `guide` / `opinion` / `personal`.
- [ ] **`pubDate`** is correct.
- [ ] **`draft: false`** (or the field is gone) — otherwise it won't appear in prod.
- [ ] Sidenotes are **inline**, inside paragraphs; the import path is `../../../components/Sidenote.astro`.
- [ ] **Images are self-hosted** in the post's own folder, **never
      `public/`**. External/hotlinked images are blocked by the strict CSP (`img-src 'self'`). Same goes for
      embeds (YouTube, tweets, gists): they'll be **blocked** unless we add CSP
      rules for them — tell me before relying on an embed.
- [ ] Internal links have **no trailing slash** (`/posts/foo`, not `/posts/foo/`).
- [ ] Ran `npm run dev` and eyeballed the post, its cover, and any sidenotes.
- [ ] Ran `npm run build` green. A red build doesn't deploy; the live site silently stays on the last good version.
- [ ] After deploy: the post URL loads, it's in `/rss.xml`, and (a day later) in
      Search Console.
- [ ] If cross-posting: site version is **live first**, then use Medium **Import**
      (not paste), then **verify the canonical** points home.

---

### Gotchas worth remembering

- **GoatCounter won't show your own visits** — it's production-only, your IP is
  ignored, and your LAN AdGuard blocks the beacon. Check stats from off your
  network / another device, on the live site.
- **The build failing is a feature.** The schema is your safety net; a red build
  means it caught something before your readers did.
- **Strict CSP is the main "why won't this work" culprit** for anything third-party
  (images, fonts, embeds, scripts). First-party works; external needs a header
  change. That's deliberate (privacy + security), not a bug.