import type { IConfig, ISitemapField } from "next-sitemap";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-juan-alb.vercel.app";

/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
  transform: async (
    config: IConfig,
    path: string
  ): Promise<ISitemapField> => {
    return {
      loc: `${siteUrl}${path}`,
      changefreq: "weekly",
      priority: path === "/" ? 1 : 0.7,
      lastmod: new Date().toISOString(),
    };
  },
} satisfies IConfig;