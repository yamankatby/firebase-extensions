interface Config {
  templatesCollection: string;
  createExampleTemplate: boolean;
  corsOrigin: string;
}

const config: Config = {
  templatesCollection: process.env.TEMPLATES_COLLECTION!!,
  createExampleTemplate: process.env.CREATE_EXAMPLE_TEMPLATE === "true",
  corsOrigin: process.env.CORS_ORIGIN!,
};

export default config;

type Format = "jpeg" | "webp" | "png";

type EmojiStyle = "twemoji";

export interface TemplateConfig {
  width: number;
  height: number;
  format: Format;
  emojiStyle: EmojiStyle;
  markdownParams: string[];
}
