import cors from "cors";
import express from "express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import handlebars from "handlebars";
import helmet from "helmet";
import { marked } from "marked";
import core from "puppeteer-core";
import config, { parseConfig } from "./config";
import getOptions from "./options";
import { emojify } from "./utils";

admin.initializeApp();

const db = admin.firestore();

const app = express();

app.use(helmet());

app.use(
  cors({
    methods: ["GET"],
    origin: config.corsOrigin,
  })
);

app.get("/", async (req, res) => {
  let templateDocumentData: admin.firestore.DocumentData | undefined;

  // Get the template name from the request query
  const templateDocumentId = (req.query.template as string) || "default";

  // Get the template document from Firestore
  const templateDocument = await db
    .collection(config.templatesCollection)
    .doc(templateDocumentId)
    .get();

  // Extract the template field from the document
  const template = templateDocument.get("template") as string;

  // If either the document as a whole or the template field is missing, return a 404
  if (!template) {
    res.status(404).send("Template not found");
    return;
  }

  templateDocumentData = templateDocument.data();

  // Compile the template from the document
  const compiledTemplate = handlebars.compile(template);

  // If no template is found, return a 404
  if (!compiledTemplate) {
    res.status(404).send("Template not found");
    return;
  }

  const { markdownParams, emoji, width, height, format, cacheControl, params } =
    parseConfig(req.query, templateDocumentData);

  const parsedParams: any = { ...params };

  // If there are markdown params, parse them
  if (markdownParams) {
    for (const param of markdownParams) {
      if (parsedParams[param]) {
        parsedParams[param] = marked(parsedParams[param] as string);
      }
    }
  }

  // Render the template
  let html = compiledTemplate(parsedParams);

  // If the emoji provider is set to twemoji, replace all emoji with twemoji
  if (emoji === "twemoji") {
    html = emojify(html);
  }

  // Launch Puppeteer
  const options = await getOptions();

  const browser = await core.launch(options);

  const page = await browser.newPage();

  // Set the viewport size
  await page.setViewport({ width, height });

  // Set the content of the page
  await page.setContent(html);

  // Take a screenshot
  const buffer = await page.screenshot({ type: format as any });

  // Close the browser
  await browser.close();

  // Send the screenshot as a response
  res.set("Content-Type", `image/${format}`);
  res.set("Cache-Control", cacheControl);
  res.send(buffer);
});

app.use("*", function notFoundHandler(_, res) {
  res.status(404).send("Not Found");
});

export const api = functions.https.onRequest(app);
