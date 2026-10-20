---
name: ncxifaras.com
description: A physician-engineer's site set as a Bauhaus print object with a scholar's margin.
colors:
  cobalt: "#1A3AAE"
  cobalt-deep: "#12297F"
  vermilion: "#DE3F24"
  vermilion-deep: "#8A2413"
  ochre: "#E7A32A"
  ochre-deep: "#6B4B06"
  paper: "#FAF7F0"
  paper-2: "#F2ECDD"
  ink: "#1A1714"
  ink-soft: "#544F45"
  line: "#E2DBCB"
typography:
  display:
    fontFamily: "'Commissioner Variable', system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.4rem, 1.8rem + 3.2vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "'Commissioner Variable', system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.9rem, 1.5rem + 1.8vw, 2.6rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "'Commissioner Variable', system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.5rem, 1.3rem + 1vw, 1.9rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  nav:
    fontFamily: "'Commissioner Variable', system-ui, -apple-system, sans-serif"
    fontSize: "0.94rem"
    fontWeight: 600
  body:
    fontFamily: "'Source Serif 4 Variable', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.13rem, 1.05rem + 0.35vw, 1.19rem)"
    fontWeight: 400
    lineHeight: 1.62
    fontVariation: "'opsz' 16"
  lede:
    fontFamily: "'Source Serif 4 Variable', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.25rem, 1.15rem + 0.5vw, 1.38rem)"
    fontWeight: 400
    lineHeight: 1.5
  body-small:
    fontFamily: "'Source Serif 4 Variable', Georgia, 'Times New Roman', serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'JetBrains Mono Variable', ui-monospace, 'Cascadia Code', Menlo, monospace"
    fontSize: "0.79rem"
    fontWeight: 400
    letterSpacing: "0.02em"
  sidenote:
    fontFamily: "'JetBrains Mono Variable', ui-monospace, 'Cascadia Code', Menlo, monospace"
    fontSize: "0.89rem"
    fontWeight: 400
    lineHeight: 1.5
  cover-title:
    fontFamily: "'Commissioner Variable', system-ui, -apple-system, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 700
    lineHeight: 1.1
rounded:
  swatch: "1px"
  sm: "2px"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "1rem"
  "4": "1.5rem"
  "5": "2.5rem"
  "6": "4rem"
  "7": "6rem"
components:
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.nav}"
  category-chip:
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
  cover-label:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.2rem 0.45rem"
  share-button:
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.3rem 0.6rem"
  share-button-hover:
    textColor: "{colors.cobalt-deep}"
  sidenote-body:
    textColor: "{colors.ink-soft}"
    typography: "{typography.sidenote}"
  code-inline:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.12em 0.35em"
  skip-link:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 1rem"
---

# Design System: ncxifaras.com

> This is the token spec, written from the shipped code. The reasoning behind
> it (why cobalt leads, why sidenotes, why these faces) lives in
> [`docs/DESIGN.md`](docs/DESIGN.md) and [`docs/DECISIONS.md`](docs/DECISIONS.md).
> Runtime tokens are in `src/styles/tokens.css`; colours are mirrored as hex in
> `src/lib/palette.ts` for SVG filter attributes and OG rasters. Change all three together.

## Overview

**Creative North Star: "The Annotated Poster"**

The site reads as a printed object: a Bauhaus poster on warm chalk paper, with
flat fields of cobalt, vermilion and ochre, solid ink rules, near-square
corners, and a geometric motif that recurs from the homepage hero to every post
cover and OG card. Over that sits a scholar's annotation layer. Margin notes,
mono metadata and captions in a typewriter face carry the caveats, sources and
asides a physician-engineer writes in. The poster supplies the colour and the
confidence. The annotations supply the voice.

Colour is spent where it carries meaning: category identity, the cover
compositions, the hero motif, link and focus details. Everything else is quiet
and typographic. Components barely exist as objects. Mono labels, hairlines and
1.5px ink rules do the structural work, so prose and covers lead. Spacing is
generous on purpose. The site is airy, never terminal-dense, and readable by
people who aren't developers.

Confirmed rejections: the cream + high-contrast serif + terracotta "AI design"
default (the cobalt lead is the escape from it), terminal or broadsheet
density, loud filled category pills, and going quieter overall. Review said the
system could take slightly *more* colour, never less.

**Key Characteristics:**
- Warm chalk ground, warm near-black ink, three Bauhaus primaries with cobalt dominant.
- Three faces, three jobs: grotesque display, serif reading, mono annotation. All Greek-capable.
- Flat. Depth comes from ink rules and colour fields, not shadows.
- Near-square 2px corners: a printed object, not an app card.
- Sidenotes are the single signature device. Boldness is spent there and in the covers.

## Colors

A warm paper-and-ink ground carrying three saturated primaries, each of which encodes something.

### Primary
- **Bauhaus Cobalt** (#1A3AAE): the dominant accent. Category colour for `project`, the hero's large disc, link underlines (at 45% mix), nav and section-link hover rules, and the dot in the wordmark. Fine at large or non-text sizes on paper (7.1:1).
- **Bauhaus Cobalt, deep** (#12297F): cobalt for small text: link hover, sidenote markers, "all posts →", caption and sidenote links (11.9:1 on paper).

### Secondary
- **Poster Vermilion** (#DE3F24): the secondary pop. Category colour for `opinion`, the hero's vertical bar, and the last line of the hero headline.
- **Poster Vermilion, deep** (#8A2413): vermilion for small text on paper (8.4:1).

### Tertiary
- **Signal Ochre** (#E7A32A): the tertiary pop. Category colour for `guide`, the hero square, the sidenote and blockquote left rules, the focus-ring halo, and text selection (45% mix).
- **Signal Ochre, deep** (#6B4B06): ochre for small text on paper (7.5:1).

### Neutral
- **Warm Chalk** (#FAF7F0): the page ground, sticky header, and photo-cover highlight.
- **Chalk Panel** (#F2ECDD): generated-cover ground, inline code background, photo-cover fallback.
- **Lamp-Black Ink** (#1A1714): primary text, all strong rules (1.5px), the category colour for `personal`, and photo-cover shadows. 16.7:1 on paper.
- **Ink, soft** (#544F45): secondary text such as deks, metadata, sidenote bodies, tags and captions (7.6:1).
- **Hairline** (#E2DBCB): thin dividers: prose h2 underline, post footer, code-block borders, share-button outlines, and the 3px left rule on figure captions.

### Named Rules
**The Colour-Is-Category Rule.** Each primary owns one category: project = cobalt, guide = ochre, opinion = vermilion, personal = ink. A category shows up as a 0.62em colour square beside a mono label, as a short bar (4rem × 0.4rem) above a post's title, and as the dominant field of its cover. It never appears as a filled pill, and never colours text (ochre and vermilion fail contrast at title size). Four categories is the cap because there are only so many colours. Anything finer is an uncoloured tag.

**The Deep-for-Small Rule.** Accent-coloured text below large sizes uses the `-deep` variant. Paper-coloured text never sits on a vermilion fill at small sizes (4.05:1 fails AA).

**The Three-Places Rule.** A palette change touches `tokens.css`, `palette.ts`, and this file. Photo covers and OG cards can't read CSS vars and will drift otherwise.

## Typography

**Display Font:** Commissioner Variable (fallback: system-ui, sans-serif)
**Body Font:** Source Serif 4 Variable (fallback: Georgia, serif)
**Label/Mono Font:** JetBrains Mono Variable (fallback: ui-monospace, Menlo)

**Character:** The split tells the identity on its own: a confident grotesque
for the engineer's headings, a calm optical-size serif for the writer's prose,
and a mono for the clinician's notes and metadata. Commissioner's Greek is
native, the work of a Greek type designer, not a bolted-on subset.

### Hierarchy
- **Display** (800, fluid 2.4rem → 4.25rem, line-height 1.05, -0.015em): page `h1`s and the homepage thesis. `text-wrap: balance`. A post's own title drops to Headline size at ≤640px so it doesn't take five heavy lines on a phone.
- **Headline** (800, fluid 1.9rem → 2.6rem, 1.2): section heads (`SectionHead`, sitting on a 1.5px ink rule) and featured-card titles. In prose, `h2` drops to Title size with a hairline underneath.
- **Title** (700, fluid 1.5rem → 1.9rem, 1.2): card titles and `h3`. Compact archive rows use the Lede size.
- **Body** (400, fluid ≈18–19px, 1.62, `opsz` 16): all long-form reading, measured at `--width-content` (46rem, about 80 characters per line). That's deliberately longer than the textbook 65ch: a 40rem measure was tried and read as compacted. `text-wrap: pretty`.
- **Lede** (400, fluid 1.25rem → 1.38rem, 1.5): hero lede and the CV summary.
- **Body small** (400, 1rem, 1.5): serif secondary text: card deks, CV organisations and bullets.
- **Label** (400–500, 0.79rem, +0.02em): dates, category chips, tags, share buttons and footer links. Lowercase in the hero eyebrow, never uppercase on-site (the OG card is the only exception).
- **Sidenote** (400, 0.89rem, 1.5): sidenote bodies and figure captions.
- **Cover title** (700, 1.05rem, 1.1): the optional title set onto a cover in feature slots. It's fixed rather than fluid because the cover itself scales.

### Named Rules
**The Greek-or-Nothing Rule.** Every face must ship a verified Greek subset, checked in font metadata and not in marketing copy. In OG rendering, Latin and Greek register under distinct family names (`Commissioner` / `CommissionerGreek`) with a fallback list. A face without Greek is out, however good it looks.

**The Mono-Means-Annotation Rule.** JetBrains Mono marks the annotation layer (metadata, notes, captions, labels) and code. It never sets headings or running prose. Its real italic is loaded, so emphasis inside a note is never a slanted roman.

**The Curly-Quotes Rule.** Titles and deks pass through `typeset()` (`src/lib/posts.ts`) wherever they render: page, card, `<title>`, OG card. Frontmatter skips smartypants and a CMS textbox types straight quotes, so this is never left to the author.

## Layout

A single centred column system with two widths: `--width-wide` (70rem) for
the homepage, index grids and header, and `--width-content` (46rem) for prose,
lists, `/about` and `/cv`. The page gutter is fluid (`clamp(1.25rem, 4vw, 2.5rem)`).
Spacing follows a seven-step rhythm (0.25 → 6rem). Section breathing room is
`space-5`/`space-6`, and the footer sits `space-7` below content. The airiness
is deliberate.

- **Homepage:** a hero grid (`1fr 16rem`) with the thesis on the left and the geometric motif (disc, bar, ring, square) on the right. Below it come the featured card (22rem cover beside text) and a three-column grid of recent posts. At ≤820px everything stacks and the motif is hidden.
- **Archive (`/posts`, `/tags`):** compact rows with a 12rem cover beside text and the dek clamped to two lines, 12 per page. At ≤640px they stack.
- **Post page:** header, body and post footer share the 46rem column. At ≥70rem the article spans the full container, so its left edge sits under the header wordmark. Every paragraph is the positioning context for its notes, which sit in a 16rem column 2rem off the text. Below 70rem it's a single column. No cover on the page (D31). The page ends with tags and share, then a full-width "Read next" section with one compact card (still an open item; there's deliberately no author bio line, D33).
- **Header:** sticky above 640px (static on phones), 4rem tall, paper background with a 1.5px ink rule beneath.
- **`/cv`** is intentionally quieter: content width, hairline-ruled sections, no colour beyond ink.

## Elevation & Depth

Flat by construction. There are no box-shadows on surfaces. Depth comes from
printed means: solid 1.5px ink rules (header, footer, section heads, cover
frames, prose images), flat colour fields in the covers, and the sticky header
sitting above content on its own paper background. The only shadows are
functional: the focus ring's ochre halo, and a 1px paper text-shadow that keeps
cover titles legible over geometry.

### Named Rules
**The Ink-Rule Rule.** Separation is a line, not a lift. Strong structure gets `1.5px solid ink`, and quiet structure gets a `1px` hairline. Never add a drop shadow to a card, cover or panel.

## Shapes

Near-square everywhere: `2px` radius on covers, buttons, code, labels and the
focus ring, and `1px` on the category swatch. These read as a printed object,
not an app card. The geometric vocabulary (circles, rings, bars, squares, quarter
forms) belongs to the covers and the hero motif. It's drawn from a fixed shape
set and composed deterministically per post slug, about 96 variants. Covers are
always 16:10, framed in ink. Photo covers get the same frame and label as
generated ones, duotoned from ink through the category colour to paper, so the
two modes are siblings on any index.

## Components

The feel is quiet and typographic. Components barely exist as objects. Labels,
rules and type do the work, and the covers and prose lead.

### Navigation
- **Style:** Commissioner 600 at 0.94rem, ink, no underline. A 2px bottom border appears in cobalt on hover and on the current page (`aria-current`).
- **Wordmark:** `ncxifaras.com` in Commissioner 800 at 1.15rem, with the dot in cobalt. It's the same mark in the header and footer: the site opens and signs off with one poster-weight gesture.
- **Mobile:** same row, tighter gap (`space-3`) at ≤640px. The header stops being sticky there: on a phone the bar is often two rows, and pinning it over the text cost a sixth of the screen.

### Category chip
- **Style:** a mono label in ink-soft, weight 500, led by a 0.62em square (1px radius) in the category colour. No fill, no border.

### Category bar
- **Style:** a flat 0.4rem rule in the category colour, set directly under the chip and the date as an underline that ends with the date (the chip + date group's bottom border, so its length follows the text). The gap above it is 0.62em, the size of the chip's colour square. Square-cornered, no fill. Decorative: the chip carries the category as text, so the rule is exempt from the 3:1 non-text rule, and ochre (~2:1 on paper) is used as-is. Posts only.

### Post cards
- **Default:** stacked, with the cover above meta, title and dek.
- **Featured:** a 22rem cover beside the text, the title at Headline size, the dek in full ink.
- **Compact:** a 12rem cover beside the text, the dek clamped to two lines.
- **Hover:** the title shifts to cobalt-deep. The cover link is `tabindex=-1` so keyboard users hit the title once.

### Covers
- **Generated:** an inline SVG on chalk-panel, dominated by the category colour, with an ink 1.5px frame. A mono label sits top-left on a 78% paper wash, and an optional Commissioner title sits bottom-left.
- **Photo:** an Astro `<Image>` passed through an SVG duotone filter (Rec. 709 luminance → ink / category / paper). Same frame and label.

### Buttons (share)
- **Shape:** near-square (2px), with a 1px hairline outline and no fill.
- **Style:** mono label in ink-soft, padding 0.3rem × 0.6rem.
- **Hover / Focus:** text goes cobalt-deep and the border goes cobalt, over 140ms. Focus uses the global two-tone ring.
- There are no filled buttons anywhere on the visitor-facing site.

### Links
- **Body links:** inherit text colour, with a 1.5px underline in cobalt at 45% mix and offset 0.18em. On hover the text goes cobalt-deep and the underline turns solid cobalt. Links are always underlined, never signalled by colour alone.
- **Section links ("all posts →"):** Commissioner 600, cobalt-deep, with a 2px cobalt bottom border on hover.

### Focus
- **Ring:** a 3px ink outline (offset 2px) plus a 6px ochre halo at 55%. Ink carries contrast on paper and ochre carries it on dark fills.

### Sidenote (signature component)
- **Marker:** a mono superscript in cobalt-deep, auto-numbered by a CSS counter (or a custom `label` such as `†`). On hover it gets an ochre wash at 22%.
- **Body:** mono 0.89rem in ink-soft, with a 3px ochre left rule and 0.9rem padding.
- **≥70rem:** always visible in a 16rem margin column, 2rem off the text, top-aligned to its paragraph.
- **<70rem:** collapses to a `[n]` marker on a soft ochre highlighter wash (deeper when open or hovered) that expands the note inline on tap, driven by a hidden checkbox. No JS. On touch the hit area widens to ~44px across and stays under one line tall.
- **Kin:** blockquotes (italic, ink-soft, 3px ochre rule) and figure captions (mono, ink-soft, 3px hairline rule) share the same left-rule annotation grammar.

## Do's and Don'ts

### Do:
- **Do** route every colour through a token, and update `tokens.css`, `palette.ts` and this file together.
- **Do** use the `-deep` accent for any small accent-coloured text (The Deep-for-Small Rule).
- **Do** separate with ink rules (1.5px) or hairlines (1px) at a 2px radius (The Ink-Rule Rule).
- **Do** keep mono for the annotation layer (metadata, notes, captions, labels) and code.
- **Do** author sidenotes inline, inside a paragraph, so they have something to anchor to.
- **Do** give every post a cover. `generated` is the default, and photos go through the duotone so they stay siblings.
- **Do** keep generous spacing (`space-5`/`space-6` between sections). Airy is the brief.

### Don't:
- **Don't** drift toward cream + high-contrast serif + terracotta. Cobalt leads.
- **Don't** make the site quieter overall. If anything it can take a little more colour.
- **Don't** use filled, loud category pills. Category is a small square plus a label, and the cover carries the colour.
- **Don't** add drop shadows, rounded app cards or radii above 2px.
- **Don't** introduce a typeface without a verified Greek subset.
- **Don't** set paper-coloured small text on vermilion.
- **Don't** pack the layout to terminal or broadsheet density. Non-developers read this site.
