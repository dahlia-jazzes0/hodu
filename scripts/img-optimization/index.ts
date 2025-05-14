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
    },
    {
      pattern: /^box-cat\.png$/,
    },
    {
      pattern: /^img_[1-3]\.jpg$/,
      transform: (sharp) => sharp.resize(378, 378),
    },
    {
      pattern: /^img_5\.jpg$/,
      transform: (sharp) => sharp.resize(1920),
    },
    {
      pattern: /^cat-subscribe\.png$/,
      transform: (sharp) => sharp.resize(120),
    },
  ],
  convertTypes: [
    { ext: "png", transform: png },
    { ext: "webp", transform: webp },
    { ext: "avif", transform: avif },
  ],
});
function png(sharp: Sharp) {
  return sharp.png({
    compressionLevel: 9,
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
