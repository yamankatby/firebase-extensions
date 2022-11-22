import twemoji from "twemoji";

export const isValidHttpUrl = (string: string) => {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
};

const twOptions = { folder: "svg", ext: ".svg" };
export const emojify = (text: string) => twemoji.parse(text, twOptions);
