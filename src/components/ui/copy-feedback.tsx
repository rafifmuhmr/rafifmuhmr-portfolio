"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CloseIcon, CopyIcon, LinkIcon } from "@solar-icons/react/linear";
import { cn } from "@/lib/utils";

type CopyStatus = "idle" | "copied" | "failed";

export function useCopyFeedback() {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const attempt = useRef(0);

  useEffect(() => () => {
    attempt.current++;
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = useCallback(async (text: string) => {
    const current = ++attempt.current;
    if (timer.current) clearTimeout(timer.current);
    setStatus("copied");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      if (current === attempt.current) setStatus("failed");
    }
    if (current === attempt.current) {
      timer.current = setTimeout(() => setStatus("idle"), 2000);
    }
  }, []);

  return { status, copy };
}

export function CopyFeedbackIcon({ status, link = false }: { status: CopyStatus; link?: boolean }) {
  const Icon = link ? LinkIcon : CopyIcon;
  return (
    <span aria-hidden="true" className="relative inline-flex size-4 shrink-0 items-center justify-center">
      <Icon size={16} className={cn("absolute motion-safe:transition-[opacity,scale,filter] motion-safe:duration-200", status !== "idle" && "scale-60 opacity-0 blur-[3px]")} />
      <svg viewBox="0 0 24 24" fill="none" className={cn("absolute size-4 text-emerald-600 dark:text-emerald-400", status !== "copied" && "opacity-0")}>
        <path d="m5 12 4 4L19 6" pathLength={1} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={1} strokeDashoffset={status === "copied" ? 0 : 1}
          className="motion-safe:transition-[stroke-dashoffset] motion-safe:duration-[360ms] motion-safe:ease-out" />
      </svg>
      <CloseIcon size={16} className={cn("absolute text-destructive motion-safe:transition-opacity", status !== "failed" && "opacity-0")} />
    </span>
  );
}

export function CopyFeedbackLabel({ text, className }: { text: string; className?: string }) {
  return <span className={className}><span key={text} className="inline-block motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:duration-200">{text}</span></span>;
}
