import * as firebase from "firebase-admin";
import * as functions from "firebase-functions";

interface Config {
  template?: string;
  templatesCollection?: string;
  markdownParams?: string[];
  emoji: "system" | "twemoji";
  width: number;
  height: number;
  format: "jpeg" | "webp" | "png";
  cacheControl: string;
}

const config: Config = {
  template: process.env.TEMPLATE,
  templatesCollection: process.env.TEMPLATES_COLLECTION,
  markdownParams: process.env.MARKDOWN_PARAMS?.split(","),
  emoji: process.env.EMOJI as "system" | "twemoji",
  width: parseInt(process.env.WIDTH!, 10),
  height: parseInt(process.env.HEIGHT!, 10),
  format: process.env.FORMAT as "jpeg" | "webp" | "png",
  cacheControl: process.env.CACHE_CONTROL!,
};

export const parseConfig = (
  q: functions.https.Request["query"],
  doc: firebase.firestore.DocumentData | undefined
) => {
  const {
    markdownParams: qMarkdownParams,
    emoji: qEmoji,
    width: qWidth,
    height: qHeight,
    format: qFormat,
    cacheControl: qCacheControl,
    ...qParams
  } = q;

  const {
    markdownParams: docMarkdownParams,
    emoji: docEmoji,
    width: docWidth,
    height: docHeight,
    format: docFormat,
    cacheControl: docCacheControl,
    ...docParams
  } = doc || {};

  return {
    markdownParams:
      qMarkdownParams?.split(",") || docMarkdownParams || config.markdownParams,
    emoji: qEmoji || docEmoji || config.emoji,
    width: Number(qWidth) || docWidth || config.width,
    height: Number(qHeight) || docHeight || config.height,
    format: qFormat || docFormat || config.format,
    cacheControl: qCacheControl || docCacheControl || config.cacheControl,
    params: { ...docParams, ...qParams, template: undefined },
  };
};

export default config;
