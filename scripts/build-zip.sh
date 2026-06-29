#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist"
PKG="$DIST/twitch-anxiety-mod.zip"

mkdir -p "$DIST"
rm -f "$PKG"

cd "$ROOT"
python3 - <<'PY'
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

root = Path.cwd()
package = root / "dist" / "twitch-anxiety-mod.zip"
files = [
    "manifest.json",
    "content.js",
    "popup.html",
    "popup.css",
    "popup.js",
    "README.md",
    "PRIVACY.md",
]

with ZipFile(package, "w", ZIP_DEFLATED) as archive:
    for rel in files:
        archive.write(root / rel, rel)
    for icon in sorted((root / "store-assets" / "icons").glob("*")):
        if icon.is_file():
            archive.write(icon, icon.relative_to(root).as_posix())
PY

echo "Built: $PKG"
