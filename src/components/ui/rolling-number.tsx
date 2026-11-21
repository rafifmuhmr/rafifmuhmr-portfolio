"use client";

import {AnimatePresence, useReducedMotion} from "motion/react";
import * as m from "motion/react-m";

export function RollingNumber({value}: {value: string}) {
  const reduced = useReducedMotion();
  return <span className="relative inline-flex h-[1lh] w-[2ch] overflow-hidden align-bottom">
    <AnimatePresence initial={false} mode="popLayout">
      <m.span key={value} initial={{y: reduced ? 0 : 8, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: reduced ? 0 : -8, opacity: 0}} transition={{duration: reduced ? 0 : 0.2}} className="inline-block">
        {value}
      </m.span>
    </AnimatePresence>
  </span>;
}
