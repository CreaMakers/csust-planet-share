import type { InstallOption, PageSection, SourceOrganization, SourceProject } from "./shared";

export const pageTitle = "长理星球";
export const pageDescription = "长理星球 Android 版本安装与开源项目入口。";

export const heroSectionId = "android-home";
export const installOptionsSectionId = "install-options";
export const sourceCodeSectionId = "source-code";
export const joinUsSectionId = "join-us";

export const pageSections = [
  { id: heroSectionId, label: "首页" },
  { id: installOptionsSectionId, label: "安装方式" },
  { id: sourceCodeSectionId, label: "源代码" },
  { id: joinUsSectionId, label: "加入我们" },
] satisfies ReadonlyArray<PageSection>;

export const createInstallOptions = (apkUrl: string): InstallOption[] => [
  {
    title: "Android APK",
    description: "下载最新版 APK 安装包，直接完成安装。",
    href: apkUrl,
    ctaLabel: "下载 Android APK",
    icon: "android",
  },
];

export const sourceOrganization = {
  name: "CreaMakers",
  href: "https://github.com/CreaMakers",
} satisfies SourceOrganization;

export const sourceProjects = [
  {
    title: "changli-planet-app",
    description: "长理星球 Android 客户端源码",
    href: "https://github.com/CreaMakers/changli-planet-app",
    icon: "client",
  },
  {
    title: "changli-planet-backend",
    description: "Android 客户端配套后端服务源码",
    href: "https://github.com/CreaMakers/changli-planet-backend",
    icon: "backend",
  },
  {
    title: "CSUSTDataGet",
    description: "Android 端核心网络数据获取库",
    href: "https://github.com/CreaMakers/CSUSTDataGet",
    icon: "sdk",
  },
] satisfies ReadonlyArray<SourceProject>;

export const joinUsFormUrl = "https://creamaker.feishu.cn/share/base/form/shrcnOIl2W9rBAcEYYrK12l6Ffd";
