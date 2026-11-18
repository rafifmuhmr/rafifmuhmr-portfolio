"use client";

import {useEffect, useState} from "react";
import {cn} from "@/lib/utils";

type Item = {id: string; title: string};

export function TableOfContents({items, label}: {items: Item[]; label: string}) {
  const [active, setActive] = useState<string | undefined>(items[0]?.id);

  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      let current: string | undefined = items[0]?.id;
      for (const item of items) {
        const heading = document.getElementById(item.id);
        if (heading && heading.getBoundingClientRect().top <= 240) current = item.id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) current = items.at(-1)?.id;
      setActive(current);
    }
    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", schedule, {passive: true});
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items]);

  return <nav aria-label={label}>
    <ul className="space-y-3">
      {items.map((item) => <li key={item.id}>
        <a href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined}
          className={cn("block rounded-sm text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring", active === item.id && "font-medium text-foreground")}
          onClick={(event) => {
            // Preserve normal browser behavior for modified clicks.
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            const heading = document.getElementById(item.id);
            if (!heading) return;
            event.preventDefault();
            window.history.pushState(null, "", `#${item.id}`);
            heading.focus({preventScroll: true});
            heading.scrollIntoView({block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"});
            setActive(item.id);
          }}
        >{item.title}</a>
      </li>)}
    </ul>
  </nav>;
}
