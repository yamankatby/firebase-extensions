# Firestore Connect Document

**Author**: Yaman Katby (**[https://github.com/yamankatby](https://github.com/yamankatby)**)

**Description**: A simple example of a Firebase Extension



**Configuration Parameters:**

* Cloud Functions location: Where do you want to deploy the functions created for this extension? You usually want a location close to your database. For help selecting a location, refer to the [location selection guide](/docs/functions/locations).

* Collection path: The path to the collection that you want add the data map to.

* Data document ID field name: The name of the field in the document that contains the document ID you want to get data from.

* Data field name: The name of the field you want to store the data in.

* Data fields: The fields you want to get from the data document (comma separated).

* Data collection path: The path to the collection that you want to get the data from.



**Cloud Functions:**

* **onWrite:** A function that is triggered when a document is written to the database.

* **onDataWrite:** A function that is triggered when a document is written to the database.
