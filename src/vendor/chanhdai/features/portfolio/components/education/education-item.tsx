import Image from "next/image"
import { AltArrowDownIcon, AltArrowUpIcon, SquareAcademicCapIcon } from "@solar-icons/react/linear"

import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/vendor/chanhdai/components/ui/collapsible"
import { IconTile } from "@/vendor/chanhdai/components/ui/icon-tile"
import { Tag } from "@/vendor/chanhdai/components/ui/tag"
import { Markdown } from "@/vendor/chanhdai/components/markdown"
import type { Education } from "@/vendor/chanhdai/features/portfolio/types/education"

export function EducationItem({ item }: { item: Education }) {
  const { start, end } = item.period
  const isOngoing = !end
  const title = item.level ?? item.fieldOfStudy ?? item.degree ?? item.school
  const details = [item.degree, item.fieldOfStudy].filter((detail) => detail && detail !== title)

  return (
    <div id={`education-${item.id}`} className="scroll-mt-14 space-y-5">
      <header className="group/school flex items-center gap-3">
        <span aria-hidden className="flex size-6 shrink-0 items-center justify-center text-muted-foreground">
          {item.logo ? (
            <Image
              src={item.logo}
              alt=""
              width={24}
              height={24}
              className="size-6 object-contain opacity-60 grayscale transition-[filter,opacity] duration-300 group-hover/school:opacity-100 group-hover/school:grayscale-0 group-focus-within/school:opacity-100 group-focus-within/school:grayscale-0 motion-reduce:transition-none"
            />
          ) : (
            <SquareAcademicCapIcon className="size-5" />
          )}
        </span>
        <h3 className="text-xl/6 font-medium">
          {item.website ? (
            <a
              className="decoration-1 underline-offset-4 [text-decoration-skip-ink:none] hover:underline focus-visible:underline"
              href={item.website}
              target="_blank"
              rel="noopener"
            >
              {item.school}
            </a>
          ) : item.school}
        </h3>
      </header>
      <Collapsible
        className="relative"
        defaultOpen={item.isExpanded}
        disabled={!item.description}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-2.25 left-3 top-6.5 w-4 rounded-bl-[8px] border-b border-l border-line"
        />

        <CollapsibleTrigger
          className={cn(
            "group block w-full cursor-pointer text-left disabled:cursor-default",
            "relative before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-7 before:-z-1 before:rounded-lg before:transition-[background-color] before:ease-out hover:before:bg-accent-muted",
            "outline-none focus-visible:before:inset-ring-2 focus-visible:before:inset-ring-ring/50",
            "data-disabled:before:content-none"
          )}
        >
          <div className="relative z-1 mb-1 flex items-start gap-3 text-base">
            <IconTile aria-hidden><SquareAcademicCapIcon className="size-4" /></IconTile>

            <span className="flex-1 font-medium text-balance">{title}</span>

            <span aria-hidden className="relative grid size-5 shrink-0 place-items-center text-muted-foreground group-data-disabled:hidden">
              <AltArrowUpIcon className="absolute size-3 -translate-y-1 transition-transform duration-150 ease-in-out group-aria-expanded:-scale-y-100 motion-reduce:transition-none" />
              <AltArrowDownIcon className="absolute size-3 translate-y-1 transition-transform duration-150 ease-in-out group-aria-expanded:-scale-y-100 motion-reduce:transition-none" />
            </span>
          </div>

          <span className="flex flex-wrap items-center gap-x-2 gap-y-1 pl-9 text-sm text-muted-foreground">
            <span className="tabular-nums">
              {start}
              {(isOngoing || end !== start) && <> - {isOngoing ? "∞" : end}</>}
            </span>
            {details.map((detail) => (
              <span key={detail} className="inline-flex items-center gap-2">
                <Separator render={<span />} orientation="vertical" className="data-vertical:h-4 data-vertical:self-center" aria-hidden />
                {detail}
              </span>
            ))}
          </span>
        </CollapsibleTrigger>

        <CollapsibleContent className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none">
          {item.description && (
            <div className="typeset typeset-description pt-3 pb-1 pl-9">
              <Markdown>{item.description}</Markdown>
            </div>
          )}
        </CollapsibleContent>

        {Array.isArray(item.skills) && item.skills.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 pt-3 pl-9">
            {item.skills.map((skill, index) => (
              <li key={index} className="flex">
                <Tag className="rounded-md px-2 font-sans">{skill}</Tag>
              </li>
            ))}
          </ul>
        )}
      </Collapsible>
    </div>
  )
}
