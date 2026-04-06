import { heroSectionId, pageSections } from "../data/android";
import { initPlatformPage } from "./shared/platform-page";

export const initAndroidPage = () => {
  initPlatformPage({ heroSectionId, pageSections });
};
