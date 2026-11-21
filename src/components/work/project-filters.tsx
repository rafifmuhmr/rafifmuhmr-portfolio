"use client";

import { Fragment, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const filters = ["all", "websites", "mobileApps", "socialMedia"] as const;
type Filter = (typeof filters)[number];
export type ProjectFilter = Exclude<Filter, "all">;

type FilterableProject = {
  slug: string;
  category: ProjectFilter;
  card: ReactNode;
};

export function ProjectFilters({ projects }: { projects: FilterableProject[] }) {
  const t = useTranslations("WorkPage");
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? projects : projects.filter((project) => project.category === filter);

  return (
    <>
      <div role="group" aria-label={t("filterLabel")} className="mb-6 flex flex-wrap gap-2">
        {filters.map((key) => {
          const count = key === "all" ? projects.length : projects.filter((project) => project.category === key).length;
          if (key !== "all" && count === 0) return null;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={filter === key}
              aria-controls="all-projects-grid"
              onClick={() => setFilter(key)}
              className={cn("inline-flex h-8 cursor-pointer items-center gap-2 rounded-lg border px-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring", filter === key ? "border-primary bg-primary text-primary-foreground" : "border-border bg-muted text-foreground hover:bg-accent")}
            >
              {t(key)}
              <span className={cn("tabular-nums", filter === key ? "text-primary-foreground/70" : "text-muted-foreground")}>{count}</span>
            </button>
          );
        })}
      </div>
      <span role="status" className="sr-only">{t("resultCount", { count: visible.length })}</span>
      <ul id="all-projects-grid" className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => <Fragment key={project.slug}>{project.card}</Fragment>)}
      </ul>
    </>
  );
}
