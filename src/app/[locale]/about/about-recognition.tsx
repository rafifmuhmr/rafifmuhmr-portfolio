import { ArrowRightUpIcon, DiplomaVerifiedIcon } from "@solar-icons/react/linear";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { IconTile } from "@/vendor/chanhdai/components/ui/icon-tile";
import { Separator } from "@/components/ui/separator";
import { Tag } from "@/vendor/chanhdai/components/ui/tag";

type RecognitionEntry = {
  id: string;
  title: string;
  issuer: string;
  issued?: string;
  logo?: string;
  tags: string[];
  category: "certificate" | "award" | "trademark";
  credentialUrl?: string;
};

const recognitions: RecognitionEntry[] = [
  {
    id: "responsible-ai",
    title: "AI Upskilling Program with RSA",
    issuer: "Nortis AI",
    issued: "06.2025",
    category: "certificate",
    tags: ["Responsible AI", "AI Ethics"],
    logo: "/images/recognition/logo-nortis-ai.png",
    credentialUrl: "https://drive.google.com/file/d/1ndHq1tjHfygrDXbyw_yglgJ1L4YL5fYu/view",
  },
  {
    id: "solana-learner",
    title: "Solana Learner Certificate",
    issuer: "HackQuest",
    issued: "03.07.2025",
    category: "certificate",
    tags: ["Solana", "Web3"],
    logo: "/images/recognition/logo-hackquest.png",
    credentialUrl: "https://drive.google.com/file/d/1ghGzrDUgXYTHP_-tdAw9EoQpPXPcKCZw/view",
  },
  {
    id: "ethereum-learner",
    title: "Ethereum Learner Certificate",
    issuer: "HackQuest",
    issued: "22.09.2025",
    category: "certificate",
    tags: ["Ethereum", "Web3"],
    logo: "/images/recognition/logo-hackquest.png",
    credentialUrl: "https://drive.google.com/file/d/1l6_-JOYz7LFYcpmRG3noJpYfs3gmJH9U/view",
  },
  {
    id: "figma-graphic-design",
    title: "Intensive Camp Graphic Design with Figma",
    issuer: "Special Skill",
    issued: "27.09.2025",
    category: "certificate",
    tags: ["Graphic Design", "Figma"],
    logo: "/images/recognition/logo-special-skill.png",
    credentialUrl: "https://drive.google.com/file/d/1WkfqJqM8gsD85pWV__0dpbkhXbeykvNz/view",
  },
  {
    id: "digital-skill-fair",
    title: "Digital Skill Fair (DSF) 44 - UIUX Design",
    issuer: "Dibimbing.id",
    issued: "27.09.2025",
    category: "certificate",
    tags: ["UI/UX Design"],
    logo: "/images/recognition/logo-dibimbing.png",
    credentialUrl: "https://drive.google.com/file/d/1MM1GblN3tWrav12jWowm6oXbk3EcZQqk/view",
  },
  {
    id: "uiux-design",
    title: "Intensive Camp UI/UX Design",
    issuer: "Special Skill",
    issued: "30.10.2025",
    category: "certificate",
    tags: ["UI/UX Design"],
    logo: "/images/recognition/logo-special-skill.png",
    credentialUrl: "https://drive.google.com/file/d/1ii0Q-jS_uq3VWohI7yOgLCZs1tfDfR8K/view",
  },
  {
    id: "wordpress-intensive",
    title: "Intensive Camp WordPress Development",
    issuer: "Special Skill",
    issued: "16.11.2025",
    category: "certificate",
    tags: ["WordPress", "Web Development"],
    logo: "/images/recognition/logo-special-skill.png",
    credentialUrl: "https://drive.google.com/file/d/1cuoHR29dH-zXPoT0FXIM3zlSozuSfosw/view",
  },
  {
    id: "ethereum-builder",
    title: "Ethereum Builder Certificate",
    issuer: "HackQuest",
    issued: "23.11.2025",
    category: "certificate",
    tags: ["Ethereum", "Web3 Development"],
    logo: "/images/recognition/logo-hackquest.png",
    credentialUrl: "https://drive.google.com/file/d/1ZswCBxIwEx1Ych_VFv5P36qVe-b8CDMr/view",
  },
  {
    id: "web-journey",
    title: "Kickstart Your Web Journey: From Development Lifecycle to Coding Basic",
    issuer: "Aksademy",
    issued: "10.12.2025",
    category: "certificate",
    tags: ["Web Development", "Coding Fundamentals"],
    logo: "/images/recognition/logo-aksademy.png",
    credentialUrl: "https://drive.google.com/file/d/1sd8pBnxFBkIx-wBDQuH6oii-AoVX-Z2c/view",
  },
  {
    id: "aksademy-ui-ux-design-figma",
    title: "Fullstack Intensive Bootcamp: UI-UX Design with Figma",
    issuer: "Aksademy",
    issued: "12.2025",
    category: "certificate",
    tags: ["UI/UX Design", "Figma"],
    logo: "/images/recognition/logo-aksademy.png",
    credentialUrl: "https://drive.google.com/file/d/1KMmgOVRateZ0ma4ab37J7REireJC2OvZ/view?usp=sharing",
  },
];

export async function AboutRecognition() {
  const t = await getTranslations("AboutDetails");
  const byIssuer = new Map<string, RecognitionEntry[]>();

  for (const entry of recognitions) {
    const entries = byIssuer.get(entry.issuer);
    if (entries) entries.push(entry);
    else byIssuer.set(entry.issuer, [entry]);
  }

  return (
    <section
      aria-labelledby="recognition-title"
      className="grid gap-8 py-6 sm:py-8 lg:grid-cols-3 lg:gap-x-6 lg:py-10"
    >
      <header className="space-y-3">
        <h2 id="recognition-title" className="text-xl font-semibold tracking-tight">
          {t("recognition")}{" "}
          <sup className="ml-0.5 text-xs font-medium tracking-normal text-muted-foreground">
            ({recognitions.length})
          </sup>
        </h2>
        <p className="text-sm leading-6 text-muted-foreground">{t("recognitionDescription")}</p>
      </header>
      <div className="min-w-0 lg:col-span-2">
        {recognitions.length === 0 ? (
          <p className="text-sm leading-6 text-muted-foreground">{t("recognitionEmpty")}</p>
        ) : (
          <ul className="flex flex-col gap-12">
            {Array.from(byIssuer, ([issuer, entries]) => {
              const logo = entries[0]?.logo;

              return (
                <li key={issuer} className="space-y-5">
                  <header className="group/recognition flex items-center gap-3">
                    {logo ? (
                      <Image
                        src={logo}
                        alt=""
                        width={24}
                        height={24}
                        className="size-6 shrink-0 object-contain opacity-60 grayscale transition-[filter,opacity] duration-300 group-hover/recognition:opacity-100 group-hover/recognition:grayscale-0 motion-reduce:transition-none"
                      />
                    ) : (
                      <IconTile aria-hidden><DiplomaVerifiedIcon className="size-4" /></IconTile>
                    )}
                    <h3 className="text-xl/6 font-medium">
                      {issuer}{" "}
                      <sup className="text-xs font-medium text-muted-foreground">({entries.length})</sup>
                    </h3>
                  </header>
                  <ul className="flex flex-col gap-4">
                    {entries.map(({ id, title, issued, tags, category, credentialUrl }) => {
                      const Row = credentialUrl ? "a" : "div";
                      const timeline = issued?.split(".").slice(-2).join(".");

                      return (
                        <li key={id} className="group/entry relative">
                          <span
                            aria-hidden
                            className="pointer-events-none absolute -bottom-3.5 left-3 top-6.5 w-4 border-l border-line group-last/entry:bottom-2.25 group-last/entry:rounded-bl-[8px] group-last/entry:border-b"
                          />
                          <Row
                            href={credentialUrl}
                            target={credentialUrl ? "_blank" : undefined}
                            rel={credentialUrl ? "noopener" : undefined}
                            className="relative isolate grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-3 gap-y-1 before:pointer-events-none before:absolute before:-top-1 before:-bottom-1.5 before:-right-1 before:left-7 before:-z-10 before:rounded-lg before:transition-[background-color] before:ease-out [&[href]:hover]:before:bg-accent-muted focus-visible:outline-none focus-visible:before:bg-accent-muted focus-visible:before:inset-ring-2 focus-visible:before:inset-ring-ring/50"
                          >
                            <IconTile aria-hidden><DiplomaVerifiedIcon className="size-4" /></IconTile>
                            <h4 className="text-balance text-base font-medium">{title}</h4>
                            {credentialUrl && (
                              <span aria-hidden className="grid size-5 shrink-0 place-items-center text-muted-foreground">
                                <ArrowRightUpIcon className="size-3" />
                              </span>
                            )}
                            <div className="col-start-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                              <span>{t(`recognitionCategories.${category}`)}</span>
                              {timeline && (
                                <span className="inline-flex items-center gap-2 tabular-nums">
                                  <Separator render={<span />} orientation="vertical" className="data-vertical:h-4 data-vertical:self-center" aria-hidden />
                                  {timeline}
                                </span>
                              )}
                            </div>
                          </Row>
                          {tags.length > 0 && (
                            <ul className="flex flex-wrap gap-1.5 pt-3 pl-9">
                              {tags.map((tag) => (
                                <li key={tag} className="flex">
                                  <Tag className="rounded-md px-2 font-sans">{tag}</Tag>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
