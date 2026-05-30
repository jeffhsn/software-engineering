import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The subject route reads the active locale's deep-content JSON from
  // public/content-i18n at request time (server-side seed → instant
  // translations). Vercel's file tracer can't follow that dynamic fs path, so
  // list the files explicitly; otherwise the read fails in production and the
  // instant path silently degrades to a client fetch.
  outputFileTracingIncludes: {
    "/subjects/[slug]": ["./public/content-i18n/**/*.json"],
  },
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
