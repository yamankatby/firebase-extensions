# Connect Firestore Document

> **Note** This extension is currently in beta. If you have any feedback, please [file an issue](https://github.com/yamankatby/firestore-connect-document/issues/new).
>
> Also, if you like it, please take a second to give it a star 🌟

[![Twitter Follow](https://img.shields.io/twitter/follow/yamankatby?style=social)](https://twitter.com/intent/follow?screen_name=yamankatby)

- [Connect Firestore Document](#connect-firestore-document)
  - [✏️ Introduction](#️-introduction)
  - [✨ Features](#-features)
  - [🧩 Install the extension](#-install-the-extension)
    - [🛠️ Configuration paramters](#️-configuration-paramters)

## ✏️ Introduction

**Connect Firestore Document** (`firestore-connect-document`) is a new extension for Firebase that allows you to get some fields from one document in Firestore, store them in a `map` field in another document, and keep them in sync.

![Connect Firestore Document Firebase Extension demo](https://user-images.githubusercontent.com/35961879/201526571-b0106cb1-36f4-4a46-9b96-0d96e5aca39a.gif)

For example, you can use this extension to user profile information (such as `name`, `email`, and `photoURL`) from their document in the `users` collection and store it in the `createdBy` field of each document created by that user in the `posts` collection.

This is a very common pattern in Firestore data modeling and is usually done _manually_ by writing and deploying custom Cloud Functions to handle each case. This extension automates this process for you. It allows you to implement this pattern with just a few clicks and without writing any code directly from the Firebase console.

## ✨ Features

- ✅ Fully customizable field names.
- ✅ Customize what happens when the source document is deleted
- ✅ Optionally get _all_ fields from the source document or just _some of them_.
- 🚧 Extend the extension functionality using events.

## 🧩 Install the extension

To install the extension, follow the steps on the [Install a Firebase Extension](https://firebase.google.com/docs/extensions/install-extensions) page. In summary, do one of the following:

- **Install from the Firebase console:** Click the button below:

  [![install-extension](https://user-images.githubusercontent.com/35961879/201528504-4e99bfc7-8691-4151-b63d-0511097d7c18.png)](https://console.firebase.google.com/project/_/extensions/install?ref=yaman/firestore-connect-document)

- **Install from the Firebase CLI:** Run the following command:

  ```bash
  firebase ext:install yaman/firestore-connect-document --project=YOUR_PROJECT_ID
  ```

### 🛠️ Configuration paramters

During the installation of the extension, you will be prompted to specify a couple of configuration parameters:

![Connect Firestore Document - Configuration Parameters](https://user-images.githubusercontent.com/35961879/201632903-b4e24631-0fda-47b5-8557-667148cf9b84.png)


| Name                            | Description                                                                                                                                                                                         |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Location                        | Where do you want to deploy the functions created for this extension? For help selecting a location, refer to the [location selection guide](https://firebase.google.com/docs/functions/locations). |
| Source Collection Path          | The path to the collection that contains the documents you want to grab fields from.                                                                                                                |
| Target Collection Path          | The path to the collection that contains the documents you want to write the fields to.                                                                                                             |
| Source Document ID Field Name   | The name of the field in the target document that contains the ID of the source document.                                                                                                           |
| Source Fields                   | The fields you want to grab from the source document and write to the target document (comma separated). Leave empty to grab all fields.                                                            |
| Target Field Name               | The name of the field in the target document to which the extension will write the fields grabbed from the source document.                                                                         |
| Source Document Delete Behavior | What should happen to the target document when the source document is deleted?                                                                                                                      |
