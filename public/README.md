# Favicon set — design A (cobalt disc + vermilion bar)

A direct quote of the homepage hero motif, so tab and site share a vocabulary.
Colours are current: cobalt `#1A3AAE`, vermilion `#DE3F24`, paper `#FAF7F0`.

## Files → drop all into `public/`

```
favicon.svg           modern browsers; scales to any size
favicon.ico           Safari + legacy; contains 16/32/48 (verified)
apple-touch-icon.png  180×180, iOS home screen
icon-192.png          manifest / Android
icon-512.png          manifest / Android, splash
site.webmanifest      optional; theme colour + install metadata
```

## Add to `<head>` in `src/layouts/BaseLayout.astro`

Replace the existing single `<link rel="icon" …>` line with:

```html
<link rel="icon" href="/favicon.ico" sizes="32x32" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="#1A3AAE" />
```

Order matters: `.ico` first, then `.svg`. Browsers that understand SVG take it
(it's last-declared and wins); Safari and older browsers fall back to the `.ico`
they already matched.

## Design notes

- **The tile is paper (`#FAF7F0`), not white** — verified programmatically. On a
  light tab bar at 16px it barely reads as cream; against a dark tab it shows as
  a warm tile, which is the intended effect.
- **The apple-touch icon has SQUARE corners** and paper to the edge, deliberately.
  iOS applies its own rounded mask; supplying a pre-rounded icon produces a
  double-radius artefact. Its shapes are also slightly inset since iOS crops a
  little.
- **`favicon.ico` really contains 16/32/48.** (Pillow silently ignores `sizes=`
  if the source raster is smaller than the largest requested size — the first
  build here produced a 16-only file. Rebuilt from a 256px source and verified.)
- `display: "browser"` in the manifest keeps it a normal site if someone adds it
  to a home screen, rather than launching chromeless like an app. Change to
  `"standalone"` if you ever want the app-like behaviour.

## Check after deploy

Hard-refresh — favicons are cached aggressively, often beyond a normal reload.
If the old one persists, try a private window before assuming it's broken.
