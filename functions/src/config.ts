interface Config {
  collectionPath: string;
  dataDocumentIdFieldName: string;
  dataFieldName: string;
  dataFields: string[];
  dataCollectionPath: string;
}

const config: Config = {
  collectionPath: process.env.COLLECTION_PATH,
  dataDocumentIdFieldName: process.env.DATA_DOCUMENT_ID_FIELD_NAME,
  dataFieldName: process.env.DATA_FIELD_NAME,
  dataFields: process.env.DATA_FIELDS.split(","),
  dataCollectionPath: process.env.DATA_COLLECTION_PATH,
};

export default config;
