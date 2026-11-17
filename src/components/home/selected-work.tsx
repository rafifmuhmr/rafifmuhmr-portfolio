import Image from "next/image";
import {ArrowRightUpIcon} from "@solar-icons/react/linear";
import {ProjectCover} from "./project-cover";
import {getLocale, getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {getLatestProjects, projects as allProjects} from "@/config/projects";

export async function SelectedWork({all = false}: {all?: boolean} = {}) {
  const [t, locale] = await Promise.all([getTranslations("SelectedWork"), getLocale()]);
  const projects = all ? getLatestProjects(allProjects.length) : getLatestProjects(3);
  const language = locale === "id" ? "id" : "en";
  return (
    <section id="work" aria-labelledby="selected-work-title" className="min-w-0 py-6 sm:py-8 lg:py-10">
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-3">
          {all ? <h1 id="selected-work-title" className="text-3xl font-semibold tracking-tight">{t("title")}</h1> : <h2 id="selected-work-title" className="text-xl font-semibold tracking-tight">{t("title")}</h2>}
          <p className="text-sm leading-6 text-muted-foreground">{t("description")}</p>
        </div>
        {!all && <Link href="/work" className="inline-flex items-center gap-2 rounded-sm text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
          {t("seeAll")}<ArrowRightUpIcon aria-hidden="true" className="size-4" />
        </Link>}
      </header>
      {projects.length ? (
        <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const external = /^https?:\/\//.test(project.href);
            const content = <>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[12px] bg-muted">
                {project.cover ? <Image src={project.cover} alt={project.title} fill sizes="(min-width: 1280px) 411px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" /> : <ProjectCover title={project.title} label={t("coverPending")} />}
              </div>
              <div className="mt-3 space-y-1">
                <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-base font-medium leading-6 underline-offset-4 decoration-1 [text-decoration-skip-ink:none] group-hover:underline group-focus-visible:underline">{project.title}</h3>
                <span className="shrink-0 font-mono text-sm text-muted-foreground">{project.year}</span>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">{project.subtitle[language]}</p>
              </div>
            </>;
            const className = "group block rounded-[12px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";
            return <li key={project.slug}>{external ? <a href={project.href} target="_blank" rel="noopener noreferrer" className={className}>{content}</a> : <Link href={{pathname: "/work/[slug]", params: {slug: project.slug}}} className={className}>{content}</Link>}</li>;
          })}
        </ul>
      ) : <p className="text-sm text-muted-foreground">{t("empty")}</p>}
    </section>
  );
}
