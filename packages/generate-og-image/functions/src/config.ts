interface Config {
  template: string;
  width: number;
  height: number;
  imageFormat: "jpeg" | "png" | "webp";
}

const config: Config = {
  template: process.env.TEMPLATE || "",
  width: Number(process.env.WIDTH) || 1200,
  height: Number(process.env.HEIGHT) || 630,
  imageFormat: (process.env.IMAGE_FORMAT as Config["imageFormat"]) || "jpeg",
};

export default config;
