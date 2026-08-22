const BASE = '/serendipity-archive-v0.1.0';
window.__SERENDIPITY_BASE__ = BASE;
const prefix = (value) => (!value || !value.startsWith('/') || value.startsWith('//') || value.startsWith(BASE) ? value : BASE + value);
const rewrite = (root = document) => {
  root.querySelectorAll?.('[href^="/"],[src^="/"],[action^="/"]').forEach((el) => ['href','src','action'].forEach((attr) => {
    const value = el.getAttribute(attr); if (value) el.setAttribute(attr, prefix(value));
  }));
};
const descriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
if (descriptor?.set) {
  Object.defineProperty(Element.prototype, 'innerHTML', {
    configurable: true,
    get: descriptor.get,
    set(value) {
      const html = String(value).replaceAll('href="/', `href="${BASE}/`).replaceAll('src="/', `src="${BASE}/`).replaceAll('action="/', `action="${BASE}/`);
      descriptor.set.call(this, html);
    }
  });
}
document.addEventListener('click', (event) => {
  const link = event.target.closest?.('a[href]'); if (!link) return;
  const href = link.getAttribute('href');
  if (!href || !href.startsWith('/') || href.startsWith('//') || href.startsWith(BASE)) return;
  link.setAttribute('href', prefix(href));
});
const boot = () => {
  rewrite();
  if (document.body) new MutationObserver(() => rewrite()).observe(document.body, { childList: true, subtree: true });
};
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true }); else boot();

const currentSection = () => {
  const path = location.pathname.replace(BASE, '').split('/').filter(Boolean)[0] || 'home';
  return path.toLowerCase();
};
const bootQuickNav = () => {
  if (document.querySelector('.quick-nav')) return;
  const nav = document.createElement('aside'); nav.className = 'quick-nav';
  const section = currentSection();
  const links = [['/','HOME','home'],['/archive/','ARCHIVE','archive'],['/journal/','JOURNAL','journal'],['/discover/','DISCOVER','discover'],['/collection/','COLLECTION','collection'],['/search/','SEARCH','search'],['/about/','ABOUT','about']];
  nav.innerHTML = `<button class="quick-nav-toggle" type="button" aria-expanded="false" aria-controls="quick-nav-panel"><span></span><span></span><span></span><b>MENU</b></button><div class="quick-nav-panel" id="quick-nav-panel" aria-hidden="true">${links.map(([href,label,key]) => `<a class="${section === key ? 'active' : ''}" aria-current="${section === key ? 'page' : 'false'}" href="${href}">${label}</a>`).join('')}</div>`;
  document.body.append(nav);
  const button = nav.querySelector('button'); const panel = nav.querySelector('.quick-nav-panel');
  button.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); button.setAttribute('aria-expanded', String(open)); panel.setAttribute('aria-hidden', String(!open)); });
  document.addEventListener('click', (event) => { if (!nav.contains(event.target) && nav.classList.contains('is-open')) { nav.classList.remove('is-open'); button.setAttribute('aria-expanded','false'); panel.setAttribute('aria-hidden','true'); } });
};
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bootQuickNav); else bootQuickNav();
