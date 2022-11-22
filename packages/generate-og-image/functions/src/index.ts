import * as functions from "firebase-functions";
import handlebars from "handlebars";
import core from "puppeteer-core";
import config from "./config";
import getOptions from "./options";

const compiledTemplate = handlebars.compile(config.template);

export const api = functions.handler.https.onRequest(async (req, res) => {
  const {
    width = config.width,
    height = config.height,
    format = config.imageFormat,
    ...rest
  } = req.query;

  const options = await getOptions();

  const browser = await core.launch(options);

  const page = await browser.newPage();

  await page.setViewport({ width: Number(width), height: Number(height) });

  const content = compiledTemplate(rest);

  await page.setContent(content);

  const buffer = await page.screenshot({ type: format as any });

  await browser.close();

  res.set("Content-Type", `image/${format}`);
  res.send(buffer);
});
