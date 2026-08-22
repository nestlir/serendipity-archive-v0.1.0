/* Local image library. Files are fetched and optimized by .github/workflows/image-library.yml. */
const local = (name) => `/images/${name}.webp`;

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