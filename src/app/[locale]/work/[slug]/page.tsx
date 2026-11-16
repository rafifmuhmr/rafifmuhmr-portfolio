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
    <article className="mx-auto max-w-7xl space-y-12 sm:space-y-16 lg:space-y-20">
      <header className="space-y-8">
        <ProjectPageActions title={project.title} url={url} markdownUrl={markdownUrl} markdown={projectMarkdown(project, locale)} previous={previousProject && {slug: previousProject.slug, title: previousProject.title}} next={nextProject && {slug: nextProject.slug, title: nextProject.title}} />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_30rem] md:items-start">
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl font-medium tracking-tight sm:text-5xl">{project.title}</h1>
              <p className="text-lg leading-7 text-muted-foreground sm:text-xl">{project.subtitle[locale]}</p>
            </div>
            <ul aria-label={t("tags")} className="flex flex-wrap gap-2">
              {project.tags[locale].map((tag) => <li key={tag} className="rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground">{tag}</li>)}
            </ul>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">{project.description[locale]}</p>
            <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline">{t("source")}<ArrowRightUpIcon aria-hidden="true" className="size-4" /></a>
          </div>
          <dl className="grid grid-cols-2 gap-10 text-sm lg:grid-cols-3">
            <div className="space-y-2"><dt className="text-muted-foreground">{t("role")}</dt><dd>{project.role[locale]}</dd></div>
            <div className="space-y-2"><dt className="text-muted-foreground">{t("scope")}</dt><dd className="leading-6">{project.scope[locale]}</dd></div>
            <div className="space-y-2"><dt className="text-muted-foreground">{t("timeline")}</dt><dd>{project.timeline[locale]}</dd></div>
            <div className="space-y-2"><dt className="text-muted-foreground">{t("platform")}</dt><dd>{project.platform}</dd></div>
            {project.tool && <div className="space-y-2"><dt className="text-muted-foreground">{t("tools")}</dt><dd>{project.tool}</dd></div>}
          </dl>
        </div>
      </header>
      <div className="overflow-hidden rounded-[12px]">{project.cover ? <Image src={project.cover} alt={`${project.title} — ${project.subtitle[locale]}`} width={1800} height={1360} sizes="(min-width: 1280px) 1280px, 100vw" className="h-auto w-full" /> : <ProjectCover title={project.title} label={t("coverPending")} />}</div>
      <section aria-labelledby="project-overview" className="grid gap-4 md:grid-cols-[18rem_minmax(0,1fr)] md:gap-12"><h2 id="project-overview" className="text-xl font-semibold tracking-tight">{t("overview")}</h2><div className="space-y-6"><p className="max-w-3xl text-base leading-8 text-muted-foreground">{project.overview[locale]}</p><a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline">{t("source")}<ArrowRightUpIcon className="size-4" aria-hidden="true" /></a></div></section>
      <section aria-labelledby="project-highlights" className="grid gap-4 md:grid-cols-[18rem_minmax(0,1fr)] md:gap-12"><h2 id="project-highlights" className="text-xl font-semibold tracking-tight">{t("highlights")}</h2><ul className="list-disc space-y-3 pl-5 text-sm leading-6 text-muted-foreground">{project.highlights[locale].map((item) => <li key={item}>{item}</li>)}</ul></section>
      {project.gallery.length > 0 && <section aria-labelledby="project-gallery" className="space-y-8"><h2 id="project-gallery" className="text-xl font-semibold tracking-tight">{t("gallery")}</h2><ProjectGallery images={project.gallery} title={project.title} /></section>}
      <nav className="flex items-start justify-between gap-6 border-t border-border pt-8" aria-label={t("projectNavigation")}>
        {previousProject && <Link href={{pathname: "/work/[slug]", params: {slug: previousProject.slug}}} className="space-y-2 underline-offset-4 hover:underline"><span className="block text-sm text-muted-foreground">{t("previous")}</span><span className="inline-flex items-center gap-2 text-xl font-medium"><ArrowLeftIcon aria-hidden="true" className="size-5" />{previousProject.title}</span></Link>}
        {nextProject && <Link href={{pathname: "/work/[slug]", params: {slug: nextProject.slug}}} className="ml-auto space-y-2 text-right underline-offset-4 hover:underline"><span className="block text-sm text-muted-foreground">{t("next")}</span><span className="inline-flex items-center gap-2 text-xl font-medium">{nextProject.title}<ArrowRightUpIcon aria-hidden="true" className="size-5" /></span></Link>}
      </nav>
    </article>
  </main>;
}
