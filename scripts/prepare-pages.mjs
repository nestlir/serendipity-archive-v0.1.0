import fs from 'node:fs';

const base = '/serendipity-archive-v0.1.0';
const files = ['_site/src/app.js', '_site/src/search.js'];
const marker = `/* SERENDIPITY_PAGES_BASE:${base} */`;

for (const filename of files) {
  let source = fs.readFileSync(filename, 'utf8');

  // Runtime paths are written as root-relative URLs for the local server.
  // GitHub Pages is a project site, so the deployment copy gets the repo base.
  source = source.replaceAll('location.pathname', `location.pathname.replace('${base}', '')`);
  source = source.replaceAll('href="/', `href="${base}/`);
  source = source.replaceAll('src="/', `src="${base}/`);
  source = source.replaceAll('action="/', `action="${base}/`);
  source = source.replace("history.replaceState({}, '', url);", `history.replaceState({}, '', url.startsWith('${base}') ? url : '${base}' + url);`);

  if (!source.includes(marker)) source = `${marker}\n${source}`;
  fs.writeFileSync(filename, source);
}

const html = '_site/index.html';
let index = fs.readFileSync(html, 'utf8');
index = index.replaceAll('href="/src/', 'href="./src/').replaceAll('src="/src/', 'src="./src/');
fs.writeFileSync(html, index);
