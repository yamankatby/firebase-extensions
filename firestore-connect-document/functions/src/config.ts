interface Config {
  sourceCollectionPath: string;
  targetCollectionPath: string;
  sourceDocumentIdFieldName: string;
  sourceFields?: string[];
  targetFieldName: string;
  sourceDocumentDeleteBehavior: "deleteTargetField" | "setTargetFieldToNull" | "deleteTargetDocument" | "nothing";
}

const config: Config = {
  sourceCollectionPath: process.env.SOURCE_COLLECTION_PATH!,
  targetCollectionPath: process.env.TARGET_COLLECTION_PATH!,
  sourceDocumentIdFieldName: process.env.SOURCE_DOCUMENT_ID_FIELD_NAME!,
  sourceFields: process.env.SOURCE_FIELDS?.split(","),
  targetFieldName: process.env.TARGET_FIELD_NAME!,
  sourceDocumentDeleteBehavior: process.env.SOURCE_DOCUMENT_DELETE_BEHAVIOR as Config["sourceDocumentDeleteBehavior"],
};

export default config;
