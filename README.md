# إشارة — Job Opportunities Dashboard

A read-only Arabic-first dashboard for viewing opportunities collected by the Telegram Arabic Job Collector.

## Shared database architecture

This project is a static frontend. It does not open or expose the SQLite file directly in the browser. Instead, it reads a small JSON response from the existing collector service, which remains the single owner of the database:

```text
Telegram bot → collector service → SQLite database
                                      ↓
                         protected/public dashboard API
                                      ↓
                         this read-only HTML dashboard
```

The collector API should expose a read-only endpoint at:

```text
GET /public/dashboard
```

The expected response shape is:

```json
{
  "jobs": [
    {
      "source_chat_id": "-1001234567890",
      "source_chat": "ii324_jobs",
      "message_id": 42,
      "subjob_index": 0,
      "message_date": "2026-08-30T12:00:00+00:00",
      "source_url": "https://t.me/ii324_jobs/42",
      "original_text": "...",
      "job_title": "مطور Python",
      "company": "شركة تقنية",
      "location": "عن بعد",
      "employment_type": "remote",
      "salary": null,
      "application_method": "https://example.com/apply",
      "deadline": null,
      "category": "technology",
      "confidence": "high",
      "target_country": "Egypt"
    }
  ],
  "sources": ["ii324_jobs"]
}
```

The dashboard does not require or receive the SQLite file, Telegram token, export token, or database credentials. Configure the API base URL through `VITE_COLLECTOR_API_URL`.

## Local development

```bash
pnpm install
pnpm dev
```

Without `VITE_COLLECTOR_API_URL`, the interface intentionally shows a clear disconnected state rather than invented job data. To connect a deployed collector:

```bash
VITE_COLLECTOR_API_URL=https://YOUR-COLLECTOR-DOMAIN pnpm dev
```

## Production build

```bash
pnpm run check
pnpm run build
```

## Important integration note

The current Telegram collector repository exposes health and file-export routes but does not yet expose the `/public/dashboard` JSON route. The UI is ready for that contract; the collector service will need a read-only API route and appropriate CORS policy before the dashboard displays live records. Keep that route read-only and avoid exposing administrator controls or tokens in the browser.

## Design

The dashboard follows the Desert Signal direction: warm paper surfaces, ink-green structure, saffron freshness signals, Noto Serif Arabic display type, and Noto Sans Arabic UI type. The interface keeps source, date, confidence, and original context visible so the dashboard supports verification rather than hiding uncertainty.
