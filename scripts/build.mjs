import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const site = path.join(root, '_site');
const required = [
  'index.html', '404.html', 'src/app.js', 'src/search.js', 'src/content.js',
  'src/runtime.js', 'src/image-map.js', 'src/production-ui.css',
  'public/robots.txt', 'public/sitemap.xml', 'public/site.webmanifest', 'public/favicon.svg'
];

for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) throw new Error(`Missing required file: ${file}`);
}

for (const file of ['src/app.js', 'src/search.js', 'src/collection.js', 'src/discovery.js', 'src/assets.js', 'src/runtime.js', 'src/image-map.js']) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  if (!source.trim()) throw new Error(`Empty source file: ${file}`);
}

fs.rmSync(site, { recursive: true, force: true });
fs.mkdirSync(site, { recursive: true });
fs.cpSync(path.join(root, 'index.html'), path.join(site, 'index.html'));
fs.cpSync(path.join(root, '404.html'), path.join(site, '404.html'));
fs.cpSync(path.join(root, 'src'), path.join(site, 'src'), { recursive: true });
fs.cpSync(path.join(root, 'public'), site, { recursive: true });

// Keep a second copy of the optimized image library inside /src/images.
// image-map.js references this exact path so image requests cannot depend on
// the current page URL or on runtime link rewriting.
const deployedImages = path.join(site, 'src', 'images');
fs.rmSync(deployedImages, { recursive: true, force: true });
fs.cpSync(path.join(root, 'public', 'images'), deployedImages, { recursive: true });

console.log(`Built static site: ${site}`);
console.log(`Deployed image library: ${deployedImages}`);
