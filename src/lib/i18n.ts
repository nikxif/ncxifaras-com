// src/lib/i18n.ts — the language a post is written in (D30).
//
// This sets the page language only: <html lang> (so screen readers pick the
// right voice) and og:locale. The interface itself stays English on every
// post — a chrome that switches language on some posts and not others reads
// as a bug, and the site's Greek readers don't need "Project" translated.
// Full bilingual UI/routing is still deferred (D6).

export const LANGS = ['en', 'el'] as const;
export type Lang = (typeof LANGS)[number];

export const OG_LOCALE: Record<Lang, string> = {
  en: 'en_GB',
  el: 'el_GR',
};
