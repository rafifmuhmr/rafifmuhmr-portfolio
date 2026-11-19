"use client";

import {Link, usePathname} from "@/i18n/navigation";
import {useTranslations} from "next-intl";
import { IconTile } from "@/components/ui/icon-tile";

import { AltArrowDownIcon } from "@solar-icons/react/linear";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { getNavigationCurrent, headerNavigation, resourceNavigation } from "./header-navigation";

export function DesktopNavigation({ resourcesOpen, onResourcesOpenChange }: { resourcesOpen: boolean; onResourcesOpenChange: (open: boolean) => void }) {
  const t = useTranslations("Navigation");
  const pathname = usePathname();

  return (
    <nav aria-label={t("main")} className="hidden lg:block">
      <ul className="flex items-center">
        {headerNavigation.filter((item) => item.href !== "/" && item.href !== "/blog").map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={getNavigationCurrent(pathname, item.href)}
              className="inline-flex h-9 w-auto whitespace-nowrap items-center justify-center rounded-lg px-3 text-sm text-muted-foreground transition-colors aria-[current]:font-medium aria-[current]:text-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {t(item.title)}
            </Link>
          </li>
        ))}
        <li>
          <DropdownMenu modal={false} open={resourcesOpen} onOpenChange={(open, details) => {
            const target = details.event instanceof FocusEvent ? details.event.relatedTarget : details.event.target;
            if (!open && (details.reason === "outside-press" || details.reason === "focus-out")
              && target instanceof Element && target.closest("[data-keep-resources-open]")) {
              details.cancel();
              return;
            }
            onResourcesOpenChange(open);
          }}>
            <DropdownMenuTrigger
              data-active={resourceNavigation.some((item) => getNavigationCurrent(pathname, item.href))}
              className="group/resources inline-flex h-9 items-center gap-1 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[active=true]:font-medium data-[active=true]:text-foreground"
            >
              {t("resources")}
              <AltArrowDownIcon size={14} className="group-aria-expanded/resources:rotate-180 motion-safe:transition-transform motion-safe:duration-[420ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]" aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" sideOffset={16} positionMethod="fixed" disableAnchorTracking
              className="motion-safe:transition-[opacity,translate] motion-safe:duration-200 motion-safe:ease-out data-starting-style:-translate-y-1.5 data-starting-style:opacity-0 data-ending-style:-translate-y-1.5 data-ending-style:opacity-0"
            >
              {resourceNavigation.map((item) => (
                <DropdownMenuItem key={item.href} render={<Link href={item.href} aria-current={getNavigationCurrent(pathname, item.href)} />}>
                  <IconTile aria-hidden="true">
                    <item.Icon size={16} />
                  </IconTile>
                  {t(item.title)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    </nav>
  );
}
