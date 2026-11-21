"use client";

import {useCallback, useEffect} from "react";
import {useTranslations} from "next-intl";
import {useTheme} from "next-themes";
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";

function useToggleTheme() {
  const {setTheme} = useTheme();
  return useCallback(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  }, [setTheme]);
}

// Register once in the header, which renders both desktop and mobile controls.
export function useThemeShortcut() {
  const toggleTheme = useToggleTheme();
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat || event.isComposing || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || event.key.toLowerCase() !== "d") return;
      const target = event.target;
      if (target instanceof Element && target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"], [role="combobox"], [role="listbox"], [role="menu"]')) return;
      event.preventDefault();
      toggleTheme();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleTheme]);
}

export function ThemeToggle() {
  const t = useTranslations("Navigation");
  const toggleTheme = useToggleTheme();
  return (
    <Tooltip>
      <TooltipTrigger render={
        <Button type="button" variant="ghost" size="icon-lg" onClick={toggleTheme} aria-label={t("theme")} aria-keyshortcuts="D" />
      }>
        <DarkSideIcon className="size-4" />
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={8} className="gap-3 px-3 py-2">
        <span>Toggle mode</span>
        <kbd className="inline-flex size-5 items-center justify-center rounded border border-background/10 bg-background/15 text-xs text-background">D</kbd>
      </TooltipContent>
    </Tooltip>
  );
}


function DarkSideIcon({className}: {className?: string}) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path
        d="M16 .5C7.4.5.5 7.4.5 16S7.4 31.5 16 31.5 31.5 24.6 31.5 16 24.6.5 16 .5zm0 28.1V3.4C23 3.4 28.6 9 28.6 16S23 28.6 16 28.6z"
        className="origin-center motion-safe:transition-transform! motion-safe:duration-500 motion-safe:ease-[ease] dark:rotate-180"
      />
    </svg>
  );
}
