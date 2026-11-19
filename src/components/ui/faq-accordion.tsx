// Hairline UI · faq-accordion · MIT License
// Copyright (c) 2026 Hairline UI · https://hairlineui.com/license#components

"use client";

import * as React from "react";
import { AddIcon, MinusIcon } from "@solar-icons/react/linear";

/* ─────────────────────────────────────────────────────────
 * FAQ ACCORDION: questions that open like they mean it
 *
 *   closed   a question on a hairline, with a plus
 *   opening  the answer eases open to its real height while its
 *            text settles in out of a slight blur; the plus
 *            transitions to a minus
 *   closing  the answer fades first, then the space closes
 *   single   opening one closes the other in the same motion
 *
 * Up and Down move between questions, Home and End jump.
 * ───────────────────────────────────────────────────────── */

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
  id?: string;
}

export interface FaqAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: FaqItem[];
  /** One answer open at a time, or any number. */
  type?: "single" | "multiple";
  /** Questions open at first, by index. */
  defaultOpen?: number[];
}

const EASE = "cubic-bezier(0.16,1,0.3,1)";

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const query = window.matchMedia(reducedQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const useReducedMotion = () =>
  React.useSyncExternalStore(subscribeReduced, () => window.matchMedia(reducedQuery).matches, () => false);

function PlusMinus({ open, reduced }: { open: boolean; reduced: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="relative block size-4 shrink-0 [--solar-stroke-width:2.25]"
      style={{
        transform: !reduced && open ? "rotate(180deg)" : "none",
        transition: reduced ? "none" : `transform 420ms ${EASE}`,
      }}
    >
      <AddIcon size={16} className={`absolute inset-0 motion-safe:transition-opacity ${open ? "opacity-0" : "opacity-100"}`} />
      <MinusIcon size={16} className={`absolute inset-0 motion-safe:transition-opacity ${open ? "opacity-100" : "opacity-0"}`} />
    </span>
  );
}

export function FaqAccordion({ items, type = "single", defaultOpen = [], className = "", ...props }: FaqAccordionProps) {
  const reduced = useReducedMotion();
  const id = React.useId();
  const [open, setOpen] = React.useState<Set<number>>(() => new Set(type === "single" ? defaultOpen.slice(0, 1) : defaultOpen));
  const buttons = React.useRef<(HTMLButtonElement | null)[]>([]);

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(type === "single" ? [] : prev);
      if (prev.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const moves: Record<string, number> = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: items.length - 1 };
    if (!(e.key in moves)) return;
    e.preventDefault();
    buttons.current[(moves[e.key] + items.length) % items.length]?.focus();
  };

  return (
    <div className={`w-full border-b border-border ${className}`} {...props}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const key = item.id ?? `${id}-${i}`;
        return (
          <div key={key} className="border-t border-border">
            <h3>
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                type="button"
                id={`${key}-q`}
                aria-expanded={isOpen}
                aria-controls={`${key}-a`}
                onClick={() => toggle(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`cursor-pointer group flex w-full items-center justify-between gap-6 rounded-lg py-4 text-left text-[15px] outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40 ${
                  isOpen ? "text-foreground" : "text-foreground/80 hover:text-foreground"
                }`}
              >
                <span className="font-medium tracking-[-0.01em]">{item.question}</span>
                <span className={`transition-colors duration-300 ${isOpen ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                  <PlusMinus open={isOpen} reduced={reduced} />
                </span>
              </button>
            </h3>
            <div
              id={`${key}-a`}
              role="region"
              aria-labelledby={`${key}-q`}
              inert={!isOpen}
              className="grid"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", transition: reduced ? "none" : `grid-template-rows 460ms ${EASE}` }}
            >
              <div className="min-h-0 overflow-hidden">
                <div
                  className="pb-5 pr-10 text-[14px] leading-relaxed text-muted-foreground"
                  style={{
                    opacity: isOpen ? 1 : 0,
                    filter: isOpen ? "none" : "blur(4px)",
                    transform: isOpen ? "none" : "translateY(-6px)",
                    transition: reduced
                      ? "none"
                      : isOpen
                        ? `opacity 420ms ${EASE} 90ms, filter 420ms ${EASE} 90ms, transform 520ms ${EASE} 60ms`
                        : `opacity 160ms ease-out, filter 160ms ease-out, transform 240ms ease-out`,
                  }}
                >
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
