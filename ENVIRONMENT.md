# Twick Environment Reference

This file centralizes key environment variables used across Twick packages.

## Telemetry (Node-side / twick-base)

- `TWICK_TELEMETRY_ENABLED` (`true` to enable; default disabled)
- `DISABLE_TELEMETRY` (`true` always disables telemetry)
- `TWICK_TELEMETRY_API_KEY` (PostHog project key; required when enabled)
- `TWICK_TELEMETRY_HOST` (optional PostHog host; default `https://eu.posthog.com`)
- `TWICK_TELEMETRY_NO_ID_FILE` (`true` disables local `~/.twick/id.txt` creation)

## Browser analytics (`@twick/timeline`)

- `VITE_TWICK_ANALYTICS_ENABLED` (`true` to enable, `false` to disable)
- `TWICK_ANALYTICS_ENABLED` (`true` to enable, `false` to disable)
- `VITE_POSTHOG_API_KEY` (optional browser PostHog key)
- `POSTHOG_API_KEY` (optional fallback key)
- `window.__TWICK_ANALYTICS_DISABLED__ = true` (runtime disable flag)

## Cloud / backend (selected examples)

- `AWS_REGION`
- `FILE_UPLOADER_S3_BUCKET`
- `FILE_UPLOADER_S3_REGION`
- `FILE_UPLOADER_S3_PREFIX`
- `GOOGLE_CLOUD_PROJECT_ID`
- `GOOGLE_CLOUD_BUCKET`

Refer to each cloud function README for its required env vars and deployment model.
