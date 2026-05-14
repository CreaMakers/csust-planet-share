# csust-planet-share

这是 [长理星球](https://github.com/zHElEARN/CSUSTPlanet) 的配套分享与下载页项目，基于 Astro 和 Tailwind CSS 开发，提供响应式介绍页面及多端下载引导。

## 构建

> [!IMPORTANT]
> **部署要求**：本项目需要配合使用 [go-csust-planet](https://github.com/zHElEARN/go-csust-planet) 提供的后端接口。

### 步骤

1. 克隆项目

   ```bash
   git clone https://github.com/zHElEARN/csust-planet-share.git
   cd csust-planet-share
   ```

2. 安装依赖

   本项目推荐使用 pnpm 管理依赖：

   ```bash
   pnpm install
   ```

3. 配置环境变量

   复制 `.env.template` 并根据实际部署环境填写配置：

   ```bash
   cp .env.template .env
   ```

   主要配置项如下：
   - `PUBLIC_SITE_URL`：站点公开访问地址，用于生成 canonical、Open Graph 与 Twitter Card 中的绝对 URL。生产环境请填写正式域名，例如 `https://planet.example.com`。
   - `PUBLIC_API_PREFIX`：后端接口地址前缀，需要指向配套的 go-csust-planet 服务。

4. 运行项目

   启动本地开发服务器：

   ```bash
   pnpm dev
   ```

   或者你可以先构建并在本地预览静态网页：

   ```bash
   pnpm build && pnpm preview
   ```

5. 构建与图片优化

   你可以运行以下命令来单独执行苹果设备截图等图片的自动化处理与裁剪：

   ```bash
   pnpm run images:apple:optimize
   ```

   最终打包用于生产环境的静态文件，产物将生成在 `dist` 目录下：

   ```bash
   pnpm build
   ```

## 部署

作为静态网站项目，你可以通过任何静态网页托管服务进行直接部署。只需将 `pnpm build` 命令执行后生成的 `dist` 目录进行发布即可。

## 许可证

本项目采用 **MIT License**。

这意味着：

- 您可以自由地商业化使用、复制、修改和分发本项目的源代码及其副本。
- 您只需在分发时保留原作者的版权声明和许可声明即可。
- 您可以将本项目代码集成到您的闭源或商业项目中，且无需公开您自己的源代码。
- 作者不对使用本项目产生的任何后果承担法律责任。

详见 [LICENSE](LICENSE) 文件。

## 贡献

欢迎大家为 csust-planet-share 做出贡献，您可以 Fork 项目，进行修改并提交 Pull Request。

如果您在使用过程中遇到问题，或对 csust-planet-share 有任何建议，也欢迎提交 Issue 来告知我们！

---

_免责声明: 本项目仅供学习与技术研究使用，请勿用于任何非法用途。在使用过程中请遵守学校相关网络安全规定。_
