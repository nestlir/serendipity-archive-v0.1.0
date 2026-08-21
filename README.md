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

## Content model

The first prototype keeps content local so the visual/product layer can be iterated quickly. A production version should move entries into a CMS/database with fields for:

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

`public/images/reference-hero.png` is the user-provided reference artwork used only as a temporary prototype asset. Before publishing the site, replace it with artwork/photography for which the project has confirmed usage rights.

## Run

```bash
npm install
npm run dev
```

Then open the Vite development server.

## Next production phases

1. Replace prototype imagery with licensed/original assets.
2. Introduce CMS-backed content.
3. Add article/object/place detail routes.
4. Add persistent collection storage.
5. Add full-text search and related-content graph.
6. Add analytics and SEO.
