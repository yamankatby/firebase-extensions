# Auth Kit Sync

> **Note** This extension is still in beta, if you find any bugs or have any suggestions, please [file an issue](https://github.com/yamankatby/firebase-extensions/issues/new). Also, if you find this extension useful, please consider giving the repository a star ⭐️.

## ✏️ Introduction

Use the **Auth Kit Sync** (`yaman/auth-kit-sync`) extension to automatically sync your Firebase Authentication users to [Kit](https://kit.com) (formerly ConvertKit) as subscribers.

When a new Firebase Auth user is created, the extension takes their email and display name and creates (or updates) a matching Kit subscriber — optionally adding them to a specific Kit form. When an Auth user is deleted, the matching Kit subscriber is globally unsubscribed. Existing Auth users can be backfilled once, at install time.

Users without an email address (anonymous or phone-only sign-ins) are skipped.

## ✨ Features

- ✅ Sync new Firebase Auth sign-ups to Kit as subscribers
- ✅ Optional Kit form association
- ✅ Globally unsubscribe a Kit subscriber when their Auth user is deleted
- ✅ One-time backfill of existing Auth users at install time
- ✅ Kit API key stored in Cloud Secret Manager

## 🧩 Install the extension

To install the extension, follow the steps on the [Install a Firebase Extension](https://firebase.google.com/docs/extensions/install-extensions) page. In summary, do one of the following:

- **Install from the Firebase console:** Click the button below:

  [![install-extension](https://user-images.githubusercontent.com/35961879/201528504-4e99bfc7-8691-4151-b63d-0511097d7c18.png)](https://console.firebase.google.com/project/_/extensions/install?ref=yaman/auth-kit-sync)

- **Install from the Firebase CLI:** Run the following command:

  ```bash
  firebase ext:install yaman/auth-kit-sync --project=YOUR_PROJECT_ID
  ```

### 🛠️ Configuration parameters

During the installation of the extension, you will be prompted to specify a couple of configuration parameters:

| Name                                | Description                                                                                                                                                                                                                          |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Cloud Functions location            | Where do you want to deploy the functions created for this extension? For help selecting a location, refer to the [location selection guide](https://firebase.google.com/docs/functions/locations).                                  |
| Kit API key                         | Your Kit (v4) API key, generated under [Account → Developer settings](https://app.kit.com/account_settings/developer_settings). Stored in Cloud Secret Manager.                                                                      |
| Kit form ID (optional)              | If set, new subscribers are added to this Kit form. Find the ID in the URL bar when editing a form at [app.kit.com/forms](https://app.kit.com/forms). Leave blank to create generic subscribers.                                     |
| Backfill existing users on install  | Should existing Firebase Auth users with an email address be synced to Kit when this extension is installed? Runs once, at install time.                                                                                             |
