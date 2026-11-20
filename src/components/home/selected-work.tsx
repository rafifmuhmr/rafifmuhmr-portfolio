import {ArrowRightUpIcon} from "@solar-icons/react/linear";
import {ProjectCard} from "./project-card";
import {getLocale, getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {getLatestProjects} from "@/config/projects";

export async function SelectedWork() {
  const [t, locale] = await Promise.all([getTranslations("SelectedWork"), getLocale()]);
  const projects = getLatestProjects(3);
  const language = locale === "id" ? "id" : "en";
  return (
    <section id="work" aria-labelledby="selected-work-title" className="min-w-0 py-6 sm:py-8 lg:py-10">
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-3">
          <h2 id="selected-work-title" className="text-xl font-semibold tracking-tight">{t("title")}</h2>
          <p className="text-sm leading-6 text-muted-foreground">{t("description")}</p>
        </div>
        <Link href="/work" className="inline-flex items-center gap-2 rounded-sm text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
          {t("seeAll")}<ArrowRightUpIcon aria-hidden="true" className="size-4" />
        </Link>
      </header>
      {projects.length ? (
        <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} language={language} coverPending={t("coverPending")} />
          ))}
        </ul>
      ) : <p className="text-sm text-muted-foreground">{t("empty")}</p>}
    </section>
  );
}
