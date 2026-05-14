#!/usr/bin/env bash
set -euo pipefail

echo "=== NEPS WP4 Documentation Framework — Build ==="

# 1. MkDocs build (existing documentation pages)
if command -v mkdocs &>/dev/null; then
  echo "[1/3] Building MkDocs site..."
  mkdocs build --clean --site-dir site 2>/dev/null && echo "  -> site/ built" || echo "  -> mkdocs not configured, skipping"
else
  echo "[1/3] Skipping MkDocs (not installed)"
fi

# 2. Verify PWA assets
echo "[2/3] Verifying PWA assets..."
for f in index.html app.css app.js manifest.json sw.js; do
  [ -f "$f" ] && echo "  ✓ $f" || echo "  ✗ MISSING: $f"
done

# 3. Copy to deploy directory
echo "[3/3] Preparing deploy..."
mkdir -p dist
for f in index.html app.css app.js manifest.json sw.js; do
  [ -f "$f" ] && cp "$f" dist/
done
cp -r docs adr model-cards datasheets quality fair4rs onboarding audit .github 2>/dev/null || true

echo ""
echo "=== Build complete ==="
echo "Open index.html in a browser or deploy dist/ to any static host."
echo ""
echo "Deploy targets:"
echo "  Web      → GitHub Pages, Netlify, Vercel, any static server"
echo "  Android  → PWA: Chrome 'Add to Home Screen'"
echo "  iOS      → PWA: Safari 'Share > Add to Home Screen'"
echo "  Native   → cd . && npx cap copy && npx cap open android/ios"
