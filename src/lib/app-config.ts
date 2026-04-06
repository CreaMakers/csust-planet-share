import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export type AppConfig = {
  apkUrl?: string;
};

const DEFAULT_APK_URL = "#";
const CONFIG_FILE_PATHS = [resolve(process.cwd(), "config/config.json"), resolve(process.cwd(), "config/config.template.json")];

export const readAppConfig = async (): Promise<AppConfig> => {
  for (const configFilePath of CONFIG_FILE_PATHS) {
    try {
      const configContent = await readFile(configFilePath, "utf-8");
      return JSON.parse(configContent) as AppConfig;
    } catch {
      continue;
    }
  }

  return {};
};

export const readAndroidApkUrl = async (): Promise<string> => {
  const { apkUrl } = await readAppConfig();

  if (typeof apkUrl !== "string" || !apkUrl.trim()) {
    return DEFAULT_APK_URL;
  }

  return apkUrl.trim();
};
