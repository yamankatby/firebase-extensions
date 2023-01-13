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
  snapshot: functions.firestore.DocumentSnapshot,
  mainCollectionConfig: CollectionConfig,
  otherCollectionConfig: CollectionConfig
) => {
  if (mainCollectionConfig.deletionBehavior === DeletionBehavior.Ignore) {
    logger.log(
      `The document "${mainCollectionConfig.collectionPath}/${snapshot.id}" was deleted, but the deletion behavior is set to "ignore".`
    );
    return;
  }

  // Get the other doc ref
  let otherDocRef = snapshot.get(mainCollectionConfig.refField);

  // If the other doc ref is empty, try to query the other collection
  if (!otherDocRef) {
    const otherDoc = await db
      .collection(otherCollectionConfig.collectionPath)
      .where(otherCollectionConfig.refField, "in", [snapshot.ref, snapshot.id])
      .limit(1)
      .get();

    if (otherDoc.empty) {
      logger.log(
        `The document "${mainCollectionConfig.collectionPath}/${snapshot.id}" was deleted, but its ref field "${mainCollectionConfig.refField}" is empty.`
      );
      return;
    }

    otherDocRef = otherDoc.docs[0].ref;
  }

  // If the otherDocRef is a string, use it as a docId to get the doc ref
  if (typeof otherDocRef === "string") {
    otherDocRef = db.doc(
      `${otherCollectionConfig.collectionPath}/${otherDocRef}`
    );
  }

  switch (mainCollectionConfig.deletionBehavior) {
    case DeletionBehavior.DeleteDoc:
      await otherDocRef.delete();
      logger.log(
        `The document "${mainCollectionConfig.collectionPath}/${snapshot.id}" was deleted, so the document "${otherCollectionConfig.collectionPath}/${otherDocRef.id}" was deleted.`
      );
      break;
    case DeletionBehavior.DeleteField:
      await otherDocRef.set(
        {
          [otherCollectionConfig.dataField]:
            admin.firestore.FieldValue.delete(),
        },
        { merge: true }
      );
      logger.log(
        `The document "${mainCollectionConfig.collectionPath}/${snapshot.id}" was deleted, so the field "${otherCollectionConfig.dataField}" was deleted from the document "${otherCollectionConfig.collectionPath}/${otherDocRef.id}".`
      );
      break;
    case DeletionBehavior.SetNull:
      await otherDocRef.set(
        { [otherCollectionConfig.dataField]: null },
        { merge: true }
      );
      logger.log(
        `The document "${mainCollectionConfig.collectionPath}/${snapshot.id}" was deleted, so the field "${otherCollectionConfig.dataField}" was set to null in the document "${otherCollectionConfig.collectionPath}/${otherDocRef.id}".`
      );
      break;
  }
};

const onWrite = async (
  snapshot: functions.firestore.DocumentSnapshot,
  mainCollectionConfig: CollectionConfig,
  otherCollectionConfig: CollectionConfig
) => {
  // Get the other doc ref
  let otherDocRef = snapshot.get(mainCollectionConfig.refField);

  // If the other doc ref is empty, try to query the other collection
  if (!otherDocRef) {
    const otherDoc = await db
      .collection(otherCollectionConfig.collectionPath)
      .where(otherCollectionConfig.refField, "in", [snapshot.ref, snapshot.id])
      .limit(1)
      .get();

    if (otherDoc.empty) {
      logger.log(
        `The document "${mainCollectionConfig.collectionPath}/${snapshot.id}" was created/updated, but its ref field "${mainCollectionConfig.refField}" is empty and no matching document was found in the collection "${otherCollectionConfig.collectionPath}".`
      );
      return;
    }

    otherDocRef = otherDoc.docs[0].ref;
  }

  // If the otherDocRef is a string, use it as a docId to get the doc ref
  if (typeof otherDocRef === "string") {
    otherDocRef = db.doc(
      `${otherCollectionConfig.collectionPath}/${otherDocRef}`
    );
  }

  // Get the other doc
  const otherDoc = await otherDocRef.get();

  // If the other doc doesn't exist, do nothing
  if (!otherDoc.exists) {
    logger.log(
      `The document "${mainCollectionConfig.collectionPath}/${snapshot.id}" was created/updated, but the document "${otherCollectionConfig.collectionPath}/${otherDocRef.id}" doesn't exist.`
    );
    return;
  }

  // Get the data to copy from the main doc
  let dataToCopy = snapshot.data() ?? {};

  const fieldsToExclude = [
    mainCollectionConfig.refField,
    mainCollectionConfig.dataField,
  ];

  dataToCopy = Object.fromEntries(
    Object.entries(dataToCopy).filter(([key]) => !fieldsToExclude.includes(key))
  );

  if (mainCollectionConfig.fieldsToCopy) {
    dataToCopy = Object.fromEntries(
      Object.entries(dataToCopy).filter(([key]) =>
        mainCollectionConfig.fieldsToCopy?.includes(key)
      )
    );
  }

  // Write the data to the other doc
  await otherDocRef.update({
    [otherCollectionConfig.dataField]: dataToCopy,
    [otherCollectionConfig.refField]: snapshot.ref,
  });

  logger.log(
    `The document "${mainCollectionConfig.collectionPath}/${snapshot.id}" was created/updated, so the document "${otherCollectionConfig.collectionPath}/${otherDocRef.id}" was updated.`
  );
};

export const onCollectionAWrite = functions.firestore
  .document(collectionAConfig.collectionPath)
  .onWrite(async (change) => {
    if (!change.after.exists) {
      return onDelete(change.before, collectionAConfig, collectionBConfig);
    } else {
      return onWrite(change.after, collectionAConfig, collectionBConfig);
    }
  });

export const onCollectionBWrite = functions.firestore
  .document(collectionBConfig.collectionPath)
  .onWrite(async (change) => {
    if (!change.after.exists) {
      return onDelete(change.before, collectionBConfig, collectionAConfig);
    } else {
      return onWrite(change.after, collectionBConfig, collectionAConfig);
    }
  });
