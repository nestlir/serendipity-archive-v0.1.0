const BASE = window.__SERENDIPITY_BASE__ || '/serendipity-archive-v0.1.0';

const REMOTE_FILES = {
  kodo:'Japanese - Incense Burner ("Koro") - Walters 49466.jpg',
  'kodo-kirin':'Japanese - Incense Burner ("Koro") in the Form of the Kirin - Walters 491731 - Three Quarter.jpg',
  'kodo-tokonoma':'JapaneseIncenseBurner KouroOnTokonoma.jpg',
  'tea-bowl':'Japanese - Tea Bowl - Walters 49233.jpg',
  kyusu:'JapaneseTeapot.jpg',
  'kyusu-ueno':'Kyusu by i yudai in Ueno, Tokyo.jpg',
  'kyusu-household':'Household-kyusu-feb5-2015.jpg',
  'fushimi-inari':'20181110 Fushimi Inari Torii 1.jpg',
  sagano:'20181110 Fushimi Inari Torii 11.jpg',
  kyoto:'Kyoto Fushimi Inari-taisha Eingangs-Torii.jpg',
  suwon:'Suwon, Hwaseong Fortress.jpg',
  washi:'Shiroishi washi letter paper.jpg',
  kintsugi:'Kintsugi.jpg',
  'seal-script':'Xiao Zhuan.jpg'
};

const remoteUrl = (name) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(REMOTE_FILES[name])}?width=1400`;

function keyFromImage(img) {
  const source = img.currentSrc || img.src || '';
  const match = source.match(/\/images\/([^/?#]+)\.webp(?:[?#]|$)/i);
  return match?.[1] || '';
}

function fallback(img) {
  if (!img || img.dataset.imageFallback === 'remote') return;
  const key = keyFromImage(img);
  if (!key || !REMOTE_FILES[key]) return;
  img.dataset.imageFallback = 'remote';
  img.src = remoteUrl(key);
}

function bind(root = document) {
  root.querySelectorAll?.('img[src*="/images/"]').forEach((img) => {
    if (img.dataset.imageFallbackBound === '1') return;
    img.dataset.imageFallbackBound = '1';
    img.addEventListener('error', () => fallback(img), { once: true });
    if (img.complete && img.naturalWidth === 0) fallback(img);
  });
}

function init() {
  bind();
  new MutationObserver(() => bind()).observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
