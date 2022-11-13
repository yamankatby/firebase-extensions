# Connect Firestore Document

## ✏️ Description

**Connect Firestore Document** (`firestore-connect-document`) is a new extension for Firebase that allows you to get some fields from one document in Firestore, store them in a `map` field in another document, and keep them in sync.

![Connect Firestore Document Firebase Extension demo](https://user-images.githubusercontent.com/35961879/201526571-b0106cb1-36f4-4a46-9b96-0d96e5aca39a.gif)

For example, you can use this extension to user profile information (such as `name`, `email`, and `photoURL`) from their document in the `users` collection and store it in the `createdBy` field of each document created by that user in the `posts` collection.

This is a very common pattern in Firestore data modeling and is usually done _manually_ by writing and deploying custom Cloud Functions to handle each case. This extension automates this process for you. It allows you to implement this pattern with just a few clicks and without writing any code directly from the Firebase console.

## 🧩 Install the extension

To install the extension, follow the steps on the [Install a Firebase Extension](https://firebase.google.com/docs/extensions/install-extensions) page. In summary, do one of the following:

- **Install from the Firebase console**

  Click the button below:

  [![install-extension](https://user-images.githubusercontent.com/35961879/201528504-4e99bfc7-8691-4151-b63d-0511097d7c18.png)](https://console.firebase.google.com/project/_/extensions/install?ref=yaman/firestore-connect-document)

- **Install from the Firebase CLI**

  Run the following command:

  ```bash
  firebase ext:install yaman/firestore-connect-document --project=YOUR_PROJECT_ID
  ```
