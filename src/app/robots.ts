import type {MetadataRoute} from "next";
import {site, isPreview} from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: isPreview ? {userAgent: "*", disallow: "/"} : {userAgent: "*", allow: "/"},
    ...(isPreview ? {} : {sitemap: `${site.url}/sitemap.xml`}),
  };
}
