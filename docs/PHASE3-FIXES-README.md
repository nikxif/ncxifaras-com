# Phase 3 — fixes

Three fixes from your review. All are drop-in replacements over the Phase 3 files.

## Files

```
src/components/Sidenote.astro       → REPLACES Phase 3 (always-visible desktop, paragraph-anchored)
src/layouts/PostLayout.astro        → REPLACES Phase 3 (paragraph = positioning context; margin reserve)
src/components/GeneratedCover.astro → REPLACES Phase 3 (collision-hardened)
src/components/PostCard.astro        → REPLACES Phase 3 (adds `compact` variant)
src/pages/posts/[...page].astro     → REPLACES Phase 2 (uses compact cards)
src/pages/tags/[tag].astro          → REPLACES Phase 2 (uses compact cards)
src/content/blog/sidenotes-demo.mdx → REPLACES Phase 3 (inline authoring pattern)
```

## 1. `/posts` covers were too big → compact side-by-side cards

`PostCard` gains a `compact` variant: a 12rem cover on the left, text on the
right, dek clamped to 2 lines. Both list pages (`/posts`, `/tags/*`) now pass
`compact`, so the archive reads like a tight list — closer to `/writing` —
instead of giant stacked covers. The homepage still uses the big `featured`
card and the default stacked card, unchanged.

## 2. Two covers were identical → collision-hardened generator

The old generator was `variant = hash % 4` — only four possible layouts, so
with a handful of posts, duplicates were likely (that's why `/hello` and
`/sidenotes-demo` were twins). The rebuild pulls **independent** decisions from
different bit-ranges of the slug hash:

- 6 compositions × 2 mirrors × 4 accent-rotations × 2 colour-swaps ≈ **96
  distinct covers**, all still deterministic per slug.

Collisions among a small blog's worth of posts are now vanishingly unlikely,
and even a collision on one axis (say, same base composition) will almost
always differ on mirror/rotation/colour, so it won't read as a duplicate.

## 3. Desktop sidenotes broken → always-visible, paragraph-anchored

**The bug:** the old note was `position: absolute; left: calc(100% + 2.5rem)`
where its containing block was the **zero-width inline `<span>`** wrapping it —
so `100%` resolved to the cursor position mid-line. That's why the second note
sat on top of the body text and the third landed at a different x than the
first: each was anchored to wherever its word happened to be.

**The fix — make the paragraph the anchor, not the word.** `PostLayout` now
sets `.prose :is(p, li, blockquote) { position: relative }` on desktop, and the
note body is `position: absolute; left: 100%; top: 0` against that paragraph.
Because every paragraph is the same width (`--width-content`):

- `left: 100%` → the paragraph's right edge, **identical for every note** → they
  all line up in one clean margin column (fixes the "third one's more to the
  left" annoyance).
- `top: 0` → the paragraph's top → each note aligns vertically to the paragraph
  it belongs to.
- Desktop: **always visible**, no toggle. Mobile (<70rem): collapses behind a
  `[1]` marker, expands inline on tap. Still pure-CSS, still CSP-safe.
- The counter now increments **once** (on the wrapper), so a custom `label` like
  `†` no longer throws off the numbers after it.

The desktop breakpoint is **70rem** — the width at which text (46) + gap (2) +
note column (16) + page margins actually fit. Below that, notes use the mobile
tap-to-expand mode rather than getting clipped off the right edge.

### Authoring rule: write them INLINE, mid-sentence

Put each `<Sidenote>` **right where the marker should sit**, in the middle of
the sentence, no blank lines around it:

```mdx
...the point it modifies,<Sidenote>The aside about that.</Sidenote> which suits
technical writing far better.
```

The note anchors to the paragraph it's written inside, so it must be *inside* a
paragraph. Don't put it on its own line between paragraphs — a note that isn't
inside a `<p>` has no paragraph to anchor to. The rewritten `sidenotes-demo.mdx`
shows the pattern.

### Known limitation (pure-CSS honest caveat)

Alignment is to the **paragraph top**, not the exact line the marker sits on —
getting line-level vertical alignment isn't possible in pure CSS (you accepted
this). Also: because notes are lifted out of flow, two notes in **adjacent short
paragraphs**, or two notes in the **same paragraph**, can overlap in the margin.
For normal prose (roughly one note per paragraph, paragraphs taller than their
notes) this doesn't bite. If it ever does, the fix is JS-based collision
nudging — say the word and I'll add it, but it's not worth the weight yet.

## Try it

```bash
npm run dev
```

- `/posts` — compact rows, small covers, no more giant images.
- `/posts/sidenotes-demo` — notes sit in the right margin on desktop, each
  aligned to its paragraph; narrow the window and they collapse to `[1]`, `[†]`
  markers that expand on tap.
- `/` and `/posts` — `/hello` and `/sidenotes-demo` should now have visibly
  different covers.

## Still open (unchanged from Phase 3)

- **Photo covers** (`PhotoCover`) remain unvalidated against real images — keep
  posts on `coverMode: generated` until you drop real photos in and we tune the
  duotone ramp.
- **Cobalt shade / overall colour** — judge on the full covered index; tune
  `--cobalt` in `tokens.css` if it still reads restrained.
