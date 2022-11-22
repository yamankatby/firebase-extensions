import * as firebase from "firebase-admin";
import * as functions from "firebase-functions";
import handlebars, { TemplateDelegate } from "handlebars";
import { marked } from "marked";
import core from "puppeteer-core";
import config from "./config";
import getOptions from "./options";
import { isValidHttpUrl } from "./utils";

firebase.initializeApp();

const db = firebase.firestore();

let compiledTemplate: TemplateDelegate | undefined;

// If the template is a static HTML string, compile it once globally and reuse it
if (config.template && !isValidHttpUrl(config.template)) {
  compiledTemplate = handlebars.compile(config.template);
}

export const api = functions.handler.https.onRequest(async (req, res) => {
  const {
    template: templateDocumentId = "default", // The document ID of the template to use, in case a Firestore collection is set
    width = config.width, // The width of the image to generate
    height = config.height, // The height of the image to generate
    format = config.imageFormat, // The format of the image to generate
    ...params
  } = req.query;

  // If the template is a URL, refetch it on every request, so changes to the template are reflected immediately
  if (config.template && isValidHttpUrl(config.template)) {
    const template = await fetch(config.template).then((r) => r.text());
    compiledTemplate = handlebars.compile(template);
  }

  // If the templates collection is set, fetch the template from Firestore
  else if (config.templatesCollection) {
    const templateDocument = await db
      .collection(config.templatesCollection)
      .doc(templateDocumentId as string)
      .get();

    const template = templateDocument.get("template") as string;

    if (!template) {
      res.status(404).send("Template not found");
      return;
    }

    compiledTemplate = handlebars.compile(template);
  }

  // If no template is found, return an error
  if (!compiledTemplate) {
    res.status(404).send("Template not found");
    return;
  }

  if (config.markdownParams) {
    config.markdownParams.forEach((param) => {
      if (params[param]) {
        params[param] = marked(params[param] as string);
      }
    });
  }

  // Render the template
  const html = compiledTemplate(params);

  // Launch Puppeteer
  const options = await getOptions();

  const browser = await core.launch(options);

  const page = await browser.newPage();

  // Set the viewport size
  await page.setViewport({ width: Number(width), height: Number(height) });

  // Set the content of the page
  await page.setContent(html);

  // Take a screenshot
  const buffer = await page.screenshot({ type: format as any });

  // Close the browser
  await browser.close();

  // Send the screenshot as a response
  res.set("Content-Type", `image/${format}`);
  res.set("Cache-Control", "public, immutable, no-transform, max-age=31536000");
  res.send(buffer);
});
