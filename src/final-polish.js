const BASE = window.__SERENDIPITY_BASE__ || (location.hostname.endsWith('github.io') ? '/serendipity-archive-v0.1.0' : '');
const today = new Date();
const dateLabel = () => today.toLocaleDateString('en-GB', {day:'2-digit', month:'long', year:'numeric'}).toUpperCase();

function homeToday() {
  const archive = document.querySelector('.hero + .archive');
  const featured = document.querySelector('.featured');
  if (!archive || !featured || document.querySelector('.today-archive')) return;
  const section = document.createElement('section');
  section.className = 'today-archive daily-home';
  section.innerHTML = `<div><span class="eyebrow">TODAY IN THE ARCHIVE / ${dateLabel()}</span><h2>ONE MORE<br><em>THING TO NOTICE.</em></h2></div><div><p>A fresh observation joins the archive every day. Start with today's note, then follow the trail into objects, places, craft and ideas.</p><a class="text-link" href="${BASE}/journal/">OPEN TODAY'S JOURNAL <span>→</span></a></div>`;
  featured.parentNode.insertBefore(section, featured);
}

function aboutPlate() {
  const about = document.querySelector('.about-page');
  if (!about || about.querySelector('.about-engraving')) return;
  const figure = document.createElement('figure');
  figure.className = 'about-engraving';
  figure.innerHTML = `<img src="${BASE}/ornaments/about-engraving.svg" alt=""><figcaption>PLATE 01 / KYOTO LANDSCAPE STUDY</figcaption>`;
  about.prepend(figure);
}

function addEditorialDetails() {
  const page = document.querySelector('.discovery');
  if (page && !page.querySelector('.discovery-plate')) {
    const plate = document.createElement('div');
    plate.className = 'discovery-plate';
    plate.innerHTML = '<span>FIELD INDEX</span><b>037</b><i>拾</i>';
    page.appendChild(plate);
  }
  const journal = document.querySelector('.journal-head');
  if (journal && !journal.querySelector('.journal-date-stamp')) {
    const stamp = document.createElement('div');
    stamp.className = 'journal-date-stamp';
    stamp.innerHTML = `<span>TODAY</span><strong>${today.getDate()}</strong><small>${today.toLocaleDateString('en-GB',{month:'short'}).toUpperCase()} / ${today.getFullYear()}</small>`;
    journal.appendChild(stamp);
  }
}

function optimizeImages() {
  const images = [...document.images];
  images.forEach((image, index) => {
    image.decoding = 'async';
    const critical = image.closest('.hero-art,.detail-image,.story-image') || (index === 0 && location.pathname === BASE + '/');
    if (critical) {
      image.loading = 'eager';
      image.setAttribute('fetchpriority','high');
    } else {
      image.loading = 'lazy';
      image.removeAttribute('fetchpriority');
    }
  });
  if (location.pathname === BASE + '/' && !document.querySelector('link[data-serendipity-preload]')) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = `${BASE}/images/kyoto.webp`;
    link.dataset.serendipityPreload = '1';
    document.head.appendChild(link);
  }
}

function init() {
  homeToday();
  aboutPlate();
  addEditorialDetails();
  optimizeImages();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
