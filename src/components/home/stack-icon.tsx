"use client";

import type {ReactNode} from "react";
import Icon0 from "@thesvg/react/figma";
import Icon1 from "@thesvg/react/paper";
import Icon2 from "@thesvg/react/canva";
import Icon3 from "@thesvg/react/typescript";
import Icon4 from "@thesvg/react/javascript";
import Icon5 from "@thesvg/react/python";
import Icon6 from "@thesvg/react/rust";
import Icon7 from "@thesvg/react/react";
import Icon8 from "@thesvg/react/nextdotjs";
import Icon9 from "@thesvg/react/tailwind-css";
import Icon10 from "@thesvg/react/shadcn-ui";
import Icon11 from "@thesvg/react/radix-ui";
import Icon12 from "@thesvg/react/base-ui";
import Icon13 from "@thesvg/react/motion";
import Icon14 from "@thesvg/react/nodedotjs";
import Icon15 from "@thesvg/react/express";
import Icon16 from "@thesvg/react/mysql";
import Icon17 from "@thesvg/react/postgresql";
import Icon18 from "@thesvg/react/mongodb";
import Icon19 from "@thesvg/react/supabase";
import Icon20 from "@thesvg/react/sanity";
import Icon21 from "@thesvg/react/bun";
import Icon22 from "@thesvg/react/yarn";
import Icon23 from "@thesvg/react/pnpm";
import Icon24 from "@thesvg/react/openai-chatgpt";
import Icon25 from "@thesvg/react/claude";
import Icon26 from "@thesvg/react/gemini";
import Icon27 from "@thesvg/react/git";
import Icon28 from "@thesvg/react/github";
import Icon29 from "@thesvg/react/vercel";
import Icon30 from "@thesvg/react/posthog";
import Icon31 from "@thesvg/react/google-search-console";

function Logo({mono, color}: {mono: ReactNode; color: ReactNode}) {
  return <span aria-hidden="true" className="relative block size-3.5 shrink-0">
    <span className="absolute inset-0 text-muted-foreground transition-opacity duration-200 group-hover/stack:opacity-0 group-focus-visible/stack:opacity-0 motion-reduce:transition-none">{mono}</span>
    <span className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover/stack:opacity-100 group-focus-visible/stack:opacity-100 motion-reduce:transition-none">{color}</span>
  </span>;
}

export function StackIcon({name}: {name: string}) {
  switch (name) {
    case "figma": return <Logo mono={<Icon0 variant="mono" className="size-full [&_path]:fill-current" />} color={<Icon0 className="size-full" />} />;
    case "paper": return <Logo mono={<Icon1 className="size-full grayscale opacity-70" />} color={<Icon1 className="size-full" />} />;
    case "canva": return <Logo mono={<Icon2 className="size-full grayscale opacity-70" />} color={<Icon2 className="size-full" />} />;
    case "typescript": return <Logo mono={<Icon3 variant="mono" className="size-full [&_path]:fill-current" />} color={<Icon3 className="size-full" />} />;
    case "javascript": return <Logo mono={<Icon4 variant="mono" className="size-full [&_path]:fill-current" />} color={<Icon4 className="size-full" />} />;
    case "python": return <Logo mono={<Icon5 variant="mono" className="size-full [&_path]:fill-current" />} color={<Icon5 className="size-full" />} />;
    case "rust": return <Logo mono={<Icon6 variant="mono" className="size-full [&_path]:fill-current" />} color={<><Icon6 variant="light" className="size-full dark:hidden" /><Icon6 variant="dark" className="hidden size-full dark:block" /></>} />;
    case "react": return <Logo mono={<Icon7 variant="mono" className="size-full [&_path]:fill-current" />} color={<><Icon7 variant="light" className="size-full dark:hidden" /><Icon7 variant="dark" className="hidden size-full dark:block" /></>} />;
    case "nextdotjs": return <Logo mono={<Icon8 variant="mono" className="size-full [&_path]:fill-current" />} color={<Icon8 className="size-full" />} />;
    case "tailwind-css": return <Logo mono={<Icon9 variant="mono" className="size-full [&_path]:fill-current" />} color={<Icon9 className="size-full" />} />;
    case "shadcn-ui": return <Logo mono={<Icon10 variant="mono" className="size-full [&_path]:fill-current" />} color={<><Icon10 variant="light" className="size-full dark:hidden" /><Icon10 variant="dark" className="hidden size-full dark:block" /></>} />;
    case "radix-ui": return <Logo mono={<Icon11 variant="mono" className="size-full [&_path]:fill-current" />} color={<><Icon11 variant="light" className="size-full dark:hidden" /><Icon11 variant="dark" className="hidden size-full dark:block" /></>} />;
    case "base-ui": return <Logo mono={<Icon12 variant="mono" className="size-full [&_path]:fill-current" />} color={<><Icon12 variant="light" className="size-full dark:hidden" /><Icon12 variant="dark" className="hidden size-full dark:block" /></>} />;
    case "motion": return <Logo mono={<Icon13 className="size-full grayscale opacity-70" />} color={<><Icon13 variant="light" className="size-full dark:hidden" /><Icon13 variant="dark" className="hidden size-full dark:block" /></>} />;
    case "nodedotjs": return <Logo mono={<Icon14 className="size-full grayscale opacity-70" />} color={<Icon14 className="size-full" />} />;
    case "express": return <Logo mono={<Icon15 variant="mono" className="size-full [&_path]:fill-current" />} color={<Icon15 variant="mono" className="size-full text-foreground [&_path]:fill-current" />} />;
    case "mysql": return <Logo mono={<Icon16 variant="light" className="size-full grayscale opacity-70" />} color={<Icon16 variant="light" className="size-full" />} />;
    case "postgresql": return <Logo mono={<Icon17 variant="mono" className="size-full [&_path]:fill-current" />} color={<Icon17 className="size-full" />} />;
    case "mongodb": return <Logo mono={<Icon18 variant="mono" className="size-full [&_path]:fill-current" />} color={<Icon18 className="size-full" />} />;
    case "supabase": return <Logo mono={<Icon19 variant="mono" className="size-full [&_path]:fill-current" />} color={<Icon19 className="size-full" />} />;
    case "sanity": return <Logo mono={<Icon20 variant="mono" className="size-full [&_path]:fill-current" />} color={<Icon20 variant="mono" className="size-full text-foreground [&_path]:fill-current" />} />;
    case "bun": return <Logo mono={<Icon21 variant="mono" className="size-full [&_path]:fill-current" />} color={<Icon21 fill="#000" className="size-full" />} />;
    case "yarn": return <Logo mono={<Icon22 variant="mono" className="size-full [&_path]:fill-current" />} color={<Icon22 className="size-full [&_.st0]:fill-[#2C8EBB] [&_.st1]:fill-white" />} />;
    case "pnpm": return <Logo mono={<Icon23 variant="mono" className="size-full [&_path]:fill-current" />} color={<><Icon23 variant="light" className="size-full dark:hidden" /><Icon23 variant="dark" className="hidden size-full dark:block" /></>} />;
    case "openai-chatgpt": return <Logo mono={<Icon24 variant="mono" className="size-full [&_path]:fill-current" />} color={<Icon24 className="size-full" />} />;
    case "claude": return <Logo mono={<Icon25 variant="mono" className="size-full [&_path]:fill-current" />} color={<Icon25 className="size-full" />} />;
    case "gemini": return <Logo mono={<Icon26 className="size-full grayscale opacity-70" />} color={<Icon26 className="size-full" />} />;
    case "git": return <Logo mono={<Icon27 variant="mono" className="size-full [&_path]:fill-current" />} color={<Icon27 className="size-full" />} />;
    case "github": return <Logo mono={<Icon28 variant="mono" className="size-full [&_path]:fill-current" />} color={<><Icon28 variant="light" className="size-full dark:hidden" /><Icon28 variant="dark" className="hidden size-full dark:block" /></>} />;
    case "vercel": return <Logo mono={<Icon29 variant="mono" className="size-full [&_path]:fill-current" />} color={<><Icon29 variant="light" className="size-full dark:hidden" /><Icon29 variant="dark" className="hidden size-full dark:block" /></>} />;
    case "posthog": return <Logo mono={<Icon30 variant="mono" className="size-full [&_path]:fill-current" />} color={<Icon30 fill="#000" className="size-full" />} />;
    case "google-search-console": return <Logo mono={<Icon31 variant="mono" className="size-full [&_path]:fill-current" />} color={<Icon31 className="size-full" />} />;
    // OpenPanel mark from the referenced Chanh Dai stack component.
    case "openpanel": return <Logo
      mono={<svg viewBox="0 0 24 24" className="size-full" fill="currentColor"><path d="M17.192 7.922c0-.99-.846-1.794-1.888-1.794-1.043 0-1.888.803-1.888 1.794v8.283c0 .992.845 1.795 1.888 1.795s1.888-.803 1.888-1.795zm5.808 0c0-.99-.845-1.794-1.888-1.794s-1.888.803-1.888 1.794v2.485c0 .991.846 1.795 1.888 1.795 1.043 0 1.888-.804 1.888-1.795zM6.186 6C3.322 6 1 8.207 1 10.93v2.015c0 2.722 2.322 4.93 5.186 4.93s5.185-2.208 5.185-4.93V10.93C11.372 8.207 9.05 6 6.187 6m.009 2.9c1.043 0 1.888.803 1.888 1.795v2.484c0 .992-.845 1.795-1.888 1.795s-1.888-.803-1.888-1.795v-2.484c0-.992.846-1.795 1.889-1.795" /></svg>}
      color={<svg viewBox="0 0 24 24" className="size-full text-foreground" fill="currentColor"><path d="M17.192 7.922c0-.99-.846-1.794-1.888-1.794-1.043 0-1.888.803-1.888 1.794v8.283c0 .992.845 1.795 1.888 1.795s1.888-.803 1.888-1.795zm5.808 0c0-.99-.845-1.794-1.888-1.794s-1.888.803-1.888 1.794v2.485c0 .991.846 1.795 1.888 1.795 1.043 0 1.888-.804 1.888-1.795zM6.186 6C3.322 6 1 8.207 1 10.93v2.015c0 2.722 2.322 4.93 5.186 4.93s5.185-2.208 5.185-4.93V10.93C11.372 8.207 9.05 6 6.187 6m.009 2.9c1.043 0 1.888.803 1.888 1.795v2.484c0 .992-.845 1.795-1.888 1.795s-1.888-.803-1.888-1.795v-2.484c0-.992.846-1.795 1.889-1.795" /></svg>}
    />;
    default: return null;
  }
}
