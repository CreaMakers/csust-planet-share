import { appIconImage } from "./assets";

export type AppLayoutLink = {
  label: string;
  href: string;
};

export const defaultLayoutTitle = "长理星球";
export const defaultLayoutDescription = "长理星球官方页面";

export const footerBrand = {
  eyebrow: "版权声明",
  iconSrc: appIconImage,
  iconAlt: "长理星球 App Icon",
  title: "长理星球",
  description: "长理星球为社区开发项目，并非长沙理工大学官方产品。长沙理工大学相关校名、校徽与标识权利归长沙理工大学所有。",
  legalLines: ["© 2024-2026 CreaMakers", "湘ICP备2024091230号-2"],
} as const;

export const iosPrimaryLinks: AppLayoutLink[] = [
  { label: "iOS 页面", href: "/ios" },
  { label: "App Store", href: "https://apps.apple.com/zh/app/%E9%95%BF%E7%90%86%E6%98%9F%E7%90%83/id6748840801" },
  { label: "TestFlight", href: "https://testflight.apple.com/join/xMbzN8aU" },
  { label: "iOS 支持", href: "/ios/support" },
  { label: "用户协议", href: "/ios/user-agreement" },
  { label: "意见反馈", href: "https://my.feishu.cn/share/base/form/shrcnmYT0Hn0MEWoV11cnfi7zHg" },
];

export const iosSourceLinks: AppLayoutLink[] = [
  { label: "iOS App 开源", href: "https://github.com/zHElEARN/CSUSTPlanet" },
  { label: "iOS 后端开源", href: "https://github.com/zHElEARN/go-csust-planet" },
  { label: "iOS 网络库开源", href: "https://github.com/zHElEARN/CSUSTKit" },
];

export const createAndroidPrimaryLinks = (apkUrl: string): AppLayoutLink[] => [
  { label: "Android 页面", href: "/android" },
  { label: "Android 下载", href: apkUrl },
  { label: "意见反馈", href: "https://creamaker.feishu.cn/share/base/form/shrcn6LjBK78JLJfLeKDMe3hczd?chunked=false" },
];

export const androidSourceLinks: AppLayoutLink[] = [
  { label: "Android App 开源", href: "https://github.com/CreaMakers/changli-planet-app" },
  { label: "Android 后端开源", href: "https://github.com/CreaMakers/changli-planet-backend" },
  { label: "Android 网络库开源", href: "https://github.com/CreaMakers/CSUSTDataGet" },
];

export const communityLinks: AppLayoutLink[] = [{ label: "QQ 交流群", href: "mqqapi://card/show_pslcard?src_type=internal&version=1&uin=125010161&key=&card_type=group&source=external" }];
