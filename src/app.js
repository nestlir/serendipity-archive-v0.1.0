import { entries, categories, image, getEntry, getStory, getRelated } from './content.js';

const app = document.querySelector('#app');
let saved = new Set(JSON.parse(localStorage.getItem('serendipity-saved') || '[]'));

const persist = () => localStorage.setItem('serendipity-saved', JSON.stringify([...saved]));
const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
const header = () => `<header class="header"><a class="monogram" href="/">S.</a><nav class="nav"><a href="/archive/">ARCHIVE</a><a href="/journal/">JOURNAL</a><a href="/collection/">COLLECTION</a><a href="/about/">ABOUT</a></nav><a class="search-trigger" href="/search/">SEARCH <span class="search-dot"></span></a></header>`;
const footer = () => `<footer class="footer"><div class="footer-title">SERENDIPITY</div><div class="footer-manifesto">A DIGITAL ARCHIVE<br>OF THINGS WORTH FINDING.</div><div class="footer-links"><a href="/archive/">ARCHIVE</a><a href="/journal/">JOURNAL</a><a href="/collection/">COLLECTION</a><a href="/about/">ABOUT</a></div><div class="footer-meta">TOKYO · KYOTO · SHANGHAI · SEOUL<br>© 2026 SERENDIPITY</div></footer>`;

function typeLabel(type) {
  return type === 'OBJECTS' ? 'OBJECT' : type === 'PLACES' ? 'PLACE' : type === 'CRAFT' ? 'CRAFT' : type;
}

function card(entry, index = 0) {
  const path = `/${entry.type.toLowerCase()}/${entry.id}/`;
  return `<article class="archive-item item-${index % 3}"><div class="entry-meta"><span>${String(index + 1).padStart(2, '0')}</span><span class="red">${typeLabel(entry.type)}</span></div><a class="entry-image" href="${path}"><img src="${image}" alt="${esc(entry.title)}"><button class="save" type="button" data-save="${entry.id}" aria-label="Save ${esc(entry.title)}">${saved.has(entry.id) ? '♥' : '♡'}</button></a><div class="entry-copy"><h3>${esc(entry.title)}</h3><span class="jp">${esc(entry.jp)}</span><p>${esc(entry.desc)}</p><small>${esc(entry.place)} · ${esc(entry.date)}</small></div></article>`;
}

function archive() {
  const params = new URLSearchParams(location.search);
  const category = params.get('category') || 'all';
  const tag = params.get('tag') || '';
  const q = params.get('q') || '';
  let list = [...entries];
  if (category !== 'all') list = list.filter((entry) => entry.type.toLowerCase() === category);
  if (tag) list = list.filter((entry) => entry.tags.includes(tag.toLowerCase()));
  if (q) {
    const needle = q.toLowerCase();
    list = list.filter((entry) => `${entry.title} ${entry.jp} ${entry.desc} ${entry.place} ${entry.tags.join(' ')}`.toLowerCase().includes(needle));
  }
  const activeText = q ? `SEARCH / ${q.toUpperCase()}` : tag ? `TAG / #${tag}` : category === 'all' ? 'INDEX / ALL' : `INDEX / ${category.toUpperCase()}`;
  return `<main class="site-shell">${header()}<section class="page-head archive-head"><span class="eyebrow">SERENDIPITY / ${esc(activeText)}</span><div class="archive-head-row"><div><h1>THE <em>ARCHIVE</em></h1><p>Objects, places, craft, people and ideas collected for closer looking.</p></div><div class="archive-count"><strong>${String(list.length).padStart(2,'0')}</strong><span>FOUND</span></div></div></section><div class="archive-page-toolbar"><div class="categories">${categories.map((c) => `<a class="${category === c.toLowerCase() && !tag && !q ? 'active' : ''}" href="/archive/?category=${c.toLowerCase()}">${c}</a>`).join('')}</div><div class="archive-tools"><a class="toolbar-link" href="/search/">SEARCH <span>→</span></a><a class="toolbar-link" href="/discover/">DISCOVER <span>✦</span></a></div></div><section class="archive archive-page-grid"><div class="archive-grid">${list.map(card).join('')}</div>${list.length ? '' : '<div class="empty"><span>NO FINDINGS.</span> TRY ANOTHER TRACE.</div>'}</section>${footer()}</main>`;
}

function detail() {
  const parts = location.pathname.split('/').filter(Boolean);
  const entry = getEntry(parts[1]);
  if (!entry) return notFound();
  const related = getRelated(entry.related);
  return `<main class="site-shell">${header()}<article class="detail"><div class="detail-meta"><span class="red">${typeLabel(entry.type)}</span><span>${esc(entry.place)}</span><span>${esc(entry.date)}</span></div><div class="detail-grid"><div class="detail-image"><img src="${image}" alt="${esc(entry.title)}"></div><div class="detail-copy"><span class="jp">${esc(entry.jp)}</span><h1>${esc(entry.title)}</h1><p class="detail-lead">${esc(entry.desc)}</p><p>This entry is part of Serendipity's working archive: a place to record context, material, ritual and the small details that make an ordinary subject worth returning to.</p><div class="tag-list">${entry.tags.map((tag) => `<a href="/archive/?tag=${encodeURIComponent(tag)}">#${esc(tag)}</a>`).join('')}</div></div></div><div class="detail-essay"><span class="eyebrow">FIELD NOTE</span><p>Look again after the first impression. Notice the edge, the material, the hand that made it, and the relationship between the thing and the space around it.</p></div><div class="related-block"><div class="related-heading"><span class="eyebrow">CONTINUE THE TRAIL</span><p>Another way in.</p></div><div class="archive-grid">${related.map(card).join('')}</div></div></article>${footer()}</main>`;
}

function journal() {
  return `<main class="site-shell">${header()}<section class="page-head"><span class="eyebrow">JOURNAL / ESSAYS</span><h1>WORDS TO<br><em>LOOK THROUGH</em></h1><p>Longer notes about objects, places, craft and the cultures around them.</p></section><section class="journal-list">${entries.length ? [...new Set(['why-japanese-objects-feel-different', 'the-art-of-noticing'])].map((slug, index) => { const story = getStory(slug); return story ? `<a class="journal-feature ${index % 2 ? 'reverse' : ''}" href="/journal/${story.slug}/"><img src="${story.image}" alt=""><div><span class="eyebrow">${story.readTime} MIN READ · ${story.type}</span><h2>${esc(story.title)}</h2><p>${esc(story.excerpt)}</p><span class="text-link">READ STORY →</span></div></a>` : ''; }).join('') : ''}</section>${footer()}</main>`;
}

function story() {
  const storyData = getStory(location.pathname.split('/').filter(Boolean).pop());
  if (!storyData) return notFound();
  const related = getRelated(storyData.related);
  const paragraphs = storyData.slug === 'why-japanese-objects-feel-different'
    ? ['There are objects that ask to be looked at, and objects that teach you how to look. Japanese craft often becomes memorable through the second category.', 'A tea bowl, a sheet of paper, a wooden tray or a small incense vessel does not need visual perfection to feel resolved. Surface, proportion and the evidence of making carry the story.', 'The interesting detail is usually one you notice after the first impression: a thumb mark, a repair, a slight asymmetry, the way an edge catches light.']
    : ['Noticing starts with slowing down enough to see a material change.', 'The edge of a paper screen, the shadow under a roof, the rhythm of a repeated mark: small details often tell us where a place came from and what people cared to preserve.'];
  return `<main class="site-shell">${header()}<article class="story"><div class="story-top"><span class="eyebrow">${storyData.type} · ${storyData.readTime} MIN READ · ${storyData.date}</span><h1>${esc(storyData.title)}</h1><p>${esc(storyData.excerpt)}</p></div><div class="story-image"><img src="${storyData.image}" alt=""></div><div class="story-body">${paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}</div><div class="related-block"><span class="eyebrow">YOU MAY NOTICE THIS NEXT</span><div class="archive-grid">${related.map(card).join('')}</div></div></article>${footer()}</main>`;
}

function discover() {
  const current = new URLSearchParams(location.search).get('n');
  const seed = current ? Number(current) : Date.now();
  const candidate = entries[Math.abs(seed) % entries.length];
  return `<main class="site-shell">${header()}<section class="discovery"><span class="eyebrow">SERENDIPITY / RANDOM FIND</span><h1>YOU WEREN'T<br><em>LOOKING</em><br>FOR THIS.</h1><div class="discovery-card">${card(candidate, 0)}</div><div class="discovery-meta"><span>${candidate.place}</span><span>${candidate.tags.map((tag) => `#${tag}`).join(' ')}</span></div><a class="discover-large" href="/discover/?n=${Date.now() + 1}">ANOTHER FIND <span>→</span></a></section>${footer()}</main>`;
}

function collection() {
  const list = entries.filter((entry) => saved.has(entry.id));
  return `<main class="site-shell">${header()}<section class="page-head"><span class="eyebrow">YOUR COLLECTION</span><div class="collection-head-row"><div><h1>${String(list.length).padStart(2, '0')} <em>SAVED</em></h1><p>A personal trail through the archive.</p></div><div class="collection-count"><span>LOCAL</span><strong>${String(saved.size).padStart(2,'0')}</strong></div></div></section><section class="archive collection-page"><div class="archive-grid">${list.length ? list.map(card).join('') : '<div class="empty"><span>NOTHING SAVED YET.</span> RETURN TO THE ARCHIVE AND KEEP WHAT CATCHES YOUR EYE.</div>'}</div></section>${footer()}</main>`;
}

function search() {
  const q = new URLSearchParams(location.search).get('q') || '';
  const needle = q.toLowerCase();
  const list = q ? entries.filter((entry) => `${entry.title} ${entry.jp} ${entry.desc} ${entry.place} ${entry.tags.join(' ')}`.toLowerCase().includes(needle)) : entries;
  const groups = ['OBJECTS','PLACES','CRAFT','ART'].map((type) => ({ type, count: list.filter((entry) => entry.type === type).length })).filter((group) => group.count > 0);
  return `<main class="site-shell">${header()}<section class="page-head search-head"><span class="eyebrow">SEARCH / ARCHIVE</span><h1>FIND A <em>TRACE</em></h1><form class="search-big" action="/search/" method="get"><input name="q" value="${esc(q)}" placeholder="Kyoto, tea, craft..."><button>SEARCH</button></form><p>${q ? `${list.length} findings for “${esc(q)}”` : 'Search across objects, places, craft, people and ideas.'}</p>${q ? `<div class="search-groups">${groups.map((group) => `<a href="/archive/?category=${group.type.toLowerCase()}&q=${encodeURIComponent(q)}"><span>${group.type}</span><strong>${String(group.count).padStart(2,'0')}</strong></a>`).join('')}</div>` : ''}</section><section class="archive"><div class="archive-grid">${list.map(card).join('')}</div></section>${footer()}</main>`;
}

function about() {
  return `<main class="site-shell">${header()}<section class="about about-page"><div class="about-label">THE PROJECT</div><div><span class="eyebrow">SERENDIPITY / DIGITAL ARCHIVE</span><h1>WE LOOK<br><em>CLOSER.</em></h1><p>Serendipity is a visual archive of things worth finding: objects, places, craft, people and ideas that reward a second look.</p><p>The site is designed less like a feed and more like a cabinet of discoveries. Every entry should have enough context to become a starting point for another discovery.</p></div></section>${footer()}</main>`;
}

function notFound() {
  return `<main class="site-shell">${header()}<section class="page-head"><span class="eyebrow">404 / UNFOUND</span><h1>NOTHING<br><em>HERE.</em></h1><p>The page is not in the archive yet.</p><a class="text-link" href="/archive/">RETURN TO ARCHIVE <span>→</span></a></section>${footer()}</main>`;
}

function render() {
  const path = location.pathname.replace(/\/+$/, '') || '/';
  let html = home();
  if (path === '/archive') html = archive();
  else if (path === '/journal') html = journal();
  else if (path === '/collection') html = collection();
  else if (path === '/discover') html = discover();
  else if (path === '/search') html = search();
  else if (path === '/about') html = about();
  else if (path === '/journal/why-japanese-objects-feel-different' || path === '/journal/the-art-of-noticing') html = story();
  else if (/^\/(objects|places|craft|art|people|ideas)\//.test(path)) html = detail();
  app.innerHTML = html;
  document.querySelectorAll('.save').forEach((element) => element.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const href = element.closest('.entry-image')?.getAttribute('href') || '';
    const id = href.split('/').filter(Boolean).pop();
    if (!id) return;
    if (saved.has(id)) saved.delete(id); else saved.add(id);
    persist();
    render();
  }));
}

render();
