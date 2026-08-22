# Serendipity V1 Launch Checklist

## Before publish

- [ ] Replace `temporary` / `UNVERIFIED` reference artwork.
- [ ] Confirm production image rights and credits.
- [ ] Decide final domain.
- [ ] Make canonical URLs absolute for the final domain.
- [ ] Update sitemap URLs to the final domain.
- [ ] Add final Open Graph image.
- [ ] Self-host or approve the final font setup.
- [ ] Verify direct routes on the chosen static host.
- [ ] Verify 404 behavior.
- [ ] Run keyboard-only and 200% zoom tests.
- [ ] Run reduced-motion test.
- [ ] Run Lighthouse on Home, Archive, Entity and Journal.
- [ ] Check mobile 390px and desktop 1440×900.

## Deployment recommendation

Use a static host for V1. The repository is already structured for static serving. Keep the source of truth in Git until the editorial workflow proves the need for a CMS.

## After launch

- Track broken routes and search misses.
- Measure which archive relationships users actually follow.
- Collect editorial workflow requirements before selecting a CMS.
- Reassess Astro when the archive becomes large enough to justify build-time content generation and componentized templates.
