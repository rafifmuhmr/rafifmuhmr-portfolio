"use client"

import * as React from "react"
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area"
import { cn } from "@/lib/utils"

type ScrollAreaProps = React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  viewportRef?: React.Ref<HTMLDivElement>
  viewportProps?: React.ComponentProps<typeof ScrollAreaPrimitive.Viewport>
  horizontal?: boolean
  backwardLabel?: string
  forwardLabel?: string
}

// shadcn's Base UI composition, with an optional horizontal arrow bar.
function ScrollArea({className, children, viewportRef, viewportProps, horizontal = false,
  backwardLabel = "Scroll left", forwardLabel = "Scroll right", ...props}: ScrollAreaProps) {
  const localViewport = React.useRef<HTMLDivElement>(null)
  React.useImperativeHandle(viewportRef, () => localViewport.current!, [])
  const scrollBy = (direction: number) => {
    const viewport = localViewport.current
    if (!viewport) return
    viewport.scrollBy({left: direction * Math.max(80, viewport.clientWidth * 0.6), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"})
  }

  return (
    <ScrollAreaPrimitive.Root data-slot="scroll-area" className={cn("group/scroll-area relative min-w-0", className)} {...props}>
      <ScrollAreaPrimitive.Viewport {...viewportProps} ref={localViewport} data-slot="scroll-area-viewport"
        className={cn("w-full min-w-0 rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring/50", viewportProps?.className)}>
        {children}
      </ScrollAreaPrimitive.Viewport>
      {horizontal ? (
        <div className="relative mt-2 hidden h-1.5 items-center gap-1 group-data-has-overflow-x/scroll-area:flex">
          <button type="button" aria-label={backwardLabel} onClick={() => scrollBy(-1)}
            className="flex size-5 shrink-0 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring group-not-data-overflow-x-start/scroll-area:opacity-30">
            <svg aria-hidden viewBox="0 0 12 12" className="size-3 fill-current"><path d="M7.5 2.5 4 6l3.5 3.5z" /></svg>
          </button>
          <ScrollBar orientation="horizontal" className="inset-x-6! bottom-0! h-1.5" />
          <button type="button" aria-label={forwardLabel} onClick={() => scrollBy(1)}
            className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring group-not-data-overflow-x-end/scroll-area:opacity-30">
            <svg aria-hidden viewBox="0 0 12 12" className="size-3 fill-current"><path d="m4.5 2.5 3.5 3.5-3.5 3.5z" /></svg>
          </button>
        </div>
      ) : <ScrollBar />}
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({className, orientation = "vertical", ...props}: React.ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>) {
  return (
    <ScrollAreaPrimitive.Scrollbar data-slot="scroll-area-scrollbar" orientation={orientation}
      className={cn("z-10 flex touch-none select-none", orientation === "horizontal" ? "h-5 items-center" : "w-2.5 justify-center", className)} {...props}>
      <ScrollAreaPrimitive.Thumb data-slot="scroll-area-thumb"
        className={cn("relative rounded-full bg-muted-foreground/50 transition-colors hover:bg-muted-foreground active:bg-muted-foreground before:absolute before:-inset-y-2", orientation === "horizontal" ? "h-1.5" : "w-1.5")} />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

export { ScrollArea, ScrollBar }
