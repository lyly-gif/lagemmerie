import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /la-maison was merged into /espaces (audit-complet-v2 §2) — the two
      // pages duplicated the same stats/content, so this keeps any shared
      // or indexed links from breaking.
      {
        source: "/la-maison",
        destination: "/espaces",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
