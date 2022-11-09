import { logger } from "firebase-functions";
import config from "./config";

// "onTargetDocumentChange" function logs
export const targetDocumentWasDeleted = (id: string) => {
  logger.log(`The target document ${config.targetCollectionPath}/${id} has been deleted, no processing is required.`);
};

export const sourceDocumentIdNotExists = (id: string) => {
  logger.log(
    `The "${config.sourceDocumentIdFieldName}" field does not exist in the target document "${config.targetCollectionPath}/${id}", no processing is required.`
  );
};

export const sourceDocumentIdWasNotChanged = (id: string) => {
  logger.log(
    `The "${config.sourceDocumentIdFieldName}" field of the target document "${config.targetCollectionPath}/${id}" has not been changed, no processing is required.`
  );
};

export const sourceDocumentIdWasDeleted = (id: string) => {
  logger.log(
    `The "${config.sourceDocumentIdFieldName}" field of the target document "${config.targetCollectionPath}/${id}" has been deleted, deleting the "${config.targetFieldName}" field...`
  );
};

export const targetFieldWasDeletedSuccessfully = (id: string) => {
  logger.log(
    `The "${config.targetFieldName}" field of the target document "${config.targetCollectionPath}/${id}" has been deleted successfully.`
  );
};

export const sourceDocumentWasNotFound = (id: string) => {
  logger.log(`The source document "${config.sourceCollectionPath}/${id}" was not found, no processing is required.`);
};

export const targetFieldWasUpdatedSuccessfully = (id: string) => {
  logger.log(
    `The "${config.targetFieldName}" field of the target document "${config.targetCollectionPath}/${id}" has been updated successfully.`
  );
};

// "onSourceDocumentChange" function logs
export const sourceDocumentWasDeleted_doNothing = (id: string) => {
  logger.log(
    `The source document "${config.sourceCollectionPath}/${id}" has been deleted, but the behavior is set to "do nothing", no processing is required.`
  );
};

export const noTargetDocumentWasFound = (id: string) => {
  logger.log(
    `No target document was found for the source document "${config.sourceCollectionPath}/${id}", no processing is required.`
  );
};

export const sourceDocumentWasDeleted_deleteTargetField = (id: string) => {
  logger.log(
    `The source document "${config.sourceCollectionPath}/${id}" has been deleted, deleting the "${config.targetFieldName}" fields...`
  );
};

export const targetFieldsWereDeletedSuccessfully = (id: string) => {
  logger.log(
    `The "${config.targetFieldName}" fields of the target collection "${config.targetCollectionPath}" with the source document ID "${config.sourceCollectionPath}/${id}" have been deleted successfully.`
  );
};

export const sourceDocumentWasDeleted_setTargetFieldToNull = (id: string) => {
  logger.log(
    `The source document "${config.sourceCollectionPath}/${id}" has been deleted, setting the "${config.targetFieldName}" fields to null...`
  );
};

export const targetFieldsWereSetToNullSuccessfully = (id: string) => {
  logger.log(
    `The "${config.targetFieldName}" fields of the target collection "${config.targetCollectionPath}" with the source document ID "${config.sourceCollectionPath}/${id}" have been set to null successfully.`
  );
};

export const sourceDocumentWasDeleted_deleteTargetDocument = (id: string) => {
  logger.log(
    `The source document "${config.sourceCollectionPath}/${id}" has been deleted, deleting the target documents...`
  );
};

export const targetDocumentsWereDeletedSuccessfully = (id: string) => {
  logger.log(
    `The target documents of the target collection "${config.targetCollectionPath}" with the source document ID "${config.sourceCollectionPath}/${id}" have been deleted successfully.`
  );
};

export const sourceDocumentWasUpdated = (id: string) => {
  logger.log(
    `The source document "${config.sourceCollectionPath}/${id}" has been updated, updating the target documents...`
  );
};

export const targetFieldsWereUpdatedSuccessfully = (id: string) => {
  logger.log(
    `The "${config.targetFieldName}" fields of the target collection "${config.targetCollectionPath}" with the source document ID "${config.sourceCollectionPath}/${id}" have been updated successfully.`
  );
};
