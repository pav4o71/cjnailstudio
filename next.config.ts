import type { NextConfig } from "next";

import { securityHeaders } from "./src/security/headers";

const nextConfig: NextConfig = {
  experimental: {
    // TypeScript 5.9 provides the compiler API. Using it avoids intermittent
    // JSON capture failures in Next 16.3's experimental CLI checker.
    useTypeScriptCli: false,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [...securityHeaders],
      },
    ];
  },
};

export default nextConfig;
