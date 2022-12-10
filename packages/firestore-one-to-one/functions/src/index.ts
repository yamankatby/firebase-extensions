import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {
  collectionAConfig,
  collectionBConfig,
  CollectionConfig,
  DeletionBehavior,
} from "./config";

admin.initializeApp();

const db = admin.firestore();
const logger = functions.logger;

const onDelete = async (
  change: functions.Change<functions.firestore.DocumentSnapshot>,
  mainCollectionConfig: CollectionConfig,
  otherCollectionConfig: CollectionConfig
) => {
  if (mainCollectionConfig.deletionBehavior === DeletionBehavior.Ignore) {
    logger.log(
      `The document "${mainCollectionConfig.collectionPath}/${change.before.id}" was deleted, but the deletion behavior is set to "ignore".`
    );
    return;
  }

  // Get the reference to the other document
  let otherDocRef = change.before.get(mainCollectionConfig.referenceField);

  // If the reference is not set, do nothing
  if (!otherDocRef) {
    logger.log(
      `The document "${mainCollectionConfig.collectionPath}/${change.before.id}" was deleted, but its reference field "${mainCollectionConfig.referenceField}" was not set.`
    );
    return;
  }

  // If the otherDocRef is a string, use it as a documentId to build a reference
  if (typeof otherDocRef === "string") {
    otherDocRef = db.doc(
      `${otherCollectionConfig.collectionPath}/${otherDocRef}`
    );
  }

  switch (mainCollectionConfig.deletionBehavior) {
    case DeletionBehavior.DeleteDoc:
      await otherDocRef.delete();
      logger.log(
        `The document "${mainCollectionConfig.collectionPath}/${change.before.id}" was deleted, so the document "${otherCollectionConfig.collectionPath}/${otherDocRef.id}" deleted.`
      );
      return;
    case DeletionBehavior.DeleteField:
      await otherDocRef.set(
        {
          [otherCollectionConfig.dataField]:
            admin.firestore.FieldValue.delete(),
        },
        { merge: true }
      );
      logger.log(
        `The document "${mainCollectionConfig.collectionPath}/${change.before.id}" was deleted, so the field "${otherCollectionConfig.dataField}" was deleted from the document "${otherCollectionConfig.collectionPath}/${otherDocRef.id}".`
      );
      return;
    case DeletionBehavior.SetNull:
      await otherDocRef.set(
        { [otherCollectionConfig.dataField]: null },
        { merge: true }
      );
      logger.log(
        `The document "${mainCollectionConfig.collectionPath}/${change.before.id}" was deleted, so the field "${otherCollectionConfig.dataField}" was set to null in the document "${otherCollectionConfig.collectionPath}/${otherDocRef.id}".`
      );
      return;
  }
};

const onWrite = async (
  change: functions.Change<functions.firestore.DocumentSnapshot>,
  mainCollectionConfig: CollectionConfig,
  otherCollectionConfig: CollectionConfig
) => {
  // Get the ref of the other document
  let otherDocRef = change.after.get(mainCollectionConfig.referenceField);

  // If the ref field is empty, try to query the other collection
  if (!otherDocRef) {
    const querySnapshot = await db
      .collection(otherCollectionConfig.collectionPath)
      .where(otherCollectionConfig.referenceField, "in", [
        change.after.id,
        change.after.ref,
      ])
      .limit(1)
      .get();

    if (querySnapshot.empty) {
      logger.log(
        `The document "${mainCollectionConfig.collectionPath}/${change.after.id}" was updated, but its reference field "${mainCollectionConfig.referenceField}" was not set and no document in the collection "${otherCollectionConfig.collectionPath}" was found with the reference field "${otherCollectionConfig.referenceField}" set to "${change.after.id}".`
      );
      return;
    }

    otherDocRef = querySnapshot.docs[0].ref;
  }

  // If the otherDocRef is a string, use it as a documentId to build a reference
  if (typeof otherDocRef === "string") {
    otherDocRef = db.doc(
      `${otherCollectionConfig.collectionPath}/${otherDocRef}`
    );
  }

  const otherDoc = await otherDocRef.get();

  // If the other document does not exist, do nothing
  if (!otherDoc.exists) {
    logger.log(
      `The document "${mainCollectionConfig.collectionPath}/${change.after.id}" was updated, but the document "${otherCollectionConfig.collectionPath}/${otherDocRef.id}" does not exist.`
    );
    return;
  }

  // Update the other document with the data from the main document
  const fieldsToIgnore = [
    mainCollectionConfig.referenceField,
    mainCollectionConfig.dataField,
  ];

  const data = Object.fromEntries(
    Object.entries(change.after.data() ?? {}).filter(
      ([key]) => !fieldsToIgnore.includes(key)
    )
  );

  await otherDocRef.set(
    { [otherCollectionConfig.dataField]: data },
    { merge: true }
  );
};

export const onCollectionAWrite = functions.firestore
  .document(collectionAConfig.collectionPath)
  .onWrite(async (change) => {
    if (!change.after.exists) {
      return onDelete(change, collectionAConfig, collectionBConfig);
    } else {
      return onWrite(change, collectionAConfig, collectionBConfig);
    }
  });

export const onCollectionBWrite = functions.firestore
  .document(collectionBConfig.collectionPath)
  .onWrite(async (change) => {
    if (!change.after.exists) {
      return onDelete(change, collectionBConfig, collectionAConfig);
    } else {
      return onWrite(change, collectionBConfig, collectionAConfig);
    }
  });
