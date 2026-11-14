"use client";

import {AnimatePresence, motion, useReducedMotion} from "motion/react";

import {CloudIcon as Cloud, FogIcon as CloudFog, CloudBoltIcon as CloudLightning, CloudRainIcon as CloudRain, CloudSnowfallIcon as CloudSnow, CloudSunIcon as CloudSun, MoonIcon as Moon, SunIcon as Sun} from "@solar-icons/react/linear";

function WeatherGlyph({code, night}: {code: number; night: boolean}) {
  if (code < 300) return <CloudLightning className="size-14 shrink-0 text-muted-foreground" aria-hidden="true" />;
  if (code < 600) return <CloudRain className="size-14 shrink-0 text-muted-foreground" aria-hidden="true" />;
  if (code < 700) return <CloudSnow className="size-14 shrink-0 text-muted-foreground" aria-hidden="true" />;
  if (code < 800) return <CloudFog className="size-14 shrink-0 text-muted-foreground" aria-hidden="true" />;
  if (code === 800) return night ? <Moon className="size-14 shrink-0 text-muted-foreground" aria-hidden="true" /> : <Sun className="size-14 shrink-0 text-muted-foreground" aria-hidden="true" />;
  if (code === 801 && !night) return <CloudSun className="size-14 shrink-0 text-muted-foreground" aria-hidden="true" />;
  return <Cloud className="size-14 shrink-0 text-muted-foreground" aria-hidden="true" />;
}


export function WeatherIcon({code, night}: {code: number; night: boolean}) {
  const reduced = useReducedMotion();
  const key = code < 300 ? "storm" : code < 600 ? "rain" : code < 700 ? "snow" : code < 800 ? "fog" : code === 800 ? (night ? "moon" : "sun") : code === 801 && !night ? "cloud-sun" : "cloud";
  return (
    <span className="relative inline-flex size-14 shrink-0 overflow-hidden" aria-hidden="true">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span key={key} initial={{y: reduced ? 0 : 8, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: reduced ? 0 : -8, opacity: 0}} transition={{duration: reduced ? 0 : 0.2}} className="inline-flex size-14">
          <WeatherGlyph code={code} night={night} />
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
