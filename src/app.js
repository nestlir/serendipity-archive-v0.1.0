import { entries, categories, image, getEntry, getStory, getRelated } from './content.js';

const app = document.querySelector('#app');
let active = 'ALL';
let query = '';
let saved = new Set(JSON.parse(localStorage.getItem('serendipity-saved') || '[]'));

const persist = () => localStorage.setItem('serendipity-saved', JSON.stringify([...saved]));
const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
const header = () => `<header class="header"><a class="monogram" href="/">S.</a><nav class="nav"><a href="/archive/">ARCHIVE</a><a href="/journal/">JOURNAL</a><a href="/collection/">COLLECTION</a><a href="/about/">ABOUT</a></nav><a class="search-trigger" href="/search/">SEARCH <span class="search-dot"></span></a></header>`;
const footer = () => `<footer class="footer"><div class="footer-title">SERENDIPITY</div><div class="footer-manifesto">A DIGITAL ARCHIVE<br>OF THINGS WORTH FINDING.</div><div class="footer-links"><a href="/archive/">ARCHIVE</a><a href="/journal/">JOURNAL</a><a href="/collection/">COLLECTION</a><a href="/about/">ABOUT</a></div><div class="footer-meta">TOKYO · KYOTO · SHANGHAI · SEOUL<br>© 2026 SERENDIPITY</div></footer>`;

function card(entry, index = 0) {
  const path = `/${entry.type.toLowerCase()}/${entry.id}/`;
  return `<article class="archive-item item-${index % 3}"><div class="entry-meta"><span>${String(index + 1).padStart(2, '0')}</span><span class="red">${entry.type}</span></div><a class="entry-image" href="${path}"><img src="${image}" alt="${esc(entry.title)}"><button class="save" type="button" data-save="${entry.id}" aria-label="Save ${esc(entry.title)}">${saved.has(entry.id) ? '♥' : '♡'}</button></a><div class="entry-copy"><h3>${esc(entry.title)}</h3><span class="jp">${esc(entry.jp)}</span><p>${esc(entry.desc)}</p><small>${esc(entry.place)} · ${esc(entry.date)}</small></div></article>`;
}

function home() {
  const filtered = entries.filter((entry) => {
    const text = `${entry.title} ${entry.jp} ${entry.desc} ${entry.place} ${entry.tags.join(' ')}`.toLowerCase();
    return (active === 'ALL' || entry.type === active) && (!query || text.includes(query.toLowerCase()));
  });
  return `<main class="site-shell">${header()}<section class="hero"><div class="hero-copy"><div class="eyebrow"><span>01</span> / SERENDIPITY</div><h1>THE ART<br><em>OF</em> NOTICING</h1><p class="hero-lead">Things worth finding.</p><p class="hero-description">A visual archive of objects, places and ideas from East Asia and beyond.</p><a class="text-link" href="/archive/">EXPLORE ARCHIVE <span>→</span></a></div><div class="hero-art"><img src="${image}" alt="Traditional East Asian architectural illustration"><div class="hero-location"><span>TOKYO, JAPAN</span><span>35.6762° N · 139.6503° E</span></div></div><div class="vertical-note">SCROLL TO DISCOVER</div><img class="seal-svg" src="/serendipity-mark.svg" alt=""></section><section class="archive"><div class="section-intro"><div><h2>THE ARCHIVE</h2><p>A collection of things that deserved a second look.</p></div><a class="discover-button" href="/discover/">I'M FEELING CURIOUS <span>✦</span></a></div><div class="archive-toolbar"><div class="categories">${categories.map((category) => `<a class="${active === category ? 'active' : ''}" href="/archive/?category=${category.toLowerCase()}">${category}</a>`).join('')}</div><span class="result-count">${String(filtered.length).padStart(2, '0')} FOUND</span></div><div class="archive-grid">${filtered.slice(0, 5).map(card).join('')}</div>${filtered.length ? '' : '<div class="empty">NO FINDINGS. TRY ANOTHER TRACE.</div>'}</section><section class="featured"><div class="featured-index">01<br><span>ESSAY</span></div><div class="featured-image"><img src="${image}" alt=""></div><div class="featured-copy"><span class="eyebrow">FEATURED STORY</span><h2>Why Japanese<br>objects feel<br><em>different</em></h2><p>An essay about quiet intention, imperfect materials and the beauty of things made by human hands.</p><div class="story-meta">12 MIN READ · JAPAN · CRAFT</div><a class="text-link" href="/journal/why-japanese-objects-feel-different/">READ STORY <span>→</span></a></div></section><section class="discover-section"><div><span class="eyebrow">SERENDIPITY / 037</span><h2>YOU WEREN'T<br><em>LOOKING</em><br>FOR THIS.</h2></div><a class="discover-large" href="/discover/">DISCOVER SOMETHING <span>→</span></a></section><section class="about"><div class="about-label">ABOUT</div><div><h2>WE LOOK<br><em>CLOSER.</em></h2><p>There are things we pass every day without noticing: a pattern on a door, the shape of a bowl, a smell carried through an old street, a craft that survived because someone cared enough to continue it.</p><p>Serendipity is an archive of those moments.</p></div></section><section class="collection"><div><span class="eyebrow">YOUR COLLECTION</span><h2>${String(saved.size).padStart(2, '0')} <em>SAVED</em></h2></div><p>Save a detail, return later, and build your own trail through the archive.</p></section>${footer()}</main>`;
}

function archive() {
  const category = new URLSearchParams(location.search).get('category') || 'all';
  const list = category === 'all' ? entries : entries.filter((entry) => entry.type.toLowerCase() === category);
  return `<main class="site-shell">${header()}<section class="page-head"><span class="eyebrow">SERENDIPITY / INDEX</span><h1>THE <em>ARCHIVE</em></h1><p>Objects, places, craft, people and ideas collected for closer looking.</p></section><div class="archive-page-toolbar"><div class="categories">${categories.map((c) => `<a class="${category === c.toLowerCase() ? 'active' : ''}" href="/archive/?category=${c.toLowerCase()}">${c}</a>`).join('')}</div><a class="text-link" href="/search/">SEARCH ARCHIVE <span>→</span></a></div><section class="archive archive-page-grid"><div class="archive-grid">${list.map(card).join('')}</div></section>${footer()}</main>`;
}

function detail() {
  const parts = location.pathname.split('/').filter(Boolean);
  const entry = getEntry(parts[1]);
  if (!entry) return notFound();
  const related = getRelated(entry.related);
  return `<main class="site-shell">${header()}<article class="detail"><div class="detail-meta"><span class="red">${entry.type}</span><span>${esc(entry.place)}</span><span>${esc(entry.date)}</span></div><div class="detail-grid"><div class="detail-image"><img src="${image}" alt="${esc(entry.title)}"></div><div class="detail-copy"><span class="jp">${esc(entry.jp)}</span><h1>${esc(entry.title)}</h1><p class="detail-lead">${esc(entry.desc)}</p><p>This entry is part of Serendipity's working archive: a place to record context, material, ritual and the small details that make an ordinary subject worth returning to.</p><div class="tag-list">${entry.tags.map((tag) => `<a href="/search/?q=${encodeURIComponent(tag)}">#${esc(tag)}</a>`).join('')}</div></div></div><div class="detail-essay"><span class="eyebrow">FIELD NOTE</span><p>Look again after the first impression. Notice the edge, the material, the hand that made it, and the relationship between the thing and the space around it.</p></div><div class="related-block"><span class="eyebrow">CONTINUE THE TRAIL</span><div class="archive-grid">${related.map(card).join('')}</div></div></article>${footer()}</main>`;
}

function journal() {
  return `<main class="site-shell">${header()}<section class="page-head"><span class="eyebrow">JOURNAL / ESSAYS</span><h1>WORDS TO<br><em>LOOK THROUGH</em></h1><p>Longer notes about objects, places, craft and the cultures around them.</p></section><section class="journal-list">${[...new Set(['why-japanese-objects-feel-different', 'the-art-of-noticing'])].map((slug, index) => { const story = getStory(slug); return story ? `<a class="journal-feature" href="/journal/${story.slug}/"><img src="${story.image}" alt=""><div><span class="eyebrow">${story.readTime} MIN READ · ${story.type}</span><h2>${esc(story.title)}</h2><p>${esc(story.excerpt)}</p><span class="text-link">READ STORY →</span></div></a>` : ''; }).join('')}</section>${footer()}</main>`;
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
  const candidate = entries[Math.floor(Math.random() * entries.length)];
  return `<main class="site-shell">${header()}<section class="discovery"><span class="eyebrow">SERENDIPITY / RANDOM FIND</span><h1>YOU WEREN'T<br><em>LOOKING</em><br>FOR THIS.</h1><div class="discovery-card">${card(candidate, 0)}</div><a class="discover-large" href="/discover/?n=${Date.now()}">ANOTHER FIND <span>→</span></a></section>${footer()}</main>`;
}

function collection() {
  const list = entries.filter((entry) => saved.has(entry.id));
  return `<main class="site-shell">${header()}<section class="page-head"><span class="eyebrow">YOUR COLLECTION</span><h1>${String(list.length).padStart(2, '0')} <em>SAVED</em></h1><p>A personal trail through the archive.</p></section><section class="archive"><div class="archive-grid">${list.length ? list.map(card).join('') : '<div class="empty">NOTHING SAVED YET. RETURN TO THE ARCHIVE AND KEEP WHAT CATCHES YOUR EYE.</div>'}</div></section>${footer()}</main>`;
}

function search() {
  const q = new URLSearchParams(location.search).get('q') || '';
  const list = q ? entries.filter((entry) => `${entry.title} ${entry.jp} ${entry.desc} ${entry.place} ${entry.tags.join(' ')}`.toLowerCase().includes(q.toLowerCase())) : entries;
  return `<main class="site-shell">${header()}<section class="page-head"><span class="eyebrow">SEARCH</span><h1>FIND A <em>TRACE</em></h1><form class="search-big" action="/search/" method="get"><input name="q" value="${esc(q)}" placeholder="Kyoto, tea, craft..."><button>SEARCH</button></form><p>${q ? `${list.length} findings for “${esc(q)}”` : 'Search across objects, places, craft and ideas.'}</p></section><section class="archive"><div class="archive-grid">${list.map(card).join('')}</div></section>${footer()}</main>`;
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
