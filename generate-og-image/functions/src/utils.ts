import twemoji from "twemoji";

const twOptions = { folder: "svg", ext: ".svg" };
export const emojify = (text: string) => twemoji.parse(text, twOptions);
