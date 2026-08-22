export const assets = {
  referenceHero: {
    assetId: 'prototype-reference-001',
    url: '/images/reference-hero.png',
    alt: 'Temporary reference artwork used during layout development',
    creator: 'USER-PROVIDED REFERENCE',
    source: 'Conversation reference image',
    credit: 'Prototype asset — not for production publication',
    rights: 'UNVERIFIED',
    status: 'temporary',
  },
};

export function assetFor(assetId = 'referenceHero') {
  return assets[assetId] || assets.referenceHero;
}

export function isProductionCleared(asset) {
  return ['cleared', 'owned'].includes(asset?.status) && asset?.rights !== 'UNVERIFIED';
}
