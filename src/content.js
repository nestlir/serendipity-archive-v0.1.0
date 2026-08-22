const image = '/images/reference-hero.png';

export const entries = [
  {
    id:'kodo', type:'OBJECTS', title:'KŌDŌ', jp:'香道', desc:'The ritual of incense listening.', place:'KYOTO, JAPAN', date:'07.08.2026', tags:['ritual','incense','sensory'], related:['fushimi-inari','tea-bowl','washi']
  },
  {
    id:'fushimi-inari', type:'PLACES', title:'FUSHIMI INARI', jp:'伏見稲荷', desc:'A mountain path of repeating vermilion gates.', place:'KYOTO, JAPAN', date:'05.08.2026', tags:['shrine','architecture','kyoto'], related:['kyoto','sagano','kodo']
  },
  {
    id:'washi', type:'CRAFT', title:'WASHI', jp:'和紙', desc:'Paper that carries light.', place:'GIFU, JAPAN', date:'01.08.2026', tags:['paper','craft','material'], related:['kodo','tea-bowl']
  },
  {
    id:'tea-bowl', type:'OBJECTS', title:'TEA BOWL', jp:'茶碗', desc:'A handmade object for a quiet moment.', place:'SHIGARAKI, JAPAN', date:'28.07.2026', tags:['tea','ceramics','wabi-sabi'], related:['washi','kodo']
  },
  {
    id:'sagano', type:'PLACES', title:'SAGANO', jp:'嵯峨野', desc:'Where the wind moves softly through bamboo.', place:'KYOTO, JAPAN', date:'21.07.2026', tags:['landscape','bamboo','kyoto'], related:['fushimi-inari','kyoto']
  },
  {
    id:'kyoto', type:'PLACES', title:'KYOTO', jp:'京都', desc:'A city where old forms keep changing shape.', place:'KYOTO, JAPAN', date:'18.07.2026', tags:['city','architecture','culture'], related:['fushimi-inari','sagano','kodo']
  }
];

export const categories = ['ALL','OBJECTS','PLACES','CRAFT','ART','PEOPLE','IDEAS'];
export { image };
