"use client";

import {
  HamburgerMenuIcon as Menu,
  HandShakeIcon,
  CloseIcon as X,
} from "@solar-icons/react/linear";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { LocalStatusPanel } from "@/components/home/local-status-panel";
import { LanguageSwitcher, useLanguageShortcut } from "@/components/language-switcher";
import { ThemeToggle, useThemeShortcut } from "@/components/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";

const HEADER_SCROLL_THRESHOLD = 80;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });

  return () => {
    window.removeEventListener("scroll", onChange);
  };
}

function getScrollSnapshot() {
  return window.scrollY > HEADER_SCROLL_THRESHOLD;
}

function getServerSnapshot() {
  return false;
}

// The locale segment remounts the header when the language changes.
let resourcesView: { pathname: string; anchorScrolled: boolean | null; mobileOpen: boolean } | undefined;

export function SiteHeader({ localStatus }: { localStatus: ReactNode }) {
  useThemeShortcut();
  useLanguageShortcut();
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(() => resourcesView?.pathname === pathname && resourcesView.mobileOpen);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(mobileOpen);
  const [resourcesAnchorScrolled, setResourcesAnchorScrolled] = useState(() =>
    resourcesView?.pathname === pathname ? resourcesView.anchorScrolled : null
  );
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavigationId = useId();

  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrollSnapshot,
    getServerSnapshot
  );

  const showSurface = scrolled || mobileOpen;
  const compactHeader = resourcesAnchorScrolled ?? scrolled;

  // Close the mobile menu when switching to desktop.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");

    const handleResize = () => {
      resourcesView = undefined;
      if (desktop.matches) {
        setMobileOpen(false);
        setMobileResourcesOpen(false);
      } else {
        setResourcesAnchorScrolled(null);
      }
    };

    desktop.addEventListener("change", handleResize);

    return () => {
      desktop.removeEventListener("change", handleResize);
    };
  }, []);

  // Prevent the page behind the mobile menu from scrolling.
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  function closeMobileMenu() {
    resourcesView = undefined;
    setMobileResourcesOpen(false);
    setMobileOpen(false);
  }

  return (
    <header
      className="relative z-40 h-20 shrink-0"
      onKeyDown={(event) => {
        if (event.key === "Escape" && mobileOpen && !event.defaultPrevented) {
          event.preventDefault();
          closeMobileMenu();
          menuButtonRef.current?.focus();
        }
      }}
    >
      <div
        className={cn(
          "fixed inset-x-0 top-0 px-2 pt-2 lg:px-6 lg:pt-3",
          mobileOpen &&
            "h-dvh overflow-y-auto overscroll-contain bg-background/60 pb-4 backdrop-blur-lg",
          "lg:h-auto lg:overflow-visible lg:bg-transparent lg:pb-0 lg:backdrop-blur-none"
        )}
      >
        <div
          className={cn(
            "mx-auto w-full rounded-2xl border px-3",
            "transition-[max-width,background-color,border-color,padding,backdrop-filter]",
            "duration-500 ease-in-out motion-reduce:transition-none",
            compactHeader ? "max-w-5xl" : "max-w-7xl",
            !compactHeader && "lg:px-0",
            showSurface
              ? "border-border bg-background/60 backdrop-blur-2xl backdrop-saturate-150"
              : "border-transparent bg-transparent shadow-none"
          )}
        >
          <div className="grid h-14 grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
            <Link
              href="/"
              aria-label={t("home")}
              onNavigate={closeMobileMenu}
              className={cn(
                "inline-flex w-fit items-center gap-2.5 rounded-md",
                "transition-[padding] duration-500 ease-in-out",
                "motion-reduce:transition-none",
                "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              )}
             
            >
              <Image
                src="/rafifmuhmr-logo.svg"
                alt=""
                width={28}
                height={28}
                className="size-7 shrink-0"
                loading="eager"
              />

              <span className="hidden text-base font-semibold tracking-tight min-[400px]:inline sm:text-xl">
                rafifmuhmr
              </span>
            </Link>

            <DesktopNavigation resourcesOpen={resourcesAnchorScrolled !== null} onResourcesOpenChange={(open) => {
              const anchorScrolled = open ? scrolled : null;
              resourcesView = open ? { pathname, anchorScrolled, mobileOpen: false } : undefined;
              setResourcesAnchorScrolled(anchorScrolled);
            }} />

            <div className="hidden items-center justify-end gap-3 lg:flex">
              <div data-keep-resources-open className="contents"><ThemeToggle /></div>
              <Separator
                orientation="vertical"
                className="data-vertical:h-6 data-vertical:self-center"
              />
              <div data-keep-resources-open className="contents"><LanguageSwitcher /></div>
              <Separator
                orientation="vertical"
                className="data-vertical:h-6 data-vertical:self-center"
              />

              <Link
                  href="/contact"
                className={cn(
                  buttonVariants({
                    variant: "default",
                    size: "lg",
                  }),
                  "min-w-28 gap-2 rounded-lg"
                )}
               
              >
                <HandShakeIcon size={16} className="shrink-0" aria-hidden="true" />
                {t("cta")}
              </Link>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <div data-keep-resources-open className="contents"><ThemeToggle /></div>
              <Separator
                orientation="vertical"
                className="data-vertical:h-6 data-vertical:self-center"
              />
              <div data-keep-resources-open className="contents"><LanguageSwitcher /></div>
              <Separator
                orientation="vertical"
                className="data-vertical:h-6 data-vertical:self-center"
              />

              <Button
                ref={menuButtonRef}
                type="button"
                variant="ghost"
                size="icon-lg"
                aria-label={mobileOpen ? t("close") : t("open")}
                aria-expanded={mobileOpen}
                aria-controls={mobileNavigationId}
                onClick={() => mobileOpen ? closeMobileMenu() : setMobileOpen(true)}
              >
                {mobileOpen ? (
                  <X className="size-5" aria-hidden="true" />
                ) : (
                  <Menu className="size-5" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>

          <MobileNavigation
            id={mobileNavigationId}
            open={mobileOpen}
            resourcesOpen={mobileResourcesOpen}
            onResourcesOpenChange={(open) => {
              resourcesView = open && mobileOpen ? { pathname, anchorScrolled: null, mobileOpen: true } : undefined;
              setMobileResourcesOpen(open);
            }}
            onNavigate={closeMobileMenu}
          />
        </div>
        <div
          className={cn(
            "mx-auto w-full transition-[max-width] duration-500 ease-in-out motion-reduce:transition-none",
            compactHeader ? "max-w-5xl" : "max-w-7xl",
            mobileOpen && "hidden"
          )}
        >
          <LocalStatusPanel>{localStatus}</LocalStatusPanel>
        </div>
      </div>
    </header>
  );
}
