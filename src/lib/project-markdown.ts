import type {PortfolioProject} from "@/config/projects";
import {site} from "@/config/site";

export function projectUrl(project: PortfolioProject, locale: "en" | "id") {
  return `${site.url}/${locale}/${locale === "id" ? "karya" : "work"}/${project.slug}`;
}

export function projectMarkdown(project: PortfolioProject, locale: "en" | "id") {
  const id = locale === "id";
  return [
    `# ${project.title}`, "", project.subtitle[locale], "", project.tags[locale].join(" · "), "", project.description[locale], "",
    `- ${id ? "Peran" : "Role"}: ${project.role[locale]}`,
    `- ${id ? "Lingkup" : "Scope"}: ${project.scope[locale]}`,
    `- Platform: ${project.platform}`,
    `- ${id ? "Periode" : "Timeline"}: ${project.timeline[locale]}`,
    ...(project.tool ? [`- ${id ? "Tools desain" : "Design tool"}: ${project.tool}`] : []),
    `- ${id ? "Portfolio" : "Portfolio"}: ${projectUrl(project, locale)}`,
    `- UI8: ${project.sourceUrl}`, "",
    `## ${id ? "Ringkasan proyek" : "Project overview"}`, "", project.overview[locale], "",
    `## ${id ? "Sorotan" : "Highlights"}`, "", ...project.highlights[locale].map((item) => `- ${item}`), "",
    `## ${id ? "Gambar proyek" : "Project images"}`, "",
    ...[project.cover, ...project.gallery].filter(Boolean).map((src, index) => `![${project.title} ${index + 1}](${site.url}${src})`), "",
  ].join("\n");
}
