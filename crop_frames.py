"""
crop_frames.py
Removes the "Veo" watermark from the bottom ~60px of every webp frame
in src/assets/frame/ and saves them back in-place.

Crop box: (left, upper, right, lower)
  left  = 0
  upper = 0
  right = 1920  (full width)
  lower = 1020  (1080 - 60px cut from bottom)
"""

from pathlib import Path
from PIL import Image

FRAME_DIR = Path(r"c:\Users\Soyeb\Desktop\gemini-port\soyeb-visuals\src\assets\frame")
CROP_BOTTOM = 60   # pixels to remove from the bottom

files = sorted(FRAME_DIR.glob("ezgif-frame-*.webp"))
print(f"Found {len(files)} frames — cropping {CROP_BOTTOM}px from the bottom...")

for i, path in enumerate(files, 1):
    img = Image.open(path)
    w, h = img.size
    cropped = img.crop((0, 0, w, h - CROP_BOTTOM))
    cropped.save(path, "WEBP", quality=90)
    if i % 10 == 0 or i == len(files):
        print(f"  [{i}/{len(files)}] done — new size: {cropped.size}")

print("All frames cropped successfully!")
