"use client";

import Instagram from "@thesvg/react/instagram";
import Threads from "@thesvg/react/threads";
import Linkedin from "@thesvg/react/linkedin";
import Github from "@thesvg/react/github";

export type SocialPlatform = "instagram" | "threads" | "linkedin" | "github";

export function SocialIcon({platform}: {platform: SocialPlatform}) {
  const props = {className: "size-5 [&_*]:fill-current", "aria-hidden": true} as const;
  switch (platform) {
    case "instagram": return <Instagram variant="mono" {...props} />;
    case "threads": return <Threads variant="mono" {...props} />;
    case "linkedin": return <Linkedin {...props} />;
    case "github": return <Github variant="mono" {...props} />;
  }
}
