import Image from "next/image";
import { FaApple, FaAndroid } from "react-icons/fa";
import fs from "fs/promises";
import path from "path";

interface Config {
  downloadUrls: {
    android: string;
    ios: string;
  };
}

async function getConfig(): Promise<Config> {
  const configPath = path.join(process.cwd(), "config.json");
  const configFile = await fs.readFile(configPath, "utf8");
  return JSON.parse(configFile);
}

export default async function Home() {
  const config = await getConfig();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200/40 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-28 h-28 bg-indigo-200/35 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <main className="relative flex flex-col items-center justify-center px-6 py-8 min-h-screen">
        <div className="max-w-sm w-full mx-auto">
          {/* App Logo */}
          <div className="text-center mb-12">
            <div className="inline-block p-2 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50">
              <Image
                src="/logo_transparent.png"
                alt="长理星球"
                width={120}
                height={120}
                className="w-30 h-30 drop-shadow-lg"
                priority
              />
            </div>
          </div>

          {/* App Info */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">
              长理星球
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed font-medium">
              长理校园生活一站式助手
            </p>
          </div>

          {/* Download Buttons */}
          <div className="space-y-3 mb-8">
            {/* APK Direct Download Button */}
            <a
              href={config.downloadUrls.android}
              className="group flex items-center justify-center w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl py-3 px-4 shadow-lg hover:shadow-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center space-x-3">
                <FaAndroid className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs opacity-90 font-medium">直接下载</div>
                  <div className="text-lg font-bold">Android APK</div>
                </div>
              </div>
            </a>

            {/* iOS Download Button */}
            <a
              href={config.downloadUrls.ios}
              className="group flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl py-3 px-4 shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center space-x-3">
                <FaApple className="w-6 h-6 text-white" />
                <div className="text-left">
                  <div className="text-xs opacity-80 font-medium">前往</div>
                  <div className="text-lg font-bold">TestFlight</div>
                </div>
              </div>
            </a>
          </div>

          {/* Project Info */}
          <div className="text-center space-y-3 mb-12">
            <p className="text-gray-700 font-medium">🌟 这是一个开源项目</p>
            <div className="space-y-2">
              <p className="text-gray-600 text-sm">
                关注我们：
                <a
                  href="https://github.com/CreaMakers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline ml-1"
                >
                  GitHub
                </a>
              </p>
              <p className="text-gray-600 text-sm">
                加入我们：
                <a
                  href="https://creamaker.feishu.cn/share/base/form/shrcnOIl2W9rBAcEYYrK12l6Ffd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline ml-1"
                >
                  申请表单
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full py-8 px-4">
        <div className="max-w-md mx-auto text-center text-sm text-gray-500">
          <p className="font-medium">&copy; 2024-2025 CreaMakers</p>
        </div>
      </footer>
    </div>
  );
}
