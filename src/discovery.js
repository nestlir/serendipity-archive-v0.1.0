import { entries, getEntry, getRelated } from './content.js';

export const normalize = (value = '') => value.toLowerCase().trim();

export function scoreRelated(source, candidate) {
  if (!source || !candidate || source.id === candidate.id) return 0;
  const sharedTags = source.tags.filter((tag) => candidate.tags.includes(tag)).length;
  const samePlace = normalize(source.place) === normalize(candidate.place) ? 3 : 0;
  const sameType = source.type === candidate.type ? 1 : 0;
  return sharedTags * 4 + samePlace + sameType;
}

export function getEditorialTrail(sourceId, limit = 5) {
  const source = getEntry(sourceId);
  if (!source) return [];

  const explicit = getRelated(source.related)
    .map((entry, index) => ({ entry, score: 100 - index }))
    .filter(({ entry }) => entry.id !== source.id);

  const explicitIds = new Set(explicit.map(({ entry }) => entry.id));
  const inferred = entries
    .filter((entry) => entry.id !== source.id && !explicitIds.has(entry.id))
    .map((entry) => ({ entry, score: scoreRelated(source, entry) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title));

  return [...explicit, ...inferred].slice(0, Math.max(1, limit)).map(({ entry }) => entry);
}

export function getRandomEntry(seed = Date.now()) {
  if (!entries.length) return null;
  const numericSeed = Number.isFinite(Number(seed)) ? Math.abs(Number(seed)) : Date.now();
  return entries[Math.floor(numericSeed % entries.length)];
}

export function getTrailSequence(sourceId, depth = 3) {
  const result = [];
  const seen = new Set();
  let current = getEntry(sourceId);

  while (current && result.length < Math.max(1, depth)) {
    if (seen.has(current.id)) break;
    seen.add(current.id);
    result.push(current);
    const next = getEditorialTrail(current.id, 1)[0];
    current = next && !seen.has(next.id) ? next : null;
  }

  return result;
}
