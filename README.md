# Link Firestore Documents

**Author**: Yaman Katby (**[https://github.com/yamankatby](https://github.com/yamankatby)**)

**Description**: Grab a set of fields from a Firestore document and write them as a map field to another Firestore document, and keep them in sync.

**Configuration Parameters:**

- Cloud Functions location: Where do you want to deploy the functions created for this extension? You usually want a location close to your database. For help selecting a location, refer to the [location selection guide](https://firebase.google.com/docs/functions/locations).

- Source Collection Path: The path to the collection that contains the documents you want to grab fields from.

- Target Collection Path: The path to the collection that contains the documents you want to write the fields to.

- Source Document ID Field Name: The name of the field in the target document that contains the ID of the source document.

- Source Fields: The fields you want to grab from the source document and write to the target document (comma separated).

- Target Field Name: The name of the field in the target document to which the extension will write the fields grabbed from the source document.

**Cloud Functions:**

- **onSourceDocumentChange:** A function that is triggered when a document is created, updated, or deleted in the source collection.

- **onTargetDocumentChange:** A function that is triggered when a document is created, updated, or deleted in the target collection.
