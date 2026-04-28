# See it in action

You can test the extension right away:

1. Open the [Authentication tab](https://console.firebase.google.com/project/${param:PROJECT_ID}/authentication/users) in the Firebase console and add a new user with an email address (or sign one up via your app).
2. Within a few seconds, that user should appear as an active subscriber in your [Kit account](https://app.kit.com/subscribers).

# How it works

The extension watches `auth.user().onCreate` events. For every new user with an email address, it sends a `POST` to Kit with the user's email and display name. Kit upserts on email, so re-runs are safe.

- If `KIT_FORM_ID` is set, the call goes to `POST /v4/forms/{form_id}/subscribers` so the user is added to that form.
- Otherwise, it goes to `POST /v4/subscribers` to create a generic subscriber.

## Delete behavior

The extension also watches `auth.user().onDelete` events. When a user is deleted from Firebase Auth, the extension:

1. Looks up the matching Kit subscriber: `GET /v4/subscribers?email_address=...`.
2. If found, calls `POST /v4/subscribers/{id}/unsubscribe` to globally unsubscribe them. Their record stays in Kit but moves to the `cancelled` state and stops receiving emails.
3. If no matching subscriber exists (e.g., they were never synced), logs the case and exits cleanly.

## Backfill

If you enabled backfill at install time, the extension also paginates through your existing Auth users and syncs everyone with an email, applying form association the same way. This is a one-time job — to re-run it, reinstall the extension.

# Reconfiguring

The `KIT_API_KEY` secret can be rotated at any time from the extension's configuration page. The `LOCATION` and `DO_BACKFILL` parameters are immutable — to change them, uninstall and reinstall the extension.

# Monitoring

As a best practice, you can [monitor the activity](https://firebase.google.com/docs/extensions/manage-installed-extensions#monitor) of your installed extension, including checks on its health, usage, and logs. Common log messages:

- `Synced <email> to Kit.` — successful create or form-subscribe.
- `Unsubscribed <email> from Kit.` — successful global unsubscribe after an Auth user delete.
- `No Kit subscriber for <email>; nothing to unsubscribe.` — Auth user was deleted but had never been synced; safe to ignore.
- `Skipping user <uid>: no email address` — expected for anonymous / phone sign-ins.
- `Kit API 401 on …` — the API key is invalid or revoked. Update the `KIT_API_KEY` secret.
- `Kit API 404 on …` — likely a bad `KIT_FORM_ID`. Check the ID in your Kit dashboard.
- `Kit API 422 on …` — Kit rejected the payload (e.g., malformed email). Check the failing user's record.
