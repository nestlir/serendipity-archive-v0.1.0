/* Prototype editorial image references. Verify final license/credit before publication. */
const commons = (file) => `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`;

export const imageMap = {
  'KŌDŌ': commons('Japanese - Incense Burner ("Koro") - Walters 49466.jpg'),
  'TEA BOWL': commons('Japanese_-_Tea_Bowl_-_Walters_49233.jpg'),
  'KYŪSU': commons('JapaneseTeapot.jpg'),
  'FUSHIMI INARI': commons('20181110_Fushimi_Inari_Torii_1.jpg'),
  'SAGANO': commons('20181110_Fushimi_Inari_Torii_11.jpg'),
  'KYOTO': commons('Kyoto_Fushimi_Inari-taisha_Eingangs-Torii.jpg'),
  'SUWON': commons('Suwon_Hwaseong_Fortress.jpg'),
  'WASHI': commons('Shiroishi_washi_letter_paper.jpg'),
  'KINTSUGI': commons('Kintsugi.jpg'),
  'SEAL SCRIPT': commons('Seal_script_calligraphy.jpg')
};

export const gallerySets = {
  'KŌDŌ':[imageMap['KŌDŌ'],commons('Japanese - Incense Burner ("Koro") in the Form of the Kirin - Walters 491731 - Three Quarter.jpg'),commons('JapaneseIncenseBurner KouroOnTokonoma.jpg')],
  'TEA BOWL':[imageMap['TEA BOWL'],imageMap['KINTSUGI'],imageMap['KYŪSU']],
  'KYŪSU':[imageMap['KYŪSU'],commons('Kyusu by i yudai in Ueno, Tokyo.jpg'),commons('Household-kyusu-feb5-2015.jpg')],
  'FUSHIMI INARI':[imageMap['FUSHIMI INARI'],imageMap['KYOTO'],imageMap['SAGANO']],
  'KYOTO':[imageMap['KYOTO'],imageMap['FUSHIMI INARI'],imageMap['SAGANO']],
  'WASHI':[imageMap['WASHI'],imageMap['KINTSUGI'],imageMap['TEA BOWL']],
  'KINTSUGI':[imageMap['KINTSUGI'],imageMap['TEA BOWL'],imageMap['WASHI']]
};