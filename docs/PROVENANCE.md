# Rights & Provenance

Serendipity treats image provenance as part of the content model, not a footer afterthought.

## Required asset fields

- `creator` — photographer, artist, archive, institution or other rights holder
- `source` — original publication, collection, archive or commissioned source
- `rights` — license, permission, public-domain status or internal ownership
- `credit` — exact public attribution text
- `capturedAt` — when relevant
- `accessedAt` — when sourced from a third-party archive
- `assetId` — stable internal identifier
- `status` — `temporary`, `review`, `cleared`, `owned`

## Rules

1. Temporary reference images must never be presented as production-cleared assets.
2. Every editorial image must have a traceable source before publication.
3. Attribution must be displayed when required by the license.
4. Cropping, color treatment and derivatives must remain compatible with the license.
5. If rights are unclear, the asset remains `review` and is not part of the production collection.
6. Content entities may reference an asset by `assetId`; the entity itself should not contain duplicated rights text.

## Current prototype

The existing reference artwork is explicitly marked as **temporary / prototype-only**. It is useful for layout development but must be replaced with owned, commissioned, public-domain or appropriately licensed imagery before production.

## Future CMS shape

```text
Asset
 ├─ assetId
 ├─ url
 ├─ alt
 ├─ creator
 ├─ source
 ├─ credit
 ├─ rights
 ├─ status
 └─ accessedAt
```

This lets the editorial team audit rights independently from the visual page templates.
