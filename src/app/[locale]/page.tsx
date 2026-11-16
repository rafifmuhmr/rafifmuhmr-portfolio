import { About } from "@/components/home/about";
import {
  GithubActivity,
  GithubActivitySkeleton,
} from "@/components/home/github-activity";
import { Hero } from "@/components/home/hero";
import { Overview } from "@/components/home/overview";
import { SelectedWork } from "@/components/home/selected-work";
import { Stack } from "@/components/home/stack";
import { routing } from "@/i18n/routing";
import { homeMetadata, homeStructuredData } from "@/lib/seo";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return homeMetadata(locale);
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return (
    <main className="w-full px-4 pt-8 pb-12 sm:px-6 sm:pt-12 lg:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeStructuredData(locale)).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 sm:gap-12 lg:gap-16">
        <Hero />
        <Overview />
        <About />
        <SelectedWork />
        <Suspense fallback={<GithubActivitySkeleton />}>
          <GithubActivity />
        </Suspense>
        <Stack />
      </div>
    </main>
  );
}
