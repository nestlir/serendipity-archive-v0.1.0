from pathlib import Path
from io import BytesIO
import requests
from PIL import Image, ImageOps
from urllib.parse import quote

OUT = Path('public/images')
OUT.mkdir(parents=True, exist_ok=True)

# Wikimedia Commons files with permissive/public-domain or CC licensing.
# Images are downloaded once, resized, and stored locally as WebP.
SOURCES = {
    'kodo': 'Japanese - Incense Burner ("Koro") - Walters 49466.jpg',
    'kodo-kirin': 'Japanese - Incense Burner ("Koro") in the Form of the Kirin - Walters 491731 - Three Quarter.jpg',
    'kodo-tokonoma': 'JapaneseIncenseBurner KouroOnTokonoma.jpg',
    'tea-bowl': 'Japanese - Tea Bowl - Walters 49233.jpg',
    'kyusu': 'JapaneseTeapot.jpg',
    'kyusu-ueno': 'Kyusu by i yudai in Ueno, Tokyo.jpg',
    'kyusu-household': 'Household-kyusu-feb5-2015.jpg',
    'fushimi-inari': '20181110 Fushimi Inari Torii 1.jpg',
    'sagano': '20181110 Fushimi Inari Torii 11.jpg',
    'kyoto': 'Kyoto Fushimi Inari-taisha Eingangs-Torii.jpg',
    'suwon': 'Suwon, Hwaseong Fortress.jpg',
    'washi': 'Shiroishi washi letter paper.jpg',
    'kintsugi': 'Kintsugi.jpg',
    'seal-script': 'Xiao Zhuan.jpg',
}

HEADERS = {'User-Agent': 'SerendipityArchive/1.0 image-library builder'}

for name, filename in SOURCES.items():
    target = OUT / f'{name}.webp'
    if target.exists() and target.stat().st_size > 1000:
        continue

    url = 'https://commons.wikimedia.org/wiki/Special:FilePath/' + quote(filename, safe='') + '?width=1800'
    response = requests.get(url, headers=HEADERS, timeout=60, allow_redirects=True)
    response.raise_for_status()
    image = Image.open(BytesIO(response.content)).convert('RGB')
    image = ImageOps.exif_transpose(image)
    image.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
    image.save(target, 'WEBP', quality=78, method=6)
    print(f'{name}: {target.stat().st_size // 1024} KB')
