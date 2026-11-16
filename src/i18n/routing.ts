import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "id"],
  defaultLocale: "en",
  localeDetection: false,
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/about": "/about",
    "/blog": "/blog",
    "/contact": "/contact",
    "/work": {en: "/work", id: "/karya"},
    "/work/[slug]/markdown": {en: "/work/[slug]/markdown", id: "/karya/[slug]/markdown"},
    "/work/[slug]": {en: "/work/[slug]", id: "/karya/[slug]"},
  },
});
