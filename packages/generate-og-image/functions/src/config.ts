interface Config {
  templatesCollection?: string;
  template?: string;
  width: number;
  height: number;
  imageFormat: "jpeg" | "png" | "webp";
}

const config: Config = {
  templatesCollection: process.env.TEMPLATES_COLLECTION,
  template: process.env.TEMPLATE,
  imageFormat: (process.env.IMAGE_FORMAT as Config["imageFormat"]) || "jpeg",

  width: Number(process.env.WIDTH) || 1200,
  height: Number(process.env.HEIGHT) || 630,
};

export default config;
