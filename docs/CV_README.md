# CV as YAML data

Keeps the structured shape (so the master-CV transform still has a target — D5)
while making the data pleasant to edit. YAML in, same page out.

## Files

```
NEW  src/data/cv.yaml   ← the CV content (edit this)
EDIT src/pages/cv.astro ← now imports the YAML; presentation only
```

## Config: enable YAML imports

Astro doesn't parse `.yaml` imports out of the box — add the Vite plugin. Small
dep, zero runtime cost (it's build-time only):

```bash
npm i -D @rollup/plugin-yaml
```

```js
// astro.config.mjs
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
  // ...existing config...
  vite: {
    plugins: [yaml()],
    // if you already added ssr.external for resvg (Phase 4), keep both:
    // ssr: { external: ['@resvg/resvg-js'] },
  },
});
```

(If you'd rather not add a plugin, the alternative is to keep `cv.yaml` and
parse it in the page with `js-yaml` + `fs` at build time — but the Vite plugin
is cleaner and gives you the import syntax. Say the word if you prefer the
no-plugin route.)

## Editing

Everything's in `src/data/cv.yaml`. The shape:

```yaml
summary: >-
  One folded paragraph. The >- means "join these wrapped lines into one
  string" — write it readably across lines, it renders as one.

sections:
  - heading: Experience        # a section
    items:
      - title: Role title
        org: Organisation       # omit or leave "" to hide the org line
        period: "2020–2024"     # quote anything with a colon or dash-leading
        notes:                  # omit or [] for no bullets
          - First bullet
          - Second bullet
```

Rendering rules (already handled by the page):
- empty `org` / `period` → that line is hidden
- empty `notes` (`[]`) → no bullet list
- so a Languages "section" can be one item with just a title, no org/period

## Why not markdown (recap)

The CV is structured data, not prose — title/org/period/notes are fields the
transform needs to route by profile (academic vs industry vs web). Markdown
throws that structure away. YAML keeps it and is nicer to hand-edit than a JS
object literal.

## Validation

Prefilled and verified to parse (js-yaml): 4 sections — Experience (4),
Education (3), Selected work (3), Languages (1). Replace the `[FILL]` markers
with real content. A YAML syntax error will fail the build with a line number.
