# Firestore One-To-One

> **Note** This extension is still in beta, if you find any bugs or have any suggestions, please [file an issue](https://github.com/yamankatby/firebase-extensions/issues/new). Also, if you find this extension useful, please consider giving the repository a star ⭐️.

[![Follow me on Twitter](https://img.shields.io/twitter/follow/yamankatby?style=social)](https://twitter.com/intent/follow?screen_name=yamankatby)

## ✏️ Introduction

Use the **Firestore One-To-One** (`yaman/firestore-one-to-one`) extension to create a one-to-one relationship between two collections in Cloud Firestore.

See this [Twitter thread](https://twitter.com/yamankatby/status/1602287107988459525) for more details.

## 🧩 Install the extension

To install the extension, follow the steps on the [Install a Firebase Extension](https://firebase.google.com/docs/extensions/install-extensions) page. In summary, do one of the following:

- **Install from the Firebase console:** Click the button below:

  [![install-extension](https://user-images.githubusercontent.com/35961879/201528504-4e99bfc7-8691-4151-b63d-0511097d7c18.png)](https://console.firebase.google.com/project/_/extensions/install?ref=yaman/firestore-one-to-one)

- **Install from the Firebase CLI:** Run the following command:

  ```bash
  firebase ext:install yaman/firestore-one-to-one --project=YOUR_PROJECT_ID
  ```

### 🛠️ Configuration Parameters

During the installation of the extension, you will be prompted to specify a couple of configuration parameters:

| Name                                                 | Description                                                                                                                                                                                         |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cloud Functions location                             | Where do you want to deploy the functions created for this extension? For help selecting a location, refer to the [location selection guide](https://firebase.google.com/docs/functions/locations). |
| `Collection A` path                                  | The path of the first collection in the one-to-one relationship.                                                                                                                                    |
| `Collection B` path                                  | The path of the second collection in the one-to-one relationship.                                                                                                                                   |
| `Collection A` reference field                       | The name of the field in `Collection A` that will contain a reference to `Collection B`.                                                                                                            |
| `Collection B` reference field                       | The name of the field in `Collection B` that will contain a reference to `Collection A`.                                                                                                            |
| `Collection A` data field                            | The name of the field in `Collection A` that will contain the data to be copied from `Collection B`.                                                                                                |
| `Collection B` data field                            | The name of the field in `Collection B` that will contain the data to be copied from `Collection A`.                                                                                                |
| Fields to copy from `Collection A` to `Collection B` | The names of fields in `Collection A` to be copied to `Collection B`. Comma-separated values, leave empty to copy all fields.                                                                       |
| Fields to copy from `Collection B` to `Collection A` | The names of fields in `Collection B` to be copied to `Collection A`. Comma-separated values, leave empty to copy all fields.                                                                       |
| `Collection A` deletion behavior                     | What should happen when a document in `Collection A` is deleted?                                                                                                                                    |
| `Collection B` deletion behavior                     | What should happen when a document in `Collection B` is deleted?                                                                                                                                    |
