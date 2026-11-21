import type {Metadata} from "next";
import {hasLocale} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {ArrowLeftIcon, ArrowRightUpIcon} from "@solar-icons/react/linear";
import {Link} from "@/i18n/navigation";
import {routing} from "@/i18n/routing";
import {projects} from "@/config/projects";
import {ProjectPageActions} from "@/components/home/project-page-actions";
import {projectMarkdown, projectUrl} from "@/lib/project-markdown";
import {ProjectGallery} from "@/components/home/project-gallery";
import {ProjectCover} from "@/components/home/project-cover";
import Image from "next/image";
import {DetailNavigation} from "@/components/navigation/detail-navigation";

type Props = {params: Promise<{locale: string; slug: string}>};
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return {title: project.title, description: project.description[locale], robots: {index: false, follow: true}};
}
export default async function ProjectPage({params}: Props) {
  const {locale, slug} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("ProjectDetail");
  const index = projects.indexOf(project);
  const previousProject = projects[index - 1] ?? null;
  const nextProject = projects[index + 1] ?? null;
  const url = projectUrl(project, locale);
  const markdownUrl = `/${locale}/${locale === "id" ? "karya" : "work"}/${project.slug}/markdown`;
  return <main className="w-full px-4 pt-14 pb-16 sm:px-6 sm:pt-20 lg:pt-30">
    <article className="mx-auto max-w-7xl flex flex-col section-gap">
      <header className="space-y-8">
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-4">
          <Link href="/work" className="inline-flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"><ArrowLeftIcon className="size-4" aria-hidden="true" />{t("back")}</Link>
          <ProjectPageActions title={project.title} url={url} markdownUrl={markdownUrl} markdown={projectMarkdown(project, locale)} previous={previousProject && {slug: previousProject.slug, title: previousProject.title}} next={nextProject && {slug: nextProject.slug, title: nextProject.title}} />
        </div>
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-stretch md:gap-16">
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl font-medium tracking-tight sm:text-5xl">{project.title}</h1>
              <p className="text-lg leading-7 text-muted-foreground sm:text-xl">{project.subtitle[locale]}</p>
            </div>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">{project.description[locale]}</p>
          </div>
          <div className="flex flex-col items-end justify-between gap-6 text-right text-sm md:min-w-40">
            <dl>
              <div className="space-y-2"><dt className="text-muted-foreground">{t("timeline")}</dt><dd>{project.timeline[locale]}</dd></div>
            </dl>
            <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline">{t("source")}<ArrowRightUpIcon aria-hidden="true" className="size-4" /></a>
          </div>
        </div>
        <dl className="grid w-full grid-cols-2 gap-y-8 pt-4 text-sm md:grid-cols-4">
          <div className="space-y-2 pr-6 md:pr-8"><dt className="text-muted-foreground">{t("scope")}</dt><dd className="leading-6">{project.scope[locale]}</dd></div>
          <div className="space-y-2 border-l border-border pl-6 md:px-8"><dt className="text-muted-foreground">{t("role")}</dt><dd>{project.role[locale]}</dd></div>
          <div className="space-y-2 pr-6 md:border-l md:border-border md:px-8"><dt className="text-muted-foreground">{t("platform")}</dt><dd>{project.platform}</dd></div>
          {project.tool && <div className="space-y-2 border-l border-border pl-6 md:pl-8"><dt className="text-muted-foreground">{t("tools")}</dt><dd>{project.tool}</dd></div>}
        </dl>
      </header>
      <div className="overflow-hidden rounded-[12px]">{project.cover ? <Image src={project.cover} alt={`${project.title} — ${project.subtitle[locale]}`} width={1800} height={1360} sizes="(min-width: 1280px) 1280px, 100vw" className="h-auto w-full" /> : <ProjectCover title={project.title} label={t("coverPending")} />}</div>
      <section aria-labelledby="project-overview" className="grid gap-4 md:grid-cols-[18rem_minmax(0,1fr)] md:gap-12">
        <h2 id="project-overview" className="text-xl font-semibold tracking-tight">{t("overview")}</h2>
        <p className="max-w-3xl text-base leading-8 text-muted-foreground">{project.overview[locale]}</p>
      </section>
      <section aria-labelledby="project-challenge" className="grid gap-4 md:grid-cols-[18rem_minmax(0,1fr)] md:gap-12">
        <h2 id="project-challenge" className="text-xl font-semibold tracking-tight">{t("challenge")}</h2>
        <p className="max-w-3xl text-base leading-8 text-muted-foreground">{project.challenge[locale]}</p>
      </section>
      <section aria-labelledby="project-process" className="grid gap-4 md:grid-cols-[18rem_minmax(0,1fr)] md:gap-12">
        <h2 id="project-process" className="text-xl font-semibold tracking-tight">{t("process")}</h2>
        <ol className="divide-y divide-border">
          {project.process.map((step, index) => <li key={step.title.en} className="flex gap-4 py-6 first:pt-0 last:pb-0 sm:gap-6">
            <span aria-hidden="true" className="pt-1 text-xs tabular-nums text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
            <div className="space-y-2">
              <h3 className="text-base font-medium">{step.title[locale]}</h3>
              <p className="max-w-3xl text-base leading-8 text-muted-foreground">{step.description[locale]}</p>
            </div>
          </li>)}
        </ol>
      </section>
      <section aria-labelledby="project-solution" className="space-y-8 sm:space-y-10">
        <div className="grid gap-4 md:grid-cols-[18rem_minmax(0,1fr)] md:gap-12">
          <h2 id="project-solution" className="text-xl font-semibold tracking-tight">{t("solution")}</h2>
          <p className="max-w-3xl text-base leading-8 text-muted-foreground">{project.solution[locale]}</p>
        </div>
        {project.gallery.length > 0 && <ProjectGallery images={project.gallery} title={project.title} />}
      </section>
      <section aria-labelledby="project-deliverables" className="grid gap-4 md:grid-cols-[18rem_minmax(0,1fr)] md:gap-12">
        <h2 id="project-deliverables" className="text-xl font-semibold tracking-tight">{t("deliverables")}</h2>
        <ul className="list-disc space-y-3 pl-5 text-base leading-7 text-muted-foreground">{project.deliverables[locale].map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
      <section aria-labelledby="project-reflection" className="grid gap-4 md:grid-cols-[18rem_minmax(0,1fr)] md:gap-12">
        <h2 id="project-reflection" className="text-xl font-semibold tracking-tight">{t("reflection")}</h2>
        <div className="space-y-6">
          <p className="max-w-3xl text-base leading-8 text-muted-foreground">{project.reflection[locale]}</p>
          <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline">{t("source")}<ArrowRightUpIcon className="size-4" aria-hidden="true" /></a>
        </div>
      </section>
      <DetailNavigation pathname="/work/[slug]" label={t("projectNavigation")}
        previousLabel={t("previous")} nextLabel={t("next")}
        previous={previousProject && {slug: previousProject.slug, title: previousProject.title}}
        next={nextProject && {slug: nextProject.slug, title: nextProject.title}} />
    </article>
  </main>;
}
