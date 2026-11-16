import {getTranslations} from "next-intl/server";
import {getGithubContributions, githubUsername, githubProfileUrl} from "@/lib/github";
import {GithubActivityChart} from "./github-activity-chart";
import {IntroItemLink} from "./intro-item";

export async function GithubActivity() {
  const [calendars, t] = await Promise.all([getGithubContributions(), getTranslations("GithubActivity")]);
  return (
    <section aria-labelledby="github-activity-title" className="min-w-0 py-6 sm:py-8 lg:py-10">
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-3">
          <h2 id="github-activity-title" className="text-xl font-semibold tracking-tight">{t("title")}</h2>
          <p className="text-sm leading-6 text-muted-foreground">{t("description")}</p>
        </div>
        <IntroItemLink href={githubProfileUrl} className="text-sm font-medium text-foreground">@{githubUsername}</IntroItemLink>
      </header>
      {calendars.some((entry) => entry.calendar) ? (
        <>
          <GithubActivityChart calendars={calendars} />
        </>
      ) : (
        <div className="rounded-2xl border border-border p-6 text-sm text-muted-foreground" role="status">
          <p>{t("unavailable")}</p>
          <IntroItemLink href={githubProfileUrl} className="mt-3 inline-block font-medium text-foreground">{t("viewProfile")}</IntroItemLink>
        </div>
      )}
    </section>
  );
}

export function GithubActivitySkeleton() {
  return <div aria-hidden="true" className="py-6 sm:py-8 lg:py-10"><div className="mb-6 h-12 w-56 rounded-md bg-muted motion-safe:animate-pulse" /><div className="h-48 rounded-md bg-muted/30 motion-safe:animate-pulse" /></div>;
}
