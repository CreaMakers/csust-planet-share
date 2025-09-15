import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface Config {
  downloadUrls: {
    android: string;
    ios: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const body = await request.json();
    const { API_KEY, ...updateData } = body;

    // 验证API密钥
    const expectedApiKey = process.env.API_KEY;
    if (!expectedApiKey) {
      return NextResponse.json(
        { error: "服务器配置错误：未设置API_KEY环境变量" },
        { status: 500 }
      );
    }

    if (!API_KEY || API_KEY !== expectedApiKey) {
      return NextResponse.json({ error: "无效的API密钥" }, { status: 401 });
    }

    // 读取当前配置文件
    const configPath = path.join(process.cwd(), "config.json");
    let currentConfig: Config;

    try {
      const configFile = await fs.readFile(configPath, "utf8");
      currentConfig = JSON.parse(configFile);
    } catch {
      return NextResponse.json({ error: "无法读取配置文件" }, { status: 500 });
    }

    // 更新配置
    // 支持部分更新，可以只更新一个参数
    const updatedConfig = { ...currentConfig };

    // 更新下载链接
    if (updateData.downloadUrls) {
      if (updateData.downloadUrls.android) {
        updatedConfig.downloadUrls.android = updateData.downloadUrls.android;
      }
      if (updateData.downloadUrls.ios) {
        updatedConfig.downloadUrls.ios = updateData.downloadUrls.ios;
      }
    }

    // 也支持直接传递android或ios参数
    if (updateData.android) {
      updatedConfig.downloadUrls.android = updateData.android;
    }
    if (updateData.ios) {
      updatedConfig.downloadUrls.ios = updateData.ios;
    }

    // 写入更新后的配置文件
    try {
      await fs.writeFile(
        configPath,
        JSON.stringify(updatedConfig, null, 2),
        "utf8"
      );
    } catch {
      return NextResponse.json({ error: "无法写入配置文件" }, { status: 500 });
    }

    return NextResponse.json({
      message: "配置更新成功",
      config: updatedConfig,
    });
  } catch (error) {
    console.error("配置更新错误:", error);
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 });
  }
}

// 可选：添加GET方法来获取当前配置（需要API密钥）
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const apiKey = searchParams.get("API_KEY");

    // 验证API密钥
    const expectedApiKey = process.env.API_KEY;
    if (!expectedApiKey) {
      return NextResponse.json(
        { error: "服务器配置错误：未设置API_KEY环境变量" },
        { status: 500 }
      );
    }

    if (!apiKey || apiKey !== expectedApiKey) {
      return NextResponse.json({ error: "无效的API密钥" }, { status: 401 });
    }

    // 读取当前配置文件
    const configPath = path.join(process.cwd(), "config.json");
    try {
      const configFile = await fs.readFile(configPath, "utf8");
      const config = JSON.parse(configFile);
      return NextResponse.json(config);
    } catch {
      return NextResponse.json({ error: "无法读取配置文件" }, { status: 500 });
    }
  } catch (error) {
    console.error("获取配置错误:", error);
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 });
  }
}
