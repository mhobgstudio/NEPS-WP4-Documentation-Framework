#!/usr/bin/env bash
set -euo pipefail

echo "=== Building Documentation Site ==="

# Generate OpenAPI spec from code (placeholder)
if [ -f "docs/reference/api/openapi.yaml" ]; then
  echo "[SKIP] OpenAPI generation — wire to your API framework"
fi

# Build MkDocs site
mkdocs build --clean --site-dir site

echo "=== Build complete: site/ ==="
echo "Serve locally with: mkdocs serve"
