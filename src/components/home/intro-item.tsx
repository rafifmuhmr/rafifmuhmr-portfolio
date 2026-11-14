import type {ComponentProps} from "react";
import {cn} from "@/lib/utils";

export {IconTile as IntroItemIcon} from "@/components/ui/icon-tile";

export function IntroItem({className, ...props}: ComponentProps<"div">) {
  return <div className={cn("flex min-h-6 items-center gap-4 text-sm", className)} {...props} />;
}

export function IntroItemContent({className, ...props}: ComponentProps<"p">) {
  return <p className={cn("min-w-0 text-balance", className)} {...props} />;
}

export function IntroItemLink({className, ...props}: ComponentProps<"a">) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn("underline-offset-4 decoration-1 [text-decoration-skip-ink:none] hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring", className)}
      {...props}
    />
  );
}
