export type PageSection = {
  id: string;
  label: string;
};

export type InstallOptionIcon = "appstore" | "testflight" | "android";

export type InstallOption = {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  icon: InstallOptionIcon;
};

export type SourceProjectIcon = "client" | "backend" | "sdk";

export type SourceProject = {
  title: string;
  description: string;
  href: string;
  icon: SourceProjectIcon;
};

export type SourceOrganization = {
  name: string;
  href: string;
};

export type PlatformKind = "ios" | "android";
