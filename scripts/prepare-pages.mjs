import fs from 'node:fs';
import path from 'node:path';

const site = path.resolve('_site');
if (!fs.existsSync(path.join(site, 'index.html'))) throw new Error('Missing _site/index.html');
if (!fs.existsSync(path.join(site, '404.html'))) throw new Error('Missing _site/404.html');

// Source files deliberately keep root-relative application routes. runtime.js
// applies the GitHub Pages project prefix at runtime, while local development
// stays at /. Do not rewrite app.js/search.js here: doing so breaks both routing
// and image URLs.
const indexPath = path.join(site, 'index.html');
let index = fs.readFileSync(indexPath, 'utf8');
index = index.replaceAll('href="/src/', 'href="./src/').replaceAll('src="/src/', 'src="./src/');
fs.writeFileSync(indexPath, index);

const notFoundPath = path.join(site, '404.html');
let notFound = fs.readFileSync(notFoundPath, 'utf8');
notFound = notFound.replaceAll('href="/src/', 'href="./src/').replaceAll('src="/src/', 'src="./src/');
fs.writeFileSync(notFoundPath, notFound);
