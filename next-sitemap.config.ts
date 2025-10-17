import type { IConfig } from "next-sitemap";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio.dev";

const config: IConfig = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  autoLastmod: true,
  alternateRefs: [],
  transform: async (cfg, path) => {
    if (path === "/404" || path.startsWith("/api")) return null;
    return {
      loc: `${cfg.siteUrl}${path}`,
      changefreq: "weekly",
      priority: path === "/" ? 1 : 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};

export default config;
