"use client";

import {useCallback, useEffect, useTransition} from "react";
import {useParams, useRouter} from "next/navigation";
import {useLocale, useTranslations} from "next-intl";
import {usePathname, getPathname} from "@/i18n/navigation";
import {routing} from "@/i18n/routing";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {cn} from "@/lib/utils";

function useLanguageChange() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [pending, startTransition] = useTransition();
  const changeLanguage = useCallback((value: (typeof routing.locales)[number]) => {
    if (pending || value === locale) return;
    const query: Record<string, string | string[]> = {};
    new URLSearchParams(window.location.search).forEach((entry, key) => {
      const previous = query[key];
      query[key] = previous === undefined ? entry : Array.isArray(previous) ? [...previous, entry] : [previous, entry];
    });
    const hash = window.location.hash;
    startTransition(() => {
      const dynamic = pathname === "/work/[slug]" || pathname === "/work/[slug]/markdown" || pathname === "/blog/[slug]" || pathname === "/blog/[slug]/markdown";
      if (dynamic && typeof params.slug === "string") {
        router.replace(getPathname({locale: value, href: {pathname, params: {slug: params.slug}, query}}) + hash, {scroll: false});
      } else if (!dynamic) {
        router.replace(getPathname({locale: value, href: {pathname, query}}) + hash, {scroll: false});
      }
    });
  }, [locale, pathname, params.slug, pending, router]);
  return {locale, pending, changeLanguage};
}

// The header renders two controls, so register the global shortcut only once.
export function useLanguageShortcut() {
  const {locale, changeLanguage} = useLanguageChange();
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat || event.isComposing || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || event.key.toLowerCase() !== "l") return;
      if (event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"], [role="combobox"], [role="listbox"], [role="menu"]')) return;
      event.preventDefault();
      changeLanguage(locale === "en" ? "id" : "en");
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [locale, changeLanguage]);
}

export function LanguageSwitcher() {
  const t = useTranslations("Navigation");
  const {locale, pending, changeLanguage} = useLanguageChange();
  return (
    <Tooltip>
      <TooltipTrigger render={<div role="group" aria-label={t("language")} aria-busy={pending}
        className="inline-flex h-9 shrink-0 items-center gap-1 rounded-lg border border-border bg-background/40 p-1" />}>
      <button type="button" disabled={pending} onClick={() => changeLanguage(locale === "en" ? "id" : "en")} aria-label={t("language")} aria-keyshortcuts="L" className="mx-1 inline-flex size-4 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        className="size-4" aria-hidden="true">
        <path d="M4 5h12M10 3v2M6 5c1 5 4 8 8 10M14 5c-1 5-4 8-9 11M14 21l4-10 4 10M15.5 17h5" />
      </svg>
      </button>
      {routing.locales.map((value) => (
        <button key={value} type="button" aria-pressed={locale === value}
          aria-label={value === "en" ? "English" : "Bahasa Indonesia"}
          disabled={pending}
          onClick={() => changeLanguage(value)}
          className={cn("inline-flex h-6 w-8 shrink-0 items-center justify-center rounded-md px-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-wait",
            locale === value ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground")}
        >{value.toUpperCase()}</button>
      ))}
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={8} className="gap-3 px-3 py-2">
        <span>{t("languageToggle")}</span>
        <kbd className="inline-flex size-5 items-center justify-center rounded border border-background/10 bg-background/15 font-mono text-xs text-background">L</kbd>
      </TooltipContent>
    </Tooltip>
  );
}
