/*
 * This template contains a HTTP function that responds with a greeting when called
 *
 * Always use the FUNCTIONS HANDLER NAMESPACE
 * when writing Cloud Functions for extensions.
 * Learn more about the handler namespace in the docs
 *
 * Reference PARAMETERS in your functions code with:
 * `process.env.<parameter-name>`
 * Learn more about parameters in the docs
 */

import * as firebase from "firebase-admin";
import * as functions from "firebase-functions";
import config from "./config";
import * as logs from "./logs";

firebase.initializeApp();

const db = firebase.firestore();

export const onTargetDocumentChange = functions.firestore
  .document(`${config.targetCollectionPath}/{documentId}`)
  .onWrite(async (change) => {
    // If the document was deleted, do nothing
    if (!change.after.exists) {
      logs.targetDocumentWasDeleted(change.after.id);
      return;
    }

    // Get the source document ID
    const sourceDocumentId = change.after.get(config.sourceDocumentIdFieldName) as string;

    // If the source document ID never existed, do nothing
    if (!change.before.exists && !sourceDocumentId) {
      logs.sourceDocumentIdNotExists(change.after.id);
      return;
    }

    // If the source document ID was not changed, do nothing
    if (change.before.exists && sourceDocumentId === change.before.get(config.sourceDocumentIdFieldName)) {
      logs.sourceDocumentIdWasNotChanged(change.after.id);
      return;
    }

    // If the source document ID was deleted, delete the target field
    if (change.before.exists && change.before.get(config.sourceDocumentIdFieldName) && !sourceDocumentId) {
      logs.sourceDocumentIdWasDeleted(change.after.id);
      await change.after.ref.set({ [config.targetFieldName]: firebase.firestore.FieldValue.delete() }, { merge: true });
      logs.targetFieldWasDeletedSuccessfully(change.after.id);
      return;
    }

    // Get the source document
    const sourceDocument = await db.doc(`${config.sourceCollectionPath}/${sourceDocumentId}`).get();

    // If the source document does not exist, do nothing
    if (!sourceDocument.exists) {
      logs.sourceDocumentWasNotFound(sourceDocumentId);
      return;
    }

    // Get the source document data
    let sourceDocumentData = sourceDocument.data() as Record<string, any>;

    // If the source fields are specified, get only those fields
    if (config.sourceFields) {
      sourceDocumentData = config.sourceFields.reduce((acc: any, field) => {
        acc[field] = sourceDocumentData[field];
        return acc;
      }, {});
    }

    // Update the target document
    await change.after.ref.set({ [config.targetFieldName]: sourceDocumentData }, { merge: true });
    logs.targetFieldWasUpdatedSuccessfully(change.after.id);
    return;
  });

export const onSourceDocumentChange = functions.firestore
  .document(`${config.sourceCollectionPath}/{documentId}`)
  .onWrite(async (change) => {
    // If the document was deleted and the source document delete behavior is "nothing", do nothing
    if (!change.after.exists && config.sourceDocumentDeleteBehavior === "nothing") {
      logs.sourceDocumentWasDeleted_doNothing(change.after.id);
      return;
    }

    // Get the target documents
    const targetDocuments = await db
      .collection(config.targetCollectionPath)
      .where(config.sourceDocumentIdFieldName, "==", change.after.id)
      .get();

    // If there are no target documents, do nothing
    if (targetDocuments.empty) {
      logs.noTargetDocumentWasFound(change.after.id);
      return;
    }

    // If the document was deleted and the source document delete behavior is not "nothing"
    if (!change.after.exists) {
      // If the source document delete behavior is "deleteTargetField", delete the target fields
      if (config.sourceDocumentDeleteBehavior === "deleteTargetField") {
        logs.sourceDocumentWasDeleted_deleteTargetField(change.after.id);

        const batch = db.batch();

        targetDocuments.forEach((targetDocument) => {
          batch.set(
            targetDocument.ref,
            { [config.targetFieldName]: firebase.firestore.FieldValue.delete() },
            { merge: true }
          );
        });

        await batch.commit();

        logs.targetFieldsWereDeletedSuccessfully(change.after.id);
        return;
      }

      // If the source document delete behavior is "setTargetFieldToNull", set the target fields to null
      if (config.sourceDocumentDeleteBehavior === "setTargetFieldToNull") {
        logs.sourceDocumentWasDeleted_setTargetFieldToNull(change.after.id);

        const batch = db.batch();

        targetDocuments.forEach((targetDocument) => {
          batch.set(targetDocument.ref, { [config.targetFieldName]: null }, { merge: true });
        });

        await batch.commit();

        logs.targetFieldsWereSetToNullSuccessfully(change.after.id);
        return;
      }

      // If the source document delete behavior is "deleteTargetDocument", delete the target documents
      if (config.sourceDocumentDeleteBehavior === "deleteTargetDocument") {
        logs.sourceDocumentWasDeleted_deleteTargetDocument(change.after.id);

        const batch = db.batch();

        targetDocuments.forEach((targetDocument) => {
          batch.delete(targetDocument.ref);
        });

        await batch.commit();

        logs.targetDocumentsWereDeletedSuccessfully(change.after.id);
        return;
      }
    }

    // Get the document data
    let documentData = change.after.data() as Record<string, any>;

    // If the source fields are specified, get only those fields
    if (config.sourceFields) {
      documentData = config.sourceFields.reduce((acc: any, field) => {
        acc[field] = documentData[field];
        return acc;
      }, {});
    }

    // Update the target documents
    logs.sourceDocumentWasUpdated(change.after.id);

    const batch = db.batch();

    targetDocuments.forEach((targetDocument) => {
      batch.set(targetDocument.ref, { [config.targetFieldName]: documentData }, { merge: true });
    });

    await batch.commit();
    logs.targetFieldsWereUpdatedSuccessfully(change.after.id);
    return;
  });
