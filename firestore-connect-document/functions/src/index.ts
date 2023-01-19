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

firebase.initializeApp();

const db = firebase.firestore();
const logger = functions.logger;

export const onTargetDocumentChange = functions.firestore
  .document(`${config.targetCollectionPath}/{documentId}`)
  .onWrite(async (change) => {
    // If the document was deleted, do nothing
    if (!change.after.exists) {
      logger.log(
        `The target document "${config.targetCollectionPath}/${change.before.id}" has been deleted, no processing is required.`
      );
      return;
    }

    // Get the source document ID
    const sourceDocumentId = change.after.get(
      config.sourceDocumentIdFieldName
    ) as string;

    // If the source document ID is not set, do nothing
    if (
      !change.before.get(config.sourceDocumentIdFieldName) &&
      !sourceDocumentId
    ) {
      logger.log(
        `The target document "${config.targetCollectionPath}/${change.after.id}" has no source document ID, no processing is required.`
      );
      return;
    }

    // If the source document ID has not changed, do nothing
    if (
      change.before.get(config.sourceDocumentIdFieldName) === sourceDocumentId
    ) {
      logger.log(
        `The source document ID of the target document "${config.targetCollectionPath}/${change.after.id}" has not changed, no processing is required.`
      );
      return;
    }

    // If the source document ID was removed, delete the target field
    if (
      change.before.get(config.sourceDocumentIdFieldName) &&
      !sourceDocumentId
    ) {
      logger.log(
        `The source document ID of the target document "${config.targetCollectionPath}/${change.after.id}" has been removed, deleting the target document.`
      );

      try {
        await change.after.ref.set(
          { [config.targetFieldName]: firebase.firestore.FieldValue.delete() },
          { merge: true }
        );
        logger.log(
          `The target field "${config.targetFieldName}" of the target document "${config.targetCollectionPath}/${change.after.id}" has been deleted successfully.`
        );
        return;
      } catch (error) {
        logger.error(
          `An error occurred while deleting the target field "${config.targetFieldName}" of the target document "${config.targetCollectionPath}/${change.after.id}":`,
          error
        );
        throw error;
      }
    }

    // Get the source document
    const sourceDocument = await db
      .doc(`${config.sourceCollectionPath}/${sourceDocumentId}`)
      .get();

    // If the source document does not exist, do nothing
    if (!sourceDocument.exists) {
      logger.log(
        `The source document "${config.sourceCollectionPath}/${sourceDocumentId}" does not exist, no processing is required.`
      );
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
    try {
      await change.after.ref.set(
        { [config.targetFieldName]: sourceDocumentData },
        { merge: true }
      );
      logger.log(
        `The target document "${config.targetCollectionPath}/${change.after.id}" has been updated successfully.`
      );
      return;
    } catch (error) {
      logger.error(
        `An error occurred while updating the target document "${config.targetCollectionPath}/${change.after.id}":`,
        error
      );
      throw error;
    }
  });

export const onSourceDocumentChange = functions.firestore
  .document(`${config.sourceCollectionPath}/{documentId}`)
  .onWrite(async (change) => {
    // If the document was deleted and the source document delete behavior is "nothing", do nothing
    if (
      !change.after.exists &&
      config.sourceDocumentDeleteBehavior === "nothing"
    ) {
      logger.log(
        `The source document "${config.sourceCollectionPath}/${change.before.id}" has been deleted, no processing is required.`
      );
      return;
    }

    // Get the target documents
    const targetDocuments = await db
      .collection(config.targetCollectionPath)
      .where(config.sourceDocumentIdFieldName, "==", change.after.id)
      .get();

    // If there are no target documents, do nothing
    if (targetDocuments.empty) {
      logger.log(
        `The source document "${config.sourceCollectionPath}/${change.after.id}" has no target documents, no processing is required.`
      );
      return;
    }

    // If the document was deleted and the source document delete behavior is not "nothing"
    if (!change.after.exists) {
      // If the source document delete behavior is "deleteTargetField", delete the target fields
      if (config.sourceDocumentDeleteBehavior === "deleteTargetField") {
        logger.log(
          `The source document "${config.sourceCollectionPath}/${change.before.id}" has been deleted, deleting the target fields.`
        );

        try {
          const batch = db.batch();

          targetDocuments.forEach((targetDocument) => {
            batch.set(
              targetDocument.ref,
              {
                [config.targetFieldName]:
                  firebase.firestore.FieldValue.delete(),
              },
              { merge: true }
            );
          });

          await batch.commit();

          logger.log(
            `The target fields "${config.targetFieldName}" related to the source document "${config.sourceCollectionPath}/${change.before.id}" have been deleted successfully.`
          );
          return;
        } catch (error) {
          logger.error(
            `An error occurred while deleting the target fields "${config.targetFieldName}" related to the source document "${config.sourceCollectionPath}/${change.before.id}":`,
            error
          );
          throw error;
        }
      }

      // If the source document delete behavior is "setTargetFieldToNull", set the target fields to null
      if (config.sourceDocumentDeleteBehavior === "setTargetFieldToNull") {
        logger.log(
          `The source document "${config.sourceCollectionPath}/${change.before.id}" has been deleted, setting the target fields to null.`
        );

        try {
          const batch = db.batch();

          targetDocuments.forEach((targetDocument) => {
            batch.set(
              targetDocument.ref,
              { [config.targetFieldName]: null },
              { merge: true }
            );
          });

          await batch.commit();

          logger.log(
            `The target fields "${config.targetFieldName}" related to the source document "${config.sourceCollectionPath}/${change.before.id}" have been set to null successfully.`
          );
          return;
        } catch (error) {
          logger.error(
            `An error occurred while setting the target fields "${config.targetFieldName}" related to the source document "${config.sourceCollectionPath}/${change.before.id}" to null:`,
            error
          );
          throw error;
        }
      }

      // If the source document delete behavior is "deleteTargetDocument", delete the target documents
      if (config.sourceDocumentDeleteBehavior === "deleteTargetDocument") {
        logger.log(
          `The source document "${config.sourceCollectionPath}/${change.before.id}" has been deleted, deleting the target documents.`
        );

        try {
          const batch = db.batch();

          targetDocuments.forEach((targetDocument) => {
            batch.delete(targetDocument.ref);
          });

          await batch.commit();

          logger.log(
            `The target documents related to the source document "${config.sourceCollectionPath}/${change.before.id}" have been deleted successfully.`
          );
          return;
        } catch (error) {
          logger.error(
            `An error occurred while deleting the target documents related to the source document "${config.sourceCollectionPath}/${change.before.id}":`,
            error
          );
          throw error;
        }
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
    try {
      const batch = db.batch();

      targetDocuments.forEach((targetDocument) => {
        batch.set(
          targetDocument.ref,
          { [config.targetFieldName]: documentData },
          { merge: true }
        );
      });

      await batch.commit();

      logger.log(
        `The target documents related to the source document "${config.sourceCollectionPath}/${change.after.id}" have been updated successfully.`
      );
      return;
    } catch (error) {
      logger.error(
        `An error occurred while updating the target documents related to the source document "${config.sourceCollectionPath}/${change.after.id}":`,
        error
      );
      throw error;
    }
  });
