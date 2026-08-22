import { entries } from './content.js';

const key = 'serendipity-saved';
const read = () => new Set(JSON.parse(localStorage.getItem(key) || '[]'));
const write = (set) => localStorage.setItem(key, JSON.stringify([...set]));
const image = '/images/reference-hero.png';
const pathFor = (entry) => `/${entry.type.toLowerCase()}/${entry.id}/`;
const esc = (value) => String(value).replace(/[&<>\"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '\"':'&quot;', "'":'&#39;' }[char]));

export function collectionEntries() { const saved = read(); return entries.filter((entry) => saved.has(entry.id)); }
export function collectionCount() { return read().size; }

function editorialCollection() {
  const list = collectionEntries();
  const places = [...new Set(list.map((e) => e.place).filter(Boolean))];
  const tags = [...new Set(list.flatMap((e) => e.tags || []))].slice(0, 8);
  const cards = list.map((entry, index) => `<article class="collection-entry"><span class="collection-number">${String(index + 1).padStart(2,'0')}</span><a href="${pathFor(entry)}"><div class="collection-thumb"><img src="${image}" alt="${esc(entry.title)}"></div><div class="collection-entry-copy"><span class="eyebrow">${esc(entry.place)}</span><h2>${esc(entry.title)}</h2><p>${esc(entry.desc)}</p><small>${esc(entry.date)}</small></div></a></article>`).join('');
  const trail = list.slice(0, 4).map((entry, i) => `<a href="${pathFor(entry)}"><span>${String(i + 1).padStart(2,'0')}</span>${esc(entry.title)}</a>`).join('');
  return `<section class="collection-editorial"><div class="collection-editorial-head"><span class="eyebrow">PRIVATE INDEX / LOCAL</span><h1>YOUR <em>COLLECTION.</em></h1><p>Not a folder. A trail of things that caught your attention.</p><div class="collection-stats"><div><strong>${String(list.length).padStart(2,'0')}</strong><span>KEPT</span></div><div><strong>${String(places.length).padStart(2,'0')}</strong><span>PLACES</span></div></div></div>${list.length ? `<div class="collection-list">${cards}</div><section class="collection-trail"><div><span class="eyebrow">YOUR TRAIL</span><h2>WHAT YOU<br><em>KEPT</em> CLOSE.</h2></div><div class="trail-line">${trail}</div></section><div class="collection-tags"><span class="eyebrow">THREADS IN YOUR COLLECTION</span>${tags.map((tag) => `<a href="/archive/?tag=${encodeURIComponent(tag)}">#${esc(tag)}</a>`).join('')}</div><button class="collection-clear" type="button" data-clear-collection>CLEAR COLLECTION</button>` : `<div class="collection-empty"><span class="eyebrow">THE CABINET IS EMPTY.</span><h2>Nothing has<br><em>stayed</em> yet.</h2><p>Return to the archive. Keep the details that make you stop.</p><a class="text-link" href="/archive/">RETURN TO ARCHIVE <span>→</span></a></div>`}</section>`;
}

function mount() {
  if (location.pathname.replace(/\/+$/, '') !== '/collection') return;
  const page = document.querySelector('.page-head');
  const old = document.querySelector('.collection-page');
  if (!page || !old) return;
  page.outerHTML = '';
  old.outerHTML = editorialCollection();
  document.querySelector('[data-clear-collection]')?.addEventListener('click', () => { write(new Set()); location.reload(); });
}

mount();
