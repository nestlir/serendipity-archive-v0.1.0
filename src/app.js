const entries = [
  ['001','OBJECTS','KŌDŌ','香道','The ritual of incense listening.','KYOTO, JAPAN','07.08.2026'],
  ['002','PLACES','FUSHIMI INARI','伏見稲荷','Where the mountain breathes.','KYOTO, JAPAN','05.08.2026'],
  ['003','CRAFT','WASHI','和紙','Paper that carries light.','GIFU, JAPAN','01.08.2026'],
  ['004','OBJECTS','TEA BOWL','茶碗','Handmade for a quiet moment.','SHIGARAKI, JAPAN','28.07.2026'],
  ['005','PLACES','SAGANO','嵯峨野','Where the wind moves softly.','KYOTO, JAPAN','21.07.2026']
];
const categories=['ALL','OBJECTS','PLACES','CRAFT','ART','PEOPLE','IDEAS'];
let active='ALL', query='', saved=new Set();
const img='/images/reference-hero.png';
const app=document.querySelector('#app');

function card(e,i){return `<article class="archive-item item-${i%3}" id="entry-${e[0]}"><div class="entry-meta"><span>${e[0]}</span><span class="red">${e[1]}</span></div><div class="entry-image"><img src="${img}" alt=""><button class="save" data-save="${e[0]}">${saved.has(e[0])?'♥':'♡'}</button></div><div class="entry-copy"><h3>${e[2]}</h3><span class="jp">${e[3]}</span><p>${e[4]}</p><small>${e[5]} · ${e[6]}</small></div></article>`}
function render(){
 const filtered=entries.filter(e=>{const text=e.join(' ').toLowerCase();return (active==='ALL'||e[1]===active)&&(!query||text.includes(query.toLowerCase()))});
 app.innerHTML=`
 <main class="site-shell">
  <header class="header"><a class="monogram" href="#top">S.</a><nav class="nav"><a href="#archive">ARCHIVE</a><a href="#journal">JOURNAL</a><a href="#collection">COLLECTION</a><a href="#about">ABOUT</a></nav><button class="search-trigger" id="searchBtn">SEARCH <span class="search-dot"></span></button></header>
  <section class="search-panel" id="searchPanel" hidden><label for="search">WHAT ARE YOU LOOKING FOR?</label><div class="search-row"><input id="search" placeholder="kintsugi, Kyoto, tea..." value="${query.replace(/"/g,'&quot;')}"><button id="closeSearch">CLOSE</button></div><p>Try: <button data-query="KŌDŌ">KŌDŌ</button> <button data-query="KYOTO">KYOTO</button> <button data-query="CRAFT">CRAFT</button></p></section>
  <section class="hero" id="top"><div class="hero-copy"><div class="eyebrow"><span>01</span> / SERENDIPITY</div><h1>THE ART<br><em>OF</em> NOTICING</h1><p class="hero-lead">Things worth finding.</p><p class="hero-description">A visual archive of objects, places and ideas from East Asia and beyond.</p><a class="text-link" href="#archive">EXPLORE ARCHIVE <span>→</span></a></div><div class="hero-art"><img src="${img}" alt="Traditional East Asian architectural illustration with lantern and figures"><div class="hero-location"><span>TOKYO, JAPAN</span><span>35.6762° N · 139.6503° E</span></div></div><div class="vertical-note">SCROLL TO DISCOVER</div><div class="seal">発<br>見</div></section>
  <section class="archive" id="archive"><div class="section-intro"><div><h2>THE ARCHIVE</h2><p>A collection of things that deserved a second look.</p></div><button class="discover-button" id="discover">I'M FEELING CURIOUS <span>✦</span></button></div><div class="archive-toolbar"><div class="categories">${categories.map(c=>`<button class="${active===c?'active':''}" data-cat="${c}">${c}</button>`).join('')}</div><span class="result-count">${String(filtered.length).padStart(2,'0')} FOUND</span></div><div class="archive-grid">${filtered.map(card).join('')}</div>${filtered.length?'':'<div class="empty">NO FINDINGS. TRY ANOTHER TRACE.</div>'}</section>
  <section class="featured" id="journal"><div class="featured-index">01<br><span>ESSAY</span></div><div class="featured-image"><img src="${img}" alt=""></div><div class="featured-copy"><span class="eyebrow">FEATURED STORY</span><h2>Why Japanese<br>objects feel<br><em>different</em></h2><p>An essay about quiet intention, imperfect materials and the beauty of things made by human hands.</p><div class="story-meta">12 MIN READ · JAPAN · CRAFT</div><button class="text-link">READ STORY <span>→</span></button></div></section>
  <section class="discover-section"><div><span class="eyebrow">SERENDIPITY / 037</span><h2>YOU WEREN'T<br><em>LOOKING</em><br>FOR THIS.</h2></div><button class="discover-large" id="discover2">DISCOVER SOMETHING <span>→</span></button></section>
  <section class="about" id="about"><div class="about-label">ABOUT</div><div><h2>WE LOOK<br><em>CLOSER.</em></h2><p>There are things we pass every day without noticing: a pattern on a door, the shape of a bowl, a smell carried through an old street, a craft that survived because someone cared enough to continue it.</p><p>Serendipity is an archive of those moments.</p></div></section>
  <section class="collection" id="collection"><div><span class="eyebrow">YOUR COLLECTION</span><h2>${String(saved.size).padStart(2,'0')} <em>SAVED</em></h2></div><p>Save a detail, return later, and build your own trail through the archive.</p></section>
  <footer class="footer"><div class="footer-title">SERENDIPITY</div><div class="footer-manifesto">A DIGITAL ARCHIVE<br>OF THINGS WORTH FINDING.</div><div class="footer-links"><a href="#archive">ARCHIVE</a><a href="#journal">JOURNAL</a><a href="#collection">COLLECTION</a><a href="#about">ABOUT</a></div><div class="footer-meta">TOKYO · KYOTO · SHANGHAI · SEOUL<br>© 2026 SERENDIPITY</div></footer>
 </main>`;
 bind();
}
function bind(){
 document.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{active=b.dataset.cat;render();document.querySelector('#archive').scrollIntoView({behavior:'smooth'})});
 document.querySelectorAll('[data-save]').forEach(b=>b.onclick=()=>{const id=b.dataset.save;saved.has(id)?saved.delete(id):saved.add(id);render()});
 const searchBtn=document.querySelector('#searchBtn'), panel=document.querySelector('#searchPanel');
 searchBtn.onclick=()=>{panel.hidden=!panel.hidden;if(!panel.hidden)document.querySelector('#search').focus()};
 document.querySelector('#closeSearch').onclick=()=>{panel.hidden=true};
 const input=document.querySelector('#search');input.oninput=e=>{query=e.target.value;render();document.querySelector('#searchPanel').hidden=false;document.querySelector('#search').focus()};
 document.querySelectorAll('[data-query]').forEach(b=>b.onclick=()=>{query=b.dataset.query;render();document.querySelector('#searchPanel').hidden=false;document.querySelector('#search').focus()});
 const discover=()=>{const e=entries[Math.floor(Math.random()*entries.length)];document.querySelector('#entry-'+e[0])?.scrollIntoView({behavior:'smooth',block:'center'})};
 document.querySelector('#discover').onclick=discover;document.querySelector('#discover2').onclick=discover;
}
render();
