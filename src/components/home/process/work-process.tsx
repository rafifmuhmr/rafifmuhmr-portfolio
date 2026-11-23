"use client";

import {useState} from "react";
import {useTranslations} from "next-intl";
import {AltArrowDownIcon, AltArrowUpIcon} from "@solar-icons/react/linear";
import {Accordion} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {ProcessStep} from "./process-step";
import {ProcessIllustration} from "./process-illustration";

const steps = ["understand", "structure", "design", "refine", "deliver"] as const;

export function WorkProcess() {
  const t = useTranslations("WorkProcess");
  const [active, setActive] = useState<number | null>(null);
  return <section id="process" aria-labelledby="work-process-title" className="min-w-0 py-6 sm:py-8 lg:py-10 motion-reduce:**:data-[slot=accordion-content]:animate-none">
    <header className="mb-8 space-y-3">
      <h2 id="work-process-title" className="text-xl font-semibold tracking-tight">{t("title")}</h2>
      <p className="text-sm leading-6 text-muted-foreground">{t("description")}</p>
    </header>
    <div className="grid min-w-0 items-center gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
      <div className="relative flex min-w-0 items-center gap-3 sm:gap-5">
        <div role="group" aria-label={t("navigation")} className={`flex shrink-0 flex-col gap-2 ${active === null ? "invisible" : ""}`}>
          <Button type="button" variant="outline" size="icon-lg" className="cursor-pointer bg-background shadow-none disabled:cursor-default" disabled={active === null || active === 0} onClick={() => { if (active !== null && active > 0) setActive(active - 1); }} aria-label={t("previous")}><AltArrowUpIcon className="size-4" aria-hidden="true" /></Button>
          <Button type="button" variant="outline" size="icon-lg" className="cursor-pointer bg-background shadow-none disabled:cursor-default" disabled={active === null || active === steps.length - 1} onClick={() => { if (active !== null && active < steps.length - 1) setActive(active + 1); }} aria-label={t("next")}><AltArrowDownIcon className="size-4" aria-hidden="true" /></Button>
        </div>
        <Accordion className="@container min-w-0 gap-3" multiple={false} value={active === null ? [] : [steps[active]]} onValueChange={(values) => {
          const index = steps.indexOf(values[0]);
          setActive(index >= 0 ? index : null);
        }}>
          {steps.map((step, index) => <ProcessStep key={step} value={step} active={active === index}
            title={t(`steps.${step}.short`)} description={t(`steps.${step}.description`)} />)}
        </Accordion>
      </div>
      <div className="pointer-events-none relative mx-auto w-full max-w-2xl min-w-0 select-none" aria-hidden="true">
        <ProcessIllustration active={active} labels={steps.map((step) => t(`steps.${step}.short`))} />
      </div>
    </div>
  </section>;
}
