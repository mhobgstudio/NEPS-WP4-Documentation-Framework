# Model Card: Risk Analytics Model

**Model ID:** `wp4-risk-model-v1`  
**Date:** 2026-05-14  
**Author(s):** NEPS WP4 Team

## Model Details

- **Type:** Multi-class classification
- **Framework:** scikit-learn 1.3
- **Version:** 1.0.0
- **License:** CC-BY-4.0

## Intended Use

- **Primary use:** Predict psychosocial risk level (low / medium / high) for youth participants based on longitudinal survey data
- **Out-of-scope:** Clinical diagnosis; treatment recommendation; any use without human review

## Training Data

- **Source:** Historical survey data from 3 pilot countries
- **Size:** 24,500 labeled samples
- **Demographics:** Ages 12–18, 3 countries, 4 languages
- **Labeling process:** Expert clinician panel reviewed and labelled edge cases

## Performance

| Metric | Value |
|--------|-------|
| Accuracy | 87% |
| Precision (high risk) | 82% |
| Recall (high risk) | 79% |
| F1 Score | 0.83 |

## Limitations

- Reduced accuracy for age <14 (lower training density)
- Language model may underperform for low-resource dialects
- Temporal drift expected — retraining required quarterly

## Ethical Considerations

- All predictions must be reviewed by a clinician before action
- No participant-identifying data used in training
- Opt-out mechanism available at country-site level

## Maintenance

- **Frequency of retraining:** Quarterly
- **Monitoring:** Automated drift detection via CI pipeline
- **Owner:** NEPS WP4 Data Science Team
