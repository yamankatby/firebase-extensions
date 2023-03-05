# Firestore One-To-One

> **Note** This extension is still in beta, if you find any bugs or have any suggestions, please [file an issue](https://github.com/yamankatby/firebase-extensions/issues/new). Also, if you find this extension useful, please consider giving the repository a star ⭐️.

[![Follow me on Twitter](https://img.shields.io/twitter/follow/yamankatby?style=social)](https://twitter.com/intent/follow?screen_name=yamankatby)

**Author**: Yaman Katby (**[https://github.com/yamankatby](https://github.com/yamankatby)**)

**Description**: Implements a one-to-one relationship pattern between two collections in Cloud Firestore.

**Details**: Use this extension to implement a one-to-one relationship pattern between two collections in Cloud Firestore.

This pattern is useful for modeling relationships between two entities, such as a user and their profile.

# Billing

This extension uses other Firebase or Google Cloud Platform services which may have associated charges:

- Cloud Functions

When you use Firebase Extensions, you're only charged for the underlying resources that you use. A paid-tier billing plan is only required if the extension uses a service that requires a paid-tier plan, for example calling to a Google Cloud Platform API or making outbound network requests to non-Google services. All Firebase services offer a free tier of usage. [Learn more about Firebase billing.](https://firebase.google.com/pricing)

**Configuration Parameters:**

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

**Cloud Functions:**

- **onCollectionAWrite:** A function that is triggered when a document is created, updated, or deleted in the collection A.

- **onCollectionBWrite:** A function that is triggered when a document is created, updated, or deleted in the collection B.

**Access Required**:

This extension will operate with the following project IAM roles:

- datastore.user (Reason: Allows this extension to access Cloud Firestore to read/write documents in the A and B collections.)
