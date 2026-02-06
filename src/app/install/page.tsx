import fs from "fs/promises";
import type { Metadata } from "next";
import path from "path";
import { FaAndroid, FaApple, FaAppStoreIos } from "react-icons/fa";

export const metadata: Metadata = {
  title: "长理星球App | 安装",
};

interface Config {
  downloadUrls: {
    android: string;
    ios_testflight: string;
    ios_appstore: string;
  };
}

async function getConfig(): Promise<Config> {
  const configPath = path.join(process.cwd(), "config.json");
  const configFile = await fs.readFile(configPath, "utf8");
  return JSON.parse(configFile);
}

export default async function InstallPage() {
  const config = await getConfig();

  return (
    // Padding bottom is handled by layout footer or can be kept if extra space is needed, but we should remove the full page wrapper styles
    <div className="pb-10 w-full">
      <main className="flex flex-col items-center pt-32 px-6">
        <div className="text-center mb-20 max-w-xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6 text-[#1D1D1F] dark:text-[#F5F5F7]">下载长理星球</h1>
          <p className="text-xl md:text-2xl font-normal text-[#86868B] leading-relaxed">选择适合你设备的版本。</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[980px] w-full mx-auto">
          {/* iOS App Store */}
          <PlatformCard title="App Store" description="从 App Store 安全下载，自动更新保持最新。" icon={<FaAppStoreIos className="w-14 h-14 text-[#007AFF]" />} buttonText="前往下载" href={config.downloadUrls.ios_appstore} />

          {/* iOS TestFlight */}
          <PlatformCard title="TestFlight" description="体验正在开发的最新功能，参与 Beta 测试。" icon={<FaApple className="w-14 h-14 text-[#1D1D1F] dark:text-white" />} buttonText="加入测试" href={config.downloadUrls.ios_testflight} />

          {/* Android APK */}
          <PlatformCard title="Android" description="适用于 Android 设备的安装包，直接下载安装。" icon={<FaAndroid className="w-14 h-14 text-[#34C759]" />} buttonText="下载 APK" href={config.downloadUrls.android} />
        </div>

        <div className="mt-24 text-center">
          <a href="/" className="text-[#0066CC] dark:text-[#2997FF] hover:underline text-base font-medium">
            返回首页 <span className="text-xs align-middle">↗</span>
          </a>
        </div>
      </main>
    </div>
  );
}

function PlatformCard({ title, description, icon, buttonText, href }: { title: string; description: string; icon: React.ReactNode; buttonText: string; href: string }) {
  return (
    <div className="flex flex-col items-center p-10 bg-white dark:bg-[#1C1C1E] rounded-[30px] shadow-sm">
      <div className="mb-8">{icon}</div>
      <h3 className="text-3xl font-semibold mb-4 text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">{title}</h3>
      <p className="text-[#86868B] text-center mb-10 text-[17px] leading-relaxed font-normal min-h-[50px] flex items-center justify-center">{description}</p>
      <a href={href} className="mt-auto bg-[#0071e3] text-white px-8 py-2.5 rounded-full text-[17px] font-medium min-w-[120px] text-center">
        {buttonText}
      </a>
    </div>
  );
}
