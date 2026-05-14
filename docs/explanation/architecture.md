# Architecture Overview

## System Context

NEPS WP4 is a multi-country digital platform for longitudinal youth psychosocial monitoring. It serves multiple countries, each with its own data collection sites and research teams.

## Component Architecture

```mermaid
graph TB
    subgraph "Data Sources"
        S1[School Surveys]
        S2[Clinic Records]
        S3[Field Interviews]
    end

    subgraph "ETL Layer"
        E1[Data Ingestion]
        E2[Validation]
        E3[Transformation]
        E4[Loading]
    end

    subgraph "Storage"
        DB[(Longitudinal Database)]
        DW[(Data Warehouse)]
    end

    subgraph "Analytics"
        A1[Dashboard]
        A2[Risk Analytics]
        A3[NLQ Layer]
    end

    subgraph "Access"
        P1[Web Portal]
        P2[API Gateway]
        P3[Field App]
    end

    S1 --> E1
    S2 --> E1
    S3 --> E1
    E1 --> E2 --> E3 --> E4
    E4 --> DB
    DB --> DW
    DW --> A1
    DW --> A2
    DW --> A3
    A1 --> P1
    A2 --> P1
    A3 --> P2
    P3 --> E1
```

## Key Design Decisions

| Decision | Rationale | ADR |
|----------|-----------|-----|
| Centralised database per country | Data sovereignty requirements | ADR-0002 |
| LangChain for NLQ | Rapid prototyping, Python ecosystem | ADR-0003 |
| Dashboard per country site | Performance isolation | ADR-0004 |

See the [ADRs](../../adr/) for detailed decision records.
