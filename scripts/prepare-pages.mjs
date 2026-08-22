import fs from 'node:fs';
import path from 'node:path';

const base = '/serendipity-archive-v0.1.0';
const files = ['_site/src/app.js', '_site/src/search.js'];

for (const filename of files) {
  let source = fs.readFileSync(filename, 'utf8');
  source = source.replaceAll("location.pathname.replace(/\\\\/+$/, '') || '/'", "(location.pathname.replace(/^\\/serendipity-archive-v0.1.0/, '').replace(/\\\\/+$/, '') || '/')");
  source = source.replaceAll("location.pathname.replace(/\\\\/+$/, '') !== '/search'", "location.pathname.replace(/^\\/serendipity-archive-v0.1.0/, '').replace(/\\\\/+$/, '') !== '/search'");
  source = source.replaceAll("location.pathname.split('/').filter(Boolean)", "location.pathname.replace(/^\\/serendipity-archive-v0.1.0/, '').split('/').filter(Boolean)");
  source = source.replace('app.innerHTML = html;', `app.innerHTML = html;\n  app.querySelectorAll('[href^="/"],[src^="/"],[action^="/"]').forEach((element) => {\n    for (const attr of ['href', 'src', 'action']) {\n      const value = element.getAttribute(attr);\n      if (value && value.startsWith('/') && !value.startsWith(base)) element.setAttribute(attr, base + value);\n    }\n  });`);
  source = source.replace("history.replaceState({}, '', url);", "history.replaceState({}, '', url.startsWith(base) ? url : base + url);");
  fs.writeFileSync(filename, source);
}

const html = path.resolve('_site/index.html');
let index = fs.readFileSync(html, 'utf8');
index = index.replaceAll('href="/src/', 'href="./src/').replaceAll('src="/src/', 'src="./src/');
fs.writeFileSync(html, index);
