# Visual QA — Serendipity

## Target

Primary review viewport: **1440 × 900 desktop**.
Secondary review: 1280 × 800, 1024 × 768, 768 × 1024, 390 × 844.

## Conceptual checks

- The site must still read as a digital editorial archive, not a SaaS dashboard or generic magazine.
- Paper / ink / ochre / vermilion remain the dominant visual vocabulary.
- Typography creates hierarchy without excessive UI chrome.
- Grid breaking is intentional and never causes accidental overflow.
- Images feel like archival material and do not overpower editorial text.
- Navigation remains quiet; Archive is the primary browsing surface.
- Discovery is visible as a behavior, not merely a feature label.

## 1440 × 900 checklist

### Home
- [ ] Header fits in one line.
- [ ] Hero title remains inside the left editorial column.
- [ ] Hero image does not crop the subject awkwardly.
- [ ] Location metadata stays inside the frame.
- [ ] First scroll reveals Archive without a giant dead zone.
- [ ] Archive cards begin with enough breathing room.

### Archive
- [ ] Five-column desktop grid does not feel cramped.
- [ ] Metadata remains legible at 9–10px.
- [ ] Intentional vertical offsets survive different card titles.
- [ ] Filter row wraps gracefully below tablet width.
- [ ] Empty state is visually centered but editorially quiet.

### Entity
- [ ] Hero image and title create a strong 58/42 split.
- [ ] Metadata is visible before the main story.
- [ ] Long copy never becomes a full-width wall of text.
- [ ] Related trail feels like continuation, not recommendation spam.
- [ ] Provenance is visible but secondary.

### Journal
- [ ] Story title and dek form a strong editorial opening.
- [ ] Long-form body width stays comfortable.
- [ ] Pull quote can break the text column on desktop.
- [ ] Related archive entries appear before the footer.

### Discovery
- [ ] Random find is immediately understandable.
- [ ] One strong visual dominates rather than a dense grid.
- [ ] Next trail is visible without becoming a carousel.

### Search
- [ ] Search field feels like an archive index.
- [ ] Result relevance is understandable.
- [ ] Empty state provides a next action.
- [ ] Search does not visually overpower the Archive.

### Collection
- [ ] Saved items read as a personal cabinet / index.
- [ ] Your Trail is visibly different from the main archive grid.
- [ ] Empty collection has a clear return to Archive.

## Responsive checks

- [ ] No horizontal scrolling at 390px.
- [ ] Fixed paper frame remains inside viewport.
- [ ] Navigation collapses without hiding Search.
- [ ] Two-column archive becomes one-column where needed.
- [ ] Large editorial type does not clip.
- [ ] Images retain meaningful focal points.
- [ ] Reduced-motion preference disables nonessential transitions.

## Accessibility checks

- [ ] Keyboard focus is visible.
- [ ] Buttons have discernible labels.
- [ ] Decorative images use empty alt text.
- [ ] Informational images have meaningful alt text.
- [ ] Contrast is sufficient for body text and controls.
- [ ] Motion is disabled or reduced when requested.

## Known temporary limitation

The current prototype still uses a reference artwork as a temporary image asset. This must be replaced with owned or licensed material before production.
