import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  eslint: {
    dirs: ["app", "components", "lib", "content"],
  },
};

export default nextConfig;
