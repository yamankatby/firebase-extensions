Use this extension to automatically sync your Firebase Authentication users to [Kit](https://kit.com) (formerly ConvertKit) as subscribers.

Whenever a new Firebase Auth user is created, this extension takes their email and display name and creates (or updates) a matching subscriber in your Kit account. Optionally, the subscriber can be added to a specific Kit **form**. Users without an email address — such as anonymous or phone-only sign-ins — are skipped.

When a Firebase Auth user is **deleted**, the extension looks up the matching Kit subscriber by email and globally unsubscribes them, marking them as `cancelled` in Kit.

You can also opt in to a one-time **backfill** at install time, which pages through your existing Firebase Auth users and syncs anyone with an email.

## Prerequisites

Before installing this extension, make sure you have:

- A [Kit account](https://kit.com) with API access.
- A v4 API key, generated at [app.kit.com/account_settings/developer_settings](https://app.kit.com/account_settings/developer_settings). The extension stores this key in Cloud Secret Manager.
- (Optional) The ID of a Kit **form** if you want subscribers added to one — visible in the URL when editing the form at [app.kit.com/forms](https://app.kit.com/forms).

# Billing

This extension uses the following Firebase and Google Cloud services, which may have associated charges:

- Cloud Functions (Node 20)
- Cloud Tasks (only if backfill is enabled)
- Cloud Secret Manager

This extension also calls the Kit API. Refer to your Kit plan for any subscriber limits or rate limits.

When you use Firebase Extensions, you're only charged for the underlying resources that you use. A paid-tier billing plan is required because this extension makes outbound network requests to a non-Google service (Kit). [Learn more about Firebase billing.](https://firebase.google.com/pricing)
