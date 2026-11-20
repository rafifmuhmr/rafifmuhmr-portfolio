"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { AddCircleIcon } from "@solar-icons/react/linear";
import { AccordionItem } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type Props = { value: string; active: boolean; title: string; description: string };

export function ProcessStep({ value, active, title, description }: Props) {
  return (
    <AccordionItem
      value={value}
      className={cn(
        "relative min-w-0 max-w-full self-start overflow-hidden rounded-[12px] border! border-border! [--step-ease:cubic-bezier(0.22,1,0.36,1)] motion-safe:[interpolate-size:allow-keywords] motion-safe:transition-[width,background-color] motion-safe:duration-400 motion-safe:ease-(--step-ease)",
        active ? "w-full bg-card" : "w-fit bg-background",
      )}
    >
      <AccordionPrimitive.Header className="absolute inset-0 z-10">
        <AccordionPrimitive.Trigger
          aria-label={title}
          className="size-full cursor-pointer rounded-[12px] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        />
      </AccordionPrimitive.Header>

      {/* Collapse the short label as the answer grows, keeping their combined height continuous. */}
      <div
        aria-hidden="true"
        className={cn(
          "grid motion-safe:transition-[grid-template-rows] motion-safe:duration-400 motion-safe:ease-(--step-ease)",
          active ? "grid-rows-[0fr]" : "grid-rows-[1fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className={cn(
            "flex items-center gap-3 p-3 text-sm leading-6 text-muted-foreground motion-safe:transition-[opacity,translate] motion-safe:duration-200",
            active && "-translate-y-1 opacity-0 motion-reduce:translate-y-0",
          )}>
            <AddCircleIcon size={16} className="shrink-0 [--solar-stroke-width:2.25]" />
            <span>{title}</span>
          </div>
        </div>
      </div>

      <AccordionPrimitive.Panel
        data-slot="accordion-content"
        className="h-(--accordion-panel-height) overflow-hidden [contain:inline-size] data-starting-style:h-0 data-ending-style:h-0 motion-safe:transition-[height] motion-safe:duration-400 motion-safe:ease-(--step-ease)"
      >
        <div className="w-[calc(100cqw-2px)] max-w-none p-3 text-sm leading-6 text-muted-foreground motion-safe:transition-[opacity,translate] motion-safe:duration-200 motion-safe:in-[[data-open]]:delay-75 in-[[data-starting-style]]:opacity-0 in-[[data-ending-style]]:opacity-0 motion-safe:in-[[data-starting-style]]:translate-y-1 motion-safe:in-[[data-ending-style]]:translate-y-1">
          <p><span className="font-medium text-foreground">{title}.</span>{" "}{description}</p>
        </div>
      </AccordionPrimitive.Panel>
    </AccordionItem>
  );
}
