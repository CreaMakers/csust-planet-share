#!/usr/bin/env node

import path from "node:path";
import { mkdir, readdir, rm, stat } from "node:fs/promises";
import sharp from "sharp";

const projectRoot = path.resolve(import.meta.dirname, "..");
const sourceRoot = path.join(projectRoot, "assets/Apple");
const outputRoot = path.join(projectRoot, "src/assets/Apple");

const defaultQuality = 80;
const webpEffort = 6;

const presets = {
  "Family.png": { width: 2048 },
  "AppIcon.png": { width: 640, height: 640 },
  "iPhone/*.png": { width: 1120 },
  "iPad/*.png": { width: 1920 },
  "Mac/*.png": { width: 1920 },
};

const args = new Set(process.argv.slice(2));
const shouldClean = args.has("--clean");

function matchPreset(relativePath) {
  if (relativePath === "Family.png") {
    return presets["Family.png"];
  }

  if (relativePath === "AppIcon.png") {
    return presets["AppIcon.png"];
  }

  const segments = relativePath.split(path.sep);
  if (segments.length === 2) {
    const [group, fileName] = segments;
    if (fileName.endsWith(".png") && presets[`${group}/*.png`]) {
      return presets[`${group}/*.png`];
    }
  }

  return null;
}

async function walkFiles(rootDir) {
  const entries = await readdir(rootDir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(rootDir, entry.name);
      if (entry.isDirectory()) {
        return walkFiles(fullPath);
      }
      return [fullPath];
    }),
  );

  return files.flat();
}

function formatBytes(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(2)} ${units[unitIndex]}`;
}

async function optimizeImage(sourcePath) {
  const relativePath = path.relative(sourceRoot, sourcePath);
  const preset = matchPreset(relativePath);
  if (!preset) {
    return null;
  }

  const outputPath = path.join(outputRoot, relativePath.replace(/\.png$/i, ".webp"));
  await mkdir(path.dirname(outputPath), { recursive: true });

  const image = sharp(sourcePath, { animated: false });
  const metadata = await image.metadata();

  const resizeOptions = {
    width: preset.width,
    height: preset.height,
    fit: "inside",
    withoutEnlargement: true,
  };

  await image
    .resize(resizeOptions)
    .webp({
      quality: defaultQuality,
      effort: webpEffort,
    })
    .toFile(outputPath);

  const [sourceStats, outputStats] = await Promise.all([stat(sourcePath), stat(outputPath)]);

  return {
    relativePath,
    outputRelativePath: path.relative(projectRoot, outputPath),
    sourceSize: sourceStats.size,
    outputSize: outputStats.size,
    sourceWidth: metadata.width ?? 0,
    sourceHeight: metadata.height ?? 0,
    targetWidth: preset.width ?? metadata.width ?? 0,
    targetHeight: preset.height ?? metadata.height ?? 0,
  };
}

async function main() {
  if (shouldClean) {
    await rm(outputRoot, { recursive: true, force: true });
  }

  const sourceFiles = (await walkFiles(sourceRoot)).filter((filePath) => filePath.toLowerCase().endsWith(".png")).sort((left, right) => left.localeCompare(right));

  const results = [];
  for (const sourcePath of sourceFiles) {
    const result = await optimizeImage(sourcePath);
    if (result) {
      results.push(result);
    }
  }

  const totalSourceSize = results.reduce((sum, item) => sum + item.sourceSize, 0);
  const totalOutputSize = results.reduce((sum, item) => sum + item.outputSize, 0);

  console.log(`Optimized ${results.length} images into ${path.relative(projectRoot, outputRoot)}`);
  console.log("");

  for (const item of results) {
    const savingBytes = item.sourceSize - item.outputSize;
    const savingRate = item.sourceSize === 0 ? 0 : (savingBytes / item.sourceSize) * 100;
    console.log([item.relativePath, `${item.sourceWidth}x${item.sourceHeight} -> <=${item.targetWidth}${item.targetHeight ? `x${item.targetHeight}` : ""}`, `${formatBytes(item.sourceSize)} -> ${formatBytes(item.outputSize)}`, `saved ${formatBytes(savingBytes)} (${savingRate.toFixed(1)}%)`].join(" | "));
  }

  console.log("");
  console.log(`Total: ${formatBytes(totalSourceSize)} -> ${formatBytes(totalOutputSize)} (saved ${formatBytes(totalSourceSize - totalOutputSize)})`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
