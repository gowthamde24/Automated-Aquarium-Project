# Send Blog Notifications GitHub Action

A GitHub Action that sends email notifications to subscribers when new blog posts are published, using Resend for email delivery and PostgreSQL for subscriber management.

## Features

- 📬 Sends email notifications via Resend
- 📊 Processes emails in batches to avoid rate limits
- 📝 Logs success/failure to PostgreSQL database
- ✅ Handles unsubscribe links automatically
- 🚦 Comprehensive error handling and retries

## Inputs

### Required

| Input             | Description                                  | Example                              |
|-------------------|----------------------------------------------|--------------------------------------|
| `blog_metadata`   | JSON string of blog post metadata            | `'[{"title":"...","slug":"..."}]'`   |
| `database_url`    | PostgreSQL connection URL                    | `${{ secrets.DATABASE_URL }}`        |
| `resend_api_key`  | Resend API key                               | `${{ secrets.RESEND_API_KEY }}`      |

### Optional

| Input             | Description                          | Default                      |
|-------------------|--------------------------------------|------------------------------|
| `site_url`        | Base URL of your blog                | `https://yourblog.com`       |
| `batch_size`      | Number of emails per batch           | `50`                         |
| `from_email`      | Sender email address                 | `notifications@yourdomain.com` |

## Outputs

| Output          | Description                          |
|-----------------|--------------------------------------|
| `success_count` | Number of successfully sent emails   |
| `error_count`   | Number of failed email attempts      |

## Example Usage

```yaml
name: Blog Post Notification
on:
  push:
    branches: [main]
    paths:
      - 'content/blog/**'

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Extract blog metadata
        id: extract
        uses: ./.github/actions/extract-blog-metadata
        with:
          blog_directory: 'content/blog'

      - name: Send notifications
        if: ${{ fromJson(steps.extract.outputs.metadata)[0] }}
        uses: ./.github/actions/send-blog-notifications
        with:
          blog_metadata: ${{ steps.extract.outputs.metadata }}
          database_url: ${{ secrets.DATABASE_URL }}
          resend_api_key: ${{ secrets.RESEND_API_KEY }}
          site_url: 'https://example.com'
          batch_size: '50'
