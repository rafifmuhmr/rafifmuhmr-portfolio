import {SiteFooter} from "@/components/layout/site-footer";
import {ScrollToTop} from "@/components/scroll-to-top";
import {Suspense} from "react";
import {LocalStatus} from "@/components/home/local-status";
import type {Metadata} from "next";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {routing} from "@/i18n/routing";
import {SiteHeader} from "@/components/layout/site-header";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({locale, namespace: "Home"});
  return {title: t("title"), description: t("description")};
}

export default async function LocaleLayout({children, params}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return (
    <NextIntlClientProvider>
      <SiteHeader localStatus={
        <Suspense fallback={<div className="h-28 w-full rounded-2xl border border-border bg-background/60 backdrop-blur-2xl" aria-hidden="true" />}>
          <LocalStatus locale={locale} />
        </Suspense>
      } />
      {children}
      <SiteFooter locale={locale} />
      <ScrollToTop />
    </NextIntlClientProvider>
  );
}
