import type {Metadata} from "next";
import {hasLocale} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {routing} from "@/i18n/routing";
import { ProjectCard } from "@/components/home/project-card";
import { ProjectFilters, type ProjectFilter } from "@/components/work/project-filters";
import { getLatestProjects, projects } from "@/config/projects";

const featuredSlugs = ["pulseco", "payra"];

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
  const [t, nav, copy] = await Promise.all([
    getTranslations("WorkPage"),
    getTranslations("ProjectDetail"),
    getTranslations("SelectedWork"),
  ]);
  const all = getLatestProjects(projects.length);
  const featured = featuredSlugs.flatMap((slug) => all.filter((project) => project.slug === slug));
  const card = (project: (typeof projects)[number]) => (
    <ProjectCard key={project.slug} project={project} language={locale} coverPending={copy("coverPending")} />
  );

  return (
    <main className="w-full px-4 pt-8 pb-16 sm:px-6 sm:pt-12 lg:pt-20">
      <div className="mx-auto max-w-7xl space-y-12 py-6 sm:space-y-16 sm:py-8 lg:py-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">{nav("workTitle")}</h1>
          <p className="text-sm leading-6 text-muted-foreground">{copy("description")}</p>
        </header>
        {featured.length > 0 && (
          <section aria-labelledby="featured-projects-title">
            <h2 id="featured-projects-title" className="mb-6 text-xl font-semibold tracking-tight">{t("featured")}</h2>
            <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">{featured.map(card)}</ul>
          </section>
        )}
        <section aria-labelledby="all-projects-title">
          <h2 id="all-projects-title" className="mb-6 text-xl font-semibold tracking-tight">{t("allProjects")}</h2>
          <ProjectFilters projects={all.map((project) => {
            const category: ProjectFilter = project.format ?? (project.platform === "Mobile" ? "mobileApps" : "websites");
            return { slug: project.slug, category, card: card(project) };
          })} />
        </section>
      </div>
    </main>
  );
}
