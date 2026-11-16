"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {useLocale, useTranslations} from "next-intl";
import {ActivityHeatmap} from "@/components/ui/activity-heatmap";
import type {GithubYear} from "@/lib/github";

export function GithubActivityChart({calendars}: {calendars: GithubYear[]}) {
  const [year, setYear] = useState(calendars[0].year);
  const calendar = calendars.find((entry) => entry.year === year)?.calendar;
  const locale = useLocale();
  const t = useTranslations("GithubActivity");
  const language = locale === "id" ? "id-ID" : "en-US";
  const number = new Intl.NumberFormat(language);
  const date = new Intl.DateTimeFormat(language, {dateStyle: "full", timeZone: "UTC"});
  const shortDate = new Intl.DateTimeFormat(language, {day: "numeric", month: "short", year: "numeric", timeZone: "UTC"});
  const summary = `${number.format(calendar?.total ?? 0)} ${calendar?.total === 1 ? t("unitOne") : t("unitOther")} ${t("yearPeriod", {year})}`;
  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_7rem] lg:gap-8">
      <div className="order-2 min-w-0 space-y-4 lg:order-1">
      {calendar ? <>

      <p className="flex flex-wrap items-baseline gap-x-1 gap-y-1 text-base text-muted-foreground"><span className="font-mono font-medium text-foreground tabular-nums">{number.format(calendar.total)}</span><span>{calendar.total === 1 ? t("unitOne") : t("unitOther")} {t("yearPeriod", {year})}</span></p>
      <ActivityHeatmap key={year} data={calendar.days} fitWidth labelSize={12}
        footer={<p>{shortDate.format(new Date(`${calendar.start}T00:00:00Z`))} — {shortDate.format(new Date(`${calendar.end}T00:00:00Z`))}</p>}
        startDate={new Date(`${calendar.start}T00:00:00Z`)} endDate={new Date(`${calendar.end}T00:00:00Z`)}
        colors={[
          "var(--muted)",
          "color-mix(in oklab, var(--color-brand) 25%, var(--muted))",
          "color-mix(in oklab, var(--color-brand) 50%, var(--muted))",
          "color-mix(in oklab, var(--color-brand) 75%, var(--muted))",
          "var(--color-brand)",
        ]} locale={language} scrollToEnd
        unit={t("unitOther")} lessLabel={t("less")} moreLabel={t("more")}
        valueFormatter={(value) => number.format(value)} aria-label={summary}
        formatCellLabel={({date: day, value}) => t("dayLabel", {count: value, date: date.format(day)})}
        renderTooltip={({date: day, value}) => <span className="flex flex-col gap-1"><span><span className="font-mono font-medium">{number.format(value)}</span> {value === 1 ? t("unitOne") : t("unitOther")}</span><span className="text-background/70">{date.format(day)}</span></span>}
      />
      </> : <p role="status" className="text-sm text-muted-foreground">{t("unavailable")}</p>}
      </div>
      <nav aria-label={t("selectYear")} className="order-1 min-w-0 space-y-4 lg:order-2">
        <h3 className="text-sm font-medium text-foreground">{t("yearHeading")}</h3>
        <div className="grid w-full grid-cols-5 gap-2 lg:grid-cols-1">
        {calendars.map((entry) => <Button key={entry.year} type="button" variant={year === entry.year ? "default" : "ghost"}
          aria-current={year === entry.year ? "true" : undefined}
          onClick={() => setYear(entry.year)} className="w-full min-w-0 justify-center px-1 font-mono tabular-nums lg:justify-start lg:px-3">{entry.year}</Button>)}
        </div>
      </nav>
    </div>
  );
}
