# Firestore One-To-One

**Author**: Yaman Katby (**[https://github.com/yamankatby](https://github.com/yamankatby)**)

**Description**: Implements a one-to-one relationship pattern between two collections in Cloud Firestore.



**Details**: Use this extension to send a friendly greeting.

When triggered by an HTTP request, this extension responds with your specified friendly greeting.

# Billing

This extension uses other Firebase or Google Cloud Platform services which may have associated charges:

- Cloud Functions

When you use Firebase Extensions, you're only charged for the underlying resources that you use. A paid-tier billing plan is only required if the extension uses a service that requires a paid-tier plan, for example calling to a Google Cloud Platform API or making outbound network requests to non-Google services. All Firebase services offer a free tier of usage. [Learn more about Firebase billing.](https://firebase.google.com/pricing)




**Configuration Parameters:**

* Cloud Functions location: Where do you want to deploy the functions created for this extension? For help selecting a location, refer to the [location selection guide](https://firebase.google.com/docs/functions/locations).

* Collection A path: The path of the first collection in the one-to-one relationship.

* Collection B path: The path of the second collection in the one-to-one relationship.

* Collection A reference field: The name of the field in Collection A that will contain a reference to Collection B.

* Collection B reference field: The name of the field in Collection B that will contain a reference to Collection A.

* Collection A data field: The name of the field in Collection A that will contain the data that will be copied from Collection B.

* Collection B data field: The name of the field in Collection B that will contain the data that will be copied from Collection A.

* Fields to copy from Collection A to Collection B, comma separated, leave empty to copy all fields: The names of the fields in Collection A that will be copied to Collection B.

* Fields to copy from Collection B to Collection A, comma separated, leave empty to copy all fields: The names of the fields in Collection B that will be copied to Collection A.

* Collection A deletion behavior: What should happen when a document in Collection A is deleted?

* Collection B deletion behavior: What should happen when a document in Collection B is deleted?



**Cloud Functions:**

* **onCollectionAWrite:** A function that is triggered when a document is created, updated, or deleted in the collection A.


* **onCollectionBWrite:** A function that is triggered when a document is created, updated, or deleted in the collection B.



**Access Required**:



This extension will operate with the following project IAM roles:

* datastore.user (Reason: Allows this extension to access Cloud Firestore to read/write documents in the A and B collections.)
