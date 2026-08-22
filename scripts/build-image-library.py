from pathlib import Path
from io import BytesIO
import time
import requests
from PIL import Image, ImageOps
from urllib.parse import quote

OUT = Path('public/images')
OUT.mkdir(parents=True, exist_ok=True)

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

HEADERS = {
    'User-Agent': 'SerendipityArchive/1.1 (+https://github.com/nestlir/serendipity-archive-v0.1.0)'
}
SESSION = requests.Session()
SESSION.headers.update(HEADERS)


def download(url, attempts=6):
    last_error = None
    for attempt in range(attempts):
        try:
            response = SESSION.get(url, timeout=60, allow_redirects=True)
            if response.status_code == 429:
                retry_after = response.headers.get('Retry-After')
                try:
                    delay = max(5, min(120, int(retry_after))) if retry_after else min(120, 8 * (2 ** attempt))
                except ValueError:
                    delay = min(120, 8 * (2 ** attempt))
                print(f'429 rate limit; waiting {delay}s before retry {attempt + 1}/{attempts}...', flush=True)
                time.sleep(delay)
                continue
            response.raise_for_status()
            return response.content
        except requests.RequestException as exc:
            last_error = exc
            delay = min(60, 5 * (attempt + 1))
            print(f'download failed ({exc}); waiting {delay}s...', flush=True)
            time.sleep(delay)
    raise last_error or RuntimeError('download failed')


for name, filename in SOURCES.items():
    target = OUT / f'{name}.webp'
    if target.exists() and target.stat().st_size > 1000:
        print(f'{name}: already present ({target.stat().st_size // 1024} KB)', flush=True)
        continue

    url = 'https://commons.wikimedia.org/wiki/Special:FilePath/' + quote(filename, safe='') + '?width=1800'
    try:
        data = download(url)
        image = Image.open(BytesIO(data)).convert('RGB')
        image = ImageOps.exif_transpose(image)
        image.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
        image.save(target, 'WEBP', quality=78, method=6)
        print(f'{name}: {target.stat().st_size // 1024} KB', flush=True)
    except Exception as exc:
        print(f'WARNING: {name} could not be downloaded: {exc}', flush=True)
        continue
