import { imageMap, gallerySets } from './image-map.js';

const BASE = location.pathname.startsWith('/serendipity-archive-v0.1.0') ? '/serendipity-archive-v0.1.0' : '';
window.__SERENDIPITY_BASE__ = BASE;
const normalizedPath = () => location.pathname.replace(BASE, '').replace(/\/+$/, '') || '/';
const categoryRoutes = new Set(['objects','places','craft','art','people','ideas']);
if (categoryRoutes.has(normalizedPath().slice(1))) {
  location.replace(prefix(`/archive/?category=${normalizedPath().slice(1)}`));
}
const prefix = (value) => (!BASE || !value || value.startsWith(BASE) || !value.startsWith('/') ? value : BASE + value);
const visual = (html) => html.replace(/(<img\b[^>]*\bsrc=")[^"]*("[^>]*\balt=")([^"]+)("[^>]*>)/gi, (match, before, mid, alt, after) => imageMap[alt] ? `${before}${imageMap[alt]}${mid}${alt}${after}` : match);
const rewrite = (root = document) => {
  if (!BASE) return;
  root.querySelectorAll?.('[href^="/"],[src^="/"],[action^="/"]').forEach((el) => ['href','src','action'].forEach((attr) => {
    const value = el.getAttribute(attr); if (value) el.setAttribute(attr, prefix(value));
  }));
};
const originalInnerHTML = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
if (originalInnerHTML?.set) {
  Object.defineProperty(Element.prototype, 'innerHTML', {
    configurable: true, get: originalInnerHTML.get,
    set(value) {
      let html = visual(String(value));
      if (BASE) html = html.replaceAll('href="/', `href="${BASE}/`).replaceAll('src="/', `src="${BASE}/`).replaceAll('action="/', `action="${BASE}/`);
      originalInnerHTML.set.call(this, html);
    }
  });
}
document.addEventListener('click', (event) => {
  const link = event.target.closest?.('a[href]'); if (!link || !BASE) return;
  const href = link.getAttribute('href');
  if (!href || !href.startsWith('/') || href.startsWith(BASE) || href.startsWith('//')) return;
  event.preventDefault(); location.href = prefix(href);
});
document.addEventListener('DOMContentLoaded', () => {
  rewrite(); enhanceGalleries();
  const observer = new MutationObserver(() => { rewrite(); enhanceGalleries(); }); observer.observe(document.body, {childList:true, subtree:true});
});

function enhanceGalleries(){
  document.querySelectorAll('.detail-image').forEach((wrap) => {
    if (wrap.dataset.galleryReady) return;
    const img = wrap.querySelector('img'); if (!img) return;
    const title = img.alt; const all = Object.values(imageMap); const set = gallerySets[title] || [imageMap[title], ...all.filter((src) => src !== imageMap[title])].filter(Boolean).slice(0,3);
    if (set.length < 2) return;
    wrap.dataset.galleryReady = 'true';
    const gallery = document.createElement('div'); gallery.className = 'detail-gallery';
    set.forEach((src, i) => {
      const button = document.createElement('button'); button.type='button'; button.className=i===0?'is-active':''; button.setAttribute('aria-label',`View image ${i+1}`);
      const thumb = document.createElement('img'); thumb.src=src; thumb.alt=`${title} — view ${i+1}`; button.append(thumb);
      button.addEventListener('click',()=>{img.src=src; gallery.querySelectorAll('button').forEach(b=>b.classList.remove('is-active')); button.classList.add('is-active');});
      gallery.append(button);
    });
    wrap.parentElement?.insertBefore(gallery, wrap.nextSibling);
  });
}

const bootQuickNav = () => {
  if (document.querySelector('.quick-nav')) return;
  const nav = document.createElement('aside'); nav.className = 'quick-nav';
  nav.innerHTML = `<button class="quick-nav-toggle" type="button" aria-expanded="false" aria-controls="quick-nav-panel"><span></span><span></span><span></span><b>MENU</b></button><div class="quick-nav-panel" id="quick-nav-panel" aria-hidden="true"><a href="/">HOME</a><a href="/archive/">ARCHIVE</a><a href="/journal/">JOURNAL</a><a href="/discover/">DISCOVER</a><a href="/collection/">COLLECTION</a><a href="/search/">SEARCH</a><a href="/about/">ABOUT</a></div>`;
  document.body.append(nav); const button = nav.querySelector('button'); const panel = nav.querySelector('.quick-nav-panel');
  button.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); button.setAttribute('aria-expanded', String(open)); panel.setAttribute('aria-hidden', String(!open)); });
  document.addEventListener('click', (e) => { if (!nav.contains(e.target) && nav.classList.contains('is-open')) { nav.classList.remove('is-open'); button.setAttribute('aria-expanded','false'); panel.setAttribute('aria-hidden','true'); } });
};
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bootQuickNav); else bootQuickNav();
