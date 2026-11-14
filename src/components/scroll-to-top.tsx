"use client";

import {useSyncExternalStore} from "react";
import {AnimatePresence, useReducedMotion} from "motion/react";
import * as m from "motion/react-m";
import {ArrowUpIcon} from "@solar-icons/react/linear";
import {useTranslations} from "next-intl";
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, {passive: true});
  window.addEventListener("resize", onChange);
  const resize = new ResizeObserver(onChange);
  resize.observe(document.body);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
    resize.disconnect();
  };
}
function getSnapshot() { return window.scrollY > 400; }
function getServerSnapshot() { return false; }
function getBottom() {
  const base = window.innerWidth >= 640 ? 48 : 32;
  const desktop = window.innerWidth >= 1024;
  const dock = document.querySelector(desktop ? "[data-scroll-top-boundary]" : "[data-scroll-top-dock]");
  if (!dock) return base;
  const rect = dock.getBoundingClientRect();
  // Desktop stops above the footer; mobile docks beneath the social icons.
  const edge = desktop ? rect.top - 12 : rect.bottom;
  return Math.max(base, Math.round(window.innerHeight - edge));
}
function getServerBottom() { return 48; }

export function ScrollToTop() {
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const bottom = useSyncExternalStore(subscribe, getBottom, getServerBottom);
  const reduced = useReducedMotion();
  const t = useTranslations("Navigation");
  return (
    <AnimatePresence>
      {visible && (
        <m.div
          key="scroll-to-top"
          initial={{opacity: 0, y: reduced ? 0 : 12, scale: reduced ? 1 : 0.9}}
          animate={{opacity: 1, y: 0, scale: 1}}
          exit={{opacity: 0, y: reduced ? 0 : 12, scale: reduced ? 1 : 0.9}}
          transition={{duration: reduced ? 0 : 0.2}}
          style={{bottom: `max(${bottom}px, env(safe-area-inset-bottom))`}}
          className="pointer-events-none fixed inset-x-0 z-30 px-2 lg:px-6"
        >
          <div className="mx-auto flex w-full max-w-7xl justify-end">
          <Tooltip>
            <TooltipTrigger render={
              <Button
                type="button"
                variant="outline"
                size="icon-lg"
                className="pointer-events-auto border-border bg-background/60 backdrop-blur-2xl backdrop-saturate-150"
                aria-label={t("backToTop")}
                onClick={() => window.scrollTo({top: 0, behavior: reduced ? "instant" : "smooth"})}
              />
            }>
              <ArrowUpIcon className="size-4" aria-hidden="true" />
            </TooltipTrigger>
            <TooltipContent side="left" sideOffset={8} className="px-3 py-2">
              {t("backToTop")}
            </TooltipContent>
          </Tooltip>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
