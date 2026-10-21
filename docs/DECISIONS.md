# Decisions

A running log of what we chose, why, and what we rejected. Newest context wins if anything here conflicts with older notes.

## Open items (not yet settled)

- **Resume transform** — `/cv` renders from hand-maintained `src/data/cv.yaml` (D23); the `cv-master.yaml → site` transform is still v2 (see D5).
- **"Read next" at the end of a post reads like a publishing platform** — a full-width section head ("Read next · all posts →") over a thumbnail card is the recommended-reading pattern of a publication, which this personal site isn't. Flagged by the author (and independently by the Oct 2026 critique); kept for now. Not decided: a quieter plain-text link in the site's own voice, or no forward link at all. On the Oct 2026 polish pass its heading was stepped down to the article's own h2 size over a hairline (`SectionHead quiet`) so the last paragraph stays the end of the page. Whatever replaces it should come from the site's own grammar (mono annotation, ink rules, sidenote-like asides), not from a blog template. Also open: on a Greek post it currently points at an English one.

### Settled since first written
- **Cobalt shade** — locked at `#1A3AAE` (was `#1E45C9` in the first palette draft). Still a token; still mirrored in `palette.ts`.
- **Photo-cover treatment** — validated against real photos (three published posts use photo covers). The duotone-in-category-colour direction (D12) stands.
- **Generated-cover style** — the current six-composition generator (D16) is the approved execution.

> D15–D29 were reconstructed after the fact (Oct 2026) from commits, the `PHASE*-README` notes, code comments and `CLAUDE.md`, because they were made during build without being logged here. Numbering follows commit order.

---

## D1 — Static site generator: Astro
**Decision:** Build on Astro.
**Why:** Markdown-first with typed content collections; zero-JS static output (genuinely lightweight); customisation is plain HTML/CSS/components, so making it "look mine" is pleasant rather than a fight.
**Rejected:**
- *Hugo* — great binary/speed/markdown story, but Go templating punishes exactly the design customisation this site needs. Wrong tool for a design-forward personal site.
- *Zola / 11ty* — fine, but don't beat Astro on the customisation-DX axis that matters here.
- *Quartz* — purpose-built to publish an Obsidian vault as a digital garden; irrelevant since the vault is not the source of truth and no wikilink/graph behaviour is wanted.
**Node caveat, accepted:** dependencies are build-time only; the shipped output is static, so there's no runtime rot and nothing reaches visitors.

## D2 — Hosting: Cloudflare Pages
**Decision:** Cloudflare Pages, deploy-on-push from GitHub. Not self-hosted.
**Why:** Unlimited + per-project-isolated bandwidth (no limit-induced pause risk, ever); very large global edge network (marginally better TTFB for an international/EU audience); strong modern-protocol support (HTTP/3, Brotli); consolidates the site with Cloudflare Tunnel + DNS already being adopted. As a *new* site, Netlify's "already set up" advantage was thin.
**Why not self-host:** professional front page shouldn't ride on home internet or expose a home IP.
**Rejected:**
- *Netlify (legacy free)* — genuinely fine (grandfathered 100GB), but the 100GB is *shared* across all team sites and a blown pool pauses every site together; its edge/protocol story is marginally behind. Better kept for the small sites already there.
- *Netlify current credit-based tier* — ≈15GB, hard pause. Not viable.
**Note:** SEO/speed treated as a tie between the two — host choice barely moves either for a static site; the real speed win is Astro's zero-JS output.

## D3 — Blog organisation: one collection + tags + `featured`
**Decision:** Single `blog` collection; tags for topic; a `featured` flag for emphasis; `/writing` is a filtered view.
**Why:** Keeps a light professional/miscellany hierarchy without structural overhead.
**Rejected:** Separate collections / nested buckets — leads to category proliferation and placement anxiety.

## D4 — Cross-posting: POSSE, site canonical
**Decision:** Publish on site (canonical), syndicate to Medium via its import tool (auto-canonical). Backfill existing Medium pieces.
**Why:** Builds *your* domain authority over time instead of Medium's; own the durable copy.
**Trade accepted:** a young domain ranks worse early than a Medium copy would — worth it for long-term equity.
**Split:** site-only for personal/meta and Greek-audience policy; cross-post broad-appeal work.

## D5 — Resume source: master YAML → transform → site
**Decision:** The exhaustive `cv-master.yaml` (separate project) feeds a curated public subset into the site via a transform step. Site consumes the rendered subset, never the master schema.
**Phasing:** v1 hand-writes the `/cv` data; v2 adds the transform. Don't block the site on the CV thread.
**Rejected:** site reads/filters the master directly — couples the site build to the CV's internal schema forever.

## D6 — i18n: English v1, architected for Greek
**Decision:** Ship English-only; keep structure i18n-friendly; require Greek-capable fonts now.
**Rejected:** building bilingual routing now — premature; adds cost for a maybe.

## D7 — Design language: Bauhaus / cobalt-led
**Decision:** Warm paper, near-black ink, bold Bauhaus primaries; cobalt dominant with vermilion + ochre accents. Colourful and airy.
**Rejected:** the cream + serif + terracotta "AI design" default (cobalt lead is the deliberate escape from it); terminal/broadsheet density (alienates non-dev readers).

## D8 — Signature element: sidenotes
**Decision:** Margin/side notes as the one memorable device — functional and characterful, fitting a physician-engineer who writes in asides. Restraint everywhere else.

## D9 — Typography: Commissioner / Alegreya / JetBrains Mono
> **Superseded in part by D25:** the body serif is now Source Serif 4. Display and utility faces, and the Greek-coverage rule, stand.

**Decision:** Commissioner (display, variable 100–900), Alegreya (body serif, variable + italic), JetBrains Mono (utility, variable). All open-source, all with **verified** Greek subsets (checked against Fontsource package metadata, not marketing copy). Alegreya additionally has greek-ext (polytonic).
**Why:** The serif/grotesque/mono trio encodes the writer/engineer/clinician identity in type alone. Commissioner was designed by Greek type designer Kostas Bartsokas — its Greek is native to the design, not a bolted-on subset.
**Correction (was: Archivo):** Archivo was originally chosen on the assumption it covered Greek. Verified false — Archivo ships only latin/latin-ext/vietnamese, violating the hard requirement, and was replaced pre-build. Lesson encoded: *verify subsets from font metadata, never from "supports N languages" claims.*
**Runners-up (verified Greek-capable):** Manrope (geometric, trendier), Alegreya Sans (matching family, humanist — less display punch), Fira Sans (workhorse). Swap = one token + one import.

## D10 — Analytics: GoatCounter, no custom backend
**Decision:** Use GoatCounter (cookieless, privacy-friendly, free non-commercial tier, long retention). No custom analytics/admin backend — the site stays fully static; "admin" is editing markdown in the repo.
**Why:** Cookieless = no consent banner required; retention and counting are better than Cloudflare Web Analytics, at near-identical (one script tag) effort; data can be EU-hosted/self-hosted.
**Rejected:**
- *Custom backend/dashboard* — over-engineering; turns a static site into a maintained web app to display a number.
- *Google Analytics* — forces a consent banner, compliance overhead, rough EU-legality history; tonally wrong given the EHDS/ΗΔΙΚΑ work.
- *Cloudflare Web Analytics* — fine and free, but very short retention (≈30 days–6 months), 10% sampling, and odd visit counting. Kept as a possible zero-effort fallback only.
**Note:** analytics is host-independent (beacon/script on any host), so it does not affect the hosting decision.

## D11 — No comments on posts
**Decision:** No comment system.
**Why:** Not wanted; avoids moderation, spam, third-party embeds, and privacy/consent baggage.

## D12 — Cover system: category-as-colour
> **Category names superseded by D24.** The colour mapping carried over: project → cobalt, opinion → vermilion, guide → ochre, personal → ink.

**Decision:** Generated covers use the *composed Bauhaus* direction (abstract geometric compositions from a fixed shape vocabulary), with each cover **dominated by its category colour** (OSINT cobalt, policy vermilion, tutorial ochre, note ink) plus a small restrained category label. Photos are **duotoned in the same category colour** with the same frame + label, so photo and generated covers cohere as one printed-poster language.
**Constraint:** category-as-colour caps clean categories at ~4–5; everything else is a normal uncoloured tag (fits the no-bucket-proliferation rule).
**Resolved:** the photo-cover treatment was validated against real photos after the build (see Settled, above).
**Rejected:** type-forward covers (option A — clean but too simple/loud for the taste here); loud coloured category pills (eyesore — colour is carried by the composition instead).

## D13 — Email: Cloudflare Email Routing (receive-only)
**Decision:** `info@ncxifaras.com` forwards to Nick's real address via **Cloudflare Email Routing**. Receive-only — replies go from the real address, nothing sends *as* the domain.
**Why:** DNS is already on Cloudflare; Routing is free, uses SRS, and consolidates everything in one place.
**Records:** MX → `route1/2/3.mx.cloudflare.net`; SPF `v=spf1 include:_spf.mx.cloudflare.net -all`; DMARC `p=reject; sp=reject; adkim=s; aspf=s`; CF-managed DKIM (`cf2024-1` selector + a wildcard null-DKIM `*._domainkey` = `v=DKIM1; p=` that invalidates forged selectors).
**Retired:** Hover mail forwarding (the old `mail.ncxifaras.com` CNAME → Hover was deleted). Nothing touches Hover for mail anymore.

## D14 — Security headers via `_headers` (implemented early)
**Decision:** All security headers + caching live in a version-controlled `_headers` file in `public/` (copied to `dist/` root by Astro). Strict CSP (first-party + GoatCounter only), HSTS (180d, no preload yet), no-sniff, Referrer-Policy, Permissions-Policy, frame-ancestors none, COOP, immutable caching for `/_astro/*`.
**Why:** Single source of truth in git, not click-ops. Brought forward from Phase 4 during infra setup.
**Note:** `script-src` is strict (no `'unsafe-inline'`) — inline scripts (View Transitions, islands, `is:inline`) will need hashes/nonces, not a blanket unsafe-inline.

## D15 — Sidenotes: pure CSS, anchored to the paragraph
**Decision:** `<Sidenote>` is authored inline, mid-sentence. At ≥70rem the note is always visible in the margin: `position: absolute; left: 100%; top: 0` against its `position: relative` paragraph (`p`, `li`, `blockquote`). Below 70rem it collapses behind an `[n]` marker, toggled by a hidden checkbox. The counter increments once per note on the wrapper, so a custom `label` (e.g. `†`) doesn't shift the numbers after it.
**Why:** No JS means it passes the strict CSP and works with scripts off. Anchoring to the paragraph rather than the word gives every note the same x, because every paragraph shares `--width-content`. 70rem is the width where text (46) + gap (2) + note column (16) + margins actually fit.
**Rejected:** anchoring to the inline marker span. Its zero-width containing block put each note wherever its word fell, sometimes on top of the body text. That was the first desktop bug.
**Accepted limits:** notes align to the paragraph top, not to the marker's line, and two notes in adjacent short paragraphs can overlap. Fixing either needs JS collision nudging, which isn't worth the weight yet.

## D16 — Generated covers: deterministic, collision-hardened
**Decision:** Each generated cover is seeded from the post slug's hash. Independent decisions come from separate bit ranges: 6 compositions × 2 mirrors × 4 accent rotations × 2 colour swaps ≈ 96 distinct covers. The same slug always gives the same cover.
**Why:** the first generator (`hash % 4`) produced visible twins with only a handful of posts.
**Rule:** bit extraction uses `>>>`, never `>>`. A signed shift goes negative on high-bit hashes, and `negative % n` then indexes arrays out of bounds. This crashed the posts page once.

## D17 — OG images built at build time from the same cover geometry
**Decision:** `/og/<id>.png` is generated per post at build time with satori (layout → vector) and resvg (→ 1200×630 PNG). Cover geometry lives in `src/lib/cover-geometry.ts` and is shared by the on-page `GeneratedCover` and `og.ts`, so a post's card and its cover can't drift. Pages that aren't posts fall back to `public/og-default.png`.
**Why:** shared links should look on-brand without a hand-made image per post, and without a runtime service.
**Consequences:** OG rendering uses the *static* `@fontsource/*` packages, because satori needs static-weight `.woff`. `@resvg/resvg-js` is a native module and must stay in `vite.ssr.external`. Colours come from `palette.ts` hex, since the raster can't read CSS vars.

## D18 — Contrast guardrails on the palette
**Decision:** small text on paper uses the `-deep` accent variants. The focus ring is two-tone: an ink outline plus an ochre halo. Paper-coloured text never sits on a vermilion fill at small sizes.
**Why (measured):** an ochre ring on paper is 2.03:1, below WCAG 1.4.11's 3:1. Ink carries contrast on light surfaces and ochre carries it on dark ones such as the skip link. Paper on vermilion is 4.05:1, which passes AA only for large text.

## D19 — Prose typography lives in `global.css`
**Decision:** `.prose` styles live in `src/styles/global.css`, not in `PostLayout.astro`.
**Why:** Astro bundles a component's CSS only on pages that render that component, and `/about`, `/contact` and `/privacy` don't use `PostLayout`. Two rules stay in `PostLayout` on purpose: the sidenote `counter-reset` and the ≥70rem paragraph positioning context.

## D20 — Images go through `image()`, never through `public/`
**Decision:** `cover` is typed with the schema's `image()` helper. Post images live in the post's own folder, beside `src/content/blog/<slug>/index.mdx`, and are referenced by bare filename. That's what Sveltia's entry-relative media (`media_folder: ''`) writes, and the posts written by hand were migrated to match in Oct 2026. `src/assets/` holds only site-level images. `public/` is never used for content images.
**Why:** `image()` resolves the path relative to the markdown file and hands `<Image>` real metadata, which emits a hashed, optimised `/_astro/` URL. A plain-string `cover` emitted the author-relative path verbatim, the browser resolved it against the page URL, and it 404'd. `public/` is copied verbatim and unoptimised.

## D21 — Figure captions via a local rehype plugin
**Decision:** a block-level image whose markdown *title* is set becomes `<figure><img><figcaption>`, with the title as the visible caption (inline links, emphasis and code allowed). `alt` stays as alt text.
**Why:** alt text (for screen readers) and a caption or credit (for everyone) are different jobs. `rehype-figure` uses alt, which conflates them. The plugin only *wraps* the image node and never touches `src`, because Astro replaces `src` with `__ASTRO_IMAGE__` and any plugin keyed on it silently no-ops (withastro/astro#10643).

## D22 — Markdown processor: `unified`, explicitly
**Decision:** `markdown.processor: unified({ rehypePlugins: [...], gfm: true, smartypants: true })`.
**Why:** Sätteri, Astro's faster default, runs no remark/rehype plugins at all. D21's plugin and the `__ASTRO_IMAGE__` mechanism both depend on the unified pipeline. `markdown.rehypePlugins` is deprecated and goes away in Astro 8.
**Rejected:** rewriting the caption plugin against Sätteri's `hastPlugins` API. That's possible, but it buys build speed this site doesn't need.

## D23 — CV as YAML data
**Decision:** `/cv` renders from `src/data/cv.yaml`, imported via `@rollup/plugin-yaml`.
**Why:** a CV is structured data. Title, organisation, period and notes are the fields the future master-CV transform (D5) will route on, and markdown would throw that structure away. YAML is easier to hand-edit than a JS literal. The plugin runs at build time only.

## D24 — Categories describe the kind of post: `project` · `guide` · `opinion` · `personal`
**Decision:** replaced `osint` · `policy` · `tutorial` · `note`. Colours carried over: project = cobalt, opinion = vermilion, guide = ochre, personal = ink. The default is `personal`.
**Why:** two reasons. A category should say what kind of post something is, while subjects like OSINT or policy are topics and belong in tags. And the old set didn't fit what was actually being written: the dictionary is a project, and the Bellingcat solves are guides that happen to be about OSINT.
**Still holds:** the ~4–5 cap from D12. Adding a category touches six places (see `CLAUDE.md`).

## D25 — Body serif: Source Serif 4 replaces Alegreya
**Decision:** body text is set in Source Serif 4 (variable, with an optical-size axis; body pinned at `opsz` 16). Alegreya was dropped.
**Why:** readability. Alegreya's calligraphic texture got tiring at long-form length. Source Serif 4 reads calmer, and its optical-size axis tunes it for body sizes. It keeps a Greek subset, so D9's hard requirement still holds.

## D26 — OG fonts: one family name per script
**Decision:** Latin and Greek font files are registered with satori under distinct family names (`Commissioner` / `CommissionerGreek`, `JetBrains Mono` / `JetBrains Mono Greek`), with a CSS-style fallback list at each use site.
**Why:** satori does no subset resolution. If two files share a family name, it matches the first and stops, so Greek titles rendered as tofu. Any new script needs the same treatment.

## D27 — Share buttons without third parties
**Decision:** native share sheet (Web Share API), copy link, and a plain Mastodon link that asks for the reader's instance. No platform SDK buttons.
**Why:** SDK buttons load remote scripts and track readers on page load whether or not they click. Each would also need a CSP hole and would make the privacy page false. The component script is bundled first-party, so `script-src 'self'` passes it.

## D28 — Sveltia CMS at `/admin`, optional
**Decision:** Sveltia CMS with a GitHub backend, as a convenience editor. The repo stays the source of truth, and hand-editing MDX remains first-class.
**Why:** it allows editing from a browser without turning the site into an app. It commits to the same repo and the same schema.
**Costs, accepted:** `public/admin/config.yml` duplicates `content.config.ts` by hand, so the two change in the same commit. The bundle is copied from `node_modules`, so re-copy it on upgrade. `/admin` needs a relaxed CSP (D29).

## D29 — `/admin` CSP: remove first, then set
**Decision:** under `/admin` and `/admin/*`, `! Content-Security-Policy` removes the global policy before a relaxed one is set. That policy allows `api.github.com`, `cdn.jsdelivr.net` (Sveltia's hardcoded icon fonts) and `unpkg.com` (lazy-loaded chunks).
**Why:** Cloudflare `_headers` *combines* duplicate headers. Two CSPs means the browser enforces their intersection, so a looser sub-path rule can never widen the global one. Visitor-facing pages stay first-party only, so `privacy.md` still holds. See `INFRASTRUCTURE.md` for the verification step.

## D30 — Per-post language sets the page language, not the interface
**Decision:** a post can declare `lang: el` (default `en`). That sets `<html lang>` and `og:locale` only. The interface stays English on every post: the category chip, date, share controls, sidenote names and site chrome. On a Greek page these English parts carry `lang="en"`.
**Why:** screen readers need the page language to pick a voice, and search engines use it. A Greek interface that appeared only on some posts was tried and rejected (Oct 2026). It read as a bug rather than a feature, and the site's Greek readers understand "Project" or "Share" natively. Full bilingual UI and routing is still D6's deferred item.

## D31 — No cover on post pages
**Decision:** covers appear only as thumbnails on cards and in the OG image. The post page itself has none.
**Why:** three placements were tried and rejected in Oct 2026: full-width above the title, full-width below the dek, and small in the margin beside the title. On a reading page the title and prose lead, and the poster belongs to the index and the shared card.

## D32 — Responsive markdown images
**Decision:** `image.layout: 'constrained'` in `astro.config.mjs`, so markdown images get a `srcset`. A local rehype plugin (`rehype-image-sizes.mjs`) sets their `sizes` to the prose column: `(min-width: 51rem) 46rem, calc(100vw - 2.5rem)`. Cover components opt out with `layout="none"`, since they size themselves.
**Why:** post figures shipped at their full source width (952–1919px) to every screen. Shadow Play's five figures fall from about 1.1MB to about 0.4MB on phones and 1× laptops. Astro's default `sizes` assumes the image's intrinsic width, which would still fetch about 1668px files for a 736px column. Like D21, the plugin never touches `src`: it runs before Astro's `rehypeImages`, which carries the node's properties into the image options.
**Keep in step:** the `sizes` string mirrors `--width-content` plus the max gutter. Change the measure and you change this too.

## D33 — No author bio line at the end of a post
**Decision:** the post ends with tags and share (then "Read next", still an open item). There is no author box or byline.
**Why:** a third-person bio under the last paragraph ("Nick Xifaras is a doctor who writes code…") is the author-box pattern of a publishing platform, and it repeated the homepage tagline word for word. This is a personal site: the name is already in the header on every page and /about is one nav click away. It was added in the Oct 2026 post-page pass and removed by the author the same day.

## D34 — The header is sticky only above 640px
**Decision:** at ≤640px the header scrolls away with the page (`position: static`), and `scroll-padding-top` drops to 1rem. Above 640px it stays sticky.
**Why:** on a phone the bar wraps to two rows (about 6rem), so a sticky header pinned a sixth of the screen over the text for a whole 20-screen guide. The wordmark and nav are back at the top of the page, and the browser's own chrome gives a way up. A post's own title also drops to Headline size at that width, so it doesn't take five or six heavy lines before the first paragraph.
**Keep in step:** the 640px breakpoint is the same one Header.astro uses for the tighter nav gap. If the bar ever fits on one row again on phones, revisit.

## D35 — Long posts get a closed contents list, not a margin outline
**Decision:** a post with four or more h2s shows a native `<details>` "Contents / N" under the dek: closed by default, a plain list of section links when open. It's built at build time from `headings` in `render()`. No JS, no heading-anchor links, nothing for short posts.
**Why:** the Oct 2026 critique found an 18,000px phone guide with no sense of its shape. The first screen is protected: the list is closed by default, so the cost on a phone is one hairline row.
**Rejected:** an outline in the ≥70rem margin. That column is where sidenotes anchor (to the top of their paragraph), so a sticky or tall outline collides with them; a static one beside the header would overflow into the first paragraphs on a long guide. The margin stays the sidenotes' alone. A "N min read" cue in the meta line was built and removed by the author: it read as platform chrome.

## D36 — The homepage proves the pivot and ends on a way onward
**Decision:** under the pivot paragraph sits one mono annotation: the HTA Committee role (from `cv.yaml`, including its neurological-therapies focus) with links to `/about` and `/cv`. The pivot itself is full ink. After the cards a hairline and a "More about me · About · CV · Contact" row end the page. The hero motif scales up (×1.6, wider column) from 1100px and becomes a small horizontal strip of the same four shapes under the text at ≤820px. The lead card's cover is 26rem from 62rem up; at 641–820px the lead stacks and the other cards are rows (12rem cover), like the archive.
**Why:** the Oct 2026 homepage critique (25/32): "pivot legibility" is the first success measure, but the page asserted it in the quietest paragraph with no evidence or link, and ended on a card grid and the footer. At 641–820px the one-column grid made secondary covers bigger than the lead, and the motif left a dead strip beside the text, then vanished on phones.
**Keep in step:** the 820px cut is in both `index.astro` (grid, hero, motif) and `PostCard.astro` (rows and stacked lead). The proof line states only what `cv.yaml` says; if the role changes, change both. No buttons: the closing row is plain links.
