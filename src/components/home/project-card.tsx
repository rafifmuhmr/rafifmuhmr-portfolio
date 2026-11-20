import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { PortfolioProject } from "@/config/projects";
import { ProjectCover } from "./project-cover";

type Props = {
  project: PortfolioProject;
  language: "en" | "id";
  coverPending: string;
};

export function ProjectCard({ project, language, coverPending }: Props) {
  const external = /^https?:\/\//.test(project.href);
  const content = <>
    <div className="relative aspect-4/3 overflow-hidden rounded-[12px] bg-muted">
      {project.cover ? <Image src={project.cover} alt={project.title} fill sizes="(min-width: 1280px) 411px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" /> : <ProjectCover title={project.title} label={coverPending} />}
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
  return <li>{external ? <a href={project.href} target="_blank" rel="noopener noreferrer" className={className}>{content}</a> : <Link href={{pathname: "/work/[slug]", params: {slug: project.slug}}} className={className}>{content}</Link>}</li>;
}
