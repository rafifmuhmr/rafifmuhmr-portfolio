"use client"

import * as React from "react"
import {ScrollArea} from "@/components/ui/scroll-area"

import { cn } from "@/lib/utils"
import { formatNumber } from "@/lib/format"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface ActivityDatum {
  /** ISO date, YYYY-MM-DD. */
  date: string
  value: number
  /** Upstream intensity, when supplied; avoids recalculating GitHub levels. */
  level?: number
}

export interface ActivityHeatmapProps extends React.ComponentProps<"div"> {
  data: ActivityDatum[]
  /** Last day shown. Defaults to today. */
  endDate?: Date
  /** Number of week columns. Ignored when `startDate` is set. */
  weeks?: number
  /** First day shown. Overrides `weeks`. */
  startDate?: Date
  /** Any CSS color. Levels are mixed from this and `--muted`. Defaults to chart-1. */
  color?: string
  /**
   * Explicit color per level, from empty to most active.
   * Overrides `color`. Length sets the number of levels.
   */
  colors?: string[]
  /** How values map to levels. `sqrt` spreads out small values. */
  scale?: "linear" | "sqrt"
  /** Cell size in px. */
  cellSize?: number
  /** Expand square cells to fill the container; cellSize remains the minimum. */
  fitWidth?: boolean
  labelSize?: number
  footer?: React.ReactNode
  /** Gap between cells in px. */
  gap?: number
  valueFormatter?: (value: number) => string
  /** Label for the value in the tooltip, e.g. "events". */
  unit?: string
  locale?: string
  lessLabel?: string
  moreLabel?: string
  formatCellLabel?: (datum: {date: Date; value: number}) => string
  showMonthLabels?: boolean
  /** Which weekday labels to show along the left edge. */
  weekdayLabels?: "mwf" | "all" | "none"
  showLegend?: boolean
  /** Scroll to the most recent weeks when the grid overflows. */
  scrollToEnd?: boolean
  /** Replace the tooltip body. Return `null` to hide it for that cell. */
  renderTooltip?: (datum: { date: Date; value: number }) => React.ReactNode
  onCellClick?: (datum: { date: Date; value: number }) => void
}

const DAY = 24 * 60 * 60 * 1000
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function toKey(date: Date) {
  const y = date.getUTCFullYear()
  const m = String(date.getUTCMonth() + 1).padStart(2, "0")
  const d = String(date.getUTCDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

function startOfDay(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
}

function addDays(date: Date, days: number) {
  return new Date(date.getTime() + days * DAY)
}

function levelFor(
  value: number,
  max: number,
  levels: number,
  scale: "linear" | "sqrt"
) {
  if (value <= 0 || max <= 0) return 0
  let t = value / max
  if (scale === "sqrt") t = Math.sqrt(t)
  return Math.min(levels - 1, Math.max(1, Math.ceil(t * (levels - 1))))
}

function mixedColors(color: string, levels: number) {
  return Array.from({ length: levels }, (_, level) => {
    if (level === 0) return "var(--muted)"
    const pct = Math.round(25 + ((level - 1) / (levels - 2)) * 75)
    return `color-mix(in oklab, ${color} ${pct}%, var(--muted))`
  })
}

function ActivityHeatmap({
  data,
  endDate,
  weeks = 52,
  startDate,
  color = "var(--chart-1)",
  colors,
  scale = "linear",
  cellSize = 12,
  fitWidth = false,
  labelSize = 12,
  footer,
  gap = 3,
  valueFormatter = (value) => formatNumber(value),
  unit = "events",
  locale = "en-US",
  lessLabel = "Less",
  moreLabel = "More",
  formatCellLabel,
  showMonthLabels = true,
  weekdayLabels = "mwf",
  showLegend = true,
  scrollToEnd = true,
  renderTooltip,
  onCellClick,
  className,
  ...props
}: ActivityHeatmapProps) {
  const endTime = startOfDay(endDate ?? new Date()).getTime()
  const startTime = startDate
    ? startOfDay(startDate).getTime()
    : endTime - (weeks * 7 - 1) * DAY

  const values = React.useMemo(
    () => new Map(data.map((d) => [d.date, d.value])),
    [data]
  )
  const suppliedLevels = React.useMemo(() => new Map(data.filter((day) => day.level !== undefined).map((day) => [day.date, day.level!])), [data])
  const max = React.useMemo(
    () => data.reduce((acc, d) => Math.max(acc, d.value), 0),
    [data]
  )

  // Columns are full weeks, Sunday first. Days before `start` in the first
  // week and after `end` in the last are left empty rather than filled in.
  const columns = React.useMemo(() => {
    const start = new Date(startTime)
    const end = new Date(endTime)
    const result: (Date | null)[][] = []
    let cursor = addDays(start, -start.getUTCDay())
    while (cursor <= end) {
      const week: (Date | null)[] = []
      for (let i = 0; i < 7; i++) {
        const day = addDays(cursor, i)
        week.push(day < start || day > end ? null : day)
      }
      result.push(week)
      cursor = addDays(cursor, 7)
    }
    return result
  }, [startTime, endTime])

  // Month labels span the weeks whose first shown day falls in that month.
  const months = React.useMemo(() => {
    const groups: { label: string; from: number; to: number }[] = []
    const formatter = new Intl.DateTimeFormat(locale, { month: "short", timeZone: "UTC" })
    columns.forEach((week, index) => {
      const first = week.find((d): d is Date => d !== null)
      if (!first) return
      const key = `${first.getUTCFullYear()}-${first.getUTCMonth()}`
      const last = groups[groups.length - 1]
      if (last && last.label === key) {
        last.to = index
      } else {
        groups.push({ label: key, from: index, to: index })
      }
    })
    return groups
      .filter((g) => g.to - g.from >= 1)
      .map((g) => ({
        ...g,
        label: formatter.format(columns[g.from]!.find(Boolean) as Date),
      }))
  }, [columns, locale])

  const palette = colors && colors.length > 1 ? colors : mixedColors(color, 5)
  const levels = palette.length

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    timeZone: "UTC",
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  const scrollRef = React.useRef<HTMLDivElement>(null)
  const drag = React.useRef<{pointerId: number; x: number; left: number; moved: boolean} | null>(null)
  const suppressClick = React.useRef(false)

  // Touch keeps native scrolling. Mouse dragging also works in device previews
  // where dragging an overflowing div does not normally scroll it.
  function onScrollPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    const node = event.currentTarget
    if (event.pointerType !== "mouse" || event.button !== 0 || node.scrollWidth <= node.clientWidth) return
    suppressClick.current = false
    drag.current = {pointerId: event.pointerId, x: event.clientX, left: node.scrollLeft, moved: false}
  }

  function onScrollPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const state = drag.current
    if (!state || state.pointerId !== event.pointerId) return
    const distance = event.clientX - state.x
    if (!state.moved && Math.abs(distance) < 4) return
    state.moved = true
    suppressClick.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    event.currentTarget.scrollLeft = state.left - distance
    event.preventDefault()
  }

  function onScrollPointerEnd(event: React.PointerEvent<HTMLDivElement>) {
    if (drag.current?.pointerId !== event.pointerId) return
    drag.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }
  React.useLayoutEffect(() => {
    const node = scrollRef.current
    if (!node || !scrollToEnd) return
    node.scrollLeft = node.scrollWidth
  }, [scrollToEnd, columns.length, cellSize, gap])

  const [focused, setFocused] = React.useState<string | null>(null)
  const cells = React.useRef(new Map<string, HTMLButtonElement>())
  const lastKey = toKey(new Date(endTime))
  function onGridKeyDown(event: React.KeyboardEvent) {
    const target = event.target as HTMLElement
    const key = target.dataset.date
    if (!key) return
    const steps: Record<string, number> = {ArrowLeft: -7, ArrowRight: 7, ArrowUp: -1, ArrowDown: 1}
    let next: string | undefined
    if (event.key in steps) next = toKey(addDays(new Date(`${key}T00:00:00Z`), steps[event.key]))
    else if (event.key === "Home") next = toKey(new Date(startTime))
    else if (event.key === "End") next = lastKey
    if (!next) return
    event.preventDefault()
    cells.current.get(next)?.focus()
  }

  const hasHeader = showMonthLabels
  const hasWeekdays = weekdayLabels !== "none"
  const fontSize = Math.max(10, labelSize)
  const headerHeight = fontSize + Math.max(0, 8 - gap)
  const labelWidth = hasWeekdays ? 32 : 0
  const minimumGridWidth = columns.length * cellSize + Math.max(0, columns.length - 1) * gap
  // Container units resize the squares before paint, without JS measurements.
  const resolvedCell = fitWidth
    ? `max(${cellSize}px, calc((100cqw - ${labelWidth + Math.max(0, columns.length - 1) * gap}px) / ${Math.max(1, columns.length)}))`
    : `${cellSize}px`

  return (
    <div
      data-slot="activity-heatmap"
      className={cn("flex min-w-0 flex-col gap-2 text-xs", fitWidth && "@container", className)}
      {...props}
    >
      <div className="flex min-w-0">
        {hasWeekdays ? (
          <div
            aria-hidden
            className="grid shrink-0 pr-2"
            style={{
              gap,
              width: fitWidth ? labelWidth : undefined,
              gridTemplateRows: `${hasHeader ? `${headerHeight}px` : "0px"} repeat(7, ${resolvedCell})`,
            }}
          >
            <div />
            {WEEKDAYS.map((day, index) => (
              <div
                key={day}
                className="text-muted-foreground flex items-center justify-end leading-none whitespace-nowrap"
                style={{ fontSize }}
              >
                {weekdayLabels === "all" || index % 2 === 1 ? new Intl.DateTimeFormat(locale, {weekday: "short", timeZone: "UTC"}).format(new Date(Date.UTC(2026, 0, 4 + index))) : ""}
              </div>
            ))}
          </div>
        ) : null}
        <ScrollArea
          className="min-w-0 flex-1"
          horizontal
          viewportRef={scrollRef}
          backwardLabel={locale.startsWith("id") ? "Geser ke kiri" : "Scroll left"}
          forwardLabel={locale.startsWith("id") ? "Geser ke kanan" : "Scroll right"}
          viewportProps={{
            className: "touch-auto overflow-x-auto overflow-y-hidden overscroll-x-contain select-none",
            onPointerDown: onScrollPointerDown,
            onPointerMove: onScrollPointerMove,
            onPointerUp: onScrollPointerEnd,
            onPointerCancel: onScrollPointerEnd,
            onLostPointerCapture: () => { drag.current = null },
            onPointerLeave: () => { if (!drag.current?.moved) drag.current = null },
            onClickCapture: (event) => {
              if (!suppressClick.current) return
              suppressClick.current = false
              event.preventDefault()
              event.stopPropagation()
            },
          }}
        >

          <TooltipProvider delay={100}>
            <div
              role="group"
              aria-label={props["aria-label"] ?? "Activity heatmap"}
              onKeyDown={onGridKeyDown}
              className={cn("grid", fitWidth ? "w-full" : "w-max")}
              style={{
                gap,
                minWidth: fitWidth ? minimumGridWidth : undefined,
                gridTemplateColumns: `repeat(${columns.length}, ${resolvedCell})`,
                gridTemplateRows: `${hasHeader ? `${headerHeight}px` : "0px"} repeat(7, ${resolvedCell})`,
              }}
            >
              {hasHeader
                ? months.map((month) => (
                    <div
                      key={`${month.from}-${month.label}`}
                      className="text-muted-foreground self-start leading-none whitespace-nowrap"
                      style={{
                        gridRow: 1,
                        gridColumn: `${month.from + 1} / ${month.to + 2}`,
                        fontSize,
                      }}
                    >
                      {month.label}
                    </div>
                  ))
                : null}

              {columns.map((week, weekIndex) =>
                week.map((day, dayIndex) => {
                  const style = {
                    gridColumn: weekIndex + 1,
                    gridRow: dayIndex + 2,
                  }
                  if (!day) {
                    return <div key={dayIndex} aria-hidden style={style} />
                  }
                  const value = values.get(toKey(day)) ?? 0
                  const level = Math.min(levels - 1, Math.max(0, suppliedLevels.get(toKey(day)) ?? levelFor(value, max, levels, scale)))
                  const datum = { date: day, value }
                  const body = renderTooltip ? (
                    renderTooltip(datum)
                  ) : (
                    <>
                      <span className="font-mono font-medium tabular-nums">
                        {valueFormatter(value)} {unit}
                      </span>
                      <span className="text-background/70 block">
                        {dateFormatter.format(day)}
                      </span>
                    </>
                  )
                  const label = formatCellLabel?.(datum) ?? `${valueFormatter(value)} ${unit} on ${dateFormatter.format(day)}`

                  const cell = (
                    <button
                      type="button"
                      aria-label={label}
                      data-level={level}
                      data-date={toKey(day)}
                      tabIndex={toKey(day) === (focused ?? lastKey) ? 0 : -1}
                      onFocus={() => setFocused(toKey(day))}
                      ref={(element) => {
                        if (element) cells.current.set(toKey(day), element)
                        else cells.current.delete(toKey(day))
                      }}
                      onClick={onCellClick ? () => onCellClick(datum) : undefined}
                      className={cn(
                        "focus-visible:ring-ring/60 ring-inset rounded-[2px] outline-none transition-[filter] duration-100 hover:brightness-110 focus-visible:ring-2 dark:hover:brightness-125",
                        "inset-ring-foreground/6 inset-ring",
                        onCellClick ? "cursor-pointer" : "cursor-default"
                      )}
                      style={{ ...style, backgroundColor: palette[level] }}
                    />
                  )

                  if (body === null) {
                    return <React.Fragment key={dayIndex}>{cell}</React.Fragment>
                  }

                  return (
                    <Tooltip key={dayIndex}>
                      <TooltipTrigger render={cell} />
                      <TooltipContent sideOffset={4} className="text-left">
                        {body}
                      </TooltipContent>
                    </Tooltip>
                  )
                })
              )}
            </div>
          </TooltipProvider>
        </ScrollArea>
      </div>

      {(footer || showLegend) && <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-xs text-muted-foreground" style={{paddingLeft: fitWidth ? labelWidth : undefined}}>
        {footer}
      {showLegend ? (
        <div className="ml-auto flex shrink-0 items-center justify-end gap-1">
          <span className="mr-0.5">{lessLabel}</span>
          {palette.map((fill, level) => (
            <span
              key={level}
              className="inset-ring-foreground/6 inset-ring rounded-[2px]"
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: fill,
              }}
            />
          ))}
          <span className="ml-0.5">{moreLabel}</span>
        </div>
      ) : null}
      </div>}
    </div>
  )
}

export { ActivityHeatmap }
