"use client";

import { AltArrowDownIcon, HandShakeIcon } from "@solar-icons/react/linear";
import {Link, usePathname} from "@/i18n/navigation";
import {useTranslations} from "next-intl";
import { IconTile } from "@/components/ui/icon-tile";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getNavigationCurrent, headerNavigation, resourceNavigation } from "./header-navigation";

type MobileNavigationProps = {
  id: string;
  open: boolean;
  resourcesOpen: boolean;
  onResourcesOpenChange: (open: boolean) => void;
  onNavigate: () => void;
};

export function MobileNavigation({
  id,
  open,
  resourcesOpen,
  onResourcesOpenChange,
  onNavigate,
}: MobileNavigationProps) {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  return (
    <nav
      id={id}
      aria-label={t("mobile")}
      hidden={!open}
      className="border-t pb-5 lg:hidden"
    >
      <ul className="divide-y">
        {headerNavigation.filter((item) => item.href !== "/blog").map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={getNavigationCurrent(pathname, item.href)}
              onNavigate={onNavigate}
              className="block rounded-md py-5 text-base font-normal text-muted-foreground transition-colors aria-[current]:font-medium aria-[current]:text-foreground hover:text-foreground aria-[current]:hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
            >
              {t(item.title)}
            </Link>
          </li>
        ))}
        <li>
          <details open={resourcesOpen} onToggle={(event) => {
            if (event.currentTarget.open !== resourcesOpen) onResourcesOpenChange(event.currentTarget.open);
          }} className="group/resources motion-safe:[&::details-content]:transition-[opacity,translate,content-visibility] motion-safe:[&::details-content]:transition-discrete motion-safe:[&::details-content]:duration-200 [&:not([open])::details-content]:-translate-y-1.5 [&:not([open])::details-content]:opacity-0">
            <summary
              data-active={resourceNavigation.some((item) => getNavigationCurrent(pathname, item.href))}
              className="flex cursor-pointer list-none items-center justify-between rounded-md py-5 text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring data-[active=true]:font-medium data-[active=true]:text-foreground [&::-webkit-details-marker]:hidden"
            >
              {t("resources")}
              <AltArrowDownIcon size={16} className="group-open/resources:rotate-180 motion-safe:transition-transform motion-safe:duration-[420ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]" aria-hidden="true" />
            </summary>
            <ul className="space-y-1 pb-3 pl-4">
              {resourceNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onNavigate={onNavigate} aria-current={getNavigationCurrent(pathname, item.href)}
                    className="flex items-center gap-2 rounded-md py-2 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring aria-[current]:font-medium aria-[current]:text-foreground">
                    <IconTile aria-hidden="true">
                      <item.Icon size={16} />
                    </IconTile>
                    {t(item.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </li>
      </ul>

      <div className="border-t pt-6">
        <Link
          href="/contact"
          onNavigate={onNavigate}
          className={cn(
            buttonVariants({
              variant: "outline",
              size: "lg",
            }),
            "gap-2"
          )}
        >
          <HandShakeIcon size={16} className="shrink-0" aria-hidden="true" />{t("cta")}
        </Link>
      </div>
    </nav>
  );
}
