"use client";

import {useEffect} from "react";
import {useTranslations} from "next-intl";
import {LetterIcon, PhoneIcon} from "@solar-icons/react/linear";
import {CopyFeedbackIcon, useCopyFeedback} from "@/components/ui/copy-feedback";
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {IntroItem, IntroItemContent, IntroItemIcon, IntroItemLink} from "./intro-item";
import {cn} from "@/lib/utils";

type ContactItemProps = {kind: "email" | "phone"; value: string; display?: string};

export function ContactItem({kind, value, display = value}: ContactItemProps) {
  const t = useTranslations("Overview");
  const {status, copy} = useCopyFeedback();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target;
      if (event.defaultPrevented || event.repeat || event.isComposing || !event.shiftKey || event.ctrlKey || event.metaKey || event.altKey) return;
      if (target instanceof Element && target.closest("input, textarea, select, [contenteditable]:not([contenteditable='false']), [role='textbox'], [role='combobox']")) return;
      if (event.key.toLowerCase() !== (kind === "email" ? "e" : "p")) return;
      event.preventDefault();
      void copy(value);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [copy, kind, value]);

  const Icon = kind === "email" ? LetterIcon : PhoneIcon;
  const label = t(kind === "email" ? "copyEmail" : "copyPhone");
  const feedback = status === "copied" ? t(kind === "email" ? "emailCopied" : "phoneCopied") : status === "failed" ? t("copyFailed") : "";

  return (
    <IntroItem className="group relative min-w-0 gap-2 font-medium sm:gap-4">
      <IntroItemIcon aria-hidden="true"><Icon className="size-4" /></IntroItemIcon>
      <IntroItemContent className="min-w-0">
        <IntroItemLink href={kind === "email" ? `mailto:${value}` : `https://wa.me/${value.replace(/\D/g, "")}`} target={kind === "email" ? "_self" : "_blank"} className={cn("break-all", kind === "phone" && "font-mono tabular-nums")}>{display}</IntroItemLink>
      </IntroItemContent>
      <Tooltip>
        <TooltipTrigger render={
          <Button type="button" variant="ghost" size="icon-xs" aria-label={label}
            onClick={() => void copy(value)}
            className={cn("shrink-0 text-muted-foreground transition-opacity sm:-ml-1", status === "idle" && "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-coarse:opacity-100 focus-visible:opacity-100")}>
            <CopyFeedbackIcon status={status} />
          </Button>
        } />
        <TooltipContent className="gap-3 px-3 py-2">
          {label}<kbd className="font-mono text-xs opacity-70">Shift+{kind === "email" ? "E" : "P"}</kbd>
        </TooltipContent>
      </Tooltip>
      <span role="status" aria-live="polite" className="sr-only">{feedback}</span>
      {status === "failed" && <span aria-hidden="true" className="max-w-28 shrink-0 rounded-md border border-border bg-background px-2 py-1 text-xs font-normal text-foreground shadow-sm sm:-ml-2 sm:max-w-48">{feedback}</span>}
    </IntroItem>
  );
}
