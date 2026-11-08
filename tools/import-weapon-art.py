"""Importa gli output image_gen: sola conversione e riduzione per il web, alfa preservato.

Uso: python tools/import-weapon-art.py cartella-dei-risultati
I JSON risultati-*.json contengono arena, name, slug, path e prompt.
"""
import json
import sys
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent.parent
records = {}
for source in sorted(Path(sys.argv[1]).glob('risultati-*.json')):
    for entry in json.loads(source.read_text(encoding='utf-8-sig')):
        if entry.get('path') and not entry.get('error'):
            records[(entry['arena'], entry['slug'])] = entry

manifest = []
for (arena, slug), entry in sorted(records.items()):
    if not arena.isalnum() or any(c not in 'abcdefghijklmnopqrstuvwxyz0123456789-' for c in slug):
        raise ValueError('Identificatore non valido')
    dest = root / 'assets' / 'arene' / arena / 'armi' / (slug + '.webp')
    if not dest.exists() or dest.stat().st_mtime < Path(entry['path']).stat().st_mtime:
        with Image.open(entry['path']) as original:
            im = original.convert('RGBA')
            low, high = im.getchannel('A').getextrema()
            if low != 0 or high == 0:
                raise ValueError(f'Trasparenza assente o immagine vuota: {arena}/{slug}')
            # Non si ricrea né si rimuove lo sfondo: si conserva l'alfa generato.
            im.thumbnail((384, 384), Image.Resampling.LANCZOS)
            dest.parent.mkdir(parents=True, exist_ok=True)
            im.save(dest, 'WEBP', quality=86, method=6, exact=True)
    with Image.open(dest) as check:
        if check.mode != 'RGBA' or check.getchannel('A').getextrema()[0] != 0:
            raise ValueError(f'Alfa non preservato: {dest}')
    manifest.append({'arena': arena, 'name': entry['name'], 'key': slug,
                     'file': dest.relative_to(root).as_posix(), 'generator': 'image_gen',
                     'prompt': entry['prompt']})
(root / 'assets' / 'armi-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Importate {len(manifest)} illustrazioni WebP con alfa preservato.')
