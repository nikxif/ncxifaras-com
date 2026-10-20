# Design

> The *why*. The token spec built from the shipped code (exact values, components, do's and don'ts) is [`/DESIGN.md`](../DESIGN.md), and its machine-readable sidecar is `.impeccable/design.json`. Change a value here or in `tokens.css`, and that file changes in the same commit.

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
| `--cobalt` | `#1A3AAE` | **dominant accent** (locked; was `#1E45C9` in the first draft) |
| `--cobalt-deep` / `--vermilion-deep` / `--ochre-deep` | `#12297F` / `#8A2413` / `#6B4B06` | small text on light ground — contrast-safe (D18) |
| `--vermilion` | `#DE3F24` | secondary pop |
| `--ochre` | `#E7A32A` | tertiary pop |

**Colours encode category, not decoration:** cobalt = project, vermilion = opinion, ochre = guide, ink = personal (D24). Categories are capped at ~4–5 because each owns a colour; anything finer is an uncoloured tag.

The tokens live in `src/styles/tokens.css` and are mirrored as hex in `src/lib/palette.ts` for SVG filter attributes and OG rasters. Change both together.

## Typography

Three roles, each with a distinct job; the serif/grotesque/mono split itself narrates "writer · engineer · clinician."

- **Display:** `Commissioner` (grotesque, variable 100–900; native Greek — by Greek type designer Kostas Bartsokas) — hero, section headings. *(Replaced Archivo, which has no Greek subset — see D9.)*
- **Body:** `Source Serif 4` (variable, optical-size axis, body pinned at `opsz` 16): all long-form reading. *(Replaced Alegreya for readability at long-form length; see D25.)*
- **Utility:** `JetBrains Mono` — dates, metadata, sidenotes, code.

**Hard requirement:** all three must retain full Greek coverage (future bilingual + correct Greek rendering). This constraint is a feature — it eliminates most generic trend fonts for us. All three faces above are open-source and Greek-capable. OG images register Latin and Greek under separate family names (D26).

The type scale (`--text-xs` … `--text-3xl`, fluid `clamp()`) and weights live in `tokens.css`.

## Layout principles

- Generous whitespace — the anti-cramped, anti-terminal move.
- Bold, obvious section headings (Commissioner) — headings should never be easy to miss.
- Homepage hero is a thesis: identity + the neuro/BCI pivot, stated plainly.
- Visual rhyme: the hero's geometric motif shares vocabulary with the generated covers, so the page coheres.
- The `/cv` page is intentionally quieter than the rest of the site.

## Signature element: sidenotes

Margin notes are the one memorable device. Mechanics: D15 (pure CSS, paragraph-anchored, margin at ≥70rem, tap-to-expand below). Functional (caveats, citations, technical asides — the stuff otherwise buried in parentheses) *and* characterful (scholarly-annotated, fitting a physician-engineer who writes in asides). Spend the boldness here; keep everything else disciplined.

## Cover system

Two modes sharing one colour language, so photo posts and photo-less posts cohere on any index:

1. **Duotone photo** (`coverMode: photo`): real photos pushed through a consistent treatment, a fixed aspect ratio and a duotone ramp from ink through the category colour to paper (`personal` uses ink-soft as its mid-tone). Validated on real photos. Any source image (phone snap, screenshot, stock) ends up looking like a sibling. This is the "Maggie cohesion without illustration skill" solution.
2. **Generated cover** (`coverMode: generated`, the default): a geometric Bauhaus composition in the palette, deterministic per slug (~96 variants; D16), for posts with no photo. You're never blocked on "I don't have an image." The same geometry drives each post's OG card (D17).

The current generator is the approved execution.

## Accessibility / quality floor

Responsive to mobile; `:focus-visible` outlines (two-tone ink + ochre halo); `prefers-reduced-motion` honoured; sufficient contrast on all coloured fills. Measured ratios and guardrails: D18.
