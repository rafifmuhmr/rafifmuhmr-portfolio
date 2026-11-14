"use client";

import {Link} from "@/i18n/navigation";
import {useTranslations} from "next-intl";

import { headerNavigation } from "./header-navigation";

export function DesktopNavigation() {
  const t = useTranslations("Navigation");
  return (
    <nav aria-label={t("main")} className="hidden lg:block">
      <ul className="flex items-center">
        {headerNavigation.map((item) => (
          <li key={item.href}>
            <Link target="_blank"
              href={item.href}
              className="inline-flex h-9 w-22 whitespace-nowrap items-center justify-center rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
             rel="noopener noreferrer">
              {t(item.title)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
