import type {Metadata} from "next";
import {hasLocale} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {Link} from "@/i18n/navigation";
import {routing} from "@/i18n/routing";
import {site} from "@/config/site";
import {buttonVariants} from "@/components/ui/button";

type PageKey = "work" | "about" | "blog" | "contact";
export type PendingPageProps = {params: Promise<{locale: string}>};

export async function pendingMetadata({params}: PendingPageProps, page: PageKey, path: string): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({locale, namespace: "Navigation"});
  return {
    title: t(page),
    alternates: {canonical: `${site.url}/${locale}${path}`},
    robots: {index: false, follow: true},
  };
}

export async function PendingPage({params, page}: PendingPageProps & {page: PageKey}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const [nav, t] = await Promise.all([
    getTranslations({locale, namespace: "Navigation"}),
    getTranslations({locale, namespace: "PendingPage"}),
  ]);
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-32 pb-12 sm:px-6">
      <div className="max-w-xl space-y-6">
        <p className="text-sm text-muted-foreground">{t("status")}</p>
        <h1 className="text-3xl font-semibold tracking-tight">{nav(page)}</h1>
        <p className="text-base leading-7 text-muted-foreground">{t("description")}</p>
        <Link href="/" className={buttonVariants({variant: "outline", size: "lg"})}>{t("back")}</Link>
      </div>
    </main>
  );
}
