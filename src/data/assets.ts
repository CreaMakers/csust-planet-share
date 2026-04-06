const appleImageModules = import.meta.glob<{ default: ImageMetadata }>("../assets/Apple/**/*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
});

export const getAppleImage = (path: string) => {
  const imageModule = appleImageModules[`../assets/Apple/${path}`];

  if (!imageModule) {
    throw new Error(`Missing Apple image asset: ${path}`);
  }

  return imageModule.default;
};

export const appIconImage = getAppleImage("AppIcon.png");
export const familyImage = getAppleImage("Family.png");
