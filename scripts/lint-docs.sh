#!/usr/bin/env bash
set -euo pipefail

echo "=== Markdown Lint ==="
markdownlint docs/ adr/ model-cards/ datasheets/ quality/ onboarding/

echo "=== Prose Lint (Vale) ==="
vale docs/ adr/ model-cards/ datasheets/

echo "=== Link Check ==="
find docs/ -name '*.md' -exec grep -oP '(https?://[^\s)]+)' {} \; | sort -u | while read -r url; do
  if ! curl -sfL --max-time 5 "$url" > /dev/null 2>&1; then
    echo "BROKEN: $url"
  fi
done

echo "=== Spell Check ==="
# Using codespell or similar
find docs/ adr/ -name '*.md' -exec codespell {} +

echo "=== Lint complete ==="
