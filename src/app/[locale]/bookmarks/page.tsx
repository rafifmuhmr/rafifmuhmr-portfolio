import Image from "next/image";
import GoogleFontsIcon from "@thesvg/react/google-fonts";
import BrandfetchIcon from "@thesvg/react/brandfetch";
import MdnIcon from "@thesvg/react/mdn-web-docs";
import MagicUiIcon from "@thesvg/react/magic-ui";
import CodePenIcon from "@thesvg/react/codepen";
import AwwwardsIcon from "@thesvg/react/awwwards";
import TheSvgIcon from "@thesvg/react/thesvg";
import BehanceIcon from "@thesvg/react/behance";
import DribbbleIcon from "@thesvg/react/dribbble";
import PinterestIcon from "@thesvg/react/pinterest";
import { ArrowRightUpIcon, LinkIcon } from "@solar-icons/react/linear";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { StackIcon } from "@/components/home/stack-icon";
import { pendingMetadata, type PendingPageProps } from "@/components/pages/pending-page";
import { routing } from "@/i18n/routing";

import { BookmarkList } from "./bookmark-list";
import { RemoteBookmarkIcon } from "./remote-bookmark-icon";

const brandIcons: Partial<Record<string, React.ComponentType<{ className?: string }>>> = {
  behance: BehanceIcon,
  pinterest: PinterestIcon,
  thesvg: ({ className }) => <TheSvgIcon variant="default" stroke="currentColor" className={className} />,
  googlefonts: GoogleFontsIcon,
  brandfetch: BrandfetchIcon,
  mdn: ({ className }) => <MdnIcon variant="mono" className={className} />,
  magicui: MagicUiIcon,
  codepen: CodePenIcon,
};

const groups = [
  { category: "design", items: [
    { id: "ui8", title: "UI8", href: "https://ui8.net/", logo: "/images/bookmarks/ui8.svg", lightLogo: "/images/bookmarks/ui8-light.svg" },
    { id: "mobbin", title: "Mobbin", href: "https://mobbin.com/", logo: "/images/bookmarks/mobbin.svg", monochrome: true },
    { id: "refero", title: "Refero", href: "https://refero.design/", logo: "/images/bookmarks/refero.svg", monochrome: true },
    { id: "thesvg", title: "theSVG", href: "https://thesvg.org/" },
    { id: "solar", title: "Solar Icons", href: "https://www.figma.com/community/file/1166831539721848736", logo: "/images/bookmarks/solar.svg", monochrome: true },
    { id: "googlefonts", title: "Google Fonts", href: "https://fonts.google.com/" },
    { id: "fontshare", title: "Fontshare", href: "https://www.fontshare.com/", logo: "/images/bookmarks/fontshare.svg", monochrome: true },
    { id: "figma", title: "Figma Community", href: "https://www.figma.com/community", icon: "figma" },
    { id: "pageflows", title: "Page Flows", href: "https://pageflows.com/", logo: "/images/bookmarks/pageflows.svg", idleLogo: "/images/bookmarks/pageflows-mono.svg" },
    { id: "uicolors", title: "UI Colors", href: "https://uicolors.app/generate", logo: "/images/bookmarks/uicolors-dark.svg", lightLogo: "/images/bookmarks/uicolors.svg" },
    { id: "radixcolors", title: "Radix Colors", href: "https://www.radix-ui.com/colors", icon: "radix-ui" },
    { id: "brandfetch", title: "Brandfetch", href: "https://brandfetch.com/" },
    { id: "svgviewer", title: "SVG Viewer", href: "https://www.svgviewer.dev/", logo: "/images/bookmarks/svgviewer.svg" },
    { id: "untitledui", title: "Untitled UI", href: "https://www.untitledui.com/", logo: "/images/bookmarks/untitledui.svg" },
    { id: "dssurf", title: "Design Systems Surf", href: "https://designsystems.surf/", logo: "/images/bookmarks/dssurf.svg", monochrome: true },
    { id: "toolfolio", title: "Toolfolio", href: "https://toolfolio.com/", logo: "/images/bookmarks/toolfolio.svg", monochrome: true },
  ] },
  { category: "frontend", items: [
    { id: "shadcn", title: "shadcn/ui", href: "https://ui.shadcn.com/", icon: "shadcn-ui" },
    { id: "tailwind", title: "Tailwind CSS", href: "https://tailwindcss.com/docs", icon: "tailwind-css" },
    { id: "nextjs", title: "Next.js Docs", href: "https://nextjs.org/docs/app", icon: "nextdotjs" },
    { id: "hairline", title: "Hairline UI", href: "https://hairlineui.com/", logo: "/images/bookmarks/hairline.svg" },
    { id: "tailark", title: "Tailark", href: "https://tailark.com/", logo: "/images/bookmarks/tailark.svg", monochrome: true },
    { id: "21st", title: "21st.dev", href: "https://21st.dev/", logo: "/images/bookmarks/21st.svg", idleLogo: "/images/bookmarks/21st-mono.svg" },
    { id: "motion", title: "Motion for React", href: "https://motion.dev/docs/react", icon: "motion" },
    { id: "dashboardcn", title: "dashboardcn", href: "https://dashboardcn.com/", logo: "/images/bookmarks/dashboardcn.svg", monochrome: true },
    { id: "mdn", title: "MDN Web Docs", href: "https://developer.mozilla.org/en-US/docs/Web" },
    { id: "baseui", title: "Base UI", href: "https://base-ui.com/", icon: "base-ui" },
    { id: "radix", title: "Radix Primitives", href: "https://www.radix-ui.com/primitives", icon: "radix-ui" },
    { id: "magicui", title: "Magic UI", href: "https://magicui.design/" },
    { id: "react", title: "React Docs", href: "https://react.dev/", icon: "react" },
    { id: "typescript", title: "TypeScript Handbook", href: "https://www.typescriptlang.org/docs/", icon: "typescript" },
    { id: "bun", title: "Bun Docs", href: "https://bun.sh/docs", icon: "bun" },
    { id: "codepen", title: "CodePen", href: "https://codepen.io/" },
    { id: "webdev", title: "web.dev Learn", href: "https://web.dev/learn/", logo: "/images/bookmarks/webdev.svg" },
  ] },
  { category: "inspiration", items: [
    { id: "dribbble", title: "Dribbble", href: "https://dribbble.com/", icon: "dribbble" },
    { id: "behance", title: "Behance", href: "https://www.behance.net/", icon: "behance" },
    { id: "cosmos", title: "Cosmos", href: "https://www.cosmos.so/", logo: "/images/bookmarks/cosmos.svg", monochrome: true },
    { id: "pinterest", title: "Pinterest", href: "https://www.pinterest.com/" },
    { id: "landbook", title: "Landbook", href: "https://land-book.com/", logo: "/images/bookmarks/landbook.svg", monochrome: true },
    { id: "siteinspire", title: "Siteinspire", href: "https://www.siteinspire.com/", logo: "/images/bookmarks/siteinspire.svg" },
    { id: "recent", title: "Recent Design", href: "https://recent.design/", logo: "/images/bookmarks/recentdesign.svg", monochrome: true },
    { id: "navbargallery", title: "Navbar Gallery", href: "https://www.navbar.gallery/", logo: "/images/bookmarks/navbargallery.svg" },
    { id: "footerdesign", title: "Footer", href: "https://www.footer.design/", logo: "/images/bookmarks/footer.svg", monochrome: true },
    { id: "curated", title: "Curated", href: "https://curated.design/", logo: "/images/bookmarks/curated.svg", monochrome: true },
    { id: "landingfolio", title: "Landingfolio", href: "https://www.landingfolio.com/", logo: "/images/bookmarks/landingfolio.svg" },
    { id: "lapaninja", title: "Lapa Ninja", href: "https://www.lapa.ninja/", logo: "/images/bookmarks/lapaninja.svg" },
    { id: "awwwards", title: "Awwwards", href: "https://www.awwwards.com/" },
    { id: "savee", title: "Savee", href: "https://savee.com/", logo: "/images/bookmarks/savee.svg", monochrome: true },
    { id: "arena", title: "Are.na", href: "https://www.are.na/", logo: "/images/bookmarks/are.na.svg", monochrome: true },
    { id: "detail", title: "Detail", href: "https://detail.design/", logo: "/images/bookmarks/detail.svg", monochrome: true },
  ] },
] as const;

export async function generateMetadata(props: PendingPageProps) {
  return pendingMetadata(props, "bookmarks", "/bookmarks");
}

export default async function BookmarksPage({ params }: PendingPageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const [nav, t] = await Promise.all([
    getTranslations("Navigation"),
    getTranslations("BookmarksPage"),
  ]);

  const clientId = process.env.BRANDFETCH_CLIENT_ID?.trim();

  return (
    <main className="w-full px-4 pt-8 pb-16 sm:px-6 sm:pt-12 lg:pt-20">
      <div className="section-gap mx-auto flex max-w-7xl flex-col py-6 sm:py-8 lg:py-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">{nav("bookmarks")}</h1>
          <p className="text-sm leading-6 text-muted-foreground">{t("description")}</p>
        </header>

        <div className="divide-y divide-border border-y border-border">
          {groups.map(({ category, items }) => (
            <section key={category} aria-labelledby={`bookmarks-${category}`} className="grid gap-4 py-6 lg:grid-cols-3 lg:gap-6 lg:py-8">
              <h2 id={`bookmarks-${category}`} className="text-xl font-semibold tracking-tight">
                {t(`categories.${category}`)}{" "}
                <sup className="ml-0.5 text-xs font-medium tracking-normal text-muted-foreground">
                  ({items.length})
                </sup>
              </h2>
              <BookmarkList
                id={`bookmarks-${category}-list`}
                showMore={t("showMore")}
                showLess={t("showLess")}
                items={items.map((item) => {
                  const BrandIcon = brandIcons[item.id];
                  const domain = new URL(item.href).hostname.replace(/^www\./, "");
                  const logoUrl = clientId && `https://cdn.brandfetch.io/${domain}/h/40/w/40/fallback/404/icon?c=${encodeURIComponent(clientId)}`;

                  return (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group group/stack flex w-fit max-w-full flex-col gap-1 rounded-sm text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        <span className="flex items-center gap-2 font-medium">
                          <span className="grid size-5 shrink-0 place-items-center text-muted-foreground [&>span]:size-full" aria-hidden>
                            {category === "inspiration" && "logo" in item ? (
                              <>
                                <span
                                  className={`col-start-1 row-start-1 size-5 bg-current mask-contain mask-center mask-no-repeat transition-[color,opacity] motion-reduce:transition-none ${"monochrome" in item
                                    ? "group-hover:text-foreground group-focus-visible:text-foreground"
                                    : "group-hover:opacity-0 group-focus-visible:opacity-0"}`}
                                  style={{ maskImage: `url("${item.logo}")` }}
                                />
                                {!("monochrome" in item) && (
                                  <Image
                                    src={item.logo}
                                    alt=""
                                    width={20}
                                    height={20}
                                    unoptimized
                                    className="col-start-1 row-start-1 size-5 object-contain opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                                  />
                                )}
                              </>
                            ) : "logo" in item ? (
                              ("lightLogo" in item
                                ? [{ src: item.lightLogo, visibility: "dark:hidden" }, { src: item.logo, visibility: "hidden dark:block" }]
                                : "idleLogo" in item
                                  ? [
                                    { src: item.idleLogo, visibility: "col-start-1 row-start-1 group-hover:opacity-0 group-focus-visible:opacity-0" },
                                    { src: item.logo, visibility: "col-start-1 row-start-1 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100" },
                                  ]
                                  : [{ src: item.logo, visibility: "" }]
                              ).map(({ src, visibility }) => (
                                <Image
                                  key={src}
                                  src={src}
                                  alt=""
                                  width={20}
                                  height={20}
                                  unoptimized
                                  className={`${visibility} ${"monochrome" in item
                                    ? `size-5 object-contain opacity-60 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none ${item.id === "tailark" ? "dark:invert" : "invert dark:invert-0"}`
                                    : `size-5 object-contain grayscale transition-[filter,opacity] group-hover:grayscale-0 group-focus-visible:grayscale-0 motion-reduce:transition-none ${item.id === "uicolors" || item.id === "ui8" ? "opacity-60 group-hover:opacity-100 group-focus-visible:opacity-100" : ""}`}`}
                                />
                              ))
                            ) : item.id === "awwwards" ? (
                              <AwwwardsIcon
                                variant="mono"
                                className="size-5 transition-colors group-hover:text-foreground group-focus-visible:text-foreground motion-reduce:transition-none"
                              />
                            ) : item.id === "dribbble" ? (
                              <>
                                <DribbbleIcon variant="mono" className="col-start-1 row-start-1 size-5 transition-opacity group-hover:opacity-0 group-focus-visible:opacity-0 motion-reduce:transition-none" />
                                <DribbbleIcon className="col-start-1 row-start-1 size-5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none" />
                              </>
                            ) : BrandIcon && (item.id === "behance" || item.id === "pinterest") ? (
                              <>
                                <BrandIcon className="col-start-1 row-start-1 size-5 fill-current transition-opacity group-hover:opacity-0 group-focus-visible:opacity-0 motion-reduce:transition-none [&_path]:fill-current" />
                                <BrandIcon className="col-start-1 row-start-1 size-5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none" />
                              </>
                            ) : BrandIcon ? (
                              <BrandIcon className="size-5 grayscale transition-[color,filter] group-hover:text-foreground group-hover:grayscale-0 group-focus-visible:text-foreground group-focus-visible:grayscale-0 motion-reduce:transition-none" />
                            ) : "icon" in item ? (
                              <StackIcon name={item.icon} />
                            ) : logoUrl ? (
                              <RemoteBookmarkIcon src={logoUrl} />
                            ) : (
                              <LinkIcon className="size-5" />
                            )}
                          </span>
                          <span className="min-w-0 underline-offset-4 group-hover:underline group-focus-visible:underline">{item.title}</span>
                          <ArrowRightUpIcon className="size-3 shrink-0 text-muted-foreground group-hover:text-foreground group-focus-visible:text-foreground" aria-hidden />
                        </span>
                        <span className="block pl-7 leading-6 text-muted-foreground">{t(`items.${item.id}`)}</span>
                      </a>
                    </li>
                  );
                })}
              />
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
