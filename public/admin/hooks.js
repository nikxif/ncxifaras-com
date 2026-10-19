// public/admin/hooks.js — small save-time fixes, so the build isn't the first
// thing to tell you something's wrong. Nothing here is load-bearing: if a
// check is noisy or wrong, delete that block.

const CMS = window.CMS;

CMS.registerEventListener({
  name: 'preSave',
  handler: ({ entry }) => {
    let data = entry.get('data');
    const warn = (msg) => console.warn(`[ncxifaras] ${msg}`);

    // --- 1. stamp updatedDate when editing an existing post ---------------
    if (!entry.get('newRecord') && entry.get('collection') === 'blog') {
      data = data.set('updatedDate', new Date().toISOString().slice(0, 10));
    }

    // --- 2. dash normalisation --------------------------------------------
    // " - " → " — ". The thing you had to fix by hand on /about.
    const fixDashes = (s) => (s ?? '').replace(/ +- +/g, ' — ');

    for (const field of ['title', 'description']) {
      const v = data.get(field);
      if (typeof v === 'string') data = data.set(field, fixDashes(v).trim());
    }

    let body = fixDashes(data.get('body') ?? '');

    // --- 3. tidy the body --------------------------------------------------
    body = body
      .replace(/[ \t]+$/gm, '')      // trailing whitespace per line
      .replace(/\n{3,}/g, '\n\n')    // collapse 3+ blank lines
      .replace(/([!?])\./g, '$1');   // the "!." typo

    // --- 4. sidenote sanity check -----------------------------------------
    const opened = (body.match(/<Sidenote[\s>]/g) ?? []).length;
    const closed = (body.match(/<\/Sidenote>/g) ?? []).length;
    if (opened !== closed) {
      warn(`Sidenote mismatch: ${opened} opened, ${closed} closed.`);
    }
    if (opened > 0 && !/import\s+Sidenote\s+from/.test(body)) {
      warn('Uses <Sidenote> but the import line is missing — build will fail.');
    }

    data = data.set('body', body);

    // --- 5. soft nudges (warn only, never block) ---------------------------
    const desc = data.get('description') ?? '';
    if (desc.length > 170) warn(`Description is ${desc.length} chars — aim for ~160.`);
    if (desc.length && desc.length < 70) warn(`Description is only ${desc.length} chars.`);

    if (data.get('coverMode') === 'photo' && !data.get('cover')) {
      warn('Cover mode is "photo" but no image is set — you will get a generated cover.');
    }

    const tags = data.get('tags');
    if (tags?.some?.((t) => t !== t.toLowerCase() || /\s/.test(t))) {
      warn('Tags should be lowercase and hyphenated — each one is a URL.');
    }

    // --- 6. flag big uploads ----------------------------------------------
    // The File object is readable here, but only `data` changes are saved,
    // so this can warn — it cannot resize or strip EXIF for you.
    entry.get('mediaFiles')?.forEach?.((media) => {
      const { name, size, file } = media.toJS();
      if (file && size > 1.5 * 1024 * 1024) {
        warn(`${name} is ${(size / 1048576).toFixed(1)} MB — consider shrinking it first.`);
      }
    });

    return data;
  },
});