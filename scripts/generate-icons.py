#!/usr/bin/env python3
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    raise SystemExit("Pillow not installed. Run: python3 -m pip install --user pillow")

root = Path(__file__).resolve().parent.parent
out = root / "store-assets" / "icons"
out.mkdir(parents=True, exist_ok=True)

sizes = [16, 48, 128]
for s in sizes:
    img = Image.new("RGBA", (s, s), (20, 20, 28, 255))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((1, 1, s-2, s-2), radius=max(2, s//6), outline=(145, 70, 255, 255), width=max(1, s//24))
    # eye slash motif
    d.ellipse((s*0.22, s*0.28, s*0.78, s*0.72), outline=(245,245,255,255), width=max(1, s//18))
    d.line((s*0.25, s*0.72, s*0.75, s*0.28), fill=(255,90,90,255), width=max(1, s//12))
    img.save(out / f"icon-{s}.png")

print("Generated icons in", out)
