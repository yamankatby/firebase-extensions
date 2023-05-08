# Connect Firestore Document

**Author**: Yaman Katby (**[https://github.com/yamankatby](https://github.com/yamankatby)**)

**Description**: Keeps denormalized data in sync between two collections in Cloud Firestore, simplifies data maintenance across multiple documents and reduces the risk of data inconsistency.



**Details**: Use this extension to effortlessly automate keeping denormalized data in sync across multiple documents in Firestore, streamlining the management of data and reducing the risk of data inconsistencies.

Denormalized data refers to duplicating data across multiple documents or collections to optimize query performance. For example, you can store a user's name and their photo URL in each `post` document to display the user's information in the post view without making a separate query to the `users` collection.

![Showcase](showcase.gif)

#### Additional setup

Before installing this extension, make sure that you've [set up a Cloud Firestore database](https://firebase.google.com/docs/firestore/quickstart) in your Firebase project.

#### Billing

This extension uses other Firebase or Google Cloud Platform services which may have associated charges:

- Cloud Firestore

- Cloud Functions (Node.js 10+ runtime. [See FAQs](https://firebase.google.com/support/faq#extensions-pricing)




**Configuration Parameters:**

* Source Collection Path: The path to the collection that contains the documents you want to **copy data from**.

* Target Collection Path: The path to the collection that contains the documents you want to **copy data to**.

* Ref Field Name: The name of the field in the _target document_ that contains the reference to the _source document_.

* Data Field Name: The name of the field in the _target document_ that will contain the data that will be copied from the _source document_.

* Fields to Copy: The names of the fields in the _source document_ that you want to copy to the _target document_ (comma-separated, e.g. name,email). Leave this field empty to copy all fields.

* Source Document Deletion Behavior: What should happen to the target documents when the source document is deleted?

* Cloud Functions location: Where do you want to deploy the functions created for this extension? For help selecting a location, refer to the [location selection guide](https://firebase.google.com/docs/functions/locations).



**Cloud Functions:**

* **onSourceDocumentChange:** A function that is triggered when a document is created, updated, or deleted in the source collection and updates the connected documents in the target collection.

* **onTargetDocumentChange:** A function that is triggered when a document is created, updated, or deleted in the target collection and populates the written document with the date from the connected document in the source collection.



**Access Required**:



This extension will operate with the following project IAM roles:

* datastore.user (Reason: Allows the extension to read and write data to Cloud Firestore.)

Error: An unexpected error has occurred.
