/* Curated prototype references. Keep status=review until each asset is downloaded, optimized and rights metadata is verified. */
export const imageMap = {
  'KŌDŌ':'https://commons.wikimedia.org/wiki/Special:Redirect/file/JapaneseIncenseBurner_KouroOnTokonoma.jpg',
  'TEA BOWL':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Japanese_-_Tea_Bowl_-_Walters_49233.jpg',
  'KYŪSU':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Tea_bowl%2C_known_as_Suehiro%2C_studio_of_Chojiro%2C_Raku_ware%2C_Kuroraku_type%2C_Azuchi-Momoyama_to_Edo_period%2C_1500s-1600s_AD%2C_ceramic_-_Tokyo_National_Museum_-_Ueno_Park%2C_Tokyo%2C_Japan_-_DSC08889.jpg',
  'FUSHIMI INARI':'https://commons.wikimedia.org/wiki/Special:Redirect/file/20181110_Fushimi_Inari_Torii_1.jpg',
  'SAGANO':'https://commons.wikimedia.org/wiki/Special:Redirect/file/20181110_Fushimi_Inari_Torii_11.jpg',
  'KYOTO':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Kyoto_Fushimi_Inari-taisha_Eingangs-Torii.jpg',
  'SUWON':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Suwon%2C_Hwaseong_Fortress.jpg',
  'WASHI':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Shiroishi_washi_letter_paper.jpg',
  'KINTSUGI':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Kintugi.jpg',
  'SEAL SCRIPT':'https://commons.wikimedia.org/wiki/Special:Redirect/file/%E6%95%95-seal.svg'
};

export const gallerySets = {
  'TEA BOWL':[imageMap['TEA BOWL'],imageMap['KINTSUGI'],imageMap['KYŪSU']],
  'KINTSUGI':[imageMap['KINTSUGI'],imageMap['TEA BOWL'],imageMap['WASHI']],
  'FUSHIMI INARI':[imageMap['FUSHIMI INARI'],imageMap['KYOTO'],imageMap['SAGANO']],
  'KYOTO':[imageMap['KYOTO'],imageMap['FUSHIMI INARI'],imageMap['SAGANO']],
  'WASHI':[imageMap['WASHI'],imageMap['KINTSUGI'],imageMap['TEA BOWL']],
  'KŌDŌ':[imageMap['KŌDŌ'],imageMap['TEA BOWL'],imageMap['KINTSUGI']]
};
