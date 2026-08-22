const BASE = window.__SERENDIPITY_BASE__ || (location.hostname.endsWith('github.io') ? '/serendipity-archive-v0.1.0' : '');
const path = () => { const value = location.pathname.replace(/\/+$/, '') || '/'; return value.startsWith(BASE) ? (value.slice(BASE.length) || '/') : value; };
const dateLabel = (date = new Date()) => `${date.toLocaleDateString('en-GB', { day:'2-digit' })} ${date.toLocaleDateString('en-GB', { month:'long' }).toUpperCase()} ${date.getFullYear()}`;

function activeNavigation() {
  const current = path();
  const section = current.split('/').filter(Boolean)[0] || 'home';
  const aliases = { objects:'archive', places:'archive', craft:'archive', art:'archive', people:'archive', ideas:'archive', search:'search', journal:'journal', collection:'collection', about:'about' };
  const active = aliases[section] || section;
  document.querySelectorAll('.nav a, .quick-nav-panel a').forEach((link) => {
    const href = link.getAttribute('href') || '';
    const target = href.replace(BASE, '').split('/').filter(Boolean)[0] || 'home';
    const isActive = target === active;
    link.classList.toggle('active', isActive);
    if (isActive) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
  });
}

function aboutEngraving() {
  const about = document.querySelector('.about-page');
  if (!about || about.querySelector('.about-engraving')) return;
  const node = document.createElement('figure');
  node.className = 'about-engraving';
  node.innerHTML = `<img src="${BASE}/ornaments/about-engraving.svg" alt=""><figcaption>PLATE 01 / AFTERNOON STUDY</figcaption>`;
  about.prepend(node);
}

function journalDaily() {
  const list = document.querySelector('.journal-list');
  if (!list || document.querySelector('.daily-editorial')) return;
  const now = new Date();
  const day = now.toLocaleDateString('en-GB', { day:'2-digit' });
  const month = now.toLocaleDateString('en-GB', { month:'long' }).toUpperCase();
  const weekday = now.toLocaleDateString('en-GB', { weekday:'short' }).toUpperCase();
  const plans = [['MON','OBJECT','A material detail worth keeping.'],['TUE','PLACE','A street, room or landscape.'],['WED','CRAFT','A process carried by hands.'],['THU','PEOPLE','Someone who changed a way of making.'],['FRI','IDEA','A thought worth following further.'],['SAT','LONG READ','One slower story for the weekend.'],['SUN','FIELD NOTE','A small observation from the week.']];
  const todayIndex = now.getDay() === 0 ? 6 : now.getDay() - 1;
  const items = plans.map((item, index) => `<div class="daily-plan-item ${index === todayIndex ? 'today' : ''}"><span>${item[0]}</span><div><strong>${item[1]}</strong><small>${item[2]}</small></div></div>`).join('');
  const section = document.createElement('section');
  section.className = 'daily-editorial';
  section.innerHTML = `<div class="daily-editorial-intro"><span class="eyebrow">TODAY / ${day} ${month} ${now.getFullYear()} · ${weekday}</span><h2>A NOTE,<br><em>EVERY DAY.</em></h2><p><strong>Today's note:</strong> look once for the whole object, then again for the edge, the material and the hand that made it. Small details often become the strongest memory.</p><a class="daily-date" href="${BASE}/journal/the-art-of-noticing/">READ TODAY'S NOTE <span>→</span></a></div><div class="daily-plan"><div class="daily-plan-head"><span class="eyebrow">THE WEEK / EDITORIAL RHYTHM</span></div>${items}</div>`;
  list.parentNode.insertBefore(section, list);
}

function discoverComposition() {
  const page = document.querySelector('.discovery');
  if (!page || page.querySelector('.discovery-ornament')) return;
  const ornament = document.createElement('aside');
  ornament.className = 'discovery-ornament';
  ornament.innerHTML = '<span>DISCOVERY / 037</span><b>KEEP WANDERING</b><i>→</i>';
  page.appendChild(ornament);
  const card = page.querySelector('.discovery-card');
  if (card) card.classList.add('discovery-card-enhanced');
  const next = page.querySelector('.discovery-next');
  if (next) next.classList.add('discovery-cta');
}

function imageBehavior() {
  [...document.images].forEach((img, index) => {
    img.decoding = 'async';
    const critical = img.closest('.hero-art, .detail-image, .story-image') || index === 0;
    if (critical) { img.loading = 'eager'; img.setAttribute('fetchpriority','high'); }
    else { img.loading = 'lazy'; img.removeAttribute('fetchpriority'); }
    img.addEventListener('error', () => {
      if (img.dataset.fallback) return;
      img.dataset.fallback = '1';
      const label = (img.alt || 'SERENDIPITY').replace(/[<>&]/g, '').slice(0, 42);
      img.src = `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="900" height="700" viewBox="0 0 900 700"><rect width="900" height="700" fill="%23d9d1c2"/><path d="M90 560 C210 390 270 480 380 300 S610 210 810 90" fill="none" stroke="%23a83a2c" stroke-width="2" opacity=".28"/><text x="60" y="625" fill="%23172235" font-family="serif" font-size="28" letter-spacing="5">${encodeURIComponent(label)}</text></svg>`;
    }, { once:true });
  });
}

function init() { activeNavigation(); aboutEngraving(); journalDaily(); discoverComposition(); imageBehavior(); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
