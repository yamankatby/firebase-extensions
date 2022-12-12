# See it in action

You can test out this extension right away!

1. Go to your [Cloud Firestore dashboard](https://console.firebase.google.com/project/${param:PROJECT_ID}/firestore/data) in the Firebase console.
2. If it doesn't exist already, create a collection called [`${param:COLLECTION_A_PATH}`](https://console.firebase.google.com/project/${param:PROJECT_ID}/firestore/data/~2F${param:COLLECTION_B_PATH}).
3. Create a new document that contains the following fields `${param:FIELDS_TO_COPY_FROM_A_TO_B}` and any other values you like.
4. Copy the document ID of the document you just created.
5. If it doesn't exist already, create another collection called [`${param:COLLECTION_B_PATH}`](https://console.firebase.google.com/project/${param:PROJECT_ID}/firestore/data/~2F${param:COLLECTION_B_PATH}).
6. Create a new document with a field called `${param:COLLECTION_A_REF_FIELD}` and a value of the document ID you copied in step 4.
7. Wait a few seconds for the extension to run.
8. Ta-da! You should now see a new map fields in both documents you created before, containing data from each other.

# Monitoring

As a best practice, you can [monitor the activity](https://firebase.google.com/docs/extensions/manage-installed-extensions#monitor) of your installed extension, including checks on its health, usage, and logs.
