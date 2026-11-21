"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { RollingNumber } from "@/components/ui/rolling-number";

export function ApproachSteps({ children, heading, total }: { children: ReactNode; heading: ReactNode; total: number }) {
  const counterRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(1);

  useEffect(() => {
    const list = listRef.current;
    const counter = counterRef.current;
    if (!list || !counter) return;
    const headings = Array.from(list.querySelectorAll("h3"));
    const lastDescription = list.lastElementChild?.querySelector("p");

    let frame = 0;
    function update() {
      frame = 0;
      if (!counter || counter.getClientRects().length === 0) return;
      // Allow for the difference between the counter and heading line boxes.
      const counterRect = counter.getBoundingClientRect();
      const readingLine = counterRect.top + 8;
      let current = 1;
      for (const [index, heading] of headings.entries()) {
        if (heading.getBoundingClientRect().top > readingLine) break;
        current = index + 1;
      }
      let offset = 0;
      if (current === headings.length && lastDescription) {
        const descriptionRect = lastDescription.getBoundingClientRect();
        const lineHeight = Number.parseFloat(getComputedStyle(lastDescription).lineHeight);
        if (Number.isFinite(lineHeight)) {
          const line = descriptionRect.height > lineHeight + 1 ? 2 : 1;
          const lineCenter = descriptionRect.top + (line - 0.5) * lineHeight;
          const counterCenter = counterRect.top + counterRect.height / 2;
          offset = Math.min(0, lineCenter - counterCenter);
        }
      }

      counter.style.setProperty("--approach-counter-offset", `${offset}px`);
      setActive(current);
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(list);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {heading}
      <div className="hidden min-w-0 lg:col-start-1 lg:row-start-2 lg:block">
        <div ref={counterRef} aria-hidden="true" className="tabular-nums lg:sticky lg:top-28">
          <div className="flex translate-y-(--approach-counter-offset) items-baseline gap-3">
            <span className="text-4xl font-medium tracking-tight"><RollingNumber value={String(active).padStart(2, "0")} /></span>
            <span className="text-xs text-muted-foreground">/{String(total).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
      <ol ref={listRef} className="min-w-0 space-y-12 lg:col-span-2 lg:col-start-2 lg:row-start-2 lg:space-y-20 lg:pb-16">{children}</ol>
    </>
  );
}
