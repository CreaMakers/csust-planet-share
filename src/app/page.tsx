import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "长理星球App - 你的校园生活助手",
};

export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { FaChevronRight, FaGithub, FaAndroid, FaApple, FaServer, FaCode, FaUsers } from "react-icons/fa";
import { SiSwift } from "react-icons/si";

export default function Home() {
  return (
    <div className="flex flex-col flex-grow items-center w-full relative">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-20 md:py-32 w-full max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto drop-shadow-2xl">
            <Image src="/logo_transparent.png" alt="CSUST Planet Share" fill className="object-contain" priority />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#1D1D1F] to-[#434344] dark:from-[#F5F5F7] dark:to-[#A1A1A6]">长理星球</h1>

        <p className="text-xl md:text-2xl text-[#86868B] max-w-lg mx-auto mb-10 font-medium leading-relaxed">你的校园生活，从未如此简单。</p>

        <div>
          <Link href="/install" className="inline-flex items-center gap-2 bg-[#0071e3] hover:bg-[#0077ED] text-white text-lg md:text-xl px-8 py-3 rounded-full font-medium">
            立即安装 <FaChevronRight className="text-sm" />
          </Link>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="w-full bg-white/50 dark:bg-[#1C1C1E]/50 py-20 md:py-32 border-y border-black/5 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold mb-6 text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">开源共建</h2>
            <p className="text-lg md:text-xl text-[#86868B] max-w-2xl mx-auto">
              来自{" "}
              <a href="https://github.com/CreaMakers" target="_blank" rel="noopener noreferrer" className="text-[#0071e3] hover:underline inline-flex items-center gap-1 font-medium">
                CreaMakers
                <FaGithub className="text-sm" />
              </a>{" "}
              组织下的开源项目，欢迎贡献。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Android Group */}
            <ProjectCard title="Android App" description="长理星球 Android 客户端源码。" icon={<FaAndroid className="w-8 h-8 text-[#34C759]" />} href="https://github.com/CreaMakers/changli-planet-app" />
            <ProjectCard title="Android Backend" description="Android 端配套后端服务。" icon={<FaServer className="w-8 h-8 text-[#5856D6]" />} href="https://github.com/CreaMakers/changli-planet-backend" />
            <ProjectCard title="CSUSTDataGet" description="Android 端核心网络数据获取库。" icon={<FaCode className="w-8 h-8 text-[#FF9500]" />} href="https://github.com/CreaMakers/CSUSTDataGet" />

            {/* iOS Group */}
            <ProjectCard title="iOS App" description="长理星球 iOS 客户端源码。" icon={<FaApple className="w-8 h-8 text-[#1D1D1F] dark:text-white" />} href="https://github.com/zHElEARN/CSUSTPlanet" />
            <ProjectCard title="iOS Backend" description="iOS 端配套后端服务。" icon={<FaServer className="w-8 h-8 text-[#5856D6]" />} href="https://github.com/zHElEARN/CSUSTPlanetBackend" />
            <ProjectCard title="CSUSTKit" description="iOS 端核心网络 SDK。" icon={<SiSwift className="w-8 h-8 text-[#FF2D55]" />} href="https://github.com/zHElEARN/CSUSTKit" />
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="w-full py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-[#F5F5F7] to-[#E5E5EA] dark:from-[#1C1C1E] dark:to-[#2C2C2E] rounded-[40px] p-10 md:p-16 shadow-sm border border-black/5 dark:border-white/5">
          <div className="mb-6 flex justify-center">
            <FaUsers className="w-16 h-16 text-[#007AFF]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold mb-6 text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">加入我们</h2>
          <p className="text-lg md:text-xl text-[#86868B] mb-10 max-w-2xl mx-auto">如果你对技术充满热情，希望为校园生活带来改变，欢迎加入 CreaMakers 团队。</p>
          <a href="https://creamaker.feishu.cn/share/base/form/shrcnOIl2W9rBAcEYYrK12l6Ffd" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-[#1D1D1F] dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-medium text-lg hover:opacity-90">
            填写加入申请
          </a>
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ title, description, icon, href }: { title: string; description: string; icon: React.ReactNode; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col p-8 rounded-3xl bg-white dark:bg-[#1C1C1E] border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <div className="p-3 bg-[#F5F5F7] dark:bg-[#000000] rounded-2xl">{icon}</div>
        <FaChevronRight className="text-[#86868B]/30 text-sm" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-[#1D1D1F] dark:text-[#F5F5F7]">{title}</h3>
      <p className="text-sm text-[#86868B] leading-relaxed">{description}</p>
    </a>
  );
}
