import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRightIcon, HandShakeIcon } from "@solar-icons/react/linear";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { IconTile } from "@/components/ui/icon-tile";
import { contact } from "@/config/contact";
import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { AboutRecognition } from "./about-recognition";
import { AboutEducation } from "./about-education";
import { AboutExperience } from "./about-experience";
import { ApproachSteps } from "./approach-steps";
import { RotatingRoles } from "./rotating-roles";

const approachItems = ["goals", "flow", "states", "handoff"] as const;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  return {
    title: t("heading"),
    description: t("metadataDescription"),
    alternates: {
      canonical: `/${locale}/about`,
      languages: { en: "/en/about", id: "/id/about", "x-default": "/en/about" },
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const [t, nav] = await Promise.all([
    getTranslations("AboutPage"),
    getTranslations("Navigation"),
  ]);

  return (
    <main className="w-full px-4 pt-8 pb-16 sm:px-6 sm:pt-12 lg:pt-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col section-gap">
        <div className="grid gap-8 py-6 sm:py-8 lg:grid-cols-3 lg:gap-x-6 lg:py-10">
          <header className="space-y-5">
            <IconTile className="size-16 rounded-[12px] p-1 sm:size-19">
              <Image src="/images/rafifmuhmr-pp.png" alt="" width={72} height={72} sizes="(min-width: 640px) 66px, 54px" className="size-full rounded-md object-cover" />
            </IconTile>
            <h1 className="max-w-md text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {site.owner}
            </h1>
            <RotatingRoles roles={[t("uiux"), t("frontend"), t("graphic")]} />
          </header>

          <section aria-labelledby="about-page-title" className="min-w-0 space-y-6 lg:col-span-2">
            <h2 id="about-page-title" className="text-xl font-semibold tracking-tight">{t("heading")}</h2>
            <div className="space-y-5 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
              <p>{t("intro")}</p>
              <p>{t.rich("journey", {
                company: (chunks) => <a href={contact.companyUrl} className="font-medium text-foreground underline-offset-4 hover:underline">{chunks}</a>,
              })}</p>
              <p>{t("personal")}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "gap-2 px-4")}>
                <HandShakeIcon size={16} className="shrink-0" aria-hidden="true" />
                {nav("cta")}
              </Link>
              <Link href="/work" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2 px-4")}>
                {t("workCta")}
                <ArrowRightIcon size={16} aria-hidden="true" />
              </Link>
            </div>
          </section>
        </div>
        <section data-design-approach aria-labelledby="design-approach-title" className="grid gap-8 py-6 sm:py-8 lg:grid-cols-3 lg:gap-x-6 lg:py-10">
          <ApproachSteps
            total={approachItems.length}
            heading={
              <header className="space-y-3 lg:col-start-1 lg:row-start-1">
                <h2 id="design-approach-title" className="text-xl font-semibold tracking-tight">{t("designApproach.heading")}</h2>
                <p className="text-sm leading-6 text-muted-foreground">{t("designApproach.description")}</p>
              </header>
            }
          >
            {approachItems.map((item, index) => (
              <li key={item} className="grid min-w-0 gap-4">
                <div aria-hidden="true" className="flex items-baseline gap-2 tabular-nums lg:hidden">
                  <span className="text-2xl font-medium tracking-tight">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-xs text-muted-foreground">/{String(approachItems.length).padStart(2, "0")}</span>
                </div>
                <div className="min-w-0 space-y-4">
                  <h3 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:leading-10 lg:text-4xl lg:motion-safe:snap-start">
                    {t(`designApproach.items.${item}.title`)}
                  </h3>
                  <p className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                    {t(`designApproach.items.${item}.description`)}
                  </p>
                </div>
              </li>
            ))}
          </ApproachSteps>
        </section>
        <AboutExperience />
        <AboutEducation />
        <AboutRecognition />
      </div>
    </main>
  );
}
