"use client";

import dynamic from "next/dynamic";
import {useEffect, useRef, useState} from "react";

const Wordmark = dynamic(() => import("./halftone-wordmark").then((module) => module.HalftoneWordmark), {
  ssr: false,
  loading: () => <div className="aspect-[8/1] w-full" aria-hidden="true" />,
});

export function DeferredWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setReady(true);
        observer.disconnect();
      }
    }, {rootMargin: "200px"});
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className="min-h-0">{ready ? <Wordmark /> : <div className="aspect-[8/1] w-full" aria-hidden="true" />}</div>;
}
