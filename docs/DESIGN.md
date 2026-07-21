# Design

## Direction

Bauhaus-influenced: warm-paper ground, near-black ink, bold primaries used with intent. Confident and colourful, not monochrome; airy, not cramped; legible and friendly to non-developers (no terminal/broadsheet density). Deliberately *not* the current "AI design" cliché of cream + high-contrast serif + terracotta accent — the dominant accent is a cool cobalt, which is what keeps it off that well-trodden path.

Calibration from review: colourful is right, could even take slightly *more* colour; quieter is explicitly wrong.

## Palette

Centralise every colour as a CSS custom property / token so the whole scheme is retunable after build without touching components.

| token | hex | role |
|---|---|---|
| `--paper` | `#FAF7F0` | page background (warm chalk) |
| `--paper-2` | `#F2ECDD` | panels, generated-cover ground |
| `--ink` | `#1A1714` | primary text (warm near-black) |
| `--ink-soft` | `#544F45` | secondary text |
| `--line` | `#E2DBCB` | hairlines |
| `--cobalt` | `#1E45C9` | **dominant accent** — *exact blue shade OPEN, to tune* |
| `--vermilion` | `#DE3F24` | secondary pop |
| `--ochre` | `#E7A32A` | tertiary pop |

**Tag colours encode category, not decoration:** cobalt = OSINT, vermilion = policy, ochre = tutorial, ink = note. Extend deliberately as new categories appear.

## Typography

Three roles, each with a distinct job; the serif/grotesque/mono split itself narrates "writer · engineer · clinician."

- **Display:** `Commissioner` (grotesque, variable 100–900; native Greek — by Greek type designer Kostas Bartsokas) — hero, section headings. *(Replaced Archivo, which has no Greek subset — see D9.)*
- **Body:** `Alegreya` (literary serif) — all long-form reading.
- **Utility:** `JetBrains Mono` or `IBM Plex Mono` — dates, metadata, sidenotes, code.

**Hard requirement:** all three must retain full Greek coverage (future bilingual + correct Greek rendering). This constraint is a feature — it eliminates most generic trend fonts for us. All three candidates above are open-source and Greek-capable.

Type scale and weights as established in the homepage mockup.

## Layout principles

- Generous whitespace — the anti-cramped, anti-terminal move.
- Bold, obvious section headings (Commissioner) — headings should never be easy to miss.
- Homepage hero is a thesis: identity + the neuro/BCI pivot, stated plainly.
- Visual rhyme: the hero's geometric motif shares vocabulary with the generated covers, so the page coheres.
- The `/cv` page is intentionally quieter than the rest of the site.

## Signature element: sidenotes

Margin notes are the one memorable device. Functional (caveats, citations, technical asides — the stuff otherwise buried in parentheses) *and* characterful (scholarly-annotated, fitting a physician-engineer who writes in asides). Spend the boldness here; keep everything else disciplined.

## Cover system

Two modes sharing one colour language, so photo posts and photo-less posts cohere on any index:

1. **Duotone photo** (`coverMode: photo`) — real photos pushed through a consistent treatment: fixed aspect ratio, palette-wash duotone. Any source image (phone snap, screenshot, stock) ends up looking like a sibling. This is the "Maggie cohesion without illustration skill" solution.
2. **Generated cover** (`coverMode: generated`) — geometric Bauhaus composition in the palette, for posts with no photo. Never blocked on "I don't have an image."

**OPEN:** the generated-cover *visual style* is approved in concept but the current execution needs iterating — the result should be different. To be designed separately before build.

## Accessibility / quality floor

Responsive to mobile; `:focus-visible` outlines; `prefers-reduced-motion` honoured; sufficient contrast on all coloured fills.
