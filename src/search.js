import { entries } from './content.js';

const normalize = (value) => String(value || '').toLowerCase().trim();
const fields = (entry) => ({
  title: normalize(entry.title),
  jp: normalize(entry.jp),
  desc: normalize(entry.desc),
  place: normalize(entry.place),
  story: normalize(entry.story),
  tags: (entry.tags || []).map(normalize)
});

export function searchEntries(query) {
  const q = normalize(query);
  if (!q) return entries.map((entry) => ({ entry, score: 0, matched: [] }));
  const tokens = q.split(/\s+/).filter(Boolean);
  return entries.map((entry) => {
    const f = fields(entry);
    let score = 0;
    const matched = new Set();
    for (const token of tokens) {
      if (f.title.includes(token)) { score += 10; matched.add('title'); }
      if (f.jp.includes(token)) { score += 9; matched.add('japanese'); }
      if (f.place.includes(token)) { score += 7; matched.add('place'); }
      if (f.tags.some((tag) => tag.includes(token))) { score += 6; matched.add('tag'); }
      if (f.desc.includes(token)) { score += 4; matched.add('description'); }
      if (f.story.includes(token)) { score += 2; matched.add('story'); }
    }
    return { entry, score, matched: [...matched] };
  }).filter((result) => result.score > 0).sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title));
}

export function searchSuggestions(query, limit = 6) {
  const q = normalize(query);
  if (!q) return [];
  const candidates = new Set();
  for (const result of searchEntries(q)) {
    candidates.add(result.entry.title);
    if (result.entry.jp) candidates.add(result.entry.jp);
    for (const tag of result.entry.tags || []) candidates.add(tag);
    if (candidates.size >= limit) break;
  }
  return [...candidates].slice(0, limit);
}

function pathFor(entry) { return `/${entry.type.toLowerCase()}/${entry.id}/`; }
function escapeHtml(value) { return String(value).replace(/[&<>\"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '\"':'&quot;', "'":'&#39;' }[char])); }
function typeLabel(type) { return ({ OBJECTS:'OBJECT', PLACES:'PLACE', CRAFT:'CRAFT', ART:'ART', PEOPLE:'PERSON', IDEAS:'IDEA' }[type] || type); }

function enhanceSearchPage() {
  if (!location.pathname.replace(/\/+$/, '') === '/search') return;
  const form = document.querySelector('.search-big');
  const input = form?.querySelector('input[name="q"]');
  const pageHead = document.querySelector('.search-head');
  if (!form || !input || !pageHead) return;

  const initialQuery = new URLSearchParams(location.search).get('q') || '';
  const resultsRoot = document.querySelector('.search-head')?.nextElementSibling;
  if (!resultsRoot) return;

  const renderResults = (query) => {
    const results = searchEntries(query);
    const groups = results.reduce((map, item) => {
      const label = typeLabel(item.entry.type);
      map[label] = (map[label] || 0) + 1;
      return map;
    }, {});
    const summary = query ? `${results.length} ${results.length === 1 ? 'finding' : 'findings'} · ranked by relevance` : `${entries.length} entries · begin with a word, place or material`;
    const groupHtml = Object.entries(groups).map(([label, count]) => `<span class="search-result-group">${escapeHtml(label)} <b>${String(count).padStart(2,'0')}</b></span>`).join('');
    const cards = results.map(({ entry, matched }, index) => `<article class="search-result-item"><div class="search-result-index">${String(index + 1).padStart(2,'0')}</div><div class="search-result-copy"><a href="${pathFor(entry)}"><span class="eyebrow">${typeLabel(entry.type)} · ${escapeHtml(entry.place)}</span><h2>${escapeHtml(entry.title)}${entry.jp ? ` <small>${escapeHtml(entry.jp)}</small>` : ''}</h2><p>${escapeHtml(entry.desc)}</p><div class="search-match">${matched.map((m) => `<span>${escapeHtml(m)}</span>`).join('')}</div></a></div></article>`).join('');
    resultsRoot.innerHTML = `<section class="search-results-live"><div class="search-results-summary"><span>${escapeHtml(summary)}</span><div>${groupHtml}</div></div>${cards || `<div class="empty"><span>NO TRACE FOUND.</span> TRY A PLACE, MATERIAL, OBJECT OR IDEA.</div>`}</section>`;
  };

  let suggestionBox = document.querySelector('.search-suggestions');
  if (!suggestionBox) { suggestionBox = document.createElement('div'); suggestionBox.className = 'search-suggestions'; form.appendChild(suggestionBox); }

  const updateSuggestions = () => {
    const suggestions = searchSuggestions(input.value);
    suggestionBox.innerHTML = suggestions.map((suggestion) => `<button type="button" data-suggestion="${escapeHtml(suggestion)}">${escapeHtml(suggestion)}</button>`).join('');
    suggestionBox.querySelectorAll('[data-suggestion]').forEach((button) => button.addEventListener('click', () => { input.value = button.dataset.suggestion; renderResults(input.value); updateSuggestions(); input.focus(); }));
  };

  input.addEventListener('input', () => { renderResults(input.value); updateSuggestions(); });
  form.addEventListener('submit', (event) => { event.preventDefault(); const query = input.value.trim(); const url = query ? `/search/?q=${encodeURIComponent(query)}` : '/search/'; history.replaceState({}, '', url); renderResults(query); updateSuggestions(); });
  renderResults(initialQuery);
  updateSuggestions();
}

enhanceSearchPage();
