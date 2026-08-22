/* Editorial image references. The proxy requests small WebP variants so the page does not download full-resolution originals. */
const source = (file) => `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`;
const image = (file, width = 1100) => `https://wsrv.nl/?url=${encodeURIComponent(source(file))}&w=${width}&q=72&output=webp&fit=cover`;

export const imageMap = {
  'KŌDŌ': image('Japanese - Incense Burner ("Koro") - Walters 49466.jpg'),
  'TEA BOWL': image('Japanese_-_Tea_Bowl_-_Walters_49233.jpg'),
  'KYŪSU': image('JapaneseTeapot.jpg'),
  'FUSHIMI INARI': image('20181110_Fushimi_Inari_Torii_1.jpg'),
  'SAGANO': image('20181110_Fushimi_Inari_Torii_11.jpg'),
  'KYOTO': image('Kyoto_Fushimi_Inari-taisha_Eingangs-Torii.jpg'),
  'SUWON': image('Suwon_Hwaseong_Fortress.jpg'),
  'WASHI': image('Shiroishi_washi_letter_paper.jpg'),
  'KINTSUGI': image('Kintsugi.jpg'),
  'SEAL SCRIPT': image('Seal_script_calligraphy.jpg')
};

export const gallerySets = {
  'KŌDŌ':[imageMap['KŌDŌ'],image('Japanese - Incense Burner ("Koro") in the Form of the Kirin - Walters 491731 - Three Quarter.jpg'),image('JapaneseIncenseBurner KouroOnTokonoma.jpg')],
  'TEA BOWL':[imageMap['TEA BOWL'],imageMap['KINTSUGI'],imageMap['KYŪSU']],
  'KYŪSU':[imageMap['KYŪSU'],image('Kyusu by i yudai in Ueno, Tokyo.jpg'),image('Household-kyusu-feb5-2015.jpg')],
  'FUSHIMI INARI':[imageMap['FUSHIMI INARI'],imageMap['KYOTO'],imageMap['SAGANO']],
  'KYOTO':[imageMap['KYOTO'],imageMap['FUSHIMI INARI'],imageMap['SAGANO']],
  'WASHI':[imageMap['WASHI'],imageMap['KINTSUGI'],imageMap['TEA BOWL']],
  'KINTSUGI':[imageMap['KINTSUGI'],imageMap['TEA BOWL'],imageMap['WASHI']]
};