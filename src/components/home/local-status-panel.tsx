"use client";

import {useId, useRef, useSyncExternalStore, type ReactNode} from "react";
import {AnimatePresence, useReducedMotion} from "motion/react";
import * as m from "motion/react-m";
import {WidgetIcon as Grid2X2} from "@solar-icons/react/outline";
import {CloseIcon as X} from "@solar-icons/react/linear";
import {useTranslations} from "next-intl";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";

// Keep visibility across locale route remounts; a full page load starts closed.
let panelOpen = false;
const listeners = new Set<() => void>();
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}
function getSnapshot() { return panelOpen; }
function getServerSnapshot() { return false; }
function setOpen(value: boolean) {
  panelOpen = value;
  listeners.forEach((listener) => listener());
}

export function LocalStatusPanel({children}: {children: ReactNode}) {
  const open = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const id = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const t = useTranslations("LocalStatus");
  function close() {
    setOpen(false);
    requestAnimationFrame(() => buttonRef.current?.focus());
  }
  return (
    <div className="relative mt-3 flex justify-end" onKeyDown={(event) => {
      if (event.key === "Escape" && open) {event.preventDefault(); close();}
    }}>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            key="local-status"
            id={id}
            role="region"
            aria-label={t("title")}
            initial={{opacity: 0, y: reduced ? 0 : -8, scale: reduced ? 1 : 0.96}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: reduced ? 0 : -8, scale: reduced ? 1 : 0.96}}
            transition={{duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1]}}
            className="mr-12 w-fit max-w-[calc(100%-3rem)] origin-top-right"
          >
            {children}
          </m.div>
        )}
      </AnimatePresence>
      <Tooltip>
      <TooltipTrigger render={<Button
        ref={buttonRef}
        type="button"
        variant="outline"
        size="icon-lg"
        className="absolute top-0 right-0 border-border bg-background/60 backdrop-blur-2xl"
        aria-label={open ? t("close") : t("open")}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => open ? close() : setOpen(true)}
      />}>

        <m.span animate={{rotate: open ? 90 : 0}} transition={{duration: reduced ? 0 : 0.2}}>
          {open ? <X className="size-4" aria-hidden="true" /> : <Grid2X2 className="size-4" aria-hidden="true" />}
        </m.span>
      </TooltipTrigger>
      <TooltipContent side="bottom" align="end" sideOffset={8} className="px-3 py-2">
        {open ? t("close") : t("title")}
      </TooltipContent>
      </Tooltip>
    </div>
  );
}
