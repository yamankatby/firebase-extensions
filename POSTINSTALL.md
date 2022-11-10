# See it in action

You can test out this extension right away!

1. Go to your [Cloud Firestore dashboard](https://console.firebase.google.com/project/${param:PROJECT_ID}/firestore/data) in the Firebase console.
2. If it doesn't exist already, create a collection called [`${param:SOURCE_COLLECTION_PATH}`](https://console.firebase.google.com/project/${param:PROJECT_ID}/firestore/data/~2F${param:SOURCE_COLLECTION_PATH}).
3. Create a new document with the following fields `${param:SOURCE_FIELDS}` and any values you like.
4. Copy the document ID of the document you just created.
5. If it doesn't exist already, create another collection called [`${param:TARGET_COLLECTION_PATH}`](https://console.firebase.google.com/project/${param:PROJECT_ID}/firestore/data/~2F${param:TARGET_COLLECTION_PATH}).
6. Create a new document with a field called `${param:SOURCE_DOCUMENT_ID_FIELD_NAME}` and a value of the document ID you copied in step 4.
7. Wait a few seconds for the extension to run.
8. Ta-da! You should now see a new map field in the document you created in step 6 called `${param:TARGET_FIELD_NAME}` containing the `${param:SOURCE_FIELDS}` you entered in step 3.

# Using the extension

Whenever a document is created or updated in the `${param:TARGET_COLLECTION_PATH}` collection:

1. The extension will look for a field called `${param:SOURCE_DOCUMENT_ID_FIELD_NAME}` in the document.
2. If the field exists, the extension will look for a document in the `${param:SOURCE_COLLECTION_PATH}` collection with an ID matching the value of the `${param:SOURCE_DOCUMENT_ID_FIELD_NAME}` field.
3. If such a document exists, the extension will copy the `${param:SOURCE_FIELDS}` from from it to a new field called `${param:TARGET_FIELD_NAME}` in the document in the `${param:TARGET_COLLECTION_PATH}` collection.

Whenever a document is created or updated in the `${param:SOURCE_COLLECTION_PATH}` collection:

1. The extension will look for all documents in the `${param:TARGET_COLLECTION_PATH}` collection that have a field called `${param:SOURCE_DOCUMENT_ID_FIELD_NAME}` with a value matching the ID of the created/updated document.
2. If any documents are found, the extension will copy the `${param:SOURCE_FIELDS}` from the created/updated document to the `${param:TARGET_FIELD_NAME}` field in each of the documents found in step 1.

# Monitoring

As a best practice, you can [monitor the activity](https://firebase.google.com/docs/extensions/manage-installed-extensions#monitor) of your installed extension, including checks on its health, usage, and logs.
