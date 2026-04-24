const appleImageModules = import.meta.glob<{ default: ImageMetadata }>("../assets/Apple/**/*.webp", {
  eager: true,
});

export const getAppleImage = (path: string) => {
  const imageModule = appleImageModules[`../assets/Apple/${path}`];

  if (!imageModule) {
    throw new Error(`Missing Apple image asset: ${path}`);
  }

  return imageModule.default;
};

export const appIconImage = getAppleImage("AppIcon.webp");
export const familyImage = getAppleImage("Family.webp");
