# Image Direction — V1

The site should never use one generic image for the entire archive. Image choice is part of the editorial meaning.

## Visual rule

Use a mixture of object studies on quiet backgrounds, architectural/landscape photographs, close material details, museum/documentary images, and archival diagrams or writing when the subject is an idea.

Keep the treatment consistent: slightly desaturated, warm paper integration, restrained contrast, and occasional vermilion/ochre accents. Do not force every image into the same crop.

## Current prototype references

`src/image-map.js` contains external Wikimedia Commons references selected to give the prototype semantic variety. They are **review** assets, not production-cleared assets.

Examples:

- Kōdō → Japanese incense burner / kōro.
- Tea Bowl → Japanese tea bowl from the Walters collection.
- Fushimi Inari → Kyoto torii photographs.
- Washi → traditional Japanese washi paper.
- Kintsugi → repaired ceramic.
- Suwon → Hwaseong Fortress.
- Seal Script → public-domain ancient seal-script SVG.

## Production process

Before publication, download approved source files into `public/images/`, optimize them, assign stable asset IDs, and record creator/source/license/credit in the provenance data. Do not rely on third-party hotlinks for the production archive.

The selected references include Creative Commons and public-domain works with different terms, so each file must retain its individual attribution/license record. No single license should be inferred for the entire image set.
