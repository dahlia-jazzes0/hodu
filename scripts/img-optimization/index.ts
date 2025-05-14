import { join } from "node:path";
import type { Sharp } from "sharp";
import { optimize } from "./optimizer";

await optimize({
  caching: true,
  imgSourcePath: join(import.meta.dir, "../../img-source"),
  imgTargetPath: join(import.meta.dir, "../../img"),
  targets: [
    {
      pattern: /\.svg$/,
      preserve: true,
    },
    {
      pattern: /^img_4\.jpg$/,
      transform: (sharp) => sharp.resize(660),
      types: ["jpg", "webp", "avif"],
    },
    {
      pattern: /^box-cat\.png$/,
      types: ["png", "webp", "avif"],
    },
    {
      pattern: /^img_[1-3]\.jpg$/,
      transform: (sharp) => sharp.resize(378, 378),
      types: ["jpg", "webp", "avif"],
    },
    {
      pattern: /^img_5\.jpg$/,
      transform: (sharp) => sharp.resize(1920),
      types: ["jpg", "webp", "avif"],
    },
    {
      pattern: /^cat-subscribe\.png$/,
      transform: (sharp) => sharp.resize(120),
      types: ["png", "webp", "avif"],
    },
  ],
  convertTypes: [
    { ext: "png", transform: png },
    { ext: "jpg", transform: jpg },
    { ext: "webp", transform: webp },
    { ext: "avif", transform: avif },
  ],
});
function png(sharp: Sharp) {
  return sharp.png({
    compressionLevel: 9,
    effort: 10,
    quality: 70,
  });
}
function jpg(sharp: Sharp) {
  return sharp.jpeg({
    quality: 70,
  });
}
function webp(sharp: Sharp) {
  return sharp.webp({
    effort: 6,
  });
}
function avif(sharp: Sharp) {
  return sharp.avif({
    effort: 9,
  });
}
