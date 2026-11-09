"""Importa gli asset del look generati con Midjourney (vedi docs-dev/look-persona.md e docs-dev/prompt-midjourney.md).

Uso: python -I tools/import-fx.py cartella-con-le-immagini [--dry-run]

Il nome del file decide il trattamento (estensioni .png, .jpg, .jpeg, .webp):
  forma-<nome>, impatto      -> maschera ritagliata: nero su carta diventa bianco su trasparente
  mezzitoni                  -> maschera intera (non si ritaglia: è una trama)
  vincitore-<g>-<n>          -> figura su fondo chiaro: il fondo collegato ai bordi diventa trasparente
  volto-<g>-<n>              -> ritratto in scala di grigi; con la posizione degli occhi in
                                assets/fx/volti.json se ne ricava anche occhi-<g>-<n> (fascia 5:1)
  fondale-<arena>            -> fondale a colori, solo ridotto
<g> è il genere grammaticale del concorrente a cui si abbina: m, f oppure n.
Le destinazioni sono assets/fx/ (maschere, fondali, volti, occhi) e assets/vincitori/.
"""
import json
import re
import sys
from pathlib import Path
from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parent.parent
FX = ROOT / 'assets' / 'fx'
ARENE = {'classico', 'fantasy', 'scifi', 'zombie', 'royale', 'horror', 'wasteland', 'liceo', 'ufficio', 'cyberpunk'}
SLUG = re.compile(r'^[a-z0-9]+(?:-[a-z0-9]+)*$')

# (regola, trattamento, cartella, lato lungo massimo, qualità)
RULES = [
    (re.compile(r'^(forma-[a-z0-9-]+|impatto)$'), 'mask', 'fx', 1000, 70),
    (re.compile(r'^mezzitoni$'), 'tile', 'fx', 768, 70),
    (re.compile(r'^vincitore-[mfn]-\d+$'), 'cutout', 'vincitori', 1344, 84),
    (re.compile(r'^volto-[mfn]-\d+$'), 'gray', 'fx', 900, 82),
    (re.compile(r'^fondale-([a-z]+)$'), 'color', 'fx', 1600, 78),
]


def fit(im, side):
    im = im.copy()
    im.thumbnail((side, side), Image.Resampling.LANCZOS)
    return im


def ink_alpha(im):
    """Inchiostro come alfa, con i livelli presi dall'immagine: la carta crema diventa trasparente."""
    g = ImageOps.grayscale(im)
    hist = g.histogram()
    total, acc, paper, ink = sum(hist), 0, 255, 0
    for v in range(256):  # 3° percentile = inchiostro, carta = moda della metà chiara
        acc += hist[v]
        if acc >= total * 0.03:
            ink = v
            break
    paper = max(range(128, 256), key=lambda v: hist[v])
    lo, hi = ink + (paper - ink) * 0.18, paper - (paper - ink) * 0.12  # sotto lo pieno, sopra hi trasparente
    return g.point(lambda v: 255 if v <= lo else 0 if v >= hi else round((hi - v) * 255 / (hi - lo)))


def to_mask(im, crop=True):
    a = ink_alpha(im)
    if crop:
        box = a.point(lambda v: 255 if v > 140 else 0).filter(ImageFilter.MedianFilter(5)).getbbox()
        if box:
            m = round(max(im.size) * 0.015)
            box = (max(0, box[0] - m), max(0, box[1] - m), min(a.size[0], box[2] + m), min(a.size[1], box[3] + m))
            a = a.crop(box)
    out = Image.new('RGBA', a.size, (255, 255, 255, 0))
    out.putalpha(a)
    return out


def to_cutout(im, tol=26):
    """Rende trasparente il fondo chiaro collegato ai bordi (non i chiari dentro la figura)."""
    rgb = im.convert('RGB')
    w, h = rgb.size
    border = [rgb.getpixel((x, y)) for x in range(0, w, 8) for y in (0, h - 1)] + [rgb.getpixel((x, y)) for y in range(0, h, 8) for x in (0, w - 1)]
    light = sorted((p for p in border if sum(p) > 600), key=sum)
    bg = light[len(light) // 2] if light else (255, 255, 255)
    diff = ImageChops.difference(rgb, Image.new('RGB', rgb.size, bg)).convert('L')
    near = diff.point(lambda v: 255 if v <= tol else 0)
    seed = near.copy()
    pts = [(x, y) for x in range(0, w, 16) for y in (0, h - 1)] + [(x, y) for y in range(0, h, 16) for x in (0, w - 1)]
    for p in pts:
        if seed.getpixel(p) == 255:
            ImageDraw.floodfill(seed, p, 128)
    bg_mask = seed.point(lambda v: 255 if v == 128 else 0).filter(ImageFilter.MinFilter(3))
    alpha = ImageOps.invert(bg_mask).filter(ImageFilter.GaussianBlur(0.9))
    out = rgb.convert('RGBA')
    out.putalpha(alpha)
    return out.crop(out.getchannel('A').point(lambda v: 255 if v > 16 else 0).getbbox() or (0, 0, w, h))


def eyes_strip(im, y, ratio=5.0):
    """Fascia sugli occhi: tutta la larghezza, alta larghezza/ratio, centrata alla quota y (frazione dell'altezza)."""
    w, h = im.size
    sh = round(w / ratio)
    top = min(max(0, round(h * y - sh / 2)), h - sh)
    return im.crop((0, top, w, top + sh))


def main(argv):
    if not argv or argv[0].startswith('-'):
        print(__doc__)
        return 2
    src, dry = Path(argv[0]), '--dry-run' in argv
    volti = json.loads((FX / 'volti.json').read_text(encoding='utf-8')) if (FX / 'volti.json').exists() else {}
    done, skipped = [], []

    def save(img, dest, q, exact):
        if not dry:
            dest.parent.mkdir(parents=True, exist_ok=True)
            img.save(dest, 'WEBP', quality=q, method=6, exact=exact)
        done.append(f'{dest.relative_to(ROOT).as_posix()} [{img.size[0]}x{img.size[1]}]')

    for f in sorted(src.iterdir()):
        if f.suffix.lower() not in {'.png', '.jpg', '.jpeg', '.webp'}:
            continue
        stem = f.stem.lower()
        rule = next(((r, kind, folder, side, q) for r, kind, folder, side, q in RULES if r.match(stem)), None)
        if not rule or not SLUG.match(stem):
            skipped.append(f.name + ' (nome non riconosciuto)')
            continue
        r, kind, folder, side, q = rule
        if stem.startswith('fondale-') and r.match(stem).group(1) not in ARENE:
            skipped.append(f.name + ' (arena sconosciuta)')
            continue
        with Image.open(f) as original:
            full = original.convert('RGB')
        if kind == 'mask':
            out = fit(to_mask(full), side)
        elif kind == 'tile':
            out = fit(to_mask(full, crop=False), side)
        elif kind == 'cutout':
            out = fit(to_cutout(full), side)
        elif kind == 'gray':
            out = fit(ImageOps.autocontrast(ImageOps.grayscale(full), cutoff=0.5), side)
        else:
            out = fit(full, side)
        if out.mode == 'RGBA':
            lo, hi = out.getchannel('A').getextrema()
            if hi == 0 or lo == 255:
                skipped.append(f.name + ' (maschera vuota o piena: controlla lo sfondo)')
                continue
        save(out, ROOT / 'assets' / folder / (stem + '.webp'), q, out.mode == 'RGBA')
        if kind == 'gray' and stem in volti:
            strip = eyes_strip(fit(ImageOps.autocontrast(ImageOps.grayscale(full), cutoff=0.5), 1200), volti[stem]['occhi'])
            save(strip, FX / (stem.replace('volto-', 'occhi-') + '.webp'), 82, False)
    print('\n'.join(done) or 'Nessuna immagine importata.')
    if skipped:
        print('\nSaltate:\n  ' + '\n  '.join(skipped))
    print(f'\n{len(done)} file scritti{" (prova, nessun file scritto)" if dry else ""}. Poi: ASSETS.md e node tools/build.js.')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
