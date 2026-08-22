# SERENDIPITY

A contemporary digital archive of things worth noticing.

## What this prototype contains

- Editorial hero with archival visual language
- Responsive archive with category filters
- Client-side search
- Save-to-collection interaction
- Random “I'm feeling curious” discovery
- Featured journal story section
- About / manifesto section
- Responsive mobile layout
- Design tokens and typography based on the approved 1 + 3 direction
- Entity, journal, search, discovery and collection routes

## Local development

Serendipity is intentionally dependency-free. You do **not** need Vite, React or a package install to work on it.

Requirements: Node.js 18+.

```bash
npm run dev
```

Open `http://localhost:4173/`.

The local server has SPA fallback, so these routes work directly as well:

- `/archive/`
- `/journal/`
- `/journal/why-japanese-objects-feel-different/`
- `/discover/`
- `/search/`
- `/collection/`
- `/about/`
- `/objects/kodo/`

Run the source checks with:

```bash
npm run check
```

A dependency-free static build can be produced with:

```bash
npm run build
```

## GitHub Pages deployment

The production site is a GitHub Pages **project site**:

`https://nestlir.github.io/serendipity-archive-v0.1.0/`

GitHub Pages is configured to publish from **GitHub Actions**.

`.github/workflows/deploy-pages.yml` builds the static artifact and runs `scripts/prepare-pages.mjs` before deployment. That step adds the repository base path only to the deployment copy, so the source remains usable from the local server.

The deployment also uses `404.html` as a SPA fallback, allowing direct visits to nested routes on GitHub Pages.

## Content model

The first version keeps content local so the visual/product layer can be iterated quickly. A production content layer should eventually move entries into a CMS/database with fields for:

- id
- title
- original-language title
- category
- country / city
- date
- description
- long-form story
- hero image
- gallery
- source / rights
- related entries
- tags

## Important asset note

`public/images/reference-hero.png` is the user-provided reference artwork used only as a temporary prototype asset. Before publishing the site publicly, replace it with artwork/photography for which the project has confirmed usage rights.

## Production roadmap

1. Verify GitHub Pages deployment and live routes.
2. Replace prototype imagery with licensed/original assets.
3. Expand the archive content and provenance records.
4. Introduce CMS-backed content when editorial volume justifies it.
5. Add persistent collection storage.
6. Upgrade search to a full-text index when the archive grows.
7. Add analytics and production SEO.
