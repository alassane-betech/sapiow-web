// next.config.js ou next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ncvpplapgfqsgowtkrbw.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Suppression de la config i18n car on utilise next-international avec App Router
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
