# Serendipity — Discovery Graph

Phase 6 turns the archive from a set of related cards into an editorial navigation system.

## Core rule

Every major object, place, craft entry and journal story should give the reader at least one meaningful next step.

The site is not based on generic recommendations. Relationships should be explained by context:

- Continue the trail
- Another way in
- Look closer
- From the same place
- You may notice this next

## Relationship ranking

The first preference is explicit editorial relationships stored in `related`.

When an explicit relationship is exhausted, the fallback ranking considers:

1. shared tags
2. same place
3. same entity type
4. title order as deterministic tie-breaker

This lets the prototype discover useful connections without pretending that an automatically inferred relationship was editorially verified.

## Discovery modes

### Related discovery

Start from an entity and follow its explicit or inferred trail.

### Random discovery

Use a deterministic numeric seed so `/discover/?n=...` can be shared and reproduced.

### Contextual discovery

A story can lead to an object; an object can lead to a craft; a craft can lead to a place; a place can lead back to a story.

### Trail sequence

`getTrailSequence(sourceId, depth)` follows the highest-ranked next entry while preventing cycles.

This is useful for future features such as:

- "Three steps from here"
- guided archive walks
- reading trails
- visual relationship maps
- discovery prompts

## Product rule

Do not expose the scoring formula to visitors. The user should see a natural editorial relationship, not an algorithmic recommendation system.
