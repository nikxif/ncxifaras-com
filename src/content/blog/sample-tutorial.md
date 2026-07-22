---
title: 'Sample tutorial: a code block walks into a page'
description: 'A featured sample exercising the tutorial category, syntax highlighting, and the homepage lead slot.'
pubDate: 2026-07-20
category: tutorial
tags: ['sample', 'astro']
draft: true
featured: true
---

This sample is `featured: true`, so it should occupy the lead slot on the
homepage and appear on `/writing`. It's `category: tutorial`, so its chip
should be ochre.

## A code block

```bash
# Shiki should highlight this
docker compose up -d
docker compose logs -f --tail=50
```

```ts
// And this
const greet = (name: string): string => `Γειά σου, ${name}`;
console.log(greet('κόσμε'));
```

That Greek string doubles as a check that Alegreya's Greek subset loads
inside prose and JetBrains Mono's inside code.
