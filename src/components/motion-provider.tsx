"use client";

import {LazyMotion} from "motion/react";
import type {ReactNode} from "react";

// Load only animation/exit features, without drag and layout projection.
const loadFeatures = () => import("./motion-features").then((module) => module.default);

export function MotionProvider({children}: {children: ReactNode}) {
  return <LazyMotion features={loadFeatures} strict>{children}</LazyMotion>;
}
