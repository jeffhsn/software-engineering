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
  // Resolve react-pdf's `import * as pdfjs from "pdfjs-dist"` to the LEGACY
  // build. The default pdf.js v5 build targets very recent browsers (it calls
  // Promise.withResolvers — Safari 17.4+ — and ships a module worker needing
  // Safari 16.4+), so it throws and crashes the Safari tab on an older iPad
  // (iPadOS 16.0–16.3). The legacy build is transpiled/polyfilled for those.
  // The worker file is pointed at the matching legacy build in pdf-viewer.tsx.
  turbopack: {
    resolveAlias: {
      "pdfjs-dist": "pdfjs-dist/legacy/build/pdf.min.mjs",
    },
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
