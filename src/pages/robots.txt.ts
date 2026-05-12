import type { APIRoute } from "astro";

const siteUrl = import.meta.env.SITE;

export const GET: APIRoute = () => {
  const sitemapUrl = new URL("/sitemap-index.xml", siteUrl);

  return new Response(
    `User-agent: *
Allow: /
Sitemap: ${sitemapUrl.href}
`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  );
};
