# ADR-0002: Centralised Database per Country

**Status:** Proposed  
**Date:** 2026-05-14  
**Author(s):** NEPS WP4 Team

## Context

WP4 collects longitudinal psychosocial data from minors across multiple countries. Each country has its own data sovereignty regulations. A single shared database would create compliance and performance risks.

## Decision

Each country site will have its own centralised database instance. A lightweight data warehouse will aggregate anonymised cross-country data for analysis.

## Consequences

### Positive
- Data sovereignty compliance per country
- Failure isolation — one country's outage does not affect others
- Independent scaling and backup policies

### Negative
- Higher infrastructure cost
- Cross-country queries require a separate warehouse layer

### Neutral
- ETL configuration per country is needed

## Alternatives Considered

| Alternative | Reason Rejected |
|-------------|-----------------|
| Single shared database | Data sovereignty violations, single point of failure |
| Fully decentralised (per-site databases) | Impractical for cross-country analytics |
