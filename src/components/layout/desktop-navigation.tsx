"use client";

import {Link, usePathname} from "@/i18n/navigation";
import {useTranslations} from "next-intl";

import { getNavigationCurrent, headerNavigation } from "./header-navigation";

export function DesktopNavigation() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  return (
    <nav aria-label={t("main")} className="hidden lg:block">
      <ul className="flex items-center">
        {headerNavigation.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={getNavigationCurrent(pathname, item.href)}
              className="inline-flex h-9 w-22 whitespace-nowrap items-center justify-center rounded-lg px-3 text-sm text-muted-foreground transition-colors aria-[current]:font-medium aria-[current]:text-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {t(item.title)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
