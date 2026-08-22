/* Local image library. Keep image URLs inside the deployed /src tree so every GitHub Pages route resolves them identically. */
const BASE = '/serendipity-archive-v0.1.0';
const local = (name) => `${BASE}/src/images/${name}.webp`;

export const imageMap = {
  'KŌDŌ': local('kodo'),
  'TEA BOWL': local('tea-bowl'),
  'KYŪSU': local('kyusu'),
  'FUSHIMI INARI': local('fushimi-inari'),
  'SAGANO': local('sagano'),
  'KYOTO': local('kyoto'),
  'SUWON': local('suwon'),
  'WASHI': local('washi'),
  'KINTSUGI': local('kintsugi'),
  'SEAL SCRIPT': local('seal-script')
};

const extra = (name) => local(name);

export const gallerySets = {
  'KŌDŌ':[imageMap['KŌDŌ'],extra('kodo-kirin'),extra('kodo-tokonoma')],
  'TEA BOWL':[imageMap['TEA BOWL'],imageMap['KINTSUGI'],imageMap['KYŪSU']],
  'KYŪSU':[imageMap['KYŪSU'],extra('kyusu-ueno'),extra('kyusu-household')],
  'FUSHIMI INARI':[imageMap['FUSHIMI INARI'],imageMap['KYOTO'],imageMap['SAGANO']],
  'KYOTO':[imageMap['KYOTO'],imageMap['FUSHIMI INARI'],imageMap['SAGANO']],
  'WASHI':[imageMap['WASHI'],imageMap['KINTSUGI'],imageMap['TEA BOWL']],
  'KINTSUGI':[imageMap['KINTSUGI'],imageMap['TEA BOWL'],imageMap['WASHI']]
};
