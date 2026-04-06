export const pageTitle = "长理星球";
export const pageDescription = "长理星球 iOS 版本安装与开源项目入口。";

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
] as const;

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
  images: Record<FeaturePlatformId, string>;
};

export const featureSlides: FeatureSlide[] = [
  {
    title: "概览",
    description: "快速查看课程、成绩、电量和作业等",
    images: {
      iphone: "/Apple/iPhone/1.png",
      ipad: "/Apple/iPad/1.png",
      mac: "/Apple/Mac/1.png",
    },
  },
  {
    title: "小组件",
    description: "在桌面直接查看各个数据",
    images: {
      iphone: "/Apple/iPhone/2.png",
      ipad: "/Apple/iPad/2.png",
      mac: "/Apple/Mac/2.png",
    },
  },
  {
    title: "我的课表",
    description: "自动导入教务系统课表数据",
    images: {
      iphone: "/Apple/iPhone/3.png",
      ipad: "/Apple/iPad/3.png",
      mac: "/Apple/Mac/3.png",
    },
  },
  {
    title: "成绩查询",
    description: "查询教务系统的所有成绩",
    images: {
      iphone: "/Apple/iPhone/4.png",
      ipad: "/Apple/iPad/4.png",
      mac: "/Apple/Mac/4.png",
    },
  },
  {
    title: "成绩详细",
    description: "深入查看成绩具体组成分布",
    images: {
      iphone: "/Apple/iPhone/5.png",
      ipad: "/Apple/iPad/5.png",
      mac: "/Apple/Mac/5.png",
    },
  },
  {
    title: "电量查询",
    description: "绑定宿舍快速查询当前电量",
    images: {
      iphone: "/Apple/iPhone/6.png",
      ipad: "/Apple/iPad/6.png",
      mac: "/Apple/Mac/6.png",
    },
  },
  {
    title: "待提交作业",
    description: "查询网络课程平台所有的待提交作业",
    images: {
      iphone: "/Apple/iPhone/7.png",
      ipad: "/Apple/iPad/7.png",
      mac: "/Apple/Mac/7.png",
    },
  },
  {
    title: "校园地图",
    description: "快速查看各个校区教学楼等楼栋位置",
    images: {
      iphone: "/Apple/iPhone/8.png",
      ipad: "/Apple/iPad/8.png",
      mac: "/Apple/Mac/8.png",
    },
  },
  {
    title: "考试安排",
    description: "查询教务系统的所有考试信息",
    images: {
      iphone: "/Apple/iPhone/9.png",
      ipad: "/Apple/iPad/9.png",
      mac: "/Apple/Mac/9.png",
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
] as const;

export const sourceOrganization = {
  name: "CreaMakers",
  href: "https://github.com/CreaMakers",
};

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
] as const;

export const joinUsFormUrl = "https://creamaker.feishu.cn/share/base/form/shrcnOIl2W9rBAcEYYrK12l6Ffd";
