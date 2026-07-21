# Roadmap

Phased build plan. Legend: **[you]** = Nick acts (accounts, domains, running commands, writing), **[claude]** = I can generate the code/config for you to drop in, **[both]** = we iterate together.

Status of the stack: Astro · Cloudflare Pages · GitHub · GoatCounter · English v1 (Greek-ready). See `ARCHITECTURE.md`, `DESIGN.md`, `DECISIONS.md`. Operational detail (DNS, email, deploy, troubleshooting) lives in `INFRASTRUCTURE.md`.

---

## Progress so far

A chunk of infra got front-loaded during setup, out of phase order — that's fine. Done:

- ✅ Astro project scaffolded (official blog starter) + GitHub repo.
- ✅ Cloudflare Pages connected, building & deploying on push.
- ✅ Custom domain live: `ncxifaras.com` serving over HTTPS (apex CNAME-flattened + proxied; `www` CNAME → apex).
- ✅ Email moved to Cloudflare Email Routing (`info@` → real address, receive-only, verified); Hover forwarding retired; SPF/DMARC/DKIM hardened.
- ✅ `_headers` (security headers + caching) in `public/`.

Still open on infra (small):
- ⬜ **GoatCounter account** — create it, then replace `YOURCODE` (×2) in `public/_headers` and add the tracking snippet.
- ⬜ **`www → apex` 301 redirect** (Rules → Redirect Rules) if not already added.
- ⬜ **Canonical** — will be handled automatically once `site: 'https://ncxifaras.com'` is set in `astro.config.mjs` (Phase 1).

---

## Build-time decisions (confirmed)

1. **Base template** — ✅ the official Astro blog starter (neutral base, restyled wholesale). *Not* AstroPaper (would mean un-styling an opinionated theme).
2. **Font loading** — ✅ self-host via `@fontsource-variable` (Commissioner, Alegreya, JetBrains Mono — all with *verified* Greek subsets; Archivo was dropped for lacking Greek, see D9). Not the Google Fonts CDN (perf + GDPR).
3. **Sidenote authoring** — ✅ an MDX `<Sidenote>` component (margin on desktop, inline/expandable on mobile).
4. **Domain** — ✅ `ncxifaras.com` (already registered; DNS to live on Cloudflare).

---

## Phase 0 — Foundations
- **[you]** Create the GitHub repo; **[you]** scaffold the Astro project from the chosen base template.
- **[you]** Commit the four planning docs into `/docs`.
- **[claude]** Provide a clean project structure (folders for `content/`, `components/`, `layouts/`, `styles/`, `lib/`) and a `.editorconfig` / Prettier config if wanted.
- **[you]** Connect the repo to Cloudflare Pages (build command `astro build`, output `dist/`); confirm the first empty deploy goes green.

## Phase 1 — Design-system foundation
- **[claude]** CSS custom-property token file: the full palette (paper, ink, cobalt, vermilion, ochre, lines) — all tunable in one place per `DESIGN.md`; the type scale; spacing rhythm.
- **[claude]** Font setup via `@fontsource` with Greek subsets; `@font-face` wiring and fallbacks.
- **[claude]** Core layout primitives: the `BaseLayout`, header/nav, footer, container widths, link/focus styles, reduced-motion handling.
- **[both]** First visual smoke-test against the homepage mockup; **[you]** start feeling out the exact cobalt shade (open item) now that it's live.

## Phase 2 — Content model + core pages
- **[claude]** Content collections + Zod schemas for `blog/` and `pages/` (fields per `ARCHITECTURE.md`).
- **[claude]** Routes: `/` (landing), `/posts` (paginated index), `/posts/[slug]`, `/tags/[tag]`, `/writing` (featured filter), `/about`, `/cv` (hand-written v1).
- **[claude]** Markdown/MDX rendering: Shiki code highlighting (for tutorials), typographic defaults for the Alegreya body, heading anchors.
- **[claude]** `rss.xml` and `sitemap.xml`.
- **[you]** Drop in 1–2 real posts to test the pipeline end-to-end.

## Phase 3 — Signature + covers
- **[claude]** The `<Sidenote>` MDX component: margin placement on desktop, inline/expandable on mobile, mono styling.
- **[claude]** Generated-cover component: composed-Bauhaus compositions driven by category → colour, deterministic per post (a seed from the slug so a post's cover is stable).
- **[claude]** Duotone photo treatment (CSS/SVG duotone) mapped to category colour, shared frame + label.
- **[both]** Validate covers on a real index; **[you]** test the photo treatment against actual photos (open item) and we adjust.

## Phase 4 — Polish + quality floor
- **[claude]** SEO/OG: per-page `<meta>` + OpenGraph, `canonicalURL` support (POSSE-ready), `robots.txt`.
- **[claude]** Optional but nice: auto-generated OG images reusing the cover system, so shared links look on-brand.
- **[claude]** Accessibility pass: semantic landmarks, focus-visible, contrast checks on coloured fills, keyboard nav.
- **[both]** Performance pass: Astro `<Image>` optimisation, font-loading strategy, Lighthouse to green.
- **[claude]** Optional: `Pagefind` static search (drops into Astro, zero backend) — flag for now, easy to add.

## Phase 5 — Launch
- **[you]** Point the domain's DNS to Cloudflare; attach the custom domain to the Pages project; confirm auto-HTTPS.
- **[you]** Add the GoatCounter site; **[claude]** provide the script snippet + a tidy way to include it (and keep it out of dev builds).
- **[you]** Write/port launch content: `/about`, `/cv` v1, and re-host the two existing Medium posts here.
- **[you]** Set canonical on those two Medium copies to point back here (backfill per `ARCHITECTURE.md`).
- **[both]** Final pre-launch review, then ship.

## Phase 6 — Post-launch / v2
- **CV transform** — build the `cv-master.yaml → site data` step once the master stabilises (D5).
- **Cross-posting rhythm** — settle the publish-here-then-import-to-Medium workflow (D4).
- **Design tuning** — lock the cobalt shade; finalise the photo-cover treatment against real photos.
- **Maybe-laters** — Pagefind search; Greek i18n (fonts already ready); a `/uses` or `/now` page; RSS-to-Mastodon or similar syndication.

---

## What I can hand you next, on your word
Phase 0–1 is the natural first chunk: I can generate the token file, the font setup, and the base layout/header/footer as ready-to-drop-in files as soon as you've scaffolded the repo and told me the base template + domain. That gets you from "empty Astro project" to "recognisably your site" in one pass.
