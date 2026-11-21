import { CaseIcon, CodeCircleIcon, LightbulbIcon, SelectionIcon, WindowFrameIcon } from "@solar-icons/react/linear";
import { getTranslations } from "next-intl/server";

import { contact } from "@/config/contact";
import { location } from "@/config/location";
import { ExperienceList } from "@/vendor/chanhdai/features/portfolio/components/experiences";
import type { Experience } from "@/vendor/chanhdai/features/portfolio/types/experiences";

export async function AboutExperience() {
  const t = await getTranslations("AboutDetails");
  const experiences: Experience[] = [
    {
      id: "micholabs",
      companyName: contact.company,
      companyLogo: "/micholabs-logo-light.svg",
      companyLogoDark: "/micholabs-logo-dark.svg",
      companyWebsite: contact.companyUrl,
      location: location.address,
      isCurrentEmployer: true,
      positions: [
        {
          id: "micholabs-co-founder",
          title: t("micholabsCoFounder"),
          employmentPeriod: { start: "09.2025" },
          employmentType: t("fullTime"),
          description: t("micholabsCoFounderDescription"),
          icon: <LightbulbIcon className="size-4" />,
          skills: t.raw("micholabsCoFounderSkills"),
        },
        {
          id: "micholabs-uiux",
          title: t("micholabsRole"),
          employmentPeriod: { start: "09.2025" },
          employmentType: t("fullTime"),
          description: t("micholabsDescription"),
          icon: <SelectionIcon className="size-4" />,
          skills: t.raw("micholabsDesignSkills"),
        },
      ],
    },
    {
      id: "official-pavo",
      companyName: "Official Pavo",
      companyWebsite: "https://pavocoin.xyz/",
      companyLogo: "/officialpavo-logo.png",
      location: location.address,
      positions: [
        {
          id: "official-pavo-founder",
          title: t("officialPavoFounderTitle"),
          employmentPeriod: { start: "07.2024", end: "12.2024" },
          employmentType: t("partTime"),
          description: t("officialPavoFounderDescription"),
          icon: <LightbulbIcon className="size-4" />,
          skills: t.raw("officialPavoFounderSkills"),
        },
        {
          id: "official-pavo-ceo",
          title: t("officialPavoCeoTitle"),
          employmentPeriod: { start: "07.2024", end: "12.2024" },
          employmentType: t("partTime"),
          description: t("officialPavoCeoDescription"),
          icon: <CaseIcon className="size-4" />,
          skills: t.raw("officialPavoCeoSkills"),
        },
        {
          id: "official-pavo-graphic-designer",
          title: t("officialPavoGraphicTitle"),
          employmentPeriod: { start: "07.2024", end: "12.2024" },
          employmentType: t("partTime"),
          description: t("officialPavoGraphicDescription"),
          icon: <SelectionIcon className="size-4" />,
          skills: t.raw("officialPavoGraphicSkills"),
        },
      ],
    },
    {
      id: "mudapedia",
      companyName: "Mudapedia Digital Indonesia",
      companyLogo: "/mudapedia-logo.png",
      companyWebsite: "https://mudapediadigitalindonesia.com/",
      location: location.address,
      positions: [
        {
          id: "mudapedia-founder",
          title: t("mudapediaFounderTitle"),
          employmentPeriod: { start: "12.2023", end: "09.2025" },
          employmentType: t("fullTime"),
          description: t("mudapediaFounderDescription"),
          icon: <LightbulbIcon className="size-4" />,
          skills: t.raw("mudapediaFounderSkills"),
        },
        {
          id: "mudapedia-coo",
          title: t("mudapediaCooTitle"),
          employmentPeriod: { start: "01.2025", end: "09.2025" },
          employmentType: t("fullTime"),
          description: t("mudapediaCooDescription"),
          icon: <CaseIcon className="size-4" />,
          skills: t.raw("mudapediaCooSkills"),
        },
        {
          id: "mudapedia-frontend",
          title: t("mudapediaFrontendTitle"),
          employmentPeriod: { start: "12.2023", end: "09.2025" },
          employmentType: t("fullTime"),
          description: t("mudapediaFrontendDescription"),
          icon: <CodeCircleIcon className="size-4" />,
          skills: t.raw("mudapediaFrontendSkills"),
        },
        {
          id: "mudapedia-wordpress",
          title: "WordPress Developer",
          employmentPeriod: { start: "07.2024", end: "12.2025" },
          employmentType: t("fullTime"),
          description: t("mudapediaWordpressDescription"),
          icon: <WindowFrameIcon className="size-4" />,
          skills: t.raw("mudapediaWordpressSkills"),
        },
        {
          id: "mudapedia-graphic",
          title: t("mudapediaGraphicTitle"),
          employmentPeriod: { start: "04.2025", end: "07.2025" },
          employmentType: t("fullTime"),
          description: t("mudapediaGraphicDescription"),
          icon: <SelectionIcon className="size-4" />,
          skills: t.raw("mudapediaGraphicSkills"),
        },
      ],
    },
  ];

  return (
    <section
      aria-labelledby="experience-title"
      className="grid gap-8 py-6 sm:py-8 lg:grid-cols-3 lg:gap-x-6 lg:py-10"
    >
      <header className="space-y-3">
        <h2 id="experience-title" className="text-xl font-semibold tracking-tight">
          {t("experience")}
        </h2>
        <p className="text-sm leading-6 text-muted-foreground">{t("experienceDescription")}</p>
      </header>
      <div className="flex min-w-0 flex-col gap-12 lg:col-span-2">
        <ExperienceList experiences={experiences} />
      </div>
    </section>
  );
}
