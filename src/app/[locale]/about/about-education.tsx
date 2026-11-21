import { getTranslations } from "next-intl/server";

import { EducationItem } from "@/vendor/chanhdai/features/portfolio/components/education/education-item";
import type { Education } from "@/vendor/chanhdai/features/portfolio/types/education";

export async function AboutEducation() {
  const t = await getTranslations("AboutDetails");
  const education: Education[] = [
    {
      id: "stikom-pgri-banyuwangi",
      school: "STIKOM PGRI Banyuwangi",
      website: "https://stikombanyuwangi.ac.id/",
      logo: "/images/education/logo-stikom-pgri-banyuwangi.png",
      period: { start: "08.2021", end: "09.2025" },
      level: t("higherEducation"),
      degree: t("stikomDegree"),
      fieldOfStudy: t("stikomField"),
      description: t("stikomDescription"),
      skills: t.raw("stikomSkills"),
    },
    {
      id: "sma-negeri-1-rogojampi",
      school: "SMA Negeri 1 Rogojampi",
      website: "https://sman1rogojampi.sch.id/",
      logo: "/images/education/logo-sman1-rogojampi.png",
      period: { start: "08.2015", end: "06.2018" },
      level: t("seniorSecondary"),
      fieldOfStudy: t("seniorSecondaryField"),
      description: t("seniorSecondaryDescription"),
      skills: t.raw("seniorSecondarySkills"),
    },
    {
      id: "mts-negeri-rogojampi",
      school: "MTsN 10 Banyuwangi",
      website: "https://www.mtsn10banyuwangi.sch.id/",
      logo: "/images/education/logo-mtsn10-banyuwangi.png",
      period: { start: "08.2011", end: "06.2015" },
      level: t("juniorSecondary"),
      description: t("juniorSecondaryDescription"),
      skills: t.raw("juniorSecondarySkills"),
    },
  ];

  return (
    <section
      aria-labelledby="education-title"
      className="grid gap-8 py-6 sm:py-8 lg:grid-cols-3 lg:gap-x-6 lg:py-10"
    >
      <header className="space-y-3">
        <h2 id="education-title" className="text-xl font-semibold tracking-tight">
          {t("education")}
        </h2>
        <p className="text-sm leading-6 text-muted-foreground">{t("educationDescription")}</p>
      </header>
      <div className="flex min-w-0 flex-col gap-12 lg:col-span-2">
        {education.length === 0 && (
          <p className="text-sm leading-6 text-muted-foreground">{t("educationEmpty")}</p>
        )}
        {education.map((item) => <EducationItem key={item.id} item={item} />)}
      </div>
    </section>
  );
}
