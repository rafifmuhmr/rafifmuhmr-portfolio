import {Suspense} from "react";
import {GithubActivity, GithubActivitySkeleton} from "@/components/home/github-activity";
import type {Metadata} from "next";
import {hasLocale} from "next-intl";
import {notFound} from "next/navigation";
import {routing} from "@/i18n/routing";
import {homeMetadata, homeStructuredData} from "@/lib/seo";
import {setRequestLocale} from "next-intl/server";
import {About} from "@/components/home/about";
import {Overview} from "@/components/home/overview";
import {Stack} from "@/components/home/stack";
import {Hero} from "@/components/home/hero";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return homeMetadata(locale);
}

export default async function Home({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return (
    <main className="w-full px-4 pt-18 pb-12 sm:px-6 sm:pt-36 md:pt-44 lg:pt-43">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(homeStructuredData(locale)).replace(/</g, "\\u003c")}} />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 sm:gap-12 lg:gap-16">
        <Hero />
        <Overview />
        <About />
        <Suspense fallback={<GithubActivitySkeleton />}><GithubActivity /></Suspense>
        <Stack />
      </div>
    </main>
  );
}
