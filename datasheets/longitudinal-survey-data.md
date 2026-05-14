# Datasheet: Longitudinal Survey Data

**Dataset ID:** `wp4-survey-data-v1`  
**Date:** 2026-05-14  
**Author(s):** NEPS WP4 Team

## Motivation

- **Purpose:** Track psychosocial wellbeing of youth participants over time across multiple countries
- **Funding:** [Donor organisation name]

## Composition

- **Instances:** 85,000+ survey responses
- **Features:** 142 fields (demographics, wellbeing scales, risk factors, timestamps)
- **Missing data:** Flagged per field; imputed using MICE for numeric, mode for categorical
- **PII:** Pseudonymised — direct identifiers removed, replaced with participant hash

## Collection Process

- **Method:** Self-administered digital surveys on tablets
- **Frequency:** Quarterly waves
- **Countries:** 4 countries, expanding to 7

## Preprocessing

- **Cleaning:** Outlier removal >3 SD, consistency checks across waves
- **Anonymisation:** Direct PII (names, IDs) removed at collection point
- **Normalisation:** Scores standardised per country wave

## Uses

- **Intended:** Longitudinal psychosocial risk analytics, cross-country comparisons
- **Prohibited:** Individual-level clinical decisions, punitive actions
- **Known biases:** Urban-over-rural coverage; self-selection bias in school-based sampling

## Maintenance

- **Update frequency:** Quarterly
- **Versioning:** `wp4-survey-v{major}.{minor}` — major on schema change
- **Contact:** NEPS WP4 Data Steward
