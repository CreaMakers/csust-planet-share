import { heroSectionId, pageSections } from "../data/android";
import { initPlatformPage } from "./shared/platform-page";

const ANDROID_APP_VERSIONS_API_PREFIX = import.meta.env.PUBLIC_API_PREFIX;

type AppVersion = {
  downloadUrl?: string;
};

const updateAndroidDownloadLinks = async () => {
  if (!ANDROID_APP_VERSIONS_API_PREFIX) {
    return;
  }

  try {
    const response = await fetch(`${ANDROID_APP_VERSIONS_API_PREFIX}/config/app-versions?platform=android`);
    if (!response.ok) {
      return;
    }

    const appVersions = (await response.json()) as AppVersion[];
    const downloadUrl = appVersions[0]?.downloadUrl?.trim();

    if (!downloadUrl) {
      return;
    }

    document.querySelectorAll<HTMLAnchorElement>('[data-android-download-link="true"]').forEach((link) => {
      link.href = downloadUrl;
    });
  } catch {
    // Keep the existing placeholder link when the request fails.
  }
};

export const initAndroidPage = () => {
  initPlatformPage({ heroSectionId, pageSections });
  void updateAndroidDownloadLinks();
};
