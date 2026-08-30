# Dashboard configuration

Set the frontend build variable `VITE_COLLECTOR_API_URL` in the project’s hosting settings to the public HTTPS base URL of the Telegram collector service. For example:

```text
VITE_COLLECTOR_API_URL=https://telegram-job-collector-production.up.railway.app
```

The dashboard requests:

```text
GET https://YOUR-COLLECTOR-DOMAIN/public/dashboard
```

The endpoint should return a JSON object with `jobs` and `sources` arrays. It should be read-only and should not require administrator credentials in the browser. Do not add `TELEGRAM_BOT_TOKEN`, `EXPORT_API_TOKEN`, `TELEGRAM_WEBHOOK_SECRET`, SQLite paths, or any private credential to this project.

If the variable is not configured or the endpoint is unavailable, the page intentionally displays `هذه الواجهة جاهزة للاتصال` instead of fabricating data.
