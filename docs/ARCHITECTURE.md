# Architecture

Content model and routing. The *why* lives in `DECISIONS.md`. This file is the
map of what exists.

## Content model

Two collections, both defined in `src/content.config.ts`. The Zod schemas there
are the source of truth, and `public/admin/config.yml` mirrors them by hand.

### `blog` (`src/content/blog/`)

One folder per post: `<slug>/index.mdx`, with its images beside it. The folder
name becomes `post.id` and the URL. A few older flat files (`<slug>.md` / `.mdx`) still load, because the
loader globs `**/*.{md,mdx}`.

| field | type | default | notes |
|---|---|---|---|
| `title` | string | — | `<title>`, `<h1>`, OG, RSS |
| `description` | string | — | dek, meta description, OG, RSS |
| `pubDate` | date | — | ordering, newest first |
| `updatedDate` | date? | — | shown as "updated" |
| `category` | `project` \| `guide` \| `opinion` \| `personal` | `personal` | colour-coded, capped (D12, D24) |
| `tags` | string[] | `[]` | free-form; each gets `/tags/<tag>` |
| `featured` | boolean | `false` | homepage lead slot + `/writing` |
| `draft` | boolean | `false` | visible in dev, excluded from prod, RSS and sitemap |
| `cover` | `image()`? | — | photo mode only; bare filename of an image in the post's folder (D20) |
| `coverMode` | `generated` \| `photo` | `generated` | dispatched by `Cover.astro` |
| `canonicalURL` | url? | — | only when the canonical copy lives elsewhere (D4) |

### `pages` (`src/content/pages/`)

Prose pages with `title` and `description` only: `about`, `contact`, `privacy`.
Each renders through `src/pages/[page].astro`.

### Non-collection data

- `src/data/cv.yaml` → `/cv` (D23). Structured, not prose.

## Routes

| route | file | what |
|---|---|---|
| `/` | `pages/index.astro` | hero thesis + lead post + three recent (not a blog river) |
| `/writing` | `pages/writing.astro` | curated: featured posts only, a view over `blog` (D3) |
| `/posts`, `/posts/2`… | `pages/posts/[...page].astro` | full archive, 12 per page, compact cards |
| `/posts/<id>` | `pages/posts/[id].astro` | a post, rendered in `PostLayout` |
| `/tags/<tag>` | `pages/tags/[tag].astro` | posts carrying a tag |
| `/about`, `/contact`, `/privacy` | `pages/[page].astro` | the `pages` collection |
| `/cv` | `pages/cv.astro` | from `cv.yaml`; deliberately quieter |
| `/og/<id>.png` | `pages/og/[id].png.ts` | build-time OG card per post (D17) |
| `/rss.xml` | `pages/rss.xml.js` | published posts |
| `/sitemap-index.xml` | `@astrojs/sitemap` | — |
| `/admin` | `public/admin/` | Sveltia CMS, with its own relaxed CSP (D28, D29) |

Nav order: About · CV · Writing (`/posts`, also current on `/posts/*`, `/tags/*`, `/writing`) · Contact. The curated `/writing` view (D3) is no longer a nav item while nothing published is featured.

URLs never have a trailing slash (`trailingSlash: 'never'`). Canonical URLs are
built from `site` in `astro.config.mjs` unless a post sets `canonicalURL`, which
is also what de-duplicates the `*.pages.dev` mirror.

## Query helpers (`src/lib/posts.ts`)

- `getPublishedPosts()`: non-drafts in prod (everything in dev), newest first. All listings go through it.
- `getFeaturedPosts()`, `getAllTags()`, `formatDate()` (en-GB), `CATEGORY_LABELS`.

## Rendering pipeline

- Markdown/MDX through `unified` explicitly, with `rehype-figure-caption` (D21, D22).
- Images: `image()` → `<Image>` → hashed `/_astro/` URLs in the build (dev serves `/_image?href=…`).
- Covers: `Cover.astro` dispatches to `GeneratedCover` (SVG from `cover-geometry.ts`) or `PhotoCover` (duotone SVG filter, hex from `palette.ts`).
- OG: `og.ts` reuses `cover-geometry.ts` and `palette.ts`, rendering with satori → resvg.

## Layouts

- `BaseLayout.astro`: head, canonical, OG/Twitter tags, fonts, prod-only analytics.
- `PostLayout.astro`: post chrome, the sidenote counter, and the ≥70rem paragraph positioning context (D15).
