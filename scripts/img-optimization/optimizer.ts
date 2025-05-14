import { file, write } from "bun";
import { readdir } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import type { Sharp } from "sharp";
import sharp from "sharp";

type SharpTransform = (sharp: Sharp) => Sharp;
export interface Target {
  pattern: RegExp;
  transform?: SharpTransform;
  preserve?: boolean;
}

export async function optimize({
  imgSourcePath,
  imgTargetPath,
  targets,
  convertTypes,
  caching = true,
}: {
  imgSourcePath: string;
  imgTargetPath: string;
  targets: Target[];
  convertTypes: { ext: string; transform: SharpTransform }[];
  caching?: boolean;
}) {
  for (const filename of await readdir(imgSourcePath)) {
    const target = getTarget(filename);
    if (target == null) continue;

    const sourcePath = join(imgSourcePath, filename);
    if (target.preserve) {
      const targetPath = join(imgTargetPath, filename);
      await write(targetPath, file(sourcePath));
      continue;
    }

    const name = basename(filename, extname(filename));
    for (const type of convertTypes) {
      const filename = `${name}.${type.ext}`;
      const targetPath = join(imgTargetPath, filename);

      if (caching && (await file(targetPath).exists())) continue;

      let s = sharp(sourcePath).rotate();
      s = target.transform?.(s) ?? s;
      s = type.transform(s);
      await s.toFile(targetPath);
    }
  }

  function getTarget(filename: string) {
    for (const target of targets) {
      if (!target.pattern.test(filename)) continue;
      return target;
    }
  }
}
