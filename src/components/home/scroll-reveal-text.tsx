"use client";

import {useEffect, useRef, type ReactNode} from "react";

const clamp = (value: number) => Math.max(0, Math.min(1, value));

export function ScrollRevealText({children}: {children: ReactNode}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const words = Array.from(container.querySelectorAll<HTMLElement>("[data-reveal-word]"));
    const previous = new Array<number>(words.length).fill(-1);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let target = 0;
    let current = 0;
    let lastTime = 0;
    let measure = true;
    let initialized = false;

    function update(now: number) {
      frame = 0;
      if (!container) return;
      if (measure) {
        // Read geometry before writing colors; easing frames reuse this target.
        const rect = container.getBoundingClientRect();
        const viewport = window.innerHeight;
        const scroll = window.scrollY;
        const desktop = window.matchMedia("(min-width: 1024px)").matches;
        const start = scroll + rect.top - viewport * 0.6;
        const scrollingElement = document.scrollingElement ?? document.documentElement;
        const maxScroll = Math.max(0, scrollingElement.scrollHeight - scrollingElement.clientHeight);
        const naturalEnd = scroll + rect.bottom - viewport * (desktop ? 0.25 : 0.45);
        const end = Math.min(naturalEnd, maxScroll - 16);
        const atStart = rect.top >= viewport * 0.6;
        target = atStart ? 0 : maxScroll > 0 && scroll >= maxScroll - 2 ? 1 : clamp((scroll - start) / Math.max(1, end - start));
        measure = false;
      }
      const elapsed = lastTime ? Math.min(now - lastTime, 64) : 16;
      lastTime = now;
      if (!initialized || reducedMotion.matches || target <= current) {
        // At the start boundary, remove any residual highlight from easing.
        current = reducedMotion.matches ? 1 : target;
        initialized = true;
      } else {
        // Time-based smoothing stays consistent on 60Hz and 120Hz displays.
        current += (target - current) * (1 - Math.exp(-elapsed / 400));
        if (Math.abs(target - current) < 0.0001) current = target;
      }
      const position = current * (words.length + 2);
      words.forEach((word, index) => {
        // Overlap the fade across three words instead of switching whole words.
        const percent = Math.round(clamp((position - index) / 3) * 1000) / 10;
        if (previous[index] === percent) return;
        word.style.color = `color-mix(in oklab, var(--muted-foreground), var(--foreground) ${percent}%)`;
        previous[index] = percent;
      });
      if (!reducedMotion.matches && current !== target) {
        frame = window.requestAnimationFrame(update);
      } else {
        lastTime = 0;
      }
    }
    function schedule() {
      measure = true;
      if (!frame) frame = window.requestAnimationFrame(update);
    }
    schedule();
    window.addEventListener("scroll", schedule, {passive: true});
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(container);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [children]);

  return <div ref={ref} className="space-y-5 text-sm leading-7 text-muted-foreground sm:space-y-6 sm:text-base sm:leading-8">{children}</div>;
}
