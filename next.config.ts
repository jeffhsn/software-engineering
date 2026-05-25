import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Materials under /public/content are immutable: once we ship a PDF for
  // SoSe 2025 it never changes. Mark them so browsers cache forever and
  // re-visits skip the network entirely.
  async headers() {
    return [
      {
        source: "/content/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
