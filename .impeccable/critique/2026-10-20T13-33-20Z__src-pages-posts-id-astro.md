---
target: src/pages/posts/[id].astro
total_score: 19
max_score: 32
na_heuristics: 5,9
p0_count: 0
p1_count: 4
target_identity: "file:/home/ncx/Websites/ncxifaras-com/src/pages/posts/[id].astro"
target_fingerprint: "sha256:e7bc5b33882f81f8688b178301130deb29e841abd4e26ca7ffcb5f979f169ed6"
target_path: /home/ncx/Websites/ncxifaras-com/src/pages/posts/[id].astro
timestamp: 2026-10-20T13-33-20Z
slug: src-pages-posts-id-astro
closed: true
---
Method: dual-agent (A: design review, isolated · B: detector + browser evidence, isolated)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | "Copied ✓" has no live region; never announced |
| 2 | Match System / Real World | 2 | Greek post declared lang="en" with English chrome; "Blog" vs "Writing" near-synonyms |
| 3 | User Control and Freedom | 3 | Mastodon opens third-party tab without warning |
| 4 | Consistency and Standards | 2 | Mixed quotes; mono vs Commissioner wordmark; header/footer off the article grid; prose CSS duplicated |
| 5 | Error Prevention | n/a | Read surface, no inputs |
| 6 | Recognition Rather Than Recall | 2 | Unnumbered note bodies, top-anchored away from markers; no TOC on long guides |
| 7 | Flexibility and Efficiency | 2 | No TOC/anchors/next post; invisible tab stop per sidenote |
| 8 | Aesthetic and Minimalist Design | 3 | Precise type; poster half absent; reserved margin mostly empty |
| 9 | Error Recovery | n/a | No inputs |
| 10 | Help and Documentation | 2 | No byline; Greek tool's download steps hidden in a collapsed sidenote on mobile |
| **Total** | | **19/32** | **Acceptable (59%)** |

## Design Specificity Verdict
Authored in its details, generic in its overall shape. Annotation layer (paragraph-anchored no-JS sidenotes, mono captions, shared ochre rule, native Greek) is unmistakably this site's. The poster half never reaches the page: no cover, no Bauhaus colour beyond the 0.62em chip square — the quietest surface on the site, against DESIGN.md's "don't make it quieter". Below 70rem it reads as an interchangeable serif blog; at ≥70rem the reserved 16rem margin is empty for ~85% of long guides.
Deterministic scan: 10 findings. True positive missed by review: skip-link hover 1.4:1 (global a:hover outranks .skip-link, global.css:89). Advisory: 1.05rem cover title + rgba(0,0,0,.5) in PhotoCover.astro:115-118 (DESIGN.md gaps). False positives: cream-palette (#FAF7F0 is the pinned --paper token), side-tab on blockquote (documented annotation grammar, PostLayout.astro:211). Overlay: unavailable (no mutable browser; URL scan needs Chromium).

## Priority Issues
- [P1] Mobile header overflows at ≤414px (wordmark collides with nav, Contact clipped). Fix: merge Blog/Writing; wrap nav under wordmark ≤640px. Command: /impeccable adapt
- [P1] Per-post OG cards built but unused — PostLayout.astro:19 passes no ogImage, all posts ship og-default.png; og:type website. Regression from Phase 4. Fix: pass ogImage=/og/<id>.png, og:type=article, article:published_time. Command: /impeccable polish
- [P1] Sidenotes below 70rem fail keyboard/SR: focusable aria-hidden checkbox (Sidenote.astro:35), invisible focus, body display:none (unreachable to SR incl. 200% zoom), ~20×13px target, pointer cursor at ≥70rem. Fix: name the input, focus ring on marker via sibling selector, clip-hide instead of display:none, larger hit area, numbered bodies. Command: /impeccable harden
- [P1] Greek post declared English: lang="en" hard-coded (BaseLayout.astro:34), en-GB dates, English chip/share strings. Fix: optional lang enum in schema + Sveltia, pass to <html lang>, el-GR dates, small label map. Command: /impeccable harden
- [P2] Post ends in a dead end: tags + 3 share buttons, no byline, no /about link, no next post — wastes the content peak. Fix: one-line author note linking /about, "Next in <Category> →", drop Mastodon. Command: /impeccable layout

## Persona Red Flags
Sam: invisible unlabelled checkbox tab stops; notes unreachable at 200% zoom; "Copied ✓" silent; Greek read in English voice; sticky header can cover focus (no scroll-padding-top); skip-link hover 1.4:1.
Casey: header overflow + sideways pan; 20×13px [n] targets; ~1.1MB single-resolution figures, no srcset; tool screenshots unreadable at 350px; no TOC to resume.
Greek clinician (dictionary post): download instructions in collapsed sidenote; main action is inline "this link"; English chrome/date.
Neurotech engineer: no byline/credential; nothing at the end points to /about or neuro work.

## Minor Observations
Measure ~75–85ch (46rem at ~19px), not ≈65ch. Mixed quotes in Shadow Play title. Synthetic mono italic in sidenotes. Footer wordmark Commissioner 800 vs mono header. Caption rule paper-2 on paper nearly invisible (use --line). Header/footer x≈200 vs article x≈248. Two notes in one paragraph would overlap. Prose CSS duplicated (against D19). Tag URL with literal space. No font preload. Planted Evidence canonical points to Medium (fine only if deliberate backfill).

## Questions to Consider
- Should the margin be reserved when it's empty for 85% of a guide, or carry more (cover, Tufte captions)?
- Can a reader explain Blog vs Writing?
- Do guides need a TOC up top and a "what next" at the bottom?
- What would the post page look like carrying as much poster as the homepage?
