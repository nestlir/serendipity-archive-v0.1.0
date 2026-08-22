# Production Gate

Serendipity is ready for production only when all gates below pass.

## Content

- [ ] Every public entry has complete metadata.
- [ ] Every relationship points to a valid entity.
- [ ] Every story has source/provenance data where applicable.

## Assets

- [ ] No `temporary` asset is published.
- [ ] All production images have verified rights.
- [ ] Alt text is present where an image conveys information.

## UX

- [ ] Home → Archive → Entity → Related → Journal → Discover → Collection → Search works.
- [ ] Search has useful empty and no-result states.
- [ ] Collection persists locally and can be cleared.
- [ ] Discovery never dead-ends unexpectedly.

## Accessibility

- [ ] Keyboard navigation works.
- [ ] Focus states are visible.
- [ ] Reduced motion is respected.
- [ ] Contrast is checked on paper / ink / red / ochre combinations.
- [ ] Headings form a sensible hierarchy.

## Performance

- [ ] Images are appropriately sized and compressed.
- [ ] Noncritical images use lazy loading where appropriate.
- [ ] Fonts are loaded efficiently.
- [ ] No unnecessary JavaScript is shipped to static pages.

## Stack decision

Keep the current static implementation while content and visual QA are changing quickly. Choose Astro / Next / another framework only when a real requirement appears: CMS integration, server rendering, advanced routing, or content operations.
