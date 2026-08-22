# Serendipity Content Model — V1

The content system exists to make the archive feel like a connected collection of discoveries, not a list of isolated pages.

## Canonical entity types

- Object — physical or cultural object
- Place — geographic/cultural place
- Craft — technique, tradition, or material practice
- Person — maker, artist, designer, historian, writer, etc.
- Journal — long-form editorial story
- Field Note — short observation

## Required publishing fields

Every entry must have:

- stable `id` / `slug`
- title
- type
- short description
- location when applicable
- date
- tags
- hero image
- source / rights status
- related entities

## Relationship rules

`related` is an editorial field, not a generic recommendation algorithm.

Use relationships that explain why a user should continue:

- same place
- same material
- same ritual
- same maker
- same historical context
- same visual detail
- related journal story

## Editorial principle

Every detail page should answer two questions:

1. What am I looking at?
2. Where can I go from here?

The second question is the heart of Serendipity.

## V1 sample graph

```text
KŌDŌ
 ├── Fushimi Inari
 ├── Tea Bowl
 └── Washi

Fushimi Inari
 ├── Kyoto
 ├── Sagano
 └── Kōdō

Washi
 ├── Kōdō
 └── Tea Bowl

Tea Bowl
 ├── Washi
 └── Kōdō

Kintsugi
 ├── Tea Bowl
 └── Kōdō
```

This graph should be visible in the UI as editorial trails such as:

- CONTINUE THE TRAIL
- ANOTHER WAY IN
- YOU MAY NOTICE THIS NEXT
- FROM THE SAME PLACE

## Asset provenance

The current reference artwork remains a temporary prototype asset. Production entries need verified creator/source/rights metadata before publication.
