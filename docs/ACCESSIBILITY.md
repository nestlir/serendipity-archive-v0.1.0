# Accessibility — Final Pass

Serendipity keeps its editorial character without treating accessibility as optional.

## Keyboard

- Skip link is available as the first focusable control.
- All interactive elements must be reachable in logical DOM order.
- Focus is visible using the red editorial focus ring.
- Search, filters, save controls and discovery controls must be operable without a pointer.

## Semantics

- One meaningful `h1` per page.
- Headings follow a logical hierarchy.
- Navigation uses semantic `nav` landmarks.
- Search uses a labelled search field.
- Buttons are used for actions; links are used for navigation.
- Decorative images use empty `alt`; informative images describe their purpose.

## Motion

- Nonessential transitions are disabled under `prefers-reduced-motion: reduce`.
- No interaction depends on animation to communicate state.
- Hover is never the only way to reveal important information.

## Visual contrast

The visual system uses paper, ink, ochre and vermilion. Before production, contrast should be checked for every text/control combination, especially muted metadata and ochre text on paper.

## Content

- Japanese titles should not rely on typography alone for meaning.
- Reading time and category metadata are supplementary, not the only navigation mechanism.
- Empty states always provide a clear next action.

## Final manual test

Test the complete route with keyboard only:

`Home → Archive → Entity → Related → Journal → Discover → Search → Collection`

Then test with reduced motion and at 200% browser zoom.
