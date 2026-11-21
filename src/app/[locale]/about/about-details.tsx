import { getTranslations } from "next-intl/server";
import { contact } from "@/config/contact";
import { getLatestProjects, projects } from "@/config/projects";
import { getPathname } from "@/i18n/navigation";
import { Experiences } from "@/vendor/chanhdai/features/portfolio/components/experiences";
import { Education } from "@/vendor/chanhdai/features/portfolio/components/education";
import { Projects } from "@/vendor/chanhdai/features/portfolio/components/projects";
import { Recognition } from "@/vendor/chanhdai/features/portfolio/components/recognition";

export async function AboutDetails({ locale }: { locale: "en" | "id" }) {
  const t = await getTranslations("AboutDetails");
  const projectMonths: Record<string, string> = { pulseco: "06", taniqu: "07", payra: "09" };
  const portfolioProjects = getLatestProjects(projects.length).map((project) => {
    const month = projectMonths[project.slug];
    const period = month ? `${month}.${project.year}` : String(project.year);
    return {
      id: project.slug,
      title: project.title,
      period: { start: period, end: period },
      link: getPathname({ locale, href: { pathname: "/work/[slug]", params: { slug: project.slug } } }),
      description: project.description[locale],
      skills: project.tags[locale],
    };
  });

  return (
    <div className="border-x border-line">
      <Experiences title={t("experience")} items={[{
        id: "micholabs",
        companyName: contact.company,
        companyWebsite: contact.companyUrl,
        positions: [{
          id: "micholabs-role",
          title: t("micholabsRole"),
          employmentPeriod: { start: "09.2025" },
          description: t("micholabsDescription"),
        }],
      }, {
        id: "early-experience",
        companyName: t("earlyExperience"),
        positions: [{
          id: "early-role",
          title: t("earlyRole"),
          employmentPeriod: { start: "2024", end: "2024" },
          description: t("earlyDescription"),
        }],
      }]} />
      <Separator />
      <Education title={t("education")} items={[]} empty={t("educationEmpty")} />
      <Separator />
      <Projects title={t("projects")} items={portfolioProjects} />
      <Separator />
      <Recognition title={t("recognition")} items={[]} empty={t("recognitionEmpty")} />
      <Separator />
    </div>
  );
}

function Separator() {
  return <div aria-hidden className="h-8 w-full border-y border-line bg-[repeating-linear-gradient(135deg,transparent_0_6px,var(--color-line)_6px_7px)]" />;
}
