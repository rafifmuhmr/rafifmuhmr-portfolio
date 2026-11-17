export type ContributionDay = {date: string; value: number; level?: number};
export type ContributionCalendar = {days: ContributionDay[]; start: string; end: string; total: number; weeks: number};
const DAY = 86_400_000;

export function parseContributionCalendar(input: unknown): ContributionCalendar | null {
  if (!input || typeof input !== "object" || !("contributions" in input) || !Array.isArray(input.contributions)) return null;
  const days: ContributionDay[] = [];
  for (const item of input.contributions) {
    if (!item || typeof item !== "object" || typeof item.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(item.date) || !Number.isSafeInteger(item.count) || item.count < 0) return null;
    const timestamp = Date.parse(`${item.date}T00:00:00Z`);
    if (!Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0, 10) !== item.date) return null;
    if (item.level !== undefined && (!Number.isInteger(item.level) || item.level < 0 || item.level > 4)) return null;
    days.push({date: item.date, value: item.count, ...(item.level !== undefined ? {level: item.level} : {})});
  }
  if (!days.length || days.length > 366) return null;
  days.sort((a, b) => a.date.localeCompare(b.date));
  for (let i = 1; i < days.length; i++) {
    if (Date.parse(days[i].date) - Date.parse(days[i - 1].date) !== DAY) return null;
  }
  const start = days[0].date;
  const end = days[days.length - 1].date;
  const firstWeekday = new Date(`${start}T00:00:00Z`).getUTCDay();
  return {days, start, end, total: days.reduce((sum, day) => sum + day.value, 0), weeks: Math.ceil((days.length + firstWeekday) / 7)};
}

/** Parse GitHub's public calendar and reject incomplete/mismatched markup. */
export function parseGithubCalendarHtml(html: string, year: number): ContributionCalendar | null {
  if (!Number.isInteger(year) || year < 2008 || year > 9999) return null;
  const heading = html.match(/<h2\b[^>]*\bid="js-contribution-activity-description"[^>]*>([\s\S]*?)<\/h2>/)?.[1];
  const headingText = heading?.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  const yearlyTotal = headingText?.match(/^([\d,]+) contributions? in (\d{4})$/);
  // A rolling-year response must never be labelled as a calendar year.
  if (!yearlyTotal || Number(yearlyTotal[2]) !== year) return null;
  const total = Number(yearlyTotal[1].replaceAll(",", ""));
  if (!Number.isSafeInteger(total)) return null;
  const cells = new Map<string, {date: string; level: number}>();
  const dates = new Set<string>();
  for (const match of html.matchAll(/<td\b([^>]*\bdata-date="\d{4}-\d{2}-\d{2}"[^>]*)>/g)) {
    const date = match[1].match(/\bdata-date="([^"]+)"/)?.[1];
    const id = match[1].match(/\bid="([^"]+)"/)?.[1];
    const rawLevel = match[1].match(/\bdata-level="([^"]+)"/)?.[1];
    const level = rawLevel === undefined ? NaN : Number(rawLevel);
    if (!Number.isInteger(level) || level < 0 || level > 4) return null;
    if (date && date.startsWith(`${year}-`)) {
      if (!id || cells.has(id) || dates.has(date)) return null;
      cells.set(id, {date, level});
      dates.add(date);
    }
  }
  const contributions: {date: string; count: number; level: number}[] = [];
  const parsedCells = new Set<string>();
  for (const match of html.matchAll(/<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g)) {
    const cell = cells.get(match[1]);
    if (!cell) continue;
    if (parsedCells.has(match[1])) return null;
    parsedCells.add(match[1]);
    const text = match[2].replace(/<[^>]+>/g, "").trim();
    const count = /^No contributions on /.test(text) ? 0 : Number(text.match(/^([\d,]+) contributions? on /)?.[1]?.replaceAll(",", ""));
    if (!Number.isSafeInteger(count)) return null;
    if ((count === 0) !== (cell.level === 0)) return null;
    contributions.push({...cell, count});
  }
  if (parsedCells.size !== cells.size) return null;
  const calendar = parseContributionCalendar({contributions});
  if (!calendar || calendar.start !== `${year}-01-01` || calendar.end !== `${year}-12-31` || calendar.total !== total) return null;
  return calendar;
}
