import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { DocumentSnapshot } from "firebase-functions/v1/firestore";

const config = {
  collection: "restaurants",
  dataDocIdFieldName: "user.id",
  dataFieldName: "user",
  dataFields: ["name", "email", "phone"],
  dataCollection: "users",
};

admin.initializeApp();

const db = admin.firestore();

const getData = (doc: DocumentSnapshot, dataFields: string[]) => {
  return dataFields.reduce((acc: any, field) => {
    acc[field] = doc.get(field);
    return acc;
  }, {});
};

export const onWrite = functions.firestore.document(`${config.collection}/{id}`).onWrite(async (change) => {
  // If the document is being deleted, do nothing
  if (!change.after.exists) return;

  const dataDocId = change.after.get(config.dataDocIdFieldName);
  if (!dataDocId) return;

  // If the document is being updated, and the dataDocId is not changed, do nothing
  if (change.before.exists && change.before.get(config.dataDocIdFieldName) === dataDocId) return;

  const dataDoc = await db.collection(config.dataCollection).doc(dataDocId).get();
  if (!dataDoc.exists) return;

  const data = getData(dataDoc, config.dataFields);

  return change.after.ref.set({ [config.dataFieldName]: data }, { merge: true });
});

export const onDataWrite = functions.firestore.document(`${config.dataCollection}/{id}`).onWrite(async (change) => {
  if (!change.after.exists) return;

  const dataDocId = change.after.id;

  // If the document is being updated, but the data map is not affected, do nothing
  if (change.before.exists) {
    const dataFieldsChanged = config.dataFields.some((field) => change.before.get(field) !== change.after.get(field));
    if (!dataFieldsChanged) return;
  }

  const data = getData(change.after, config.dataFields);

  const querySnapshot = await db.collection(config.collection).where(config.dataDocIdFieldName, "==", dataDocId).get();
  if (querySnapshot.empty) return;

  const batch = db.batch();
  querySnapshot.forEach((doc) => {
    batch.set(doc.ref, { [config.dataFieldName]: data }, { merge: true });
  });
  return batch.commit();
});
