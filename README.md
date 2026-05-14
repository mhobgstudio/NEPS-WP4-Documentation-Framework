# NEPS WP4 Documentation Framework

> A five-layer composite documentation framework for the NEPS WP4 digital health surveillance platform.

## Layers

| # | Layer | Source | Purpose |
|---|-------|--------|---------|
| 1 | **Information Architecture** | Diátaxis + EPPO | Classify every page as Tutorial, How-to, Reference, or Explanation |
| 2 | **Quality** | Treude + Aghajani rubric | Score every doc PR before merge |
| 3 | **Workflow** | Docs-as-Code | Docs in Git, PR-reviewed, CI-built |
| 4 | **Architecture** | ADRs + C4 Model | Capture decisions; diagram topology |
| 5 | **Sustainability & AI** | FAIR4RS + Model Cards + Datasheets | PIDs, metadata, AI transparency, onboarding |

## Implementation Stages

| Stage | Timeline | Deliverable |
|-------|----------|-------------|
| A | Weeks 1–3 | Baseline audit + Diátaxis migration plan |
| B | Weeks 4–8 | Docs-as-Code CI, OpenAPI ref, ADRs, C4 diagrams |
| C | Weeks 9–14 | Model Cards, Datasheets, onboarding portal |
| D | Months 4–6 | FAIR4RS audit, sustainability handover, journal paper |

## Quickstart

```bash
# Install deps
pip install mkdocs mkdocs-material vale

# Preview locally
mkdocs serve

# Build
./scripts/build-docs.sh

# Lint
./scripts/lint-docs.sh
```
