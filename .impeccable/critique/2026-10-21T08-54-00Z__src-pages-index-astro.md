---
target: src/pages/index.astro
total_score: 25
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/home/ncx/Websites/ncxifaras-com/src/pages/index.astro"
target_fingerprint: "sha256:b96158d67871b518671edcbc7b29f8a01fd1b464183592c3ed8d3fc51de64826"
target_path: /home/ncx/Websites/ncxifaras-com/src/pages/index.astro
timestamp: 2026-10-21T08-54-00Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review · B: detector and mechanical evidence)

# Critique: homepage (src/pages/index.astro) — 25/32 (Good); heuristics 7 and 10 n/a

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Static page; wordmark and nav clear |
| 2 | Match with real world | 3 | Greek card has no language cue; thesis can misparse |
| 3 | User control and freedom | 3 | Greek-only post surprises English reader after click |
| 4 | Consistency and standards | 3 | Category shown twice per card (cover label + chip) |
| 5 | Error prevention | 3 | "1 pieces"; orphan card at 2 posts; 0 posts drops section |
| 6 | Recognition rather than recall | 3 | About/CV/Contact only as 15px nav + footer links |
| 7 | Flexibility and efficiency | n/a | brochure homepage |
| 8 | Aesthetic and minimalist | 4 | Disciplined and airy |
| 9 | Error recovery | 3 | barely applicable |
| 10 | Help and documentation | n/a | none needed on a homepage |

## Specificity
Authored for this product (headline, vermilion last line, motif, covers). Below the hero it is a standard featured + 3-up grid; the poster/annotation voice stops at the hero. Detector: src 0 findings; dist/index.html low-contrast (vermilion 4.05:1 on large h1 span: false positive, passes 3:1 large) and cream-palette (deliberate token, fires on all pages). 72 other dist findings are vendored sveltia-cms.js.

## Priority issues
- [P1] Pivot asserted, not evidenced, no link (clarify): link to /about, add one grounded cv.yaml line (HTA role), pivot in ink not ink-soft.
- [P1] No closing beat (shape): quiet mono row "More about me → About · CV · Contact" under a hairline.
- [P2] 641–820px inverts hierarchy: one-column grid makes secondary covers larger than the lead (adapt).
- [P2] Motif dead zone at 1440 (~350px gap, empty below y≈370) and hidden ≤820 so phone loses the poster (layout).
- [P3] Vermilion lands on "keeps breaking." — highlights the problem, not the offer (clarify; copy only).

## Persona red flags
BCI collaborator: no proof, no next step, no link to /about. Jordan (clinician): Greek card has no cue/lang. Casey: "all posts →" ~22px, no coarse enlargement. Sam: Greek card lacks lang="el"; 12.6px mono metadata.

## Minor
"1 pieces"; count includes test post; wordmark aria-label "Home" vs visible text; no twitter:title/description; → not in any font subset; lead cover loading=lazy; JetBrains Mono not preloaded; dead .amp CSS; stray space before second <br>; straight apostrophe in "I'm"; lede == meta description; "Writing" x3; all posts featured:false; header on 390 is two rows (B measured).

## Questions
Why is the only proof of the pivot a puzzle and a test post? Should vermilion mark the problem or the offer? Lead + hairline list instead of 3-up grid? Could the motif do a job?
