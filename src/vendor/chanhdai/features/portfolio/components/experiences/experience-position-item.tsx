import { differenceInMonths, parse } from "date-fns"
import { AltArrowDownIcon, AltArrowUpIcon, CaseIcon, InfiniteIcon } from "@solar-icons/react/linear"

import { useLocale } from "next-intl"

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
import type { ExperiencePosition } from "@/vendor/chanhdai/features/portfolio/types/experiences"

export function ExperiencePositionItem({
  position,
}: {
  position: ExperiencePosition
}) {
  const locale = useLocale()
  const { start, end } = position.employmentPeriod
  const isOngoing = !end
  const duration = formatDuration(start, end)

  return (
    <Collapsible
      className="group/experience-position relative"
      defaultOpen={position.isExpanded}
      disabled={!position.description}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-3.5 left-3 top-6.5 w-4 border-l border-line group-last/experience-position:bottom-2.25 group-last/experience-position:rounded-bl-[8px] group-last/experience-position:border-b"
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
          <IconTile aria-hidden>{position.icon ?? <CaseIcon className="size-4" />}</IconTile>

          <h4 className="flex-1 font-medium text-balance">{position.title}</h4>

          <span aria-hidden className="relative grid size-5 shrink-0 place-items-center text-muted-foreground group-data-disabled:hidden">
            <AltArrowUpIcon className="absolute size-3 -translate-y-1 transition-transform duration-150 ease-in-out group-aria-expanded:-scale-y-100 motion-reduce:transition-none" />
            <AltArrowDownIcon className="absolute size-3 translate-y-1 transition-transform duration-150 ease-in-out group-aria-expanded:-scale-y-100 motion-reduce:transition-none" />
          </span>
        </div>

        <span className="flex flex-wrap items-center gap-x-2 gap-y-1 pl-9 text-sm text-muted-foreground">
          {position.employmentType && (
            <span className="inline-flex items-center gap-2">
              {position.employmentType}
              <Separator render={<span />} orientation="vertical" className="data-vertical:h-4 data-vertical:self-center" aria-hidden />
            </span>
          )}
          <span className="inline-flex items-center tabular-nums">
            {start}
            {(isOngoing || end !== start) && <span className="mx-1" aria-hidden={isOngoing}>-</span>}
            {isOngoing ? (
              <InfiniteIcon
                className="size-4"
                role="img"
                aria-label={locale === "id" ? "Masih aktif" : "Present"}
              />
            ) : end !== start ? end : null}
          </span>
          {duration && (
            <span className="inline-flex items-center gap-2 tabular-nums">
              <Separator render={<span />} orientation="vertical" className="data-vertical:h-4 data-vertical:self-center" aria-hidden />
              {duration}
            </span>
          )}
        </span>
      </CollapsibleTrigger>

      <CollapsibleContent className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none">
        {position.description && (
          <div className="typeset typeset-description pt-3 pb-1 pl-9">
            <Markdown>{position.description}</Markdown>
          </div>
        )}
      </CollapsibleContent>

      {Array.isArray(position.skills) && position.skills.length > 0 && (
        <ul className="flex flex-wrap gap-1.5 pt-3 pl-9">
          {position.skills.map((skill, index) => (
            <li key={index} className="flex">
              <Tag className="rounded-md px-2 font-sans">{skill}</Tag>
            </li>
          ))}
        </ul>
      )}
    </Collapsible>
  )
}

function formatDuration(start: string, end?: string): string {
  const startHasMonth = start.includes(".")
  const endHasMonth = end ? end.includes(".") : true

  // Both year-only: granularity is years, no month arithmetic needed.
  if (!startHasMonth && end && !endHasMonth) {
    const years = parseInt(end, 10) - parseInt(start, 10)
    if (years <= 0) {
      return ""
    }
    return `${years}y`
  }

  const startDate = parsePeriodDate(start, "first")
  const endDate = end ? parsePeriodDate(end, "last") : new Date()

  // +1 to count both the start and end months inclusively.
  const totalMonths = differenceInMonths(endDate, startDate) + 1
  if (totalMonths <= 0) {
    return ""
  }

  if (totalMonths < 12) {
    return `${totalMonths}m`
  }

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  if (months === 0) {
    return `${years}y`
  }
  return `${years}y ${months}m`
}

function parsePeriodDate(str: string, fallbackMonth: "first" | "last"): Date {
  if (str.includes(".")) {
    return parse(str, "MM.yyyy", new Date())
  }
  return parse(
    `${fallbackMonth === "last" ? "12" : "01"}.${str}`,
    "MM.yyyy",
    new Date()
  )
}
