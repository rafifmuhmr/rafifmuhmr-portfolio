import {strict as assert} from "node:assert";
import {test} from "node:test";
import {parseGithubCalendarHtml} from "./github-contribution-data";

function calendarHtml(year: number) {
  const days: string[] = [];
  const end = Date.UTC(year + 1, 0, 1);
  for (let time = Date.UTC(year, 0, 1), index = 0; time < end; time += 86_400_000, index++) {
    const date = new Date(time).toISOString().slice(0, 10);
    const count = index === 0 ? 7 : 0;
    days.push(`<td data-date="${date}" id="day-${index}" data-level="${count ? 3 : 0}"></td><tool-tip for="day-${index}">${count ? "7 contributions" : "No contributions"} on January 1st.</tool-tip>`);
  }
  return `<h2 id="js-contribution-activity-description">\n7 contributions\n in ${year}\n</h2>${days.join("")}`;
}

test("calendar years have exact boundaries, daily totals and upstream intensity", () => {
  for (const year of [2022, 2023, 2024, 2025, 2026]) {
    const calendar = parseGithubCalendarHtml(calendarHtml(year), year);
    assert.ok(calendar);
    assert.equal(calendar.start, `${year}-01-01`);
    assert.equal(calendar.end, `${year}-12-31`);
    assert.equal(calendar.days.length, year === 2024 ? 366 : 365);
    assert.equal(calendar.total, 7);
    assert.equal(calendar.days[0].level, 3);
  }
});

test("rejects rolling totals, wrong heading year and mismatched totals", () => {
  const html = calendarHtml(2026);
  assert.equal(parseGithubCalendarHtml(html.replace("in 2026", "in the last year"), 2026), null);
  assert.equal(parseGithubCalendarHtml(html.replace("in 2026", "in 2025"), 2026), null);
  assert.equal(parseGithubCalendarHtml(html.replace("7 contributions", "8 contributions"), 2026), null);
});

test("rejects missing days, missing tooltips and duplicate days or tooltips", () => {
  const html = calendarHtml(2026);
  assert.equal(parseGithubCalendarHtml(html.replace(/<td[^>]*data-date="2026-01-01"[^>]*><\/td>/, ""), 2026), null);
  assert.equal(parseGithubCalendarHtml(html.replace(/<tool-tip for="day-0">.*?<\/tool-tip>/, ""), 2026), null);
  assert.equal(parseGithubCalendarHtml(`${html}<td data-date="2026-01-01" id="duplicate" data-level="3">`, 2026), null);
  assert.equal(parseGithubCalendarHtml(`${html}<tool-tip for="day-0">7 contributions on January 1st.</tool-tip>`, 2026), null);
});

test("rejects invalid dates and inconsistent or invalid color levels", () => {
  const html = calendarHtml(2026);
  assert.equal(parseGithubCalendarHtml(html.replace("2026-02-28", "2026-02-30"), 2026), null);
  assert.equal(parseGithubCalendarHtml(html.replace('data-level="3"', 'data-level="0"'), 2026), null);
  assert.equal(parseGithubCalendarHtml(html.replace('data-level="3"', 'data-level="5"'), 2026), null);
});

test("accepts genuine zero-contribution years without inventing activity", () => {
  const html = calendarHtml(2026).replaceAll("7 contributions", "0 contributions").replace('data-level="3"', 'data-level="0"');
  assert.equal(parseGithubCalendarHtml(html, 2026)?.total, 0);
});
