---
target: src/pages/posts/[id].astro
total_score: 20
max_score: 32
na_heuristics: 5,9
p0_count: 0
p1_count: 3
target_identity: "file:/home/ncx/Websites/ncxifaras-com/src/pages/posts/[id].astro"
target_fingerprint: "sha256:e7bc5b33882f81f8688b178301130deb29e841abd4e26ca7ffcb5f979f169ed6"
target_path: /home/ncx/Websites/ncxifaras-com/src/pages/posts/[id].astro
timestamp: 2026-10-20T17-01-02Z
slug: src-pages-posts-id-astro
---
Method: dual-agent (A: design review, isolated, unaware of prior score · B: detector + markup evidence, isolated). Settled decisions given to A: no post-page cover (D31), ~80ch measure, English interface on Greek posts (D30).

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | ~20-screen mobile guide, no length/position/progress |
| 2 | Match System / Real World | 3 | Plain language; English chrome on Greek posts intentional |
| 3 | User Control and Freedom | 3 | Good skip/focus/no-JS toggle; heading ids but no visible anchor |
| 4 | Consistency and Standards | 3 | "Read next" head (2.6rem) larger than article h2s (1.9rem) |
| 5 | Error Prevention | n/a | Read surface, no inputs |
| 6 | Recognition Rather Than Recall | 2 | No contents on 8-section guide; [n] marker doesn't say it opens |
| 7 | Flexibility and Efficiency | 2 | No jump/resume affordances |
| 8 | Aesthetic and Minimalist Design | 3 | Excellent body; ending stacks too much; page nearly colourless |
| 9 | Error Recovery | n/a | No inputs |
| 10 | Help and Documentation | 2 | Nothing hints notes expand; Greek download steps in a collapsed note on mobile |
| **Total** | | **20/32** | **Acceptable (62%)** |

## Design Specificity Verdict
Specific in details, generic in overall shape. Annotation layer (paragraph-anchored mono margin notes, hairline captions, real mono italics, curly quotes, native Greek) is the site's own. Surrounding furniture (chip/date, hero title, dek, bio line, tags, share, thumbnail "Read next") is stock publishing end-matter; A independently called the ending Medium/Substack end-matter, agreeing with the author's own flag (DECISIONS open item). Poster half still missing on the post page.
Deterministic: source 0 findings (12 files; was 4). Built HTML: 4x cream-palette (false positive: pinned --paper token). URL scan + overlay unavailable (no Chromium-family browser). B's markup facts agree with A: no aria-hidden on sidenotes, focus ring below 70rem, live region present, lang correct, outline clean, og tags correct.

## Priority Issues
- [P1] Personal Gmail visible in published screenshot (ronda-osm-search.png, top-right of Bellingcat OSM tool header). Content, not design; verified by looking. Fix: crop/blur that strip. Command: none (content edit)
- [P1] Ending reads like a publishing platform and steps on the best line (open item in DECISIONS.md): ~9 options at one decision point, "Read next" head bigger than article headings, byline repeats homepage tagline, no neuro/BCI pivot at exit, Greek post's Read next is an English post. Author decided to decide later. Command: /impeccable distill
- [P1] Post page nearly colourless; poster half stops at header rule. Fix without a cover: category-coloured bar above title, light category tint on Read-next rule, mono margin annotation block at >=70rem. Command: /impeccable colorize
- [P2] Long guides give no orientation (no TOC, reading time, visible heading anchors). Fix: reading time in meta, hover/focus # on h2, no-JS <details> contents for posts with >=4 h2s. Command: /impeccable layout
- [P2] First phone screen crowded: two-row sticky header (~100px; partly from step 1 wrap), hero-size 6-line title, dek repeats title; small tag/share targets. Fix: non-sticky header <=640px, cap title ~2.1rem narrow, bigger touch targets. Command: /impeccable adapt

## Persona Red Flags
Sam: narrow-mode sidenotes announce as checkbox (pure-CSS limit; <details> can't sit mid-sentence); 400% zoom sticky header covers ~40%; tag links ~16px tall.
Casey: crowded first screen; no resume point on 18,000px post; tiny [n] target, no hint it opens; share/tags only at the bottom.
Greek clinician: download steps in a note collapsed on mobile; main action link text "this link"; English Read next.
Neurotech engineer: only OSINT guides; ending has generic tagline, no /cv link, no neuro mention.

## Minor Observations
Sidenote collision risk with adjacent short paragraphs (inferred from CSS, not seen); notes up to 3 lines above marker (accepted, D15). Test post "Let's see if this works" published and shown on homepage/archive (not currently any post's Read next). Header/article left edges differ at 1024px. Both Bellingcat deks start "How I solved…"; one long wrapping h2. og:site_name, twitter:title/description missing. <small role="note"> block inside <p>. #project tag duplicates category chip on Greek post.

## Questions to Consider
- If the margin is the signature, why is it empty for most of a post?
- What is the one thing a reader should do after the last paragraph?
- Is a 0.62em colour square enough meaning for the page most visitors see first?
