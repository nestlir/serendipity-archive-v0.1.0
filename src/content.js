export const image = '/images/reference-hero.png';

export const categories = ['ALL', 'OBJECTS', 'PLACES', 'CRAFT', 'ART', 'PEOPLE', 'IDEAS'];

export const entities = {
  OBJECTS: [
    { id:'kodo', type:'OBJECTS', title:'KŌDŌ', jp:'香道', desc:'The ritual of incense listening.', place:'KYOTO, JAPAN', date:'07.08.2026', tags:['ritual','incense','sensory'], era:'Contemporary archive entry', material:'Aromatic wood / ritual vessel', maker:'Archive field record', story:'Kōdō treats fragrance as something to notice rather than consume: a layered ritual of scent, memory, etiquette and quiet attention.', related:['fushimi-inari','tea-bowl','washi'], rights:'Prototype text; imagery pending rights clearance.' },
    { id:'tea-bowl', type:'OBJECTS', title:'TEA BOWL', jp:'茶碗', desc:'A handmade object for a quiet moment.', place:'SHIGARAKI, JAPAN', date:'28.07.2026', tags:['tea','ceramics','wabi-sabi'], era:'Contemporary archive entry', material:'Stoneware / clay', maker:'Archive field record', story:'A tea bowl can make asymmetry feel intentional: the hand, the kiln and the clay all remain visible in the finished form.', related:['washi','kintsugi','kodo'], rights:'Prototype text; imagery pending rights clearance.' },
    { id:'tokoname', type:'OBJECTS', title:'KYŪSU', jp:'急須', desc:'A small teapot shaped by everyday ritual.', place:'TOKONAME, JAPAN', date:'11.07.2026', tags:['tea','ceramics','tokoname'], era:'Contemporary archive entry', material:'Clay / fired ceramic', maker:'Archive field record', story:'The kyūsu is small enough to disappear into a daily routine, yet its handle, pour and balance encode the gestures of tea.', related:['tea-bowl','washi'], rights:'Prototype text; imagery pending rights clearance.' },
  ],
  PLACES: [
    { id:'fushimi-inari', type:'PLACES', title:'FUSHIMI INARI', jp:'伏見稲荷', desc:'A mountain path of repeating vermilion gates.', place:'KYOTO, JAPAN', date:'05.08.2026', tags:['shrine','architecture','kyoto'], era:'Living cultural site', material:'Wood / stone / pigment', maker:'Place archive', story:'The shrine route turns repetition into atmosphere: each gate marks a gift, a name, a memory and another step upward.', related:['kyoto','sagano','kodo'], rights:'Prototype text; imagery pending rights clearance.' },
    { id:'sagano', type:'PLACES', title:'SAGANO', jp:'嵯峨野', desc:'Where the wind moves softly through bamboo.', place:'KYOTO, JAPAN', date:'21.07.2026', tags:['landscape','bamboo','kyoto'], era:'Living cultural landscape', material:'Bamboo / wood / landscape', maker:'Place archive', story:'Sagano is less about a single landmark than the changing rhythm of pathways, bamboo, sound and small domestic views.', related:['fushimi-inari','kyoto'], rights:'Prototype text; imagery pending rights clearance.' },
    { id:'kyoto', type:'PLACES', title:'KYOTO', jp:'京都', desc:'A city where old forms keep changing shape.', place:'KYOTO, JAPAN', date:'18.07.2026', tags:['city','architecture','culture'], era:'Living cultural city', material:'Mixed urban fabric', maker:'Place archive', story:'Kyoto becomes most interesting where ritual, commerce, craft and ordinary contemporary life overlap instead of staying in separate historical layers.', related:['fushimi-inari','sagano','kodo'], rights:'Prototype text; imagery pending rights clearance.' },
    { id:'suwon', type:'PLACES', title:'SUWON', jp:'수원', desc:'A city where walls and daily life overlap.', place:'GYEONGGI, KOREA', date:'04.07.2026', tags:['city','walls','korea'], era:'Living cultural city', material:'Stone / timber / urban fabric', maker:'Place archive', story:'Suwon shows how monumental defensive architecture can remain part of everyday movement rather than becoming a detached relic.', related:['washi','kyoto'], rights:'Prototype text; imagery pending rights clearance.' },
  ],
  CRAFT: [
    { id:'washi', type:'CRAFT', title:'WASHI', jp:'和紙', desc:'Paper that carries light.', place:'GIFU, JAPAN', date:'01.08.2026', tags:['paper','craft','material'], era:'Living craft tradition', material:'Paper fiber', maker:'Craft archive', story:'Handmade washi is valued for what it reveals through thinness: fibers, shadows and a surface that changes with the room around it.', related:['kodo','tea-bowl','seal-script'], rights:'Prototype text; imagery pending rights clearance.' },
    { id:'kintsugi', type:'CRAFT', title:'KINTSUGI', jp:'金継ぎ', desc:'Repair made visible instead of hidden.', place:'KYOTO, JAPAN', date:'16.07.2026', tags:['repair','ceramics','wabi-sabi'], era:'Living repair practice', material:'Urushi / metal powder / ceramic', maker:'Craft archive', story:'Kintsugi turns repair into part of an object’s visible history rather than an imperfection to conceal.', related:['tea-bowl','kodo','washi'], rights:'Prototype text; imagery pending rights clearance.' },
  ],
  ART: [
    { id:'seal-script', type:'ART', title:'SEAL SCRIPT', jp:'篆書', desc:'Writing that behaves like an image.', place:'CHINA', date:'28.06.2026', tags:['calligraphy','type','china'], era:'Historical visual tradition', material:'Ink / paper / seal', maker:'Art archive', story:'Seal script sits between language and image, where stroke, proportion and rhythm can make writing feel architectural.', related:['washi','kintsugi'], rights:'Prototype text; imagery pending rights clearance.' },
  ],
  PEOPLE: [],
  IDEAS: [],
};

export const entries = Object.values(entities).flat();

export const stories = [
  {
    slug:'why-japanese-objects-feel-different', type:'ESSAY', title:'Why Japanese objects feel different', excerpt:'An essay about quiet intention, imperfect materials and the beauty of things made by human hands.', date:'08.08.2026', readTime:12,
    tags:['Japan','craft','objects'], related:['tea-bowl','washi','kintsugi'], image,
    dek:'Why ordinary objects can carry extraordinary attention.',
    body:[
      'There are objects that ask to be looked at, and objects that teach you how to look. Japanese craft often becomes memorable through the second category.',
      'A tea bowl, a sheet of paper, a wooden tray or a small incense vessel does not need visual perfection to feel resolved. Surface, proportion and the evidence of making carry the story.',
      'The interesting detail is usually one you notice after the first impression: a thumb mark, a repair, a slight asymmetry, the way an edge catches light.'
    ],
    pullQuote:'The most interesting detail is often the one you notice second.',
    sources:['Prototype editorial draft — replace with verified sources before publication.']
  },
  {
    slug:'the-art-of-noticing', type:'FIELD NOTE', title:'The art of noticing', excerpt:'A short note about why the smallest material details often carry the strongest memory.', date:'02.08.2026', readTime:4,
    tags:['observation','material'], related:['kodo','washi'], image,
    dek:'A small field note on slowing down enough to see.',
    body:[
      'Noticing starts with slowing down enough to see a material change.',
      'The edge of a paper screen, the shadow under a roof, the rhythm of a repeated mark: small details often tell us where a place came from and what people cared to preserve.'
    ],
    pullQuote:'Look again after the first impression.',
    sources:['Prototype editorial draft — replace with verified sources before publication.']
  }
];

export const getEntry = (id) => entries.find((entry) => entry.id === id);
export const getStory = (slug) => stories.find((story) => story.slug === slug);
export const getRelated = (ids = []) => ids.map(getEntry).filter(Boolean);
export const allTags = [...new Set(entries.flatMap((entry) => entry.tags))].sort();