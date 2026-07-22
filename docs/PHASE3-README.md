# Phase 3 — signature & covers

## New files

```
src/components/Sidenote.astro        → the signature element (MDX component)
src/components/GeneratedCover.astro  → no-photo Bauhaus cover (inline SVG)
src/components/PhotoCover.astro      → duotone-a-real-photo cover
src/components/Cover.astro           → dispatcher: picks generated vs photo
src/content/blog/sidenotes-demo.mdx  → sample showing sidenotes (delete later)
```

## Replacements

```
src/components/PostCard.astro   → replaces Phase 2 (adds Cover above meta)
src/layouts/PostLayout.astro    → replaces Phase 2 (sidenote counter + margin room)
```

## How each piece works

### Sidenotes
Use inside any **`.mdx`** post (not `.md` — components need MDX):

```mdx
import Sidenote from '../../components/Sidenote.astro';

Body text here.<Sidenote>The aside goes here.</Sidenote> More text.
<Sidenote label="†">Optional custom marker instead of the auto number.</Sidenote>
```

- **Desktop (≥60rem):** notes sit in the right margin. `PostLayout` shifts the
  prose column left so there's a dedicated gutter; the note positions into it.
- **Mobile:** notes hide behind a numbered marker `[1]` and expand inline on tap.
- **No JS** — a hidden checkbox drives the toggle, so it passes the strict CSP
  untouched. Auto-numbering is a CSS counter reset on `.prose`.

### Covers
Driven by frontmatter — no caller ever branches:

```yaml
coverMode: generated        # default — Bauhaus SVG in the category colour
# or:
coverMode: photo
cover: ../../assets/foo.jpg  # a real image, duotoned into the category colour
```

- **GeneratedCover** is deterministic: the slug seeds which of 4 compositions +
  mirror you get, so a post's cover is stable across builds.
- **PhotoCover** duotones any image into the category ramp via an SVG filter, so
  photo and generated covers share one visual language on the index.
- `Cover.astro` reads `coverMode` and dispatches. `PostCard` already calls it.

## Try it

```bash
npm run dev
```

- `/posts/sidenotes-demo` — sidenotes in the margin (resize the window narrow to
  watch them collapse to tappable numbers).
- `/` and `/posts` — covers now on every card; the featured card shows the
  cover + text side by side. All four category colours should read distinctly;
  the `note` sample stays quiet (ink).

## Judge the colour question here
This is the first full, cover-laden index — the real test of "is it colourful
enough." If it still feels restrained, this is the moment to push `--cobalt`
brighter or lean harder on vermilion/ochre in the cover compositions.

## Photo covers — the caveat to revisit
`PhotoCover` is built but **unvalidated against real photos** (open item, D12).
The duotone ramp values in the `<feComponentTransfer>` are a first pass; once you
drop in an actual photo we'll likely tune the mid-tone mapping per category.
Until you have real images, every post can stay `coverMode: generated`.
