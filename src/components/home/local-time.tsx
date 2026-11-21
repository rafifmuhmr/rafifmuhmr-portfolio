"use client";

import {useSyncExternalStore} from "react";
import {RollingNumber} from "@/components/ui/rolling-number";
import {Separator} from "@/components/ui/separator";
import {useTranslations} from "next-intl";
import {location} from "@/config/location";
import {computeLocalClock} from "@/lib/local-clock";
import {IntroItem, IntroItemContent, IntroItemIcon} from "./intro-item";

function subscribe(onChange: () => void) {
  let timer: ReturnType<typeof setTimeout>;
  function tick() {
    onChange();
    timer = setTimeout(tick, 60000 - Date.now() % 60000);
  }
  timer = setTimeout(tick, 60000 - Date.now() % 60000);
  document.addEventListener("visibilitychange", onChange);
  return () => {clearTimeout(timer); document.removeEventListener("visibilitychange", onChange);};
}
function getSnapshot() { return Math.floor(Date.now() / 60000); }
function getServerSnapshot() { return null; }

export function LocalTime({timeZone = location.timeZone}: {timeZone?: string}) {
  const epoch = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const t = useTranslations("LocalStatus");
  const now = epoch == null ? null : new Date(epoch * 60000);
  const clock = now ? computeLocalClock(now, timeZone, -now.getTimezoneOffset()) : null;
  const delta = Math.abs(clock?.difference ?? 0);
  const hours = Math.floor(delta / 60);
  const minutes = delta % 60;
  const duration = [hours ? t("hours", {count: hours}) : "", minutes ? t("minutes", {count: minutes}) : ""].filter(Boolean).join(" ");
  const difference = clock ? clock.difference === 0 ? t("sameTime") : t(clock.difference > 0 ? "ahead" : "behind", {duration}) : "";
  const minute = Number(clock?.minute ?? 0);
  const hour = Number(clock?.hour ?? 12);
  return (
    <IntroItem className="text-muted-foreground">
      <IntroItemIcon aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 12V8.4" transform={`rotate(${(hour % 12 + minute / 60) * 30} 12 12)`} />
          <path d="M12 12V6" transform={`rotate(${minute * 6} 12 12)`} />
        </svg>
      </IntroItemIcon>
      <IntroItemContent className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="inline-flex items-center gap-2 whitespace-nowrap text-sm leading-5 font-medium text-foreground">
          <span className="tabular-nums"><RollingNumber value={clock?.hour ?? "--"} />:<RollingNumber value={clock?.minute ?? "--"} /></span>
          <span className="font-sans">{clock?.period ?? "--"}</span>
        </span>
        {difference && (
          <span className="inline-flex items-center gap-2 font-sans text-sm text-muted-foreground">
            <Separator render={<span />} orientation="vertical" aria-hidden="true" className="data-vertical:h-4 data-vertical:self-center" />
            <span>{difference}</span>
          </span>
        )}
      </IntroItemContent>
    </IntroItem>
  );
}
