// src/lib/i18n.ts — the handful of UI strings a post page shows, per language.
//
// Not a routing/i18n framework (D6 defers that): posts are English by default
// and a Greek post sets `lang: el` in frontmatter, so its own chrome (date,
// category chip, share controls) speaks Greek. Site-wide chrome — header,
// footer, nav — stays English and is marked lang="en" on Greek pages.

import type { Category } from './palette';

export const LANGS = ['en', 'el'] as const;
export type Lang = (typeof LANGS)[number];

/** BCP 47 locale for Intl date formatting, and og:locale. */
export const LOCALE: Record<Lang, { intl: string; og: string }> = {
  en: { intl: 'en-GB', og: 'en_GB' },
  el: { intl: 'el-GR', og: 'el_GR' },
};

type Strings = {
  category: Record<Category, string>;
  updated: string;
  share: string;
  copyLink: string;
  copied: string;
  noscriptShare: string;
};

export const UI: Record<Lang, Strings> = {
  en: {
    category: { project: 'Project', guide: 'Guide', opinion: 'Opinion', personal: 'Personal' },
    updated: 'updated',
    share: 'Share…',
    copyLink: 'Copy link',
    copied: 'Copied ✓',
    noscriptShare: 'Copy the URL from your address bar to share.',
  },
  el: {
    category: { project: 'Έργο', guide: 'Οδηγός', opinion: 'Άποψη', personal: 'Προσωπικό' },
    updated: 'ενημερώθηκε',
    share: 'Κοινοποίηση…',
    copyLink: 'Αντιγραφή συνδέσμου',
    copied: 'Αντιγράφηκε ✓',
    noscriptShare: 'Αντιγράψτε τη διεύθυνση από τη γραμμή διευθύνσεων για να τη μοιραστείτε.',
  },
};
