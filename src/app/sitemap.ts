import type {MetadataRoute} from "next";
import {site} from "@/config/site";
import {blogPosts} from "@/config/blog";
import {routing} from "@/i18n/routing";
import {blogUrl} from "@/lib/blog-markdown";

export default function sitemap(): MetadataRoute.Sitemap {
  const published = blogPosts.filter((post) => !post.preview);
  return [
    ...routing.locales.map((locale) => ({
      url: `${site.url}/${locale}`,
      alternates: {languages: {en: `${site.url}/en`, id: `${site.url}/id`, "x-default": `${site.url}/en`}},
    })),
    ...(published.length ? routing.locales.map((locale) => ({
      url: `${site.url}/${locale}/blog`,
      alternates: {languages: {en: `${site.url}/en/blog`, id: `${site.url}/id/blog`}},
    })) : []),
    ...published.flatMap((post) => routing.locales.map((locale) => ({
      url: blogUrl(post, locale),
      alternates: {languages: {en: blogUrl(post, "en"), id: blogUrl(post, "id")}},
    }))),
  ];
}
