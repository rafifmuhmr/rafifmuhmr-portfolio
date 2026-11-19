"use client";

import { HandShakeIcon } from "@solar-icons/react/linear";
import {Link, usePathname} from "@/i18n/navigation";
import {useTranslations} from "next-intl";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getNavigationCurrent, headerNavigation } from "./header-navigation";

type MobileNavigationProps = {
  id: string;
  open: boolean;
  onNavigate: () => void;
};

export function MobileNavigation({
  id,
  open,
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
        {headerNavigation.map((item) => (
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
