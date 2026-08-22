# Performance

## Strategy

Serendipity is intentionally kept static while the editorial model stabilizes. Performance work therefore focuses on the browser payload rather than adding infrastructure prematurely.

### Images

- Use AVIF/WebP where supported.
- Provide responsive `srcset` variants for editorial images.
- Use `loading="lazy"` for below-the-fold galleries and archive cards.
- Keep the first Hero image eager and correctly sized.
- Never ship the original camera/scan resolution to the browser.

### Fonts

- Keep the type system to the chosen editorial serif + utility sans.
- Preconnect to the font origin only when externally hosted.
- Prefer self-hosting for production so typography is stable and privacy-friendly.
- Subset Japanese fonts if they are introduced as production assets.

### JavaScript

- Keep the current route rendering lightweight.
- Search and collection logic should load only when needed.
- Do not introduce a framework merely for client-side state that can remain local.
- Avoid large animation libraries.

### CSS

- Keep visual layers split by responsibility: base, search, collection, polish, QA, performance.
- Remove unused experimental rules before production.
- Prefer CSS transitions over JavaScript animation.

## Target budgets

These are project targets, not guarantees until measured on the final asset set:

- Initial HTML + CSS + JS: < 250 KB compressed where practical.
- Hero image: < 250 KB for the primary desktop variant where visual quality allows.
- Above-the-fold third-party requests: ideally 0 after fonts are self-hosted.
- Lighthouse Performance: target 90+ on a representative production page.

## Measurement

Before launch, measure Home, Archive, Entity and Journal on a throttled mobile connection. Record LCP, CLS, INP, transferred bytes and number of requests.
