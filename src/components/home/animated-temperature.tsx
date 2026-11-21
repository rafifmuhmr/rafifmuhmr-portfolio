"use client";

import {AnimatePresence, useReducedMotion} from "motion/react";
import * as m from "motion/react-m";

export function AnimatedTemperature({value}: {value: number | null}) {
  const reduced = useReducedMotion();
  const label = value == null ? "—" : String(value);
  return (
    <span className="inline-flex items-baseline whitespace-nowrap tabular-nums" aria-label={`${label}°C`}>
      <span className="relative inline-flex h-5 overflow-hidden align-bottom" style={{width: `${label.length}ch`}} aria-hidden="true">
        <AnimatePresence initial={false} mode="popLayout">
          <m.span key={label} initial={{y: reduced ? 0 : 8, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: reduced ? 0 : -8, opacity: 0}} transition={{duration: reduced ? 0 : 0.2}} className="inline-block leading-5">
            {label}
          </m.span>
        </AnimatePresence>
      </span>
      <span aria-hidden="true">°C</span>
    </span>
  );
}
