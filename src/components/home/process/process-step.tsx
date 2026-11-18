"use client";

import {Accordion as AccordionPrimitive} from "@base-ui/react/accordion";
import {AddCircleIcon} from "@solar-icons/react/linear";
import {AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {cn} from "@/lib/utils";

type Props = {value: string; active: boolean; title: string; description: string};

export function ProcessStep({value, active, title, description}: Props) {
  return <AccordionItem value={value}
    className={cn("relative min-w-0 max-w-full self-start rounded-lg border! border-border! overflow-clip motion-safe:[interpolate-size:allow-keywords] motion-safe:transition-[width,background-color] motion-safe:duration-400 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]", active ? "w-full bg-card" : "w-fit bg-background")}>
    <AccordionTrigger className={cn(
      "items-center justify-start gap-3 text-sm hover:no-underline [&_[data-slot=accordion-trigger-icon]]:hidden",
      active ? "absolute inset-0 z-10" : "p-3",
    )}>
      {!active && <AddCircleIcon size={16} className="shrink-0 text-muted-foreground [--solar-stroke-width:2.25]" aria-hidden="true" />}
      <span className={cn("min-w-0 text-left font-normal leading-6 text-muted-foreground", active && "sr-only")}>{title}</span>
    </AccordionTrigger>
    <AccordionPrimitive.Panel data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-hidden [contain:inline-size] opacity-100 transition-[height,opacity] [transition-duration:400ms,220ms] ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0 motion-reduce:transition-none">
      <div className="w-[calc(100cqw-2px)] max-w-none p-4 text-sm leading-6 text-muted-foreground"><p><span className="font-medium text-foreground">{title}.</span>{" "}{description}</p></div>
    </AccordionPrimitive.Panel>
  </AccordionItem>;
}
