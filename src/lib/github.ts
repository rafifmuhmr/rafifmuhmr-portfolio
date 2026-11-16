import "server-only";
import {parseGithubCalendarHtml, type ContributionCalendar} from "./github-contribution-data";

export const githubUsername = "rafifmuhmr";
export const githubProfileUrl = `https://github.com/${githubUsername}`;
export type GithubYear = {year: number; calendar: ContributionCalendar | null};

export async function getGithubContributions(): Promise<GithubYear[]> {
  const currentYear = new Date().getUTCFullYear();
  return Promise.all(Array.from({length: 5}, async (_, index) => {
    const year = currentYear - index;
    try {
      // Read the same public calendar as the profile, without a third-party
      // cache or a stale fallback. Check its heading against the daily sum.
      const response = await fetch(`${githubProfileUrl.replace("github.com/", "github.com/users/")}/contributions?from=${year}-01-01&to=${year}-12-31`, {
        headers: {Accept: "text/html", "Accept-Language": "en-US"},
        cache: "no-store", signal: AbortSignal.timeout(10000),
      });
      const calendar = response.ok ? parseGithubCalendarHtml(await response.text(), year) : null;
      return {year, calendar};
    } catch {
      return {year, calendar: null};
    }
  }));
}
