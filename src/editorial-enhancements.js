const BASE = window.__SERENDIPITY_BASE__ || (location.hostname.endsWith('github.io') ? '/serendipity-archive-v0.1.0' : '');
const path = () => {
  const value = location.pathname.replace(/\\/+$/, '') || '/';
  return value.startsWith(BASE) ? (value.slice(BASE.length) || '/') : value;
};
const esc = (value) => String(value).replace(/[&<>\"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '\"':'&quot;', "'":'&#39;' }[char]));

function activeNavigation() {
  const current = path();
  const section = current.split('/').filter(Boolean)[0] || 'home';
  const aliases = { objects:'archive', places:'archive', craft:'archive', art:'archive', people:'archive', ideas:'archive', search:'archive', journal:'journal', collection:'collection', about:'about' };
  const active = aliases[section] || section;
  document.querySelectorAll('.nav a, .quick-nav-panel a').forEach((link) => {
    const href = link.getAttribute('href') || '';
    const target = href.replace(BASE, '').split('/').filter(Boolean)[0] || 'home';
    const isActive = target === active || (active === 'archive' && target === 'archive');
    link.classList.toggle('active', isActive);
    if (isActive) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
  });
}

function aboutEngraving() {
  const about = document.querySelector('.about-page');
  if (!about || about.querySelector('.about-engraving')) return;
  const node = document.createElement('figure');
  node.className = 'about-engraving';
  node.innerHTML = `<img src="/ornaments/about-engraving.svg" alt=""><figcaption>PLATE 01 / AFTERNOON STUDY</figcaption>`;
  about.prepend(node);
}

function journalDaily() {
  const list = document.querySelector('.journal-list');
  if (!list || document.querySelector('.daily-editorial')) return;
  const now = new Date();
  const day = now.toLocaleDateString('en-GB', { day:'2-digit' });
  const month = now.toLocaleDateString('en-GB', { month:'long' }).toUpperCase();
  const weekday = now.toLocaleDateString('en-GB', { weekday:'short' }).toUpperCase();
  const plans = [
    ['MON','OBJECT','A material detail worth keeping.'],
    ['TUE','PLACE','A street, room or landscape.'],
    ['WED','CRAFT','A process carried by hands.'],
    ['THU','PEOPLE','Someone who changed a way of making.'],
    ['FRI','IDEA','A thought worth following further.'],
    ['SAT','LONG READ','One slower story for the weekend.'],
    ['SUN','FIELD NOTE','A small observation from the week.']
  ];
  const todayIndex = now.getDay() === 0 ? 6 : now.getDay() - 1;
  const items = plans.map((item, index) => `<div class="daily-plan-item ${index === todayIndex ? 'today' : ''}"><span>${item[0]}</span><div><strong>${item[1]}</strong><small>${item[2]}</small></div></div>`).join('');
  const section = document.createElement('section');
  section.className = 'daily-editorial';
  section.innerHTML = `<div class="daily-editorial-intro"><span class="eyebrow">TODAY / ${day} ${month} 2026 · ${weekday}</span><h2>A NOTE,<br><em>EVERY DAY.</em></h2><p>Serendipity changes a little every day. One observation enters the Journal, then becomes another thread through the archive.</p><a class="daily-date" href="/journal/why-japanese-objects-feel-different/">TODAY'S NOTE <span>→</span></a></div><div class="daily-plan"><div class="daily-plan-head"><span class="eyebrow">THE WEEK / EDITORIAL RHYTHM</span></div>${items}</div>`;
  list.parentNode.insertBefore(section, list);
  const head = document.querySelector('.page-head');
  head?.classList.add('journal-head');
  if (head && !head.querySelector('.journal-ornament')) {
    const ornament = document.createElement('div');
    ornament.className = 'journal-ornament';
    ornament.innerHTML = '<span>日</span><i></i><small>DAILY NOTES / 2026</small>';
    head.appendChild(ornament);
  }
}

function homeDaily() {
  const archive = document.querySelector('.hero + .archive');
  const featured = document.querySelector('.featured');
  if (!archive || !featured || document.querySelector('.daily-home')) return;
  const section = document.createElement('section');
  section.className = 'daily-home';
  section.innerHTML = `<div><span class="eyebrow">TODAY IN THE ARCHIVE / 22 AUGUST 2026</span><h2>ONE MORE<br><em>THING TO NOTICE.</em></h2></div><div><p>Every day, one new detail joins the collection: an object, a place, a craft, a person or an idea. Start here, then follow the trail.</p><a class="text-link" href="/journal/">OPEN TODAY'S JOURNAL <span>→</span></a></div>`;
  featured.parentNode.insertBefore(section, featured);
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
  const images = [...document.images];
  images.forEach((img, index) => {
    img.decoding = 'async';
    const critical = img.closest('.hero-art, .detail-image, .story-image') || index < 3;
    if (critical) img.setAttribute('fetchpriority', 'high'); else img.loading = 'lazy';
    img.addEventListener('error', () => {
      if (img.dataset.fallback) return;
      img.dataset.fallback = '1';
      const title = encodeURIComponent(img.alt || 'SERENDIPITY');
      img.src = `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="900" height="700" viewBox="0 0 900 700"><rect width="900" height="700" fill="%23d9d1c2"/><path d="M90 560 C210 390 270 480 380 300 S610 210 810 90" fill="none" stroke="%23a83a2c" stroke-width="2" opacity=".28"/><text x="60" y="625" fill="%23172235" font-family="serif" font-size="28" letter-spacing="5">${title}</text></svg>`;
    }, { once:true });
  });
}

function init() {
  activeNavigation();
  aboutEngraving();
  journalDaily();
  homeDaily();
  discoverComposition();
  imageBehavior();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
