import {IconTile} from "@/components/ui/icon-tile";
import {SocialIcon} from "./social-icon";
import Image from "next/image";
import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {socialLinks, instagramUrl} from "@/config/socials";
import {headerNavigation, resourceNavigation} from "./header-navigation";
import {DeferredWordmark} from "./deferred-wordmark";
import {SiteCredits} from "./site-credits";

const externalLinkClass = "text-muted-foreground transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

export async function SiteFooter({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: "Footer"});
  const nav = await getTranslations({locale, namespace: "Navigation"});
  return (
    <footer data-scroll-top-boundary className="mt-16 bg-background px-4 pt-12 sm:px-6 sm:pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 pb-10 xl:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] xl:gap-16 md:pb-14">
          <div className="max-w-sm space-y-5">
            <Link target="_blank" href="/" aria-label={nav("home")} className="inline-flex w-fit items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring" rel="noopener noreferrer">
              <Image src="/rafifmuhmr-logo.svg" alt="" width={28} height={28} className="size-7 shrink-0" />
              <span className="text-base font-semibold tracking-tight sm:text-xl">rafifmuhmr</span>
            </Link>
            <p className="text-sm leading-6 text-muted-foreground">{t("intro")}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 text-sm md:grid-cols-[repeat(4,max-content)] md:grid-rows-[auto_auto] md:gap-y-6 md:justify-normal md:gap-x-20 xl:justify-self-end xl:pt-1">
            <nav aria-label={t("navigation")} className="md:row-span-2">
              <h2 className="mb-4 font-medium text-foreground">{t("menu")}</h2>
              <ul className="space-y-3">
                {[...headerNavigation.filter((item) => item.href !== "/blog"), ...resourceNavigation, {title: "cta", href: "/contact"} as const].map((item) => <li key={item.href}><Link target="_blank" href={item.href} className={externalLinkClass} rel="noopener noreferrer">{nav(item.title)}</Link></li>)}
              </ul>
            </nav>
            <SiteCredits locale={locale} />
            <nav aria-label={t("socials")} className="md:row-span-2">
              <h2 className="mb-4 font-medium text-foreground">{t("socialTitle")}</h2>
              <ul className="flex flex-wrap items-center gap-3">
                {socialLinks.filter((social) => social.href).map((social) => <li key={social.platform}><a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} title={social.label} className={`group inline-flex rounded-md ${externalLinkClass}`}><IconTile className="size-7 transition-colors group-hover:text-foreground [&_svg]:size-5"><SocialIcon platform={social.platform} /></IconTile></a></li>)}
              </ul>
              <div data-scroll-top-dock className="mt-14 h-9 md:mt-16" aria-hidden="true" />
            </nav>

          </div>
        </div>
        <div className="flex items-start justify-between gap-3 border-t border-border pt-10 pb-10 text-sm text-muted-foreground sm:items-center md:pt-14 md:pb-14">
          <p className="flex flex-col gap-1 font-medium"><span>© <span className="font-mono tabular-nums">{new Date().getFullYear()}</span> rafifmuhmr.</span><span>{t("rights")}</span></p>
          <p className="flex shrink-0 flex-col items-end gap-1 text-right"><span>Crafted by</span>{instagramUrl ? <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground underline-offset-4 decoration-1 [text-decoration-skip-ink:none] hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">@rafifmuhmr</a> : "@rafifmuhmr"}</p>
        </div>
        <DeferredWordmark />
      </div>
    </footer>
  );
}
