# Country-Site Onboarding Portal

This portal scaffolds the onboarding experience for new country sites joining NEPS WP4.

## Architecture

Modelled on the FLOSScoach pattern (Steinmacher et al., 2016): structured, role-based, barrier-aware.

## Portal Structure

```
onboarding/
├── index.md                          # Entry point
├── site-admin/
│   ├── 01-infrastructure-setup.md
│   ├── 02-user-management.md
│   ├── 03-data-collection-config.md
│   └── 04-go-live-checklist.md
├── data-collector/
│   ├── 01-tablet-setup.md
│   ├── 02-survey-administration.md
│   └── 03-data-quality-checks.md
├── researcher/
│   ├── 01-accessing-the-dashboard.md
│   ├── 02-running-queries.md
│   └── 03-exporting-data.md
└── faq.md
```

## Key Principles

1. **Role-based** — content filtered by user role
2. **Progressive disclosure** — start simple, deepen over time
3. **Interactive checklist** — each role has a completion checklist
4. **Localised** — translated into country languages
5. **Feedback loop** — exit survey after each onboarding track

## Implementation

- Portal is a set of markdown pages served alongside the main docs
- Progress tracking via a simple JSON file per user (stored locally, no PII)
- Onboarding completion triggers access to production systems
