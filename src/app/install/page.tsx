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
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#000000] text-[#1D1D1F] dark:text-[#F5F5F7] font-sans transition-colors duration-500 overflow-hidden">
      <main className="relative flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <div className="text-center mb-16 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-[#1D1D1F] dark:text-[#F5F5F7]">选择你的平台</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          {/* iOS App Store */}
          <PlatformCard title="App Store" description="从 App Store 下载正式版，体验最稳定的功能。" icon={<FaAppStoreIos className="w-12 h-12 text-[#007AFF]" />} buttonText="前往下载" href={config.downloadUrls.ios_appstore} />

          {/* iOS TestFlight */}
          <PlatformCard title="TestFlight" description="加入 TestFlight 计划，抢先体验最新功能。" icon={<FaApple className="w-12 h-12 text-[#AF52DE]" />} buttonText="加入测试" href={config.downloadUrls.ios_testflight} />

          {/* Android APK */}
          <PlatformCard title="Android" description="直接下载 APK 安装包，适用于 Android 设备。" icon={<FaAndroid className="w-12 h-12 text-[#34C759]" />} buttonText="下载 APK" href={config.downloadUrls.android} />
        </div>

        <div className="mt-20 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-forwards">
          <a href="/" className="text-[#0066CC] dark:text-[#2997FF] hover:underline text-sm font-medium">
            返回首页
          </a>
        </div>
      </main>
    </div>
  );
}

function PlatformCard({ title, description, icon, buttonText, href }: { title: string; description: string; icon: React.ReactNode; buttonText: string; href: string }) {
  return (
    <div className="flex flex-col items-center p-8 bg-white dark:bg-[#1C1C1E] rounded-3xl shadow-sm transition-shadow duration-300 border border-transparent dark:border-[#2C2C2E] animate-in fade-in scale-in-95 duration-500">
      <div className="mb-6">{icon}</div>
      <h3 className="text-2xl font-semibold mb-3 text-[#1D1D1F] dark:text-[#F5F5F7]">{title}</h3>
      <p className="text-[#86868B] text-center mb-8 leading-relaxed h-16 flex items-center justify-center">{description}</p>
      <a href={href} className="mt-auto bg-[#0071e3] hover:bg-[#0077ED] text-white px-6 py-2 rounded-full text-sm font-medium transition-all">
        {buttonText}
      </a>
    </div>
  );
}
