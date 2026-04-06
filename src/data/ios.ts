import { getAppleImage } from "./assets";
import type { InstallOption, PageSection, SourceOrganization, SourceProject } from "./shared";

export const pageTitle = "长理星球 | iOS";
export const pageDescription = "长理星球 iOS 版本简介与安装入口";

export const heroSectionId = "ios-home";
export const featureShowcaseSectionId = "ios-feature-showcase";
export const installOptionsSectionId = "install-options";
export const sourceCodeSectionId = "source-code";
export const joinUsSectionId = "join-us";

export const pageSections = [
  { id: heroSectionId, label: "首页" },
  { id: featureShowcaseSectionId, label: "功能介绍" },
  { id: installOptionsSectionId, label: "安装方式" },
  { id: sourceCodeSectionId, label: "源代码" },
  { id: joinUsSectionId, label: "加入我们" },
] satisfies ReadonlyArray<PageSection>;

export const featurePlatforms = [
  {
    id: "iphone",
    label: "iPhone",
    imageClass: "max-h-[calc(100vh-8rem)] w-auto max-w-[20rem]",
  },
  {
    id: "ipad",
    label: "iPad",
    imageClass: "max-h-[calc(100vh-9rem)] w-auto max-w-full",
  },
  {
    id: "mac",
    label: "Mac",
    imageClass: "max-h-[calc(100vh-9rem)] w-auto max-w-full",
  },
] as const;

export type FeaturePlatformId = (typeof featurePlatforms)[number]["id"];

export type FeatureSlide = {
  title: string;
  description: string;
  images: Record<FeaturePlatformId, ImageMetadata>;
};

export const featureImageWidths: Record<FeaturePlatformId, number[]> = {
  iphone: [320, 480, 640, 800, 1120],
  ipad: [480, 768, 1024, 1280, 1600, 1920],
  mac: [480, 768, 1024, 1280, 1600, 1920],
};

export const desktopFeatureImageSizes: Record<FeaturePlatformId, string> = {
  iphone: "(min-width: 1280px) 20rem, (min-width: 1024px) 18rem, calc(100vw - 2rem)",
  ipad: "(min-width: 1024px) 50vw, calc(100vw - 2rem)",
  mac: "(min-width: 1024px) 50vw, calc(100vw - 2rem)",
};

export const mobileFeatureImageSizes: Record<FeaturePlatformId, string> = {
  iphone: "(min-width: 640px) calc(100vw - 4rem), calc(100vw - 2rem)",
  ipad: "(min-width: 640px) calc(100vw - 4rem), calc(100vw - 2rem)",
  mac: "(min-width: 640px) calc(100vw - 4rem), calc(100vw - 2rem)",
};

export const featureSlides: FeatureSlide[] = [
  {
    title: "概览",
    description: "快速查看课程、成绩、电量和作业等",
    images: {
      iphone: getAppleImage("iPhone/1.png"),
      ipad: getAppleImage("iPad/1.png"),
      mac: getAppleImage("Mac/1.png"),
    },
  },
  {
    title: "小组件",
    description: "在桌面直接查看各个数据",
    images: {
      iphone: getAppleImage("iPhone/2.png"),
      ipad: getAppleImage("iPad/2.png"),
      mac: getAppleImage("Mac/2.png"),
    },
  },
  {
    title: "我的课表",
    description: "自动导入教务系统课表数据",
    images: {
      iphone: getAppleImage("iPhone/3.png"),
      ipad: getAppleImage("iPad/3.png"),
      mac: getAppleImage("Mac/3.png"),
    },
  },
  {
    title: "成绩查询",
    description: "查询教务系统的所有成绩",
    images: {
      iphone: getAppleImage("iPhone/4.png"),
      ipad: getAppleImage("iPad/4.png"),
      mac: getAppleImage("Mac/4.png"),
    },
  },
  {
    title: "成绩详细",
    description: "深入查看成绩具体组成分布",
    images: {
      iphone: getAppleImage("iPhone/5.png"),
      ipad: getAppleImage("iPad/5.png"),
      mac: getAppleImage("Mac/5.png"),
    },
  },
  {
    title: "电量查询",
    description: "绑定宿舍快速查询当前电量",
    images: {
      iphone: getAppleImage("iPhone/6.png"),
      ipad: getAppleImage("iPad/6.png"),
      mac: getAppleImage("Mac/6.png"),
    },
  },
  {
    title: "待提交作业",
    description: "查询网络课程平台所有的待提交作业",
    images: {
      iphone: getAppleImage("iPhone/7.png"),
      ipad: getAppleImage("iPad/7.png"),
      mac: getAppleImage("Mac/7.png"),
    },
  },
  {
    title: "校园地图",
    description: "快速查看各个校区教学楼等楼栋位置",
    images: {
      iphone: getAppleImage("iPhone/8.png"),
      ipad: getAppleImage("iPad/8.png"),
      mac: getAppleImage("Mac/8.png"),
    },
  },
  {
    title: "考试安排",
    description: "查询教务系统的所有考试信息",
    images: {
      iphone: getAppleImage("iPhone/9.png"),
      ipad: getAppleImage("iPad/9.png"),
      mac: getAppleImage("Mac/9.png"),
    },
  },
];

export const featureSectionHeight = `${(featureSlides.length + 1) * 100}vh`;

export const installOptions = [
  {
    title: "App Store",
    description: "通过 App Store 下载并安装正式版。",
    href: "https://apps.apple.com/zh/app/%E9%95%BF%E7%90%86%E6%98%9F%E7%90%83/id6748840801",
    ctaLabel: "前往 App Store",
    icon: "appstore",
  },
  {
    title: "TestFlight",
    description: "加入 TestFlight，抢先体验测试版本。",
    href: "https://testflight.apple.com/join/xMbzN8aU",
    ctaLabel: "加入 TestFlight",
    icon: "testflight",
  },
] satisfies ReadonlyArray<InstallOption>;

export const sourceOrganization = {
  name: "CreaMakers",
  href: "https://github.com/CreaMakers",
} satisfies SourceOrganization;

export const sourceProjects = [
  {
    title: "CSUSTPlanet",
    description: "长理星球 iOS 客户端源码",
    href: "https://github.com/zHElEARN/CSUSTPlanet",
    icon: "client",
  },
  {
    title: "go-planet-backend",
    description: "iOS 客户端配套后端服务源码",
    href: "https://github.com/zHElEARN/go-csust-planet",
    icon: "backend",
  },
  {
    title: "CSUSTKit",
    description: "核心网络 SDK 库",
    href: "https://github.com/zHElEARN/CSUSTKit",
    icon: "sdk",
  },
] satisfies ReadonlyArray<SourceProject>;

export const joinUsFormUrl = "https://creamaker.feishu.cn/share/base/form/shrcnOIl2W9rBAcEYYrK12l6Ffd";
