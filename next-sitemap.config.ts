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
 
 transform: (cfg, url) => {

  if (url === "/404" || url.startsWith("/api")) return;
    return {
      loc: `${cfg.siteUrl}${url}`,
      changefreq: "weekly",
      riority: url === "/" ? 1 : 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};

export default config;
