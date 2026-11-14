import type {Metadata} from "next";
import {site, isPreview} from "@/config/site";
import {routing} from "@/i18n/routing";
import {socialLinks} from "@/config/socials";

export type SiteLocale = (typeof routing.locales)[number];
export const seoCopy = {
  en: {
    title: `${site.owner} — UI/UX Designer`,
    description: "Meet Rafif Muhammad Muflihur Rodwa (rafifmuhmr), a UI/UX designer in Banyuwangi, Indonesia, also exploring frontend development and graphic design.",
  },
  id: {
    title: `${site.owner} — Desainer UI/UX`,
    description: "Kenali Rafif Muhammad Muflihur Rodwa (rafifmuhmr), desainer UI/UX dari Banyuwangi yang juga mendalami frontend development dan desain grafis.",
  },
} as const;

export function homeMetadata(locale: SiteLocale): Metadata {
  const copy = seoCopy[locale];
  const url = `${site.url}/${locale}`;
  const image = {url: `${site.url}/og/${locale}.png`, width: 1200, height: 630, alt: `${site.owner} — ${site.role}`};
  return {
    title: {absolute: copy.title},
    description: copy.description,
    alternates: {
      canonical: url,
      languages: {en: `${site.url}/en`, id: `${site.url}/id`, "x-default": `${site.url}/en`},
    },
    openGraph: {
      type: "website", url, siteName: site.name,
      title: copy.title, description: copy.description,
      locale: locale === "id" ? "id_ID" : "en_US",
      alternateLocale: [locale === "id" ? "en_US" : "id_ID"],
      images: [image],
    },
    twitter: {card: "summary_large_image", title: copy.title, description: copy.description, images: [image]},
    robots: isPreview ? {index: false, follow: false} : {
      index: true, follow: true,
      googleBot: {index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1},
    },
  };
}

export function homeStructuredData(locale: SiteLocale) {
  const url = `${site.url}/${locale}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite", "@id": `${site.url}/#website`, url: `${site.url}/`,
        name: site.name, alternateName: [site.owner, "Rafif"],
        inLanguage: ["en", "id"], publisher: {"@id": `${site.url}/#person`},
      },
      {
        "@type": "Person", "@id": `${site.url}/#person`,
        name: site.owner, alternateName: [site.name, "Rafif"],
        url: `${site.url}/en`, jobTitle: site.role,
        homeLocation: {"@type": "Place", name: "Banyuwangi, Indonesia"},
        sameAs: socialLinks.map(({href}) => href),
      },
      {
        "@type": "WebPage", "@id": `${url}#webpage`, url,
        name: seoCopy[locale].title, description: seoCopy[locale].description,
        inLanguage: locale, isPartOf: {"@id": `${site.url}/#website`},
        about: {"@id": `${site.url}/#person`},
      },
    ],
  };
}
