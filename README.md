# Connect Firestore Document

![Connect Firestore Document Firebase Extension demo](https://user-images.githubusercontent.com/35961879/201526571-b0106cb1-36f4-4a46-9b96-0d96e5aca39a.gif)


**Author**: Yaman Katby (**[https://github.com/yamankatby](https://github.com/yamankatby)**)

**Description**: Grabs a set of fields from a document in Firestore and writes them in a map field to another document, and keeps them in sync.



**Details**: Use this extension to embed a set of fields from a document in another document in Firestore and keep them in sync.

This extension is useful for creating "one-to-one" and "one-to-many" like releationships between documents in Firestore.

For example, you can use this extension to grab a user's profile information (like their name and photo URL) from the `users` collection and embed it in the documents that represent their comments in the `comments` collection. This way, you can display the user's profile information in the comments without having to make an extra query to the `users` collection.

# Billing

This extension uses other Firebase or Google Cloud Platform services which may have associated charges:

- Cloud Firestore

- Cloud Functions

When you use Firebase Extensions, you're only charged for the underlying resources that you use. A paid-tier billing plan is only required if the extension uses a service that requires a paid-tier plan, for example calling to a Google Cloud Platform API or making outbound network requests to non-Google services. All Firebase services offer a free tier of usage. [Learn more about Firebase billing.](https://firebase.google.com/pricing)




**Configuration Parameters:**

* Cloud Functions location: Where do you want to deploy the functions created for this extension? For help selecting a location, refer to the [location selection guide](https://firebase.google.com/docs/functions/locations).

* Source Collection Path: The path to the collection that contains the documents you want to grab fields from.

* Target Collection Path: The path to the collection that contains the documents you want to write the fields to.

* Source Document ID Field Name: The name of the field in the target document that contains the ID of the source document.

* Source Fields: The fields you want to grab from the source document and write to the target document (comma separated). Leave empty to grab all fields.

* Target Field Name: The name of the field in the target document to which the extension will write the fields grabbed from the source document.

* Source Document Delete Behavior: What should happen to the target document when the source document is deleted?



**Cloud Functions:**

* **onSourceDocumentChange:** A function that is triggered when a document is created, updated, or deleted in the source collection.

* **onTargetDocumentChange:** A function that is triggered when a document is created, updated, or deleted in the target collection.



**Access Required**:



This extension will operate with the following project IAM roles:

* datastore.user (Reason: Allows this extension to access Cloud Firestore to read from the source document and write to the target document.)
