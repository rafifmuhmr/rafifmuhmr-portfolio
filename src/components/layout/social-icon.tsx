"use client";

import type {ReactNode} from "react";
import Instagram from "@thesvg/react/instagram";
import Threads from "@thesvg/react/threads";
import Linkedin from "@thesvg/react/linkedin";
import Github from "@thesvg/react/github";
import Substack from "@thesvg/react/substack";

export type SocialPlatform = "instagram" | "threads" | "linkedin" | "github" | "substack";

export function SocialIcon({platform}: {platform: SocialPlatform}) {
  let mono: ReactNode;
  let color: ReactNode;
  switch (platform) {
    case "instagram":
      mono = <Instagram variant="mono" className="size-full [&_path]:fill-current" />;
      color = <Instagram className="size-full" />;
      break;
    case "threads":
      mono = <Threads variant="mono" className="size-full [&_path]:fill-current" />;
      color = <Threads variant="mono" className="size-full text-foreground [&_path]:fill-current" />;
      break;
    case "linkedin":
      mono = <Linkedin className="size-full [&_path]:fill-current" />;
      color = <Linkedin className="size-full" />;
      break;
    case "github":
      mono = <Github variant="mono" className="size-full [&_path]:fill-current" />;
      color = <Github variant="mono" className="size-full text-foreground [&_path]:fill-current" />;
      break;
    case "substack":
      mono = <Substack variant="mono" className="size-full [&_path]:fill-current" />;
      color = <Substack className="size-full" />;
      break;
  }
  return <span data-social-icon aria-hidden="true" className="relative block size-5 shrink-0">
    <span className="absolute inset-0 transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0 motion-reduce:transition-none">{mono}</span>
    <span className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">{color}</span>
  </span>;
}
