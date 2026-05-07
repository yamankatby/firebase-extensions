export enum DeletionBehavior {
  DeleteDoc = "deleteDoc",
  DeleteField = "deleteField",
  SetNull = "setNull",
  Ignore = "ignore",
}

interface Config {
  collectionAPath: string;
  collectionBPath: string;
  collectionADataField: string;
  collectionBDataField: string;
  fieldsToCopyFromAToB?: string[];
  fieldsToCopyFromBToA?: string[];
  collectionADeletionBehavior: DeletionBehavior;
  collectionBDeletionBehavior: DeletionBehavior;
}

const config: Config = {
  collectionAPath: process.env.COLLECTION_A_PATH!,
  collectionBPath: process.env.COLLECTION_B_PATH!,
  collectionADataField: process.env.COLLECTION_A_DATA_FIELD!,
  collectionBDataField: process.env.COLLECTION_B_DATA_FIELD!,
  fieldsToCopyFromAToB: process.env.FIELDS_TO_COPY_FROM_A_TO_B?.split(","),
  fieldsToCopyFromBToA: process.env.FIELDS_TO_COPY_FROM_B_TO_A?.split(","),
  collectionADeletionBehavior: process.env
    .COLLECTION_A_DELETION_BEHAVIOR! as DeletionBehavior,
  collectionBDeletionBehavior: process.env
    .COLLECTION_B_DELETION_BEHAVIOR! as DeletionBehavior,
};

export interface CollectionConfig {
  collectionPath: string;
  dataField: string;
  fieldsToCopy?: string[];
  deletionBehavior: DeletionBehavior;
}

export const collectionAConfig: CollectionConfig = {
  collectionPath: config.collectionAPath,
  dataField: config.collectionADataField,
  fieldsToCopy: config.fieldsToCopyFromAToB,
  deletionBehavior: config.collectionADeletionBehavior,
};

export const collectionBConfig: CollectionConfig = {
  collectionPath: config.collectionBPath,
  dataField: config.collectionBDataField,
  fieldsToCopy: config.fieldsToCopyFromBToA,
  deletionBehavior: config.collectionBDeletionBehavior,
};
