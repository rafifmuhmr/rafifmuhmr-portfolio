import { HandShakeIcon } from "@solar-icons/react/linear";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { ProjectCard } from "@/components/home/project-card";
import { buttonVariants } from "@/components/ui/button";
import { projects } from "@/config/projects";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const services = ["uiux", "frontend", "graphic"] as const;
const designExamples = projects.filter(({ slug }) => slug === "pulseco" || slug === "payra");

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const [nav, t] = await Promise.all([
    getTranslations({ locale, namespace: "Navigation" }),
    getTranslations({ locale, namespace: "ServicesPage" }),
  ]);

  return { title: nav("services"), description: t("description") };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const [nav, t, work] = await Promise.all([
    getTranslations("Navigation"),
    getTranslations("ServicesPage"),
    getTranslations("SelectedWork"),
  ]);

  return (
    <main className="w-full px-4 pt-8 pb-16 sm:px-6 sm:pt-12 lg:pt-20">
      <div className="section-gap mx-auto flex max-w-7xl flex-col py-6 sm:py-8 lg:py-10">
        <header className="max-w-2xl space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">{nav("services")}</h1>
          <p className="text-sm leading-6 text-muted-foreground">{t("description")}</p>
        </header>

        <div className="divide-y divide-border border-y border-border">
          {services.map((service) => (
            <section
              key={service}
              aria-labelledby={`service-${service}-title`}
              className="grid gap-6 py-8 sm:py-10 lg:grid-cols-3 lg:py-12"
            >
              <header className="space-y-3">
                <h2 id={`service-${service}-title`} className="text-xl font-semibold tracking-tight">
                  {t(`${service}.title`)}
                </h2>
                <ul className="list-disc space-y-1.5 pl-5 text-sm leading-6 text-muted-foreground">
                  {(t.raw(`${service}.deliverables`) as string[]).map((deliverable) => (
                    <li key={deliverable}>{deliverable}</li>
                  ))}
                </ul>
              </header>

              <div className="min-w-0 space-y-6 lg:col-span-2">
                <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                  {t(`${service}.description`)}
                </p>
                {service === "uiux" && (
                  <ul className="grid gap-6 sm:grid-cols-2">
                    {designExamples.map((project) => (
                      <ProjectCard key={project.slug} project={project} language={locale} coverPending={work("coverPending")} />
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>

        <section aria-labelledby="services-pricing-title" className="flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <h2 id="services-pricing-title" className="text-xl font-semibold tracking-tight">{t("pricing.title")}</h2>
            <p className="text-sm leading-6 text-muted-foreground">{t("pricing.description")}</p>
          </div>
          <Link href="/contact" className={buttonVariants({ size: "lg" })}>
            <HandShakeIcon size={16} className="shrink-0" aria-hidden />
            {nav("cta")}
          </Link>
        </section>
      </div>
    </main>
  );
}
