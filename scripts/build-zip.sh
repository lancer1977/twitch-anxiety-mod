#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist"
PKG="$DIST/twitch-anxiety-mod.zip"

mkdir -p "$DIST"
rm -f "$PKG"

cd "$ROOT"
zip -r "$PKG" \
  manifest.json content.js popup.html popup.css popup.js README.md PRIVACY.md \
  store-assets/icons \
  -x "*.git*" "dist/*" "store-assets/screenshots/*"

echo "Built: $PKG"
