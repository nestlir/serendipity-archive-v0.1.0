# Production Plan

## Decision

**Ship V1 as a static site first.**

The current product is content-led, has a small data set, and does not yet require server rendering, authentication, a database, or editorial collaboration. A static deployment keeps the experience fast and makes the visual/archive system easier to validate.

### Why not Next.js now?

Next.js would add a useful application framework, but the current V1 does not need server actions, dynamic server state, or a React component ecosystem. Adding it now would increase migration cost without solving a present product problem.

### Why not a CMS now?

The content model is already CMS-shaped, but the editorial workflow is not yet proven. First establish what fields editors actually use, how often content changes, and which relationships need manual curation. Then choose a headless CMS based on those real requirements.

### Why Astro later?

Astro is the strongest future candidate if the archive grows and we want componentized templates, Markdown/MDX or a headless CMS, static generation, and partial interactivity. Re-evaluate after V1 content operations are known.

## V1 deployment

1. Replace temporary/unverified imagery with cleared assets.
2. Self-host fonts or confirm production font licensing/privacy requirements.
3. Add the final performance stylesheet to `index.html`.
4. Generate production image variants and `srcset`.
5. Verify all routes and direct-link refresh behavior on the chosen host.
6. Add `robots.txt` and `sitemap.xml`.
7. Add canonical metadata and Open Graph/Twitter cards.
8. Add a custom 404 page.
9. Configure HTTPS and the custom domain.
10. Run Lighthouse and keyboard/manual QA on Home, Archive, Entity, Journal, Search and Collection.
11. Publish the static build.

## Suggested hosting

Any static host is sufficient for V1. GitHub Pages, Cloudflare Pages, Netlify or Vercel can serve the current architecture. The host should be selected by domain, preview workflow and image/CDN needs rather than framework preference.

## V1 acceptance criteria

- All primary routes load directly.
- No temporary image is exposed as production-cleared.
- Search and Collection work without a server.
- Discovery remains usable with the static content set.
- Keyboard and reduced-motion checks pass.
- Core Web Vitals are measured on the final asset set.
- The site retains the Serendipity editorial concept at 1440×900.

## V2 trigger

Move to Astro or another content framework when one or more of these become real requirements:

- hundreds/thousands of archive entries;
- non-technical editors publishing regularly;
- a headless CMS;
- automatic relationship indexing;
- generated search index at build time;
- multiple locales;
- image transformation pipeline;
- richer preview/deployment workflow.
