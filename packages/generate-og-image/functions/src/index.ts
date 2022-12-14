import * as firebase from "firebase-admin";
import * as functions from "firebase-functions";
import handlebars, { TemplateDelegate } from "handlebars";
import { marked } from "marked";
import core from "puppeteer-core";
import config, { parseConfig } from "./config";
import getOptions from "./options";
import { emojify, isValidHttpUrl } from "./utils";

firebase.initializeApp();

const db = firebase.firestore();

let compiledTemplate: TemplateDelegate | undefined;

// If the template is a static HTML string, compile it once globally and reuse it
if (config.template && !isValidHttpUrl(config.template)) {
  compiledTemplate = handlebars.compile(config.template);
}

export const api = functions.handler.https.onRequest(async (req, res) => {
  let templateDocumentData: firebase.firestore.DocumentData | undefined;

  // If the template is a URL, refetch it on every request, so changes to the template are reflected immediately
  if (config.template && isValidHttpUrl(config.template)) {
    const template = await fetch(config.template).then((r) => r.text());
    compiledTemplate = handlebars.compile(template);
  }

  // If the templates collection is set, fetch the template from Firestore
  else if (config.templatesCollection) {
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
    compiledTemplate = handlebars.compile(template);
  }

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
