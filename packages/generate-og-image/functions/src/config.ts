interface Config {
  templatesCollection?: string;
  template?: string;
  markdownParams?: string[];

  width: number;
  height: number;
  imageFormat: "jpeg" | "png" | "webp";
}

const config: Config = {
  templatesCollection: process.env.TEMPLATES_COLLECTION,
  template: process.env.TEMPLATE,
  markdownParams: process.env.MARKDOWN_PARAMS?.split(","),

  width: Number(process.env.WIDTH) || 1200,
  height: Number(process.env.HEIGHT) || 630,
  imageFormat: (process.env.IMAGE_FORMAT as Config["imageFormat"]) || "jpeg",
};

export default config;
