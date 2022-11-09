# Firestore Connect Document

**Author**: Yaman Katby (**[https://github.com/yamankatby](https://github.com/yamankatby)**)

**Description**: Grabs a set of fields from a document in Firestore and writes them in a map field to another document, and keeps them in sync.



**Details**: <!-- 
This file provides your users an overview of your extension. All content is optional, but this is the recommended format. Your users will see the contents of this file when they run the `firebase ext:info` command.

Include any important functional details as well as a brief description for any additional setup required by the user (both pre- and post-installation).

Learn more about writing a PREINSTALL.md file in the docs:
https://firebase.google.com/docs/extensions/alpha/create-user-docs#writing-preinstall
-->

Use this extension to send a friendly greeting.

When triggered by an HTTP request, this extension responds with your specified friendly greeting.

<!-- We recommend keeping the following section to explain how billing for Firebase Extensions works -->
# Billing

This extension uses other Firebase or Google Cloud Platform services which may have associated charges:

<!-- List all products the extension interacts with -->
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
