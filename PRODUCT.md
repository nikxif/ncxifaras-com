# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three audiences, served together rather than in sequence:

- **Engineers and researchers**, especially in neurotechnology and BCI, who come for careful technical write-ups and a clinician's view of problems they usually see only from the computational side.
- **Clinicians and health professionals** who want technology made legible and usable: guides, tools (e.g. the Greek medical spellcheck dictionary), and explanations of systems they already work inside.
- **People evaluating Nick**: prospective collaborators, consulting and education clients, committees, programmes. They read `/about` and `/cv` and skim the writing to judge who he is and how he thinks.

A smaller Greek-speaking audience (Greek digital-health policy, Greek clinicians) is served post by post. Those posts are written in Greek.

## Product Purpose

The personal site and blog of Nick Xifaras, a physician and software developer in Athens. It is the canonical home for his work across clinical medicine, digital-health policy, and the software between them: projects, guides, opinion, and personal notes.

Success over the next year means:

- **Pivot legibility.** People in neurology, neurorehabilitation, and BCI can clearly read the move toward those fields before it is formal.
- **Read and reused.** People actually use the guides and tools: they follow a guide to the end, install the dictionary, find a note again.
- **Credible public record.** One durable link worth sending someone. The site is canonical, and Medium copies point back to it (POSSE, D4).

## Positioning

A doctor who writes code, and who works on the seams where clinical work, research, policy, and software fail to meet. He is equally fluent in each world and spends much of his time translating between them. What only he can claim: clinical training alongside a computing degree, building real tools for clinical colleagues, and sitting as a clinical expert on the Hellenic Ministry of Health's HTA Committee. That position also makes him able to argue that many "technical" problems are policy problems in disguise. The writing comes from someone inside these systems, not an observer of them.

## Operating Context

- Readers arrive on post pages from search, Medium cross-posts, shared links (OG cards), and RSS. The homepage and `/about` serve people checking who he is.
- Long-form reading is the main activity. Posts lean on asides: caveats, citations, and technical tangents, carried by sidenotes.
- Single author. Posts are written as MDX in the repo, and the Sveltia CMS at `/admin` is an optional editing surface. The repo is the source of truth.
- Broad-appeal posts are cross-posted to Medium via its import tool. Personal/meta posts and Greek-audience policy posts stay site-only.

## Capabilities and Constraints

- Astro static site on Cloudflare Pages. Everything happens at build time: OG images, covers, and content validation via Zod schemas.
- **Privacy posture is a product feature, not an implementation detail.** No third-party assets, embeds, fonts, or scripts. Strict CSP. No cookies, comments, or accounts. GoatCounter is the only analytics. The privacy page makes factual claims that depend on all of this.
- Sidenotes must work without JavaScript.
- Post categories: `project` · `guide` · `opinion` · `personal`. Category is a closed set capped at about 4–5 values. Everything else is a free tag.
- No comment system (D11).
- English-first. Greek appears per post. Full bilingual UI/routing is deferred, but the site must stay ready for it (D6).
- `/cv` is driven by structured data (`src/data/cv.yaml`). A transform from a master CV is planned for later (D5).
- Deferred: Pagefind search, `/uses` or `/now` pages, and syndication beyond Medium.

## Brand Commitments

- Name: Nick Xifaras. Domain: ncxifaras.com. Contact: info@ncxifaras.com.
- Voice: first person, direct, specific, a little wry. No marketing register. Opinions are stated as opinions. Existing pages (`/about`, `/privacy`) set the tone.
- Sidenotes are the signature device of the site (D8).
- Every typeface must have full Greek coverage. This is a hard requirement, verified from font metadata (D9).
- The site must not drift into the generic "AI design" default. This is a binding commitment from D7; the visual specifics belong in DESIGN.md.

## Evidence on Hand

- Published posts: the Greek medical spellcheck dictionary (about 27,500 terms, `project`, written in Greek) and two Bellingcat OSINT challenge solutions (`guide`). Plus one `personal` test post.
- `/about` (`src/content/pages/about.md`) is real, final prose and the best reference for voice.
- CV data: `src/data/cv.yaml`. It still has open `[FILL]`/`[CONFIRM]` markers, and nothing should be filled in on its behalf.
- Roles that can be cited: Clinical Expert on the HTA Committee of the Hellenic Ministry of Health (2026–present), and consulting and education for healthcare professionals.
- Absent, never to be fabricated: testimonials, client lists, readership numbers, publication counts, press mentions.

## Product Principles

1. **Canonical and durable.** The site is the permanent copy of the work. URLs, metadata, and feeds are treated as things others link to.
2. **Legible to both worlds.** Every page should work for a clinician and for an engineer. Neither gets jargon left unexplained, and neither gets talked down to.
3. **Privacy claims stay true.** Any feature that would make `/privacy` false is out, or it lands together with an honest update to that page.
4. **The aside is the voice.** The nuance, caveats, and sources live beside the argument rather than being cut from it.
5. **Small on purpose.** Static, build-time, few dependencies. A capability has to justify itself against "could this be twenty lines?"

## Accessibility & Inclusion

- Responsive down to mobile. Sidenotes fold inline/expandable on narrow screens.
- `:focus-visible` outlines, `prefers-reduced-motion` honoured, and sufficient contrast on every coloured fill, including category colours behind text.
- Greek renders correctly everywhere text appears, including OG images (per-script font registration).
- Readers include non-developers, so layouts and metadata must not depend on technical literacy.
