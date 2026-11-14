import type {MetadataRoute} from "next";
import {site} from "@/config/site";
import {routing} from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  // Add real published routes here as portfolio content is implemented.
  return routing.locales.map((locale) => ({
    url: `${site.url}/${locale}`,
    alternates: {languages: {en: `${site.url}/en`, id: `${site.url}/id`, "x-default": `${site.url}/en`}},
  }));
}
