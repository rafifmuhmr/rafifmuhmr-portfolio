"use client";

import { AltArrowDownIcon, AltArrowUpIcon } from "@solar-icons/react/linear";
import { useRef, useState, type ReactNode } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const previewCount = 8;

export function BookmarkList({
  id,
  items,
  showMore,
  showLess,
}: {
  id: string;
  items: ReactNode[];
  showMore: string;
  showLess: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function toggleExpanded() {
    setExpanded(!expanded);
    if (expanded) {
      requestAnimationFrame(() => {
        buttonRef.current?.scrollIntoView({ block: "nearest", behavior: "instant" });
      });
    }
  }

  return (
    <div className="min-w-0 lg:col-span-2">
      <ul id={id} className="flex flex-col gap-4">
        {expanded ? items : items.slice(0, previewCount)}
      </ul>
      {items.length > previewCount && (
        <button
          ref={buttonRef}
          type="button"
          className={cn(buttonVariants({
            variant: "outline",
            size: "lg",
            className: "mt-5 w-fit cursor-pointer scroll-mt-32 gap-2 px-3 text-foreground",
          }))}
          aria-controls={id}
          aria-expanded={expanded}
          onClick={toggleExpanded}
        >
          <span>{expanded ? showLess : showMore}</span>
          {expanded ? (
            <AltArrowUpIcon className="size-4" aria-hidden />
          ) : (
            <AltArrowDownIcon className="size-4" aria-hidden />
          )}
        </button>
      )}
    </div>
  );
}
