"use client";

import {useSyncExternalStore} from "react";
import {useTranslations} from "next-intl";
import {greetingPeriod} from "@/lib/greeting";

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, 60_000);
  const refresh = () => {
    if (document.visibilityState === "visible") onChange();
  };
  document.addEventListener("visibilitychange", refresh);
  return () => {
    window.clearInterval(timer);
    document.removeEventListener("visibilitychange", refresh);
  };
}
function getSnapshot() {return greetingPeriod(new Date().getHours());}
function getServerSnapshot() {return "hello" as const;}

export function LocalGreeting() {
  const t = useTranslations("About.greeting");
  const period = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <p className="min-h-10 text-[28px] leading-tight font-semibold tracking-tight text-foreground sm:text-[32px]">{t(period)}</p>;
}
