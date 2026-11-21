"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { TextMorph } from "@/components/ui/text-morph";

type Roles = readonly [string, string, string];

export function RotatingRoles({ roles }: { roles: Roles }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!visible || reducedMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex((current) => (current + 1) % roles.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [roles.length, reducedMotion, visible]);

  return (
    <div ref={ref} className="font-sans text-lg font-medium leading-7 sm:text-xl sm:leading-8 text-muted-foreground">
      <span className="sr-only motion-reduce:not-sr-only">{roles.join(" · ")}</span>
      <div aria-hidden="true" className="grid overflow-hidden motion-reduce:hidden">
        {roles.map((role) => (
          <span key={role} className="invisible col-start-1 row-start-1">{role}</span>
        ))}
        <TextMorph
          animateWidth={false}
          className="col-start-1 row-start-1 justify-self-start"
        >
          {roles[index]}
        </TextMorph>
      </div>
    </div>
  );
}
