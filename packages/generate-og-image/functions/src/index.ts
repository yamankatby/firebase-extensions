import * as functions from "firebase-functions";

export const api = functions.handler.https.onRequest((req, res) => {
  res.send("Hello from Firebase!");
});
