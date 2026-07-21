# Decisions

A running log of what we chose, why, and what we rejected. Newest context wins if anything here conflicts with older notes.

## Open items (not yet settled)

- **Exact cobalt shade** — blue is the right lead; the precise tone is still being felt out. Kept as a token for easy tuning.
- **Photo-cover treatment** — direction is duotone-in-category-colour (see D12), but to be validated against real photos once the base is built.
- **Resume seam timing** — hand-written `/cv` for v1; transform step is v2 (see D5).

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
**Decision:** Generated covers use the *composed Bauhaus* direction (abstract geometric compositions from a fixed shape vocabulary), with each cover **dominated by its category colour** (OSINT cobalt, policy vermilion, tutorial ochre, note ink) plus a small restrained category label. Photos are **duotoned in the same category colour** with the same frame + label, so photo and generated covers cohere as one printed-poster language.
**Constraint:** category-as-colour caps clean categories at ~4–5; everything else is a normal uncoloured tag (fits the no-bucket-proliferation rule).
**Open:** photo-cover treatment to be validated against real photos post-build (see open items).
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
