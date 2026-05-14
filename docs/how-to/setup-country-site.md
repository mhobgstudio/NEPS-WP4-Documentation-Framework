# How to Set Up a New Country Site

**Audience:** Country-site technical staff  
**Prerequisites:** Access to WP4 infrastructure credentials, VPN access

## Steps

### 1. Provision the Database Instance

```bash
terraform apply -var="country_code=XX" -var="environment=staging"
```

### 2. Configure ETL Pipeline

Update `config/countries/XX.yaml` with the country's data source configurations:

```yaml
country: XX
sources:
  - name: school_survey
    format: csv
    schedule: weekly
```

### 3. Deploy Dashboard

```bash
./scripts/deploy-dashboard.sh --country XX --env staging
```

### 4. Enable Risk Analytics

Activate the risk model for the new site via the admin API:

```bash
curl -X POST https://api.wp4.neps/dash/sites/XX/activate \
  -H "Authorization: Bearer $TOKEN"
```

### 5. Verify

```bash
./scripts/health-check.sh --country XX
```

## Next Steps

- Onboard local data collectors
- Schedule training session
- Add country-specific data dictionaries
