---
target: src/pages/posts/[id].astro
total_score: 24
max_score: 32
na_heuristics: 5,9
p0_count: 0
p1_count: 1
target_identity: "file:/home/ncx/Websites/ncxifaras-com/src/pages/posts/[id].astro"
target_fingerprint: "sha256:e7bc5b33882f81f8688b178301130deb29e841abd4e26ca7ffcb5f979f169ed6"
target_path: /home/ncx/Websites/ncxifaras-com/src/pages/posts/[id].astro
timestamp: 2026-10-20T22-41-26Z
slug: src-pages-posts-id-astro
---
Method: dual-agent (A: design review, isolated, no prior score or snapshots · B: detector + markup evidence, isolated). Settled decisions given to A: no post-page cover (D31), ~80ch measure, English interface on Greek posts (D30), no byline (D33), header static on phones (D34), category rule under chip+date.

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Copied ✓ and aria-current clear; no length or progress cue on a 14,000px guide |
| 2 | Match System / Real World | 4 | Plain language, paper/marginalia metaphor |
| 3 | User Control and Freedom | 3 | Native back, share fallback; header static on phones by design |
| 4 | Consistency and Standards | 3 | Tags don't look like links; [n] marker not obviously a button |
| 5 | Error Prevention | n/a | Read surface, no inputs |
| 6 | Recognition Rather Than Recall | 3 | No outline to recognise sections in a long guide |
| 7 | Flexibility and Efficiency | 2 | Nothing for skimming or jumping |
| 8 | Aesthetic and Minimalist Design | 4 | Restrained; only "Read next" is arguably extra |
| 9 | Error Recovery | n/a | No inputs |
| 10 | Help and Documentation | 2 | Nothing teaches the sidenote convention on a phone |
| **Total** | | **24/32** | **Good (75%)** |

## Design Specificity Verdict
Authored, not interchangeable (3/4). The header block (category rule ending at the date, heavy Commissioner title, grey serif dek) and the annotation grammar (blockquote, caption, sidenote share one left-rule language) are the site's own. The ending (hairline, grey mono tags, outlined share buttons, thumbnail "Read next") is the stock publishing-platform part; known open item.
Deterministic: source 0 findings (was 0). Built dist: 74 findings, all false positives for this page: 19 cream-palette (pinned --paper), 49 in the vendored sveltia-cms.js, 1 low-contrast on the homepage only (vermilion .amp/.last-line, 4.05:1, large text unverified; off the post page). URL scan/overlay unavailable (no Chromium-family browser). B's markup facts: og:site_name now present, no horizontal overflow at 320/390, lang switching on Greek chrome correct, heading outline clean, 44px coarse targets present in 4 files, reduced-motion handled, contrast all >=7.6:1 except the decorative ochre rule (2.03:1, documented exempt).

## Priority Issues
- [P1] Phone sidenote discoverability: a ~13px [n] superscript, closed by default, nothing says "tap", hit area ~1.6em (not 44px). In the Greek post the dictionary download steps live in a closed note. Fix: visible affordance on the marker, bigger target, move load-bearing instructions into prose. Command: /impeccable adapt (+ clarify)
- [P2] Ending out-shouts the author's last line: "Read next" at Headline size with a heavy rule is the biggest heading after the h1; peak-end undercut; Greek post's Read next is an English post. Known open item (D-log). Command: /impeccable quieter or distill
- [P2] Long guides have no wayfinding and the margin is empty: 9 h2s, no outline/length cue; at >=70rem the 16rem margin is blank for ~90% of the scroll. Fix: build-time h2 outline (margin at wide, <details> on phones) for long posts, reading time. Command: /impeccable layout
- [P3] Header/article edges differ at 640-1119px (article centred, wordmark at gutter; aligns only >=70rem). Command: /impeccable layout
- [P3] Tags don't read as links (grey mono, no underline; multi-word tag "#bellingcat challenges" runs into its neighbour). Command: /impeccable clarify

## Persona Red Flags
Casey (mobile): [1] marker small and unlabelled; 14,000px scroll, no outline or length cue; header must be scrolled back to.
Sam (accessibility): well served (named checkbox, lang switching, live region); tags have no visible link affordance; focus order on collapsed checkbox pairs not verified.
Neurotech engineer / evaluator: voice clear within a screen; long guide not skimmable without an outline.
Greek clinician: the whole purpose is a download, but the link is one inline phrase and the how-to sits in a collapsed note; Read next is English.

## Minor Observations
h1 reaches five lines at 1440 for the longest title. Sidenote body wraps at ~28 characters (tall thin strip for long notes). One h2 aside ("A note on Umbra's public data...") competes with main section heads (content). Sidenote ids use Math.random (non-reproducible builds). Fonts: JetBrains Mono latin and the Greek subsets are not preloaded (Greek page preloads latin files it mostly doesn't use). twitter:title/description absent (falls back to og). Wordmark aria-label "Home" doesn't contain its visible text (WCAG 2.5.3). Post-next section has no accessible name. Ronda Google Earth image is 482KB at full size. article:published_time meta not confirmed in dist.

## Questions to Consider
- If the sidenote is the signature, why does a 9-section guide have only 2?
- What would the page look like if the last thing on it were the author's final sentence plus one calm line?
- What belongs in the empty 16rem margin that is also in the voice?
