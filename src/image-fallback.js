function keyFromImage(img) {
  const source = img.currentSrc || img.src || '';
  const match = source.match(/\/images\/([^/?#]+)\.webp(?:[?#]|$)/i);
  return match?.[1] || '';
}

function fallback(img) {
  if (!img || img.dataset.imageFallback === 'local') return;
  img.dataset.imageFallback = 'local';
  const label = (img.alt || keyFromImage(img) || 'SERENDIPITY').replace(/[<>&]/g, '').slice(0, 42);
  img.src = `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="900" height="700" viewBox="0 0 900 700"><rect width="900" height="700" fill="%23d9d1c2"/><path d="M90 560 C210 390 270 480 380 300 S610 210 810 90" fill="none" stroke="%23a83a2c" stroke-width="2" opacity=".28"/><text x="60" y="625" fill="%23172235" font-family="serif" font-size="28" letter-spacing="5">${encodeURIComponent(label)}</text></svg>`;
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
