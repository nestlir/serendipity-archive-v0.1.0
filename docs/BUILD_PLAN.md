# SERENDIPITY — BUILD PLAN

## Core concept

**Serendipity — A digital archive of things worth noticing.**

The product is not a generic Asian-culture website, blog, museum catalogue, or Pinterest clone. It is a contemporary editorial archive built around one idea:

> Find what you were not looking for.

The interface should feel like discovering a beautiful printed page, object catalogue, field note, or old photograph inside a modern digital archive.

The product loop is:

**Find → Notice → Explore → Discover → Wander**

Every page should help the user notice a detail and create at least one meaningful path to another discovery.

---

## Non-negotiable visual direction

### 1. Editorial archive

The site should feel closer to an independent cultural magazine, art book, archive, or exhibition catalogue than to a standard web app.

### 2. Paper / ink / fragment

Use:

- warm paper background
- deep ink navy
- ochre / aged gold
- restrained vermilion red
- fine rules
- archival numbering
- vertical annotations
- paper texture
- torn / imperfect image edges
- asymmetrical compositions

Avoid:

- rounded SaaS cards
- dashboard UI language
- excessive shadows
- generic glassmorphism
- loud animations
- decorative Asian clichés

### 3. Controlled grid breaking

The site has a real grid, but imagery and selected editorial elements deliberately break it. The composition should feel discovered rather than perfectly boxed.

### 4. Typography

Primary editorial display: Cormorant Garamond or equivalent free serif.

UI/body: Inter or equivalent free sans-serif.

Japanese: Noto Serif JP / Noto Sans JP as appropriate.

Never introduce a third font without a strong editorial reason.

### 5. Motion

Motion is quiet, tactile, and slow. It should suggest paper, depth, discovery and material rather than technology.

---

# PRODUCT ARCHITECTURE

## Layer 1 — Content entities

The archive is built around reusable entities rather than page-specific text.

### Object

A physical or cultural object.

Fields:

- id
- title
- originalTitle
- type
- country
- city
- date
- era
- material
- maker / person reference
- description
- story
- hero image
- gallery
- source / rights
- tags
- relatedIds

Examples: tea bowl, incense vessel, textile, package, tool, book, food object.

### Place

A geographic or cultural place.

Fields:

- id
- title
- originalTitle
- country
- city
- coordinates
- description
- story
- hero image
- gallery
- source / rights
- tags
- relatedIds
- associated objects
- associated people

### Craft

A technique, tradition, process, or material practice.

Fields:

- id
- title
- originalTitle
- region
- period
- material
- process
- description
- story
- image
- source / rights
- relatedIds

### Person

A maker, artist, historian, designer, photographer, artisan, writer, or other person relevant to the archive.

Fields:

- id
- name
- originalName
- role
- place
- biography
- portrait
- workIds
- relatedIds
- source / rights

### Journal story

Long-form editorial material.

Fields:

- slug
- title
- type
- dek / excerpt
- date
- readTime
- body
- hero image
- gallery
- tags
- relatedIds
- sources

### Field note

Short observation / micro-story.

Fields:

- id
- title
- observation
- place
- date
- image
- relatedIds

---

# RELATIONSHIP MODEL

Serendipity becomes special when content is connected.

Do not model the archive as a list of isolated cards.

Example graph:

KŌDŌ
→ incense
→ Kyoto
→ ritual
→ tea culture
→ sensory design
→ historical object
→ related journal story

FUSHIMI INARI
→ Kyoto
→ shrine architecture
→ vermilion
→ pilgrimage
→ fox imagery
→ related field note

WASHI
→ paper
→ craft
→ Gifu
→ architecture
→ print culture
→ object packaging

Every major detail page should expose related pathways.

---

# SITE MAP

/

Home is the editorial entrance, not the whole product.

Sections:

- Hero
- Archive preview
- Featured story
- Field notes / recent observations
- Discovery prompt
- About / manifesto

/archive/

Full archive index.

Filters:

- All
- Objects
- Places
- Craft
- Art
- People
- Ideas

Secondary filters can later include:

- country
- city
- material
- period
- tag

/object/:id/

Object detail.

/place/:id/

Place detail.

/craft/:id/

Craft detail.

/person/:id/

Person detail.

/journal/

Editorial index.

/journal/:slug/

Full story.

/collection/

Saved personal archive.

/discover/

Serendipity engine.

/search/

Global archive search.

/about/

Project manifesto and editorial principles.

---

# DISCOVERY MODEL

This is one of the product's defining features.

## 1. Related discovery

Every object/place/story should offer meaningful related entries.

Do not use generic “you may also like” recommendations.

Use editorial language:

- Look closer
- Continue the trail
- From the same place
- Another way in
- You may notice this next

## 2. Random discovery

“I’m Feeling Curious” selects a real archive entry.

The page should make the randomness feel intentional:

> YOU WEREN'T LOOKING FOR THIS.

Then reveal the object/place/story.

## 3. Contextual discovery

When reading about a bowl, surface links to:

material → technique → place → person → article.

This turns browsing into a cultural graph.

---

# SEARCH MODEL

Search is not only a title lookup.

Search across:

- title
- original-language title
- description
- story text
- tags
- place
- city
- country
- person
- material
- craft

Results should be grouped by entity type when useful.

Example:

**KYOTO**

12 findings

Objects / 4
Places / 3
Craft / 2
Stories / 3

The search page should feel like an archive index, not a modern SaaS command palette.

---

# COLLECTION

The user's saved items form a personal trail.

The collection should support:

- saved objects
- saved places
- saved stories
- saved notes

The UI should feel like a personal folder of discovered pages, not a social bookmarking dashboard.

For the prototype, local browser state is sufficient.

Production can later introduce authenticated persistence.

---

# PAGE-BUILDING ORDER

Do not build everything simultaneously.

## PHASE 0 — Foundation

Goal: freeze product rules.

Deliver:

- design tokens
- typography
- spacing system
- 12-column desktop grid
- responsive breakpoints
- content entity schema
- relationship model
- URL conventions
- accessibility baseline

Exit criterion:

Every new page can be built from the same system without inventing new visual rules.

---

## PHASE 1 — Content engine

Build local structured content first.

Deliver:

- typed archive data
- entity IDs
- categories
- tags
- relationship IDs
- source / rights metadata
- editorial sample dataset

Start with roughly 15–25 high-quality entries rather than hundreds of shallow placeholders.

Exit criterion:

Any entity can be rendered from data rather than hardcoded page markup.

---

## PHASE 2 — Global shell

Build:

- header
- navigation
- search entry
- footer
- paper frame
- typography system
- archive numbering
- seals / marks
- responsive navigation

Exit criterion:

The visual identity is unmistakable before any page-specific component is added.

---

## PHASE 3 — Archive index

Build `/archive/` first.

Features:

- category filtering
- search handoff
- result count
- editorial grid
- image treatment
- entry metadata
- empty states

This becomes the core listing template for all entity indexes.

Exit criterion:

Archive browsing works smoothly on desktop and mobile.

---

## PHASE 4 — Entity templates

Build templates in this order:

1. Object
2. Place
3. Craft
4. Person

Every entity page should have:

- archival header
- primary image
- metadata
- title
- original-language title where relevant
- editorial description
- long-form context
- source / rights
- related entries
- next discovery path

Exit criterion:

New content can be published by adding data, not duplicating HTML.

---

## PHASE 5 — Journal

Build:

- `/journal/`
- `/journal/:slug/`

Journal should use a more traditional editorial rhythm:

- large title
- dek
- image
- body column
- pull quotes / field notes
- related archive entries
- source list
- next story

Exit criterion:

An article feels like a designed essay rather than a CMS post.

---

## PHASE 6 — Discovery graph

Connect everything.

Implement:

- relatedIds
- shared tags
- shared places
- shared people
- shared craft
- contextual links
- random discovery

Exit criterion:

A user can start anywhere and naturally reach several meaningful destinations without returning to the homepage.

---

## PHASE 7 — Search

Build global search after content relationships are stable.

Why:

Search quality depends on the content model. Building search before the entities and metadata are stable creates throwaway work.

Deliver:

- search input
- results
- type grouping
- tag results
- empty state
- deep links

Exit criterion:

Queries such as “Kyoto”, “tea”, “paper”, “ritual”, and original-language titles return useful results.

---

## PHASE 8 — Collection

Implement local saved state.

Deliver:

- save / unsave
- collection index
- counts by type
- empty state
- remove action
- direct links to saved entities

Exit criterion:

Collection works without an account and survives page navigation.

---

## PHASE 9 — Visual polish

Only after the information architecture works.

Polish:

- image cropping
- torn edges
- grain
- red seal placement
- vertical microcopy
- hover states
- scroll transitions
- page transitions
- subtle parallax
- typography rhythm

Rule:

Motion and decoration may reinforce the concept, but never hide navigation or content.

---

## PHASE 10 — Content rights and provenance

Before production publication:

- verify every image license
- store creator/source information
- store rights status
- replace temporary reference artwork
- add source links where editorially appropriate

The temporary reference image must never become an unverified production asset.

---

## PHASE 11 — Production infrastructure

Only after the static/editorial prototype is stable should we choose the final stack.

Possible destinations:

- Astro for content-first static/editorial architecture
- Next.js when interactive application behavior becomes substantial
- Headless CMS when publishing frequency and editorial workflow justify it

The current repository remains intentionally simple during visual and IA development.

---

# QUALITY GATES

Every phase must pass before the next one.

## Content gate

No lorem ipsum. No empty fake categories. No invented historical claims presented as facts.

## Visual gate

A new page must look like it belongs to Serendipity without needing the logo.

## UX gate

A visitor must understand:

1. what the archive is
2. what can be explored
3. where the current item came from
4. what can be discovered next

## Accessibility gate

- semantic headings
- keyboard navigation
- focus states
- sufficient contrast
- alt text
- reduced motion support
- touch targets

## Responsive gate

Design explicitly for:

- desktop 1440px
- tablet ~1024px
- mobile 390px

Do not simply shrink the desktop grid.

---

# DEFINITION OF DONE FOR V1

Serendipity V1 is complete when a user can:

1. enter through the editorial Home
2. open the Archive
3. filter by category
4. open an Object
5. inspect context and metadata
6. follow a related Place
7. open a Journal story
8. move to another related discovery
9. save something to Collection
10. search the archive
11. use Random Discovery
12. return to the archive through consistent navigation

And all of those experiences still feel like one coherent printed / digital archive.

---

# PRODUCT PRINCIPLE

**Do not optimize Serendipity into a generic content website.**

The unusual pacing, negative space, fragmentary compositions, archival metadata, quiet typography and unexpected relationships are not decoration.

They are the product.
