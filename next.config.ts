import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {source: "/en/projects/:path*", destination: "/en/work/:path*", permanent: true},
      {source: "/id/projects/:path*", destination: "/id/karya/:path*", permanent: true},
      {source: "/id/work/:path*", destination: "/id/karya/:path*", permanent: true},
      {source: "/projects/:path*", destination: "/en/work/:path*", permanent: true},
      ...[
        ["designing-simple-interfaces", "designing-interfaces-that-feel-simple-to-use"],
        ["from-figma-to-browser", "bringing-interface-designs-into-the-browser"],
        ["details-that-matter", "small-details-that-make-digital-experiences-feel-better"],
      ].flatMap(([oldSlug, slug]) => ["en", "id"].map((locale) => ({
        source: `/${locale}/blog/${oldSlug}/:path*`,
        destination: `/${locale}/blog/${slug}/:path*`,
        permanent: true,
      }))),
    ];
  },
  cacheComponents: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
