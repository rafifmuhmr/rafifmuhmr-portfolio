"use client";

import {useTransition} from "react";
import {useLocale, useTranslations} from "next-intl";
import {usePathname, useRouter} from "@/i18n/navigation";
import {routing} from "@/i18n/routing";
import {cn} from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div role="group" aria-label={t("language")} aria-busy={pending}
      className="inline-flex h-9 shrink-0 items-center gap-1 rounded-lg border border-border bg-background/40 p-1">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        className="mx-1 size-4 text-muted-foreground" aria-hidden="true">
        <path d="M4 5h12M10 3v2M6 5c1 5 4 8 8 10M14 5c-1 5-4 8-9 11M14 21l4-10 4 10M15.5 17h5" />
      </svg>
      {routing.locales.map((value) => (
        <button key={value} type="button" aria-pressed={locale === value}
          aria-label={value === "en" ? "English" : "Bahasa Indonesia"}
          disabled={pending}
          onClick={() => {
            if (value === locale) return;
            const href = pathname + window.location.search + window.location.hash;
            startTransition(() => router.replace(href, {locale: value, scroll: false}));
          }}
          className={cn("inline-flex h-6 w-8 shrink-0 items-center justify-center rounded-md px-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-wait",
            locale === value ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground")}
        >{value.toUpperCase()}</button>
      ))}
    </div>
  );
}
