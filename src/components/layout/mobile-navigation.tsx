"use client";

import {Link} from "@/i18n/navigation";
import {useTranslations} from "next-intl";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { headerNavigation } from "./header-navigation";

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
            <Link target="_blank"
              href={item.href}
              onNavigate={onNavigate}
              className="block rounded-md py-5 text-base font-medium transition-colors hover:text-muted-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
             rel="noopener noreferrer">
              {t(item.title)}
            </Link>
          </li>
        ))}
      </ul>

      <div className="border-t pt-6">
        <Link target="_blank"
          href="/contact"
          onNavigate={onNavigate}
          className={cn(
            buttonVariants({
              variant: "outline",
              size: "lg",
            })
          )}
         rel="noopener noreferrer">
          {t("cta")}
        </Link>
      </div>
    </nav>
  );
}
