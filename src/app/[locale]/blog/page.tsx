import {hasLocale} from "next-intl";
import {setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {LatestWriting} from "@/components/home/latest-writing";
import {type PendingPageProps} from "@/components/pages/pending-page";
import type {Metadata} from "next";
import {blogPosts} from "@/config/blog";
import {isPreview, site} from "@/config/site";
import {getTranslations} from "next-intl/server";
import {routing} from "@/i18n/routing";

export async function generateMetadata({params}: PendingPageProps): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({locale, namespace: "LatestWriting"});
  return {title: "Blog", description: t("description"), alternates: {
    canonical: `${site.url}/${locale}/blog`, languages: {en: `${site.url}/en/blog`, id: `${site.url}/id/blog`},
  }, robots: {index: !isPreview && blogPosts.some((post) => !post.preview), follow: !isPreview}};
}

export default async function BlogPage({params}: PendingPageProps) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <main className="w-full px-4 pt-8 pb-16 sm:px-6 sm:pt-12 lg:pt-20">
    <div className="mx-auto w-full max-w-7xl"><LatestWriting all /></div>
  </main>;
}
