import "server-only";
import {parseGithubCalendarHtml, type ContributionCalendar} from "./github-contribution-data";

export const githubUsername = "rafifmuhmr";
export const githubProfileUrl = `https://github.com/${githubUsername}`;
export type GithubYear = {year: number; calendar: ContributionCalendar | null};

async function getYearCalendar(year: number): Promise<ContributionCalendar | null> {
  const url = new URL(`/users/${githubUsername}/contributions`, "https://github.com");
  url.searchParams.set("from", `${year}-01-01`);
  url.searchParams.set("to", `${year}-12-31`);

  // Retry a transient failure once. Never substitute another year, stale data,
  // sample data, or a zero total when the source cannot be verified.
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {Accept: "text/html", "Accept-Language": "en-US", "Cache-Control": "no-cache"},
        cache: "no-store", signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) {
        if (response.status === 429 || (response.status >= 400 && response.status < 500)) return null;
        continue;
      }
      const calendar = parseGithubCalendarHtml(await response.text(), year);
      if (calendar) return calendar;
    } catch {
      // A network failure is unavailable data, not zero contributions.
    }
  }
  return null;
}

export async function getGithubContributions(): Promise<GithubYear[]> {
  const currentYear = new Date().getUTCFullYear();
  return Promise.all(Array.from({length: 5}, async (_, index) => {
    const year = currentYear - index;
    return {year, calendar: await getYearCalendar(year)};
  }));
}
