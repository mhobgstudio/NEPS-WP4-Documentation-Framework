# ADR-0001: Record Architecture Decisions

**Status:** Accepted  
**Date:** 2026-05-14  
**Author(s):** Salamatu Mohammed

## Context

Architecture decisions for NEPS WP4 are currently undocumented. As the platform grows and the team rotates, rationale for past decisions will be lost. We need a lightweight, version-controlled method to capture these decisions.

## Decision

We will use Architecture Decision Records (ADRs) as defined by Michael Nygard. Each ADR is a short markdown file stored in the `/adr/` directory of this repository, following the template in `adr/template.md`.

## Consequences

### Positive
- Decisions are version-controlled and reviewable via PRs
- New team members can understand past rationale
- Audit trail for ethics and funding reviews

### Negative
- Requires discipline to write ADRs before implementation
- Adds an overhead step for significant decisions

### Neutral
- ADRs use markdown — no special tooling needed
- Stored alongside documentation, not in a separate system

## References

- Nygard, M.T. (2011). Documenting Architecture Decisions. Cognitect.
- ADR template: `adr/template.md`
