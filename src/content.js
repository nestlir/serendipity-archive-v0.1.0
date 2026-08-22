export const image = '/images/reference-hero.png';

export const categories = ['ALL', 'OBJECTS', 'PLACES', 'CRAFT', 'ART', 'PEOPLE', 'IDEAS'];

export const entries = [
  { id:'kodo', type:'OBJECTS', title:'KŌDŌ', jp:'香道', desc:'The ritual of incense listening.', place:'KYOTO, JAPAN', date:'07.08.2026', tags:['ritual','incense','sensory'], related:['fushimi-inari','tea-bowl','washi'] },
  { id:'fushimi-inari', type:'PLACES', title:'FUSHIMI INARI', jp:'伏見稲荷', desc:'A mountain path of repeating vermilion gates.', place:'KYOTO, JAPAN', date:'05.08.2026', tags:['shrine','architecture','kyoto'], related:['kyoto','sagano','kodo'] },
  { id:'washi', type:'CRAFT', title:'WASHI', jp:'和紙', desc:'Paper that carries light.', place:'GIFU, JAPAN', date:'01.08.2026', tags:['paper','craft','material'], related:['kodo','tea-bowl'] },
  { id:'tea-bowl', type:'OBJECTS', title:'TEA BOWL', jp:'茶碗', desc:'A handmade object for a quiet moment.', place:'SHIGARAKI, JAPAN', date:'28.07.2026', tags:['tea','ceramics','wabi-sabi'], related:['washi','kodo'] },
  { id:'sagano', type:'PLACES', title:'SAGANO', jp:'嵯峨野', desc:'Where the wind moves softly through bamboo.', place:'KYOTO, JAPAN', date:'21.07.2026', tags:['landscape','bamboo','kyoto'], related:['fushimi-inari','kyoto'] },
  { id:'kyoto', type:'PLACES', title:'KYOTO', jp:'京都', desc:'A city where old forms keep changing shape.', place:'KYOTO, JAPAN', date:'18.07.2026', tags:['city','architecture','culture'], related:['fushimi-inari','sagano','kodo'] },
  { id:'kintsugi', type:'CRAFT', title:'KINTSUGI', jp:'金継ぎ', desc:'Repair made visible instead of hidden.', place:'KYOTO, JAPAN', date:'16.07.2026', tags:['repair','ceramics','wabi-sabi'], related:['tea-bowl','kodo'] },
  { id:'tokoname', type:'OBJECTS', title:'KYŪSU', jp:'急須', desc:'A small teapot shaped by everyday ritual.', place:'TOKONAME, JAPAN', date:'11.07.2026', tags:['tea','ceramics','tokoname'], related:['tea-bowl','washi'] },
  { id:'suwon', type:'PLACES', title:'SUWON', jp:'수원', desc:'A city where walls and daily life overlap.', place:'GYEONGGI, KOREA', date:'04.07.2026', tags:['city','walls','korea'], related:['washi'] },
  { id:'seal-script', type:'ART', title:'SEAL SCRIPT', jp:'篆書', desc:'Writing that behaves like an image.', place:'CHINA', date:'28.06.2026', tags:['calligraphy','type','china'], related:['washi','kintsugi'] },
];

export const stories = [
  { slug:'why-japanese-objects-feel-different', type:'ESSAY', title:'Why Japanese objects feel different', excerpt:'An essay about quiet intention, imperfect materials and the beauty of things made by human hands.', date:'08.08.2026', readTime:12, tags:['Japan','craft','objects'], related:['tea-bowl','washi','kintsugi'], image },
  { slug:'the-art-of-noticing', type:'FIELD NOTE', title:'The art of noticing', excerpt:'A short note about why the smallest material details often carry the strongest memory.', date:'02.08.2026', readTime:4, tags:['observation','material'], related:['kodo','washi'], image },
];

export const getEntry = (id) => entries.find((entry) => entry.id === id);
export const getStory = (slug) => stories.find((story) => story.slug === slug);
export const getRelated = (ids = []) => ids.map(getEntry).filter(Boolean);
export const allTags = [...new Set(entries.flatMap((entry) => entry.tags))].sort();
