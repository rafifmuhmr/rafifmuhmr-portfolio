import {projects} from "@/config/projects";
import {projectMarkdown} from "@/lib/project-markdown";

export async function GET(_request: Request, {params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale, slug} = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project || (locale !== "en" && locale !== "id")) return new Response("Not found", {status: 404});
  return new Response(projectMarkdown(project, locale), {headers: {
    "Content-Type": "text/plain; charset=utf-8",
    "X-Robots-Tag": "noindex",
    "X-Content-Type-Options": "nosniff",
  }});
}
