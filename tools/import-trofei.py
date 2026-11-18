"""Importa le immagini dei trofei generate con Midjourney (prompt in docs-dev/prompt-trofei.md).

Uso: python -I tools/import-trofei.py cartella-con-le-immagini

Ogni file si chiama trofeo-<id>.png (o .jpg/.webp), con <id> uguale a quello in src/bacheca.js (es. trofeo-maestro.png).
Il fondo verde pieno diventa trasparente, il disegno resta bianco e nero; si ritaglia, si centra in un quadrato
e si salva in assets/fx/trofeo-<id>.webp (384×384). La coppa generica è trofeo-coppa.
"""
import re
import sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'assets' / 'fx'
NAME = re.compile(r'^trofeo-([a-zA-Z0-9-]+)$')
SIDE = 384


def key_out(path):
    im = Image.open(path).convert('RGB')
    im.thumbnail((640, 640), Image.Resampling.LANCZOS)
    w, h = im.size
    src = im.load()
    # il colore del fondo si legge dagli angoli (mediana), così il verde pieno sparisce del tutto
    corners = [src[x, y] for x in (2, w // 2, w - 3) for y in (2, h - 3)] + [src[2, h // 2], src[w - 3, h // 2]]
    bg = tuple(sorted(c[i] for c in corners)[len(corners) // 2] for i in range(3))
    out = Image.new('RGBA', (w, h))
    dst = out.load()
    for y in range(h):
        for x in range(w):
            r, g, b = src[x, y]
            d = ((r - bg[0]) ** 2 + (g - bg[1]) ** 2 + (b - bg[2]) ** 2) ** 0.5
            a = 0 if d < 70 else 255 if d > 150 else int(255 * (d - 70) / 80)
            v = 255 if (0.299 * r + 0.587 * g + 0.114 * b) > 140 else 0
            dst[x, y] = (v, v, v, a)
    box = out.getbbox()
    if box:
        out = out.crop(box)
    side = max(out.size)
    sq = Image.new('RGBA', (side, side), (0, 0, 0, 0))
    sq.paste(out, ((side - out.size[0]) // 2, (side - out.size[1]) // 2))
    return sq.resize((SIDE, SIDE), Image.Resampling.LANCZOS)


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    folder = Path(sys.argv[1])
    done = 0
    for f in sorted(folder.iterdir()):
        if f.suffix.lower() not in ('.png', '.jpg', '.jpeg', '.webp'):
            continue
        m = NAME.match(f.stem)
        if not m:
            print('saltato (nome non valido):', f.name)
            continue
        dest = OUT / ('trofeo-' + m.group(1).lower() + '.webp')
        key_out(f).save(dest, 'WEBP', quality=86, method=6)
        print('ok', dest.relative_to(ROOT))
        done += 1
    print(done, 'immagini importate')


if __name__ == '__main__':
    main()
