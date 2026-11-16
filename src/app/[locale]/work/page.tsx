import type {Metadata} from "next";
import {hasLocale} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {routing} from "@/i18n/routing";
import {SelectedWork} from "@/components/home/selected-work";

type Props = {params: Promise<{locale: string}>};
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "ProjectDetail"});
  return {title: t("workTitle"), robots: {index: false, follow: true}};
}
export default async function WorkPage({params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <main className="w-full px-4 pt-8 pb-16 sm:px-6 sm:pt-12 lg:pt-20"><div className="mx-auto max-w-7xl"><SelectedWork all /></div></main>;
}
